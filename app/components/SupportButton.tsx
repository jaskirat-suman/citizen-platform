"use client";
import { useEffect, useState } from "react";

type SupportButtonProps = {
  issueId: number;
  supporters: number;
};

export default function SupportButton({
  issueId,
  supporters,
}: SupportButtonProps) {
  const [count, setCount] = useState(supporters);
  const [supported, setSupported] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alreadySupported, setAlreadySupported] = useState(false);
  useEffect(() => {
  const saved = localStorage.getItem(`supported-issue-${issueId}`);

  if (saved === "true") {
    setAlreadySupported(true);
    setSupported(true);
  }
}, [issueId]);

  async function handleSupport() {
   if (supported || alreadySupported || loading) {
  return;
}

    setLoading(true);

    try {
      const response = await fetch(
        `/api/issues/${issueId}/support`,
        {
          method: "POST",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        alert(result.error || "Could not support this issue.");
        return;
      }

      setCount(result.issue.supporters);
setSupported(true);
setAlreadySupported(true);
localStorage.setItem(`supported-issue-${issueId}`, "true");
    } catch (error) {
      console.error("Support request failed:", error);
      alert("Could not support this issue.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "20px",
        flexWrap: "wrap",
      }}
    >
      <p
        style={{
          margin: 0,
          color: "#555",
        }}
      >
        {count} {count === 1 ? "person" : "people"} support this issue
      </p>

      <button
        type="button"
        onClick={handleSupport}
       disabled={supported || alreadySupported || loading}
        style={{
          background: supported ? "#e5e5e5" : "#111",
          color: supported ? "#111" : "#fff",
          border: "none",
          borderRadius: "999px",
          padding: "16px 28px",
          fontWeight: 600,
          fontSize: "15px",
          cursor:
            supported || loading ? "default" : "pointer",
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading
  ? "Supporting..."
  : supported || alreadySupported
    ? "Supported ✓"
    : "Support This Issue"}
      </button>
    </div>
  );
}
