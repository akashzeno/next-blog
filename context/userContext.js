import { createContext, useEffect, useState } from "react";
import {
	getUserDataFromAuth,
	onAuthStateChangedListener,
} from "../utils/firebase.js";

export const UserContext = createContext({
	currentUser: null,
	setCurrentUser: () => null,
});
export function UserProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null);
	useEffect(() => {
		const unsubscribe = onAuthStateChangedListener(async (user) => {
			if (user) {
				setCurrentUser(await getUserDataFromAuth(user));
			} else {
				setCurrentUser(user);
			}
		});

		return unsubscribe;
	}, []);

	return (
		<UserContext.Provider value={{ currentUser, setCurrentUser }}>
			{children}
		</UserContext.Provider>
	);
}