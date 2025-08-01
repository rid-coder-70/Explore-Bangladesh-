import React from "react";
import { useParams, Link } from "react-router-dom";
import blogData from "../data/posts.json";
import "./BlogDetail.css";

// Image map
const importImages = {
  "sundarbans.jpg": require("../assets/images/sundarbans.jpg"),
  "coxsbazar.jpg": require("../assets/images/coxsbazar.jpg"),
  "srimangal.jpg": require("../assets/images/srimangal.jpg"),
  "stmartin.jpg": require("../assets/images/stmartin.jpg"),
  "jaflong.jpg": require("../assets/images/jaflong.jpg"),
  "tanguarhaor.jpg": require("../assets/images/tanguarhaor.jpg"),
  "bandarban.jpg": require("../assets/images/bandarban.jpg"),
  "hakalukihaor.jpg": require("../assets/images/hakalukihaor.jpg"),
  "kuakataseabeach.jpg": require("../assets/images/kuakataseabeach.jpg"),
  "rangamati.jpg": require("../assets/images/rangamati.jpg"),
  "sadapathor1.jpg": require("../assets/images/sadapathor.jpg"),
};

const BlogDetail = () => {
  const { id } = useParams();
  const blog = blogData.find((b) => b.id === parseInt(id));

  if (!blog) {
    return <h2>Blog not found!</h2>;
  }

  return (
    <div className="blog-detail-container">
      <img
        src={importImages[blog.image]}
        alt={blog.title}
        className="detail-image"
      />
      <h2 className="detail-title">{blog.title}</h2>
      <p className="detail-content">{blog.content}</p>

      {/* 🔘 Button Group Box */}
      <div className="button-group">
        {blog.locationUrl && (
          <a
            href={blog.locationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="location-box"
          >
            <span role="img" aria-label="pin">📍</span> View on Google Maps
          </a>
        )}

        <Link to="/" className="back-link">← Back to Home</Link>
      </div>
    </div>
  );
};

export default BlogDetail;
