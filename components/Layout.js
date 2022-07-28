import NavBar from "./NavBar.js";
import Footer from "./Footer.js";

export default function Layout({ children }) {
	return (
		<>
			<NavBar />
			{children}
			<Footer />
		</>
	);
}
