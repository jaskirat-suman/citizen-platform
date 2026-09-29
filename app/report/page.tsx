"use client";

import { useState } from "react";
import Header from "../components/Header";

export default function ReportPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [locality, setLocality] = useState("");
  const [description, setDescription] = useState("");

  if (submitted) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#f5f5f7",
          padding: "140px 32px 80px",
        }}
      >
        <Header />

        <section style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div
            style={{
              background: "#fff",
              border: "1px solid #e5e5e5",
              borderRadius: "28px",
              padding: "48px",
            }}
          >
            <p style={{ fontSize: "14px", fontWeight: 600 }}>
              ISSUE RECEIVED
            </p>

            <h1
              style={{
                fontSize: "48px",
                letterSpacing: "-0.04em",
                margin: "16px 0",
              }}
            >
              Thank you for speaking up.
            </h1>

            <p style={{ color: "#666", fontSize: "18px" }}>
              Your issue has been submitted to the community.
            </p>

            <div
              style={{
                marginTop: "32px",
                padding: "24px",
                background: "#f5f5f7",
                borderRadius: "20px",
              }}
            >
              <strong>{title}</strong>
              <p>Category: {category}</p>
              <p>
                Location: {locality}, {city}, {district}, {state}
              </p>
              <p>{description}</p>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f5f7",
        padding: "140px 32px 80px",
      }}
    >
      <Header />

      <section style={{ maxWidth: "900px", margin: "0 auto" }}>
        <p style={{ fontSize: "14px", fontWeight: 600 }}>
          REPORT AN ISSUE
        </p>

        <h1
          style={{
            fontSize: "clamp(48px, 7vw, 80px)",
            lineHeight: 1,
            letterSpacing: "-0.05em",
            margin: "20px 0 24px",
          }}
        >
          Speak up about
          <br />
          your community.
        </h1>

        <p
          style={{
            fontSize: "20px",
            lineHeight: 1.5,
            color: "#555",
            maxWidth: "650px",
            marginBottom: "56px",
          }}
        >
          Tell your community about a problem that needs attention.
        </p>

        <form
          onSubmit={async (event) => {
            event.preventDefault();
            setSubmitting(true);

            const newIssue = {
              title,
              category,
              state,
              district,
              city,
              locality,
              description,
            };

           try {
  const response = await fetch("/api/issues", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...newIssue,
      country: "India",
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    alert(result.error || "Could not submit the issue.");
    return;
  }

  console.log("Issue saved:", result.issue);
  setSubmitted(true);
} catch (error) {
  console.error("Issue submission failed:", error);
  alert("Could not connect to the server. Please try again.");
} finally {
  setSubmitting(false);
}
          }}
          style={{
            background: "#fff",
            border: "1px solid #e5e5e5",
            borderRadius: "28px",
            padding: "32px",
          }}
        >
          <label style={labelStyle}>
            Issue title <span style={{ color: "#777" }}>*</span>
          </label>

          <input
            type="text"
            required
            placeholder="e.g. Large potholes on Main Street"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            style={inputStyle}
          />

          <label style={labelStyle}>
            Category <span style={{ color: "#777" }}>*</span>
          </label>

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            required
            style={inputStyle}
          >
            <option value="">Select a category</option>
            <option value="Roads & Transport">Roads & Transport</option>
            <option value="Water & Sanitation">Water & Sanitation</option>
            <option value="Electricity">Electricity</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Education">Education</option>
            <option value="Environment">Environment</option>
            <option value="Others">Others</option>
          </select>

          <label style={labelStyle}>Location</label>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "12px",
              marginBottom: "24px",
            }}
          >
            <input
              placeholder="State"
              required
              value={state}
              onChange={(event) => setState(event.target.value)}
              style={inputStyle}
            />

            <input
              placeholder="District"
              required
              value={district}
              onChange={(event) => setDistrict(event.target.value)}
              style={inputStyle}
            />

            <input
              placeholder="City / Town / Village"
              required
              value={city}
              onChange={(event) => setCity(event.target.value)}
              style={inputStyle}
            />

            <input
              placeholder="Locality / Area"
              required
              value={locality}
              onChange={(event) => setLocality(event.target.value)}
              style={inputStyle}
            />
          </div>

          <label style={labelStyle}>Describe the issue</label>

          <textarea
            required
            maxLength={2000}
            placeholder="Describe what is happening, where it is happening, and how it affects people in the community..."
            rows={6}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            style={{
              ...inputStyle,
              resize: "vertical",
            }}
          />

          <p
            style={{
              margin: "-16px 4px 24px",
              textAlign: "right",
              color: description.length > 1800 ? "#b45309" : "#888",
              fontSize: "12px",
              fontWeight: description.length > 1800 ? 600 : 400,
            }}
          >
            {description.length.toLocaleString()}/2,000
          </p>

          <button
            type="submit"
            disabled={submitting}
            style={{
              background: "#111",
              color: "#fff",
              border: "none",
              borderRadius: "999px",
              padding: "16px 28px",
              fontWeight: 600,
              cursor: submitting ? "default" : "pointer",
              opacity: submitting ? 0.7 : 1,
            }}
          >
            {submitting ? "Submitting..." : "Submit Issue"}
          </button>
        </form>
      </section>
    </main>
  );
}

const labelStyle = {
  display: "block",
  marginBottom: "10px",
  fontSize: "14px",
  fontWeight: 700,
  color: "#222",
};

const inputStyle = {
  width: "100%",
  padding: "17px 18px",
  border: "1px solid #d9d9d9",
  borderRadius: "16px",
  fontSize: "16px",
  marginBottom: "24px",
  background: "#fff",
  color: "#111",
  outline: "none",
};