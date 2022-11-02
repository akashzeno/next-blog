import Head from "next/head.js";
import Image from "next/image.js";
import { useRouter } from "next/router.js";
import { useContext } from "react";
import Spinner from "../../components/Spinner.js";
import { UserContext } from "../../context/userContext.js";
import { deletePost, getUserDataFromAuth } from "../../utils/firebase.js";

export default function Post() {
	const { currentUser, demoData, setCurrentUser } = useContext(UserContext);
	const { query, back } = useRouter();
	const postObj = (currentUser || demoData)?.blog_posts.find(
		(post) => post.id === query.pid
	);

	// if postObj is true it will destructure from it otherwise it will try empty obj {} this will at least prevent throwing an error.
	const { title, content, added_date, post_imageUrl } = postObj || {};

	const deletePostHandler = async () => {
		await deletePost(postObj).then(() => {
			alert("Post Deleted Successfully");
		});
		// We are going back() to home first because setting the user data before it, is causing this component to rerender and undefined error of postObj
		back();
		setCurrentUser(await getUserDataFromAuth());
	};
	return (
		(currentUser || demoData) && (
			<>
				<Head>
					<title>{title}</title>
					<meta name="description" content={content} />
				</Head>
				<header className="relative flex flex-col items-center justify-center overflow-hidden text-center h-96 before:-z-10 before:w-full before:h-full before:absolute before:bg-black/70">
					<Image
						className="-z-20 bannerImg"
						src={post_imageUrl}
						fill
						alt="Banner Image"
					/>
				</header>
				<main className="individualPost">
					<article className="postContent">
						<h1 className="postTitle">{title}</h1>
						<time className="postDate">
							{added_date.toDate().toDateString()}
						</time>
						<p className="postText">{content}</p>
					</article>
				</main>
				{currentUser && (
					<div className="buttonContainer flex justify-center pt-14">
						<button
							className="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md deleteButton"
							onClick={deletePostHandler}
						>
							<span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
							<span className="relative px-6 py-3 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
								<span className="relative text-white">Delete</span>
							</span>
						</button>
					</div>
				)}
			</>
		)
	);
}
