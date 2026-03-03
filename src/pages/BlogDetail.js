import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Slider from "react-slick";
import { FaMapMarkerAlt, FaArrowLeft, FaImages, FaClock, FaTag, FaChevronLeft } from "react-icons/fa";
import blogData from "../data/posts.json";
import "./BlogDetail.css";

import importImages from "../utils/imageLoader";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const blog = blogData.find((b) => b.id === parseInt(id));
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${(totalScroll / windowHeight) * 100}%`;
      setScrollProgress(scroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!blog) {
    return <div className="not-found"><h2>Blog not found!</h2></div>;
  }
  const wordsPerMinute = 200;
  const wordCount = blog.content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);

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
  };

  return (
    <>
      <Helmet>
        <title>{blog.title} | Explore Bangladesh</title>
        <meta name="description" content={blog.excerpt} />
      </Helmet>

      <div className="progress-container">
        <div className="progress-bar" style={{ width: scrollProgress }}></div>
      </div>


      <button className="floating-back" onClick={() => navigate(-1)} title="Go Back">
        <FaChevronLeft />
      </button>

      <div className="blog-page">
        <header className="blog-hero">
          <div className="hero-bg-wrapper">
            <img src={importImages[blog.image]} alt={blog.title} className="hero-bg-img" />
            <div className="hero-overlay"></div>
          </div>
          <div className="hero-content">
            <div className="hero-badges">
              <span className="badge category"><FaTag /> {blog.category}</span>
              <span className="badge reading-time"><FaClock /> {readingTime} min read</span>
            </div>
            <h1 className="hero-title">{blog.title}</h1>
            <p className="hero-excerpt">{blog.excerpt}</p>
          </div>
        </header>

        <article className="blog-container">
          <div className="blog-body">
            <div className="detail-content">
              {blog.content.split('\n').map((paragraph, index) => (
                <p key={index} className={index === 0 ? "first-para" : ""}>
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="more-img-box">
              <h3 className="section-title">
                <FaImages className="icon-mar" /> Visual Journey
              </h3>
              <div className="slider-wrapper">
                <Slider {...sliderSettings}>
                  {blog.moreImages?.map((imgName, index) => (
                    <div key={index} className="slide-item">
                      <img
                        src={importImages[imgName]}
                        alt={`View ${index + 1}`}
                        className="slider-img"
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>

            <div className="detail-footer">
              <div className="button-group">
                {blog.locationUrl && (
                  <a
                    href={blog.locationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-location"
                  >
                    <FaMapMarkerAlt /> Explore on Maps
                  </a>
                )}
                <Link to="/" className="btn btn-home">
                  <FaArrowLeft /> View More Destinations
                </Link>
              </div>
            </div>
          </div>
        </article>
      </div>
    </>
  );
};

export default BlogDetail;
