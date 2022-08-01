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
});
export function UserProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null);
	const [demoData, setDemoData] = useState(null);
	useEffect(() => {
		const unsubscribe = onAuthStateChangedListener(async (user) => {
			if (user) {
				setDemoData(null);
				setCurrentUser(await getUserDataFromAuth(user));
			} else {
				setCurrentUser(user);
				setDemoData(await getDemoData());
			}
		});

		return unsubscribe;
	}, []);

	return (
		<UserContext.Provider
			value={{ currentUser, setCurrentUser, demoData, setDemoData }}
		>
			{children}
		</UserContext.Provider>
	);
}
