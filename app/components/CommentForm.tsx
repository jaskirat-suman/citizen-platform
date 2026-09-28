"use client";

import { useState } from "react";

type CommentFormProps = {
  issueId: number;
};

export default function CommentForm({
  issueId,
}: CommentFormProps) {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

  if (!name.trim() || !content.trim()) {
  alert("Please enter your name and a comment.");
  return;
}

if (content.trim().length < 2) {
 setErrorMessage("Comment must be at least 2 characters.");

setTimeout(() => {
  setErrorMessage("");
}, 1900);

  return;
}

    setSubmitting(true);

    try {
      const response = await fetch(
        `/api/issues/${issueId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.trim(),
            content: content.trim(),
          }),
        }
      );

      const result = await response.json();

console.log("COMMENT RESPONSE:", response.status, result);

if (!response.ok) {
  alert(result.error || "Could not post comment.");
  return;
}

setName("");
setContent("");
setShowSuccess(true);

setTimeout(() => {
  setShowSuccess(false);
}, 900);

setTimeout(() => {
  window.location.reload();
}, 1200);
    } catch (error) {
      console.error("Comment request failed:", error);
      alert("Could not post comment.");
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <>
      {errorMessage && (
  <div
    role="alert"
    aria-live="assertive"
    style={{
      position: "fixed",
      top: "28px",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 100,
      display: "flex",
      alignItems: "center",
      gap: "10px",
      padding: "14px 20px",
      background: "#fff",
      color: "#111",
      border: "1px solid #e5e5e5",
      borderRadius: "999px",
      boxShadow: "0 12px 36px rgba(0, 0, 0, 0.18)",
      fontSize: "14px",
      fontWeight: 600,
     animation: errorMessage
  ? "toastIn 0.3s ease-out"
  : "toastOut 0.3s ease-in forwards",
    }}
  >
    <span
      aria-hidden="true"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "22px",
        height: "22px",
        borderRadius: "50%",
        background: "#111",
        color: "#fff",
        fontSize: "13px",
        fontWeight: 800,
      }}
    >
      !
    </span>

    {errorMessage}
  </div>
)}
      {showSuccess && (
  <div
    role="status"
    aria-live="polite"
    style={{
      position: "fixed",
      top: "28px",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 100,
      display: "flex",
      alignItems: "center",
      gap: "10px",
      padding: "14px 20px",
      background: "#111",
      color: "#fff",
      borderRadius: "999px",
      boxShadow: "0 12px 36px rgba(0, 0, 0, 0.22)",
      fontSize: "14px",
      fontWeight: 600,
     animation: showSuccess
  ? "toastIn 0.3s ease-out"
  : "toastOut 0.3s ease-in forwards",
    }}
  >
    <span
      aria-hidden="true"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "22px",
        height: "22px",
        borderRadius: "50%",
        background: "#fff",
        color: "#111",
        fontSize: "13px",
        fontWeight: 800,
      }}
    >
      ✓
    </span>

    Comment posted successfully
  </div>
)}
    <form
      onSubmit={handleSubmit}
      style={{
        marginTop: "32px",
        display: "grid",
        gap: "12px",
      }}
    >
      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        maxLength={80}
        required
       style={{
        boxSizing: "border-box",
display: "block",
  width: "100%",
  padding: "16px 18px",
  borderRadius: "16px",
  border: "1px solid rgba(255,255,255,0.16)",
  background: "rgba(255,255,255,0.96)",
  color: "#111",
  fontSize: "15px",
  outline: "none",
}}
      />

      <textarea
        placeholder="Share your thoughts or an update..."
        value={content}
        onChange={(event) => setContent(event.target.value)}
        maxLength={2000}
        rows={5}
        required
    style={{
        boxSizing: "border-box",
display: "block",
  width: "100%",
  padding: "16px 18px",
  borderRadius: "16px",
  border: "1px solid rgba(255,255,255,0.16)",
  background: "rgba(255,255,255,0.96)",
  color: "#111",
  fontSize: "15px",
  lineHeight: 1.6,
  resize: "vertical",
  minHeight: "130px",
  outline: "none",
}}
      />
  <p
  style={{
    margin: "-4px 4px 0",
    textAlign: "right",
    color: content.length > 1800 ? "#b45309" : "#888",
    fontSize: "12px",
    fontWeight: content.length > 1800 ? 600 : 400,
  }}
>
  {content.length.toLocaleString()}/2,000
</p>

      <button
        type="submit"
        disabled={submitting}
        style={{
  justifySelf: "start",
  background: "#fff",
  color: "#111",
  border: "none",
  borderRadius: "999px",
  padding: "15px 26px",
  fontWeight: 700,
  fontSize: "15px",
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.16)",
  transition: "transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease",
  opacity: submitting ? 0.7 : 1,
}}
      >
        {submitting ? "Posting..." : "Post Comment"}
      </button>
          </form>
    </>
  );
}