"use client";
import type { Issue } from "../data/issues";
import { useState } from "react";

type IssueCardProps = {
  issue: Issue;
};

export default function IssueCard({ issue }: IssueCardProps) {
    const [supported, setSupported] = useState(false);
  return (
    <article className="issue-card"
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
  {issue.supporters + (supported ? 1 : 0)}{" "}
  {issue.supporters + (supported ? 1 : 0) === 1
    ? "person"
    : "people"}{" "}
  support this issue
</span>

      <button
  onClick={() => setSupported(!supported)}
  aria-pressed={supported}
  style={{
    background: supported ? "#fff" : "#111",
    color: supported ? "#111" : "#fff",
    border: "1px solid #111",
    borderRadius: "999px",
    padding: "14px 22px",
    fontWeight: 600,
  }}
>
  {supported ? "Supported" : "Support Issue"}
</button>
      </div>
    </article>
  );
}