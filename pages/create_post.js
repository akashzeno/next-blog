import Head from "next/head.js";
import Image from "next/image.js";
import Link from "next/link.js";
import { useRouter } from "next/router.js";
import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { UserContext } from "../context/userContext.js";
import { addPost, getUserDataFromAuth } from "../utils/firebase.js";

export default function CreatePost() {
	const { setCurrentUser } = useContext(UserContext);
	const { back } = useRouter();

	const createPost = async (event) => {
		event.preventDefault();
		const id = uuidv4();
		const added_date = new Date();
		const formData = new FormData(event.target);

		// Getting Post Image File
		const post_image = formData.get("post_image");

		// Extracting image extension using regex
		const post_image_format = post_image.name.match(/[^\\]*\.(\w+)$/)[1];

		// Appending formData with modified post image File Name
		formData.append("post_image", post_image, `${id}.${post_image_format}`);
		const values = Object.fromEntries(formData.entries());
		await addPost({ ...values, added_date, id }).then(() => {
			alert("Post Added Successfully!");
		});

		back();
		setCurrentUser(await getUserDataFromAuth());
	};
	return (
		<>
			<Head>
				<title>Create Post</title>
				<meta name="description" content="Created by Akash Chowdhury" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<header className="relative flex flex-col items-center justify-center overflow-hidden text-center before:-z-10 before:w-full before:h-full before:absolute h-80 before:bg-black/70">
				<Image
					className="-z-20"
					src="/assets/banner.jpeg"
					layout="fill"
					objectFit="cover"
					objectPosition="center"
					alt="Banner Image"
				/>
				<h1 className="mt-2 font-bold text-white text-5xl">Create Post</h1>
				<h2 className="text-white text-2xl">
					Let&apos;s Create A New Blog Post!
				</h2>
			</header>
			<main className="createPostFormContainer flex flex-col mt-8 mx-4 md:mx-auto max-w-[750px]">
				<Link href="/">
					<a>
						<button className="backButton">Back</button>
					</a>
				</Link>
				<form
					encType="multipart/form-data"
					method="POST"
					className="flex flex-col"
					onSubmit={createPost}
				>
					<input
						className="createPostFormTitle"
						id="formPostTitle"
						type="text"
						name="title"
						placeholder="Post Title"
						required
					/>
					<textarea
						className="createPostFormContent"
						id="formPostContent"
						name="content"
						placeholder="Post Content"
						required
					></textarea>
					<div className="mt-4">
						<label
							htmlFor="formPostImage"
							className="createPostChooseImageLabel"
						>
							Choose Image
						</label>
						&nbsp;
						<input
							className="createPostFormImageInput"
							type="file"
							name="post_image"
							id="formPostImage"
							accept="image/*"
							required
						/>
					</div>
					<button type="submit" className="createPostSubmitButton self-start">
						Submit
					</button>
				</form>
			</main>
		</>
	);
}
