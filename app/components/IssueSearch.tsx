"use client";

import { useMemo, useState } from "react";

type Issue = {
  id: number;
  title: string;
  category: string;
  description: string;
  state: string;
  district: string;
  city: string;
  locality: string;
};

type IssueSearchProps = {
  issues: Issue[];
};

export default function IssueSearch({
  issues,
}: IssueSearchProps) {
  const [search, setSearch] = useState("");

  const filteredIssues = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return [];
    }

    return issues.filter((issue) =>
      [
        issue.title,
        issue.description,
        issue.category,
        issue.state,
        issue.district,
        issue.city,
        issue.locality,
      ]
        .filter(Boolean)
        .some((value) =>
          value.toLowerCase().includes(query)
        )
    );
  }, [issues, search]);

  return (
    <div style={{ marginTop: "40px" }}>
      <input
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search issues..."
        aria-label="Search issues"
        style={{
          width: "100%",
          padding: "18px 20px",
          border: "1px solid #e5e5e5",
          borderRadius: "18px",
          background: "#fff",
          color: "#111",
          fontSize: "16px",
          outline: "none",
        }}
      />

      {search.trim() && (
        <>
          <p
            style={{
              marginTop: "14px",
              color: "#777",
              fontSize: "14px",
            }}
          >
            {filteredIssues.length}{" "}
            {filteredIssues.length === 1 ? "issue" : "issues"} found
          </p>

          {filteredIssues.length > 0 && (
            <div
              style={{
                display: "grid",
                gap: "20px",
                marginTop: "24px",
              }}
            >
              {filteredIssues.map((issue) => (
                <article
                  key={issue.id}
                  style={{
                    background: "#fff",
                    border: "1px solid #e5e5e5",
                    borderRadius: "24px",
                    padding: "24px",
                  }}
                >
                  <p
                    style={{
                      margin: "0 0 8px",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#777",
                    }}
                  >
                    {issue.category.toUpperCase()}
                  </p>

                  <h2
                    style={{
                      margin: "0 0 10px",
                      fontSize: "24px",
                      letterSpacing: "-0.02em",
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
                      margin: 0,
                      color: "#555",
                      lineHeight: 1.6,
                    }}
                  >
                    {issue.description}
                  </p>

                  <p
                    style={{
                      margin: "16px 0 0",
                      color: "#777",
                      fontSize: "14px",
                    }}
                  >
                    📍{" "}
                    {[
                      issue.locality,
                      issue.city,
                      issue.district,
                      issue.state,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                </article>
              ))}
            </div>
          )}

          {filteredIssues.length === 0 && (
            <div
              style={{
                marginTop: "24px",
                padding: "28px",
                background: "#f5f5f7",
                borderRadius: "24px",
                color: "#666",
              }}
            >
              No issues match your search.
            </div>
          )}
        </>
      )}
    </div>
  );
}