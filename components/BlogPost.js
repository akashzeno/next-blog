import Link from "next/link";
import Image from "next/image";

export default function BlogPost({
	blogPostData: { id, title, content, added_date, post_imageUrl },
}) {
	const postLink = `/post/${id}`;
	return (
		<Link className="post" href={postLink}>
			<>
				{post_imageUrl && (
					<Image
						className="postImage"
						src={post_imageUrl}
						width={200}
						height={200}
						alt="Post Image"
					></Image>
				)}
				<article className="postContent">
					<time className="postDate">{added_date.toDate().toDateString()}</time>
					<h2 className="postTitle">{title}</h2>
					<p className="postText">{content}</p>
				</article>
			</>
		</Link>
	);
}
