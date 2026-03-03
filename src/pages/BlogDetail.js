import React from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Slider from "react-slick";
import { FaMapMarkerAlt, FaArrowLeft, FaImages } from "react-icons/fa";
import blogData from "../data/posts.json";
import "./BlogDetail.css";

import importImages from "../utils/imageLoader";

const BlogDetail = () => {
  const { id } = useParams();
  const blog = blogData.find((b) => b.id === parseInt(id));

  if (!blog) {
    return <h2>Blog not found!</h2>;
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>{blog.title} | Explore Bangladesh</title>
        <meta name="description" content={blog.excerpt} />
      </Helmet>
      <div className="blog-detail-container">
        <img
          src={importImages[blog.image]}
          alt={blog.title}
          className="detail-image"
        />
        <h2 className="detail-title">{blog.title}</h2>
        <p className="detail-content">{blog.content}</p>



        <div className="more-img-box">
          <h3><FaImages style={{ marginRight: '10px' }} /> More Pictures</h3>
          <Slider {...sliderSettings}>
            {blog.moreImages?.map((imgName, index) => (
              <div key={index}>
                <img
                  src={importImages[imgName]}
                  alt={`More view ${index + 1}`}
                  className="more-img-box-sty"
                />
              </div>
            ))}
          </Slider>
        </div>



        <div className="button-group">
          {blog.locationUrl && (
            <a
              href={blog.locationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="location-box"
            >
              <FaMapMarkerAlt style={{ marginRight: '8px' }} /> View on Google Maps
            </a>
          )}

          <Link to="/" className="back-link"><FaArrowLeft style={{ marginRight: '8px' }} /> Back to Home</Link>
        </div>
      </div>
    </>
  );
};

export default BlogDetail;
