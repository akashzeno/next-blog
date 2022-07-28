import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	signOut,
	onAuthStateChanged,
} from "firebase/auth";
import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	arrayRemove,
	updateDoc,
	arrayUnion,
} from "firebase/firestore";
import {
	deleteObject,
	getDownloadURL,
	getStorage,
	ref,
	uploadBytes,
} from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCrjfq4ZWUQVuxzyLyAxB8JEqHNvDJV2bk",
	authDomain: "next-blog-db-bf94a.firebaseapp.com",
	projectId: "next-blog-db-bf94a",
	storageBucket: "next-blog-db-bf94a.appspot.com",
	messagingSenderId: "525307635606",
	appId: "1:525307635606:web:305247e7b2a6ae8b8b1fb7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const storage = getStorage();
provider.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();
export async function createUserDocFromAuth(
	userAuth = auth.currentUser,
	additionalInformation = {}
) {
	if (!userAuth) return;
	const userDocRef = await doc(db, "users", userAuth.uid);
	const userSnapshot = await getDoc(userDocRef);

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				blog_posts: [...additionalInformation],
			});
		} catch (error) {
			console.log(`error creating user ${error.message}`);
		}
	}
	return userDocRef;
}

export async function getUserDataFromAuth(userAuth = auth.currentUser) {
	if (!userAuth) return null;
	const userSnapshot = await getDoc(await createUserDocFromAuth(userAuth));
	const userData = await userSnapshot.data();
	// We are adding resolved firebase Image URLs
	userData.blog_posts = await Promise.all(
		userData.blog_posts.map(async (blogPost) => {
			return {
				...blogPost,
				post_imageUrl: await getImageUrl(blogPost.post_image),
			};
		})
	);
	return userData;
}
export async function deletePost(post = {}, userAuth = auth.currentUser) {
	delete post["post_imageUrl"];
	1;
	deleteImageFromStorage(post.post_image);
	const docRef = doc(db, "users", userAuth.uid);
	await updateDoc(docRef, {
		blog_posts: arrayRemove(post),
	});
}
export async function addPost(post = {}, userAuth = auth.currentUser) {
	const docRef = doc(db, "users", userAuth.uid);
	uploadImageInStorage(
		`users/${userAuth.uid}/images/${post.post_image.name}`,
		post.post_image
	);
	await updateDoc(docRef, {
		blog_posts: arrayUnion({
			...post,
			post_image: `users/${userAuth.uid}/images/${post.post_image.name}`,
		}),
	});
}
export const getImageUrl = async (path) => getDownloadURL(ref(storage, path));
export const deleteImageFromStorage = (path) =>
	deleteObject(ref(storage, path));
export const uploadImageInStorage = (path, file) =>
	uploadBytes(ref(storage, path), file);
export const signOutUser = async () => signOut(auth);
export const onAuthStateChangedListener = (callback) =>
	onAuthStateChanged(auth, callback);
