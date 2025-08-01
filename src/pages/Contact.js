import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    inquiryType: "general",
    subscribe: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      inquiryType: "general",
      subscribe: false,
    });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "700px",
        margin: "2rem auto",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Contact Us</h1>

      {submitted && (
        <p
          style={{
            color: "green",
            backgroundColor: "#d4edda",
            border: "1px solid #c3e6cb",
            padding: "10px",
            borderRadius: "5px",
            marginBottom: "1.5rem",
            textAlign: "center",
            fontWeight: "600",
          }}
        >
          Thank you for your message!
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <h3>Personal Info</h3>

        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Your full name"
          style={inputStyle}
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="example@example.com"
          style={inputStyle}
        />

        <label>Phone:</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+8801XXXXXXXXX"
          style={inputStyle}
        />

        <label>Subject:</label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Subject of your message"
          style={inputStyle}
        />

        <label>Type of Inquiry:</label>
        <select
          name="inquiryType"
          value={formData.inquiryType}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="general">General Inquiry</option>
          <option value="feedback">Feedback</option>
          <option value="suggestion">Travel Suggestion</option>
          <option value="issue">Report an Issue</option>
        </select>

        <label>Message:</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows="5"
          placeholder="Write your message here..."
          style={{
            ...inputStyle,
            resize: "vertical",
            marginBottom: "1rem",
          }}
        />

        <label style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
          <input
            type="checkbox"
            name="subscribe"
            checked={formData.subscribe}
            onChange={handleChange}
            style={{ marginRight: "10px" }}
          />
          Subscribe to newsletter
        </label>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#2d89e5",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "1.1rem",
            fontWeight: "600",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#1b5fbd")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#2d89e5")}
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "1.2rem",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "1rem",
  boxSizing: "border-box",
};
