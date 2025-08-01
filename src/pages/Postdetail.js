import React from "react";
import { useParams, Link } from "react-router-dom";
import blogPosts from "../data/posts.json";

export default function PostDetail() {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === parseInt(id));

  if (!post) {
    return (
      <div style={{ padding: "2rem" }}>
        <h2>Post not found</h2>
        <Link to="/blog">← Back to Blog</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>{post.title}</h1>
      <p style={{ whiteSpace: "pre-line", marginTop: "1rem" }}>{post.content}</p>
      <div style={{ marginTop: "2rem" }}>
        <Link to="/blog" style={{ color: "#2d89e5" }}>
          ← Back to Blog
        </Link>
      </div>
    </div>
  );
}
