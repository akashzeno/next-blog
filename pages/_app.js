import Layout from "../components/Layout.js";
import { UserProvider } from "../context/userContext.js";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
	return (
		<UserProvider>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</UserProvider>
	);
}

export default MyApp;
