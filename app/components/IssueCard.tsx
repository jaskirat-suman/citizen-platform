"use client";

import type { Issue } from "../data/issues";
import { useEffect, useState } from "react";

type IssueCardProps = {
  issue: Issue;
};

export default function IssueCard({ issue }: IssueCardProps) {
  const [supporters, setSupporters] = useState(issue.supporters);
  const [supported, setSupported] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`supported-issue-${issue.id}`);

    if (saved === "true") {
      setSupported(true);
    }
  }, [issue.id]);

  async function handleSupport() {
    if (supported || loading) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`/api/issues/${issue.id}/support`, {
        method: "POST",
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        alert(result.error || "Could not support this issue.");
        return;
      }

      setSupporters(result.issue.supporters);
      setSupported(true);

      localStorage.setItem(`supported-issue-${issue.id}`, "true");
    } catch (error) {
      console.error("Support request failed:", error);
      alert("Could not support this issue.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <article
      className="issue-card"
      style={{
        background: "#fff",
        border: "1px solid #e5e5e5",
        borderRadius: "28px",
        padding: "32px",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
      }}
    >
      <p
        style={{
          fontSize: "13px",
          fontWeight: 600,
          marginBottom: "12px",
        }}
      >
        {issue.category.toUpperCase()}
      </p>

      <h2
        style={{
          fontSize: "32px",
          letterSpacing: "-0.03em",
          margin: "0 0 16px",
        }}
      >
        <a
          href={`/issues/${issue.id}`}
          style={{
            color: "#111",
            textDecoration: "none",
          }}
        >
          {issue.title}
        </a>
      </h2>

      <p
        style={{
          color: "#555",
          lineHeight: 1.6,
          maxWidth: "700px",
        }}
      >
        {issue.description}
      </p>

      <p
        style={{
          marginTop: "24px",
          color: "#666",
          fontSize: "14px",
        }}
      >
        📍 {issue.locality}, {issue.city}, {issue.district},{" "}
        {issue.state}
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginTop: "24px",
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            color: "#666",
            fontSize: "14px",
          }}
        >
          {supporters}{" "}
          {supporters === 1 ? "person" : "people"} support this issue
        </span>

        <button
          type="button"
          onClick={handleSupport}
          disabled={supported || loading}
          aria-pressed={supported}
          style={{
            background: supported ? "#e5e5e5" : "#111",
            color: supported ? "#111" : "#fff",
            border: "1px solid #111",
            borderRadius: "999px",
            padding: "14px 22px",
            fontWeight: 600,
            cursor: supported || loading ? "default" : "pointer",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading
            ? "Supporting..."
            : supported
              ? "Supported ✓"
              : "Support Issue"}
        </button>
      </div>
    </article>
  );
}