import React from "react";
import { useParams, Link } from "react-router-dom";
import Slider from "react-slick"; // Import react-slick
import blogData from "../data/posts.json";
import "./BlogDetail.css";


// Image map for all 20+ images
const importImages = {
  "sundarbans.jpg": require("../assets/images/sundarbans.jpg"),
  "sundarbans1.jpg": require("../assets/images/sundarbans1.jpg"),
  "sundarbans2.jpg": require("../assets/images/sundarbans2.jpg"),
  "sundarbans3.jpg": require("../assets/images/sundarbans3.jpg"),
  "sundarbans4.jpg": require("../assets/images/sundarbans4.jpg"),
  "coxsbazar.jpg": require("../assets/images/coxsbazar.jpg"),
  "coxsbazar1.jpg": require("../assets/images/coxsbazar1.jpg"),
  "coxsbazar2.jpg": require("../assets/images/coxsbazar2.jpg"),
  "coxsbazar3.jpg": require("../assets/images/coxsbazar3.jpg"),
  "coxsbazar4.jpg": require("../assets/images/coxsbazar4.jpg"),
  "srimangal.jpg": require("../assets/images/srimangal.jpg"),
  "srimangal1.jpg": require("../assets/images/srimangal1.jpg"),
  "srimangal2.jpg": require("../assets/images/srimangal2.jpg"),
  "srimangal3.jpg": require("../assets/images/srimangal3.jpg"),
  "srimangal4.jpg": require("../assets/images/srimangal4.jpg"),
  "stmartin.jpg": require("../assets/images/stmartin.jpg"),
  "stmartin1.jpg": require("../assets/images/stmartin1.jpg"),
  "stmartin2.jpg": require("../assets/images/stmartin2.jpg"),
  "stmartin3.jpg": require("../assets/images/stmartin3.jpg"),
  "stmartin4.jpg": require("../assets/images/stmartin4.jpg"),
  "jaflong.jpg": require("../assets/images/jaflong.jpg"),
  "jaflong1.jpg": require("../assets/images/jaflong1.jpg"),
  "jaflong2.jpg": require("../assets/images/jaflong2.jpg"),
  "jaflong3.jpg": require("../assets/images/jaflong3.jpg"),
  "jaflong4.jpg": require("../assets/images/jaflong4.jpg"),
  "tanguarhaor.jpg": require("../assets/images/tanguarhaor.jpg"),
  "tanguarhaor1.jpg": require("../assets/images/tanguarhaor1.jpg"),
  "tanguarhaor2.jpg": require("../assets/images/tanguarhaor2.jpg"),
  "tanguarhaor3.jpg": require("../assets/images/tanguarhaor3.jpg"),
  "tanguarhaor4.jpg": require("../assets/images/tanguarhaor4.jpg"),
  "bandarban.jpg": require("../assets/images/bandarban.jpg"),
  "bandarban1.jpg": require("../assets/images/bandarban1.jpg"),
  "bandarban2.jpg": require("../assets/images/bandarban2.jpg"),
  "bandarban3.jpg": require("../assets/images/bandarban3.jpg"),
  "bandarban4.jpg": require("../assets/images/bandarban4.jpg"),
  "hakalukihaor.jpg": require("../assets/images/hakalukihaor.jpg"),
  "hakalukihaor1.jpg": require("../assets/images/hakalukihaor1.jpg"),
  "hakalukihaor2.jpg": require("../assets/images/hakalukihaor2.jpg"),
  "hakalukihaor3.jpg": require("../assets/images/hakalukihaor3.jpg"),
  "hakalukihaor4.jpg": require("../assets/images/hakalukihaor4.jpg"),
  "kuakataseabeach.jpg": require("../assets/images/kuakataseabeach.jpg"),
  "kuakataseabeach1.jpg": require("../assets/images/kuakataseabeach1.jpg"),
  "kuakataseabeach2.jpg": require("../assets/images/kuakataseabeach2.jpg"),
  "kuakataseabeach3.jpg": require("../assets/images/kuakataseabeach3.jpg"),
  "kuakataseabeach4.jpg": require("../assets/images/kuakataseabeach4.jpg"),
  "rangamati.jpg": require("../assets/images/rangamati.jpg"),
  "rangamati1.jpg": require("../assets/images/rangamati1.jpg"),
  "rangamati2.jpg": require("../assets/images/rangamati2.jpg"),
  "rangamati3.jpg": require("../assets/images/rangamati3.jpg"),
  "rangamati4.jpg": require("../assets/images/rangamati4.jpg"),
  "sadapathor.jpg": require("../assets/images/sadapathor.jpg"),
  "sadapathor1.jpg": require("../assets/images/sadapathor1.jpg"),
  "sadapathor2.jpg": require("../assets/images/sadapathor2.jpg"),
  "sadapathor3.jpg": require("../assets/images/sadapathor3.jpg"),
  "sadapathor4.jpg": require("../assets/images/sadapathor4.jpg"),
  "bagerhatmuseum.jpg": require("../assets/images/bagerhatmuseum.jpg"),
  "bagerhatmuseum1.jpg": require("../assets/images/bagerhatmuseum1.jpg"),
  "bagerhatmuseum2.jpg": require("../assets/images/bagerhatmuseum2.jpg"),
  "bagerhatmuseum3.jpg": require("../assets/images/bagerhatmuseum3.jpg"),
  "bagerhatmuseum4.jpg": require("../assets/images/bagerhatmuseum4.jpg"),
  "fakirlalonshahmazar.jpg": require("../assets/images/fakirlalonshahmazar.jpg"),
  "fakirlalonshahmazar1.jpg": require("../assets/images/fakirlalonshahmazar1.jpg"),
  "fakirlalonshahmazar2.jpg": require("../assets/images/fakirlalonshahmazar2.jpg"),
  "fakirlalonshahmazar3.jpg": require("../assets/images/fakirlalonshahmazar3.jpg"),
  "fakirlalonshahmazar4.jpg": require("../assets/images/fakirlalonshahmazar4.jpg"),
  "hardingebridge.jpg": require("../assets/images/hardingebridge.jpg"),
  "hardingebridge1.jpg": require("../assets/images/hardingebridge1.jpg"),
  "hardingebridge2.jpg": require("../assets/images/hardingebridge2.jpg"),
  "hardingebridge3.jpg": require("../assets/images/hardingebridge3.jpg"),
  "hardingebridge4.jpg": require("../assets/images/hardingebridge4.jpg"),
  "jamtolabeach.jpg": require("../assets/images/jamtolabeach.jpg"),
  "jamtolabeach1.jpg": require("../assets/images/jamtolabeach1.jpg"),
  "jamtolabeach2.jpg": require("../assets/images/jamtolabeach2.jpg"),
  "jamtolabeach3.jpg": require("../assets/images/jamtolabeach3.jpg"),
  "jamtolabeach4.jpg": require("../assets/images/jamtolabeach4.jpg"),
  "kaptailake.jpg": require("../assets/images/kaptailake.jpg"),
  "kaptailake1.jpg": require("../assets/images/kaptailake1.jpg"),
  "kaptailake2.jpg": require("../assets/images/kaptailake2.jpg"),
  "kaptailake3.jpg": require("../assets/images/kaptailake3.jpg"),
  "kaptailake4.jpg": require("../assets/images/kaptailake4.jpg"),
  "khanjahanalitomb.jpg": require("../assets/images/khanjahanalitomb.jpg"),
  "khanjahanalitomb1.jpg": require("../assets/images/khanjahanalitomb1.jpg"),
  "khanjahanalitomb2.jpg": require("../assets/images/khanjahanalitomb2.jpg"),
  "khanjahanalitomb3.jpg": require("../assets/images/khanjahanalitomb3.jpg"),
  "khanjahanalitomb4.jpg": require("../assets/images/khanjahanalitomb4.jpg"),
  "michaelmadhusudanduttamemorialhouse.jpg": require("../assets/images/michaelmadhusudanduttamemorialhouse.jpg"),
  "michaelmadhusudanduttamemorialhouse1.jpg": require("../assets/images/michaelmadhusudanduttamemorialhouse1.jpg"),
  "michaelmadhusudanduttamemorialhouse2.jpg": require("../assets/images/michaelmadhusudanduttamemorialhouse2.jpg"),
  "michaelmadhusudanduttamemorialhouse3.jpg": require("../assets/images/michaelmadhusudanduttamemorialhouse3.jpg"),
  "michaelmadhusudanduttamemorialhouse4.jpg": require("../assets/images/michaelmadhusudanduttamemorialhouse4.jpg"),
  "shaatgambujmosque.jpg": require("../assets/images/shaatgambujmosque.jpg"),
  "shaatgambujmosque1.jpg": require("../assets/images/shaatgambujmosque1.jpg"),
  "shaatgambujmosque2.jpg": require("../assets/images/shaatgambujmosque2.jpg"),
  "shaatgambujmosque3.jpg": require("../assets/images/shaatgambujmosque3.jpg"),
  "shaatgambujmosque4.jpg": require("../assets/images/shaatgambujmosque4.jpg"),
  "shilaidahakuthibari.jpg": require("../assets/images/shilaidahakuthibari.jpg"),
  "shilaidahakuthibari1.jpg": require("../assets/images/shilaidahakuthibari1.jpg"),
  "shilaidahakuthibari2.jpg": require("../assets/images/shilaidahakuthibari2.jpg"),
  "shilaidahakuthibari3.jpg": require("../assets/images/shilaidahakuthibari3.jpg"),
  "shilaidahakuthibari4.jpg": require("../assets/images/shilaidahakuthibari4.jpg"),
};

const BlogDetail = () => {
  const { id } = useParams();
  const blog = blogData.find((b) => b.id === parseInt(id));

  if (!blog) {
    return <h2>Blog not found!</h2>;
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,           // transition speed in ms
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,        // autoplay enabled
    autoplaySpeed: 3000,   // delay between slides
    fade: true,            // fade effect enabled
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
    <div className="blog-detail-container">
      <img
        src={importImages[blog.image]}
        alt={blog.title}
        className="detail-image"
      />
      <h2 className="detail-title">{blog.title}</h2>
      <p className="detail-content">{blog.content}</p>

      {/* 👉 Carousel Section */}
      <div className="more-img-box">
        <h3>More Pictures <span role="img" aria-label="arrow"></span></h3>
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
