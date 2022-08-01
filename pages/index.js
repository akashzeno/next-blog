import Head from "next/head";
import Image from "next/image";
import BlogPost from "../components/BlogPost.js";
import { useContext } from "react";
import { UserContext } from "../context/userContext.js";
import Link from "next/link.js";
export default function Home() {
	const { currentUser, demoData } = useContext(UserContext);
	return (
		<>
			<Head>
				<title>Next Blog</title>
				<meta name="description" content="Created by Akash Chowdhury" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<header className="relative flex flex-col items-center justify-center overflow-hidden text-center h-96 before:-z-10 before:w-full before:h-full before:absolute before:bg-black/70">
				<Image
					className="-z-20"
					src="/assets/banner.jpeg"
					layout="fill"
					objectFit="cover"
					objectPosition="center"
					alt="Banner Image"
				/>
				<Image
					src="/assets/profile.png"
					className="rounded-full"
					width={180}
					height={180}
					alt="Profile Image"
				/>
				<h1 className="mt-2 text-2xl text-sky-100">
					<a
						target="_blank"
						rel="noreferrer author"
						href="https://www.github.com/akashzeno"
					>
						Akash Chowdhury
					</a>
				</h1>
				<h2 className="text-xl text-sky-100">
					Hey, I am happy to see you on my blog!
				</h2>
			</header>
			<main className="flex flex-col items-center main">
				{currentUser &&
					currentUser.blog_posts.map((blogPostData) => {
						return (
							<BlogPost key={blogPostData.id} blogPostData={blogPostData} />
						);
					})}
				{demoData &&
					demoData.blog_posts.map((blogPostData) => {
						return (
							<BlogPost key={blogPostData.id} blogPostData={blogPostData} />
						);
					})}
			</main>
			{currentUser && (
				<Link href="/create_post">
					<a>
						<button className="createNewPostButton">+</button>
					</a>
				</Link>
			)}
		</>
	);
}
