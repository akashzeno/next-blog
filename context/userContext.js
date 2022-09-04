import { createContext, useEffect, useState } from "react";
import {
	getDemoData,
	getUserDataFromAuth,
	onAuthStateChangedListener,
} from "../utils/firebase.js";

export const UserContext = createContext({
	currentUser: null,
	setCurrentUser: () => null,
	demoData: null,
	setDemoData: () => null,
	isLoading: false,
});
export function UserProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null);
	const [demoData, setDemoData] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		const unsubscribe = onAuthStateChangedListener(async (user) => {
			setIsLoading(true);
			if (user) {
				setDemoData(null);
				setCurrentUser(await getUserDataFromAuth(user));
			} else {
				setCurrentUser(user);
				setDemoData(await getDemoData());
			}
			setIsLoading(false);
		});

		return unsubscribe;
	}, []);

	return (
		<UserContext.Provider
			value={{
				currentUser,
				setCurrentUser,
				demoData,
				setDemoData,
				isLoading,
				setIsLoading,
			}}
		>
			{children}
		</UserContext.Provider>
	);
}
