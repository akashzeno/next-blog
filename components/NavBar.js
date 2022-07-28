import Link from "next/link.js";
import { useContext } from "react";
import { UserContext } from "../context/userContext.js";
import {
	getUserDataFromAuth,
	signInWithGooglePopup,
	signOutUser,
} from "../utils/firebase.js";

export default function NavBar() {
	const { currentUser, setCurrentUser } = useContext(UserContext);

	const signInWithGoogle = async () => {
		await signInWithGooglePopup();
		setCurrentUser(await getUserDataFromAuth());
	};
	const signOutFromGoogle = async () => {
		await signOutUser();
	};
	return (
		<nav className="navigationWrapper">
			<Link href="/">
				<a className="logoWrapper">
					<span className="stylish">Next</span>
					<span className="logo">Blog</span>
				</a>
			</Link>

			<ul className="navigation">
				<li className="parent">
					{currentUser ? (
						<a className="link" href="#" onClick={signOutFromGoogle}>
							SIGN OUT
						</a>
					) : (
						<a className="link" href="#" onClick={signInWithGoogle}>
							SIGN IN
						</a>
					)}
				</li>
			</ul>
		</nav>
	);
}