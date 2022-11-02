import Link from "next/link.js";
import { useRouter } from "next/router.js";
import { useContext } from "react";
import { UserContext } from "../context/userContext.js";
import {
	getUserDataFromAuth,
	signInWithGooglePopup,
	signOutUser,
} from "../utils/firebase.js";

export default function NavBar() {
	const { currentUser, setCurrentUser } = useContext(UserContext);
	const { push } = useRouter();

	const signInWithGoogle = async () => {
		await signInWithGooglePopup();
		push("/");
		setCurrentUser(await getUserDataFromAuth());
	};
	const signOutFromGoogle = async () => {
		push("/");
		await signOutUser();
	};
	return (
		<nav className="navigationWrapper">
			<Link className="logoWrapper" href="/">
				<>
					<span className="stylish">Next</span>
					<span className="logo">Blog</span>
				</>
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
