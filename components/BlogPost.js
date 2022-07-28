import Link from "next/link";
import Image from "next/image";

export default function BlogPost({
	blogPostData: { id, title, content, added_date, post_imageUrl },
}) {
	const postLink = `/post/${id}`;
	return (
		<Link href={postLink}>
			<a className="post">
				<span className="postImage">
					{post_imageUrl && (
						<Image
							src={post_imageUrl}
							width={200}
							height={200}
							layout="responsive"
							alt="Post Image"
						></Image>
					)}
				</span>
				<article className="postContent">
					<time className="postDate">{added_date.toDate().toDateString()}</time>
					<h2 className="postTitle">{title}</h2>
					<p className="postText">{content}</p>
				</article>
			</a>
		</Link>
	);
}
