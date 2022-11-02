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
	const [hydrated, setHydrated] = useState(false);

	//Using Hydration Fix -> https://traviswimer.com/blog/error-hydration-failed-because-the-initial-ui-does-not-match-what-was-rendered-on-the-server/
	// https://traviswimer.com/blog/easily-fix-react-hydration-errors/
	useEffect(() => {
		// This forces a rerender, so the date is rendered
		// the second time but not the first
		setHydrated(true);
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
	if (!hydrated) {
		// Returns null on first render, so the client and server match
		return null;
	}

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
