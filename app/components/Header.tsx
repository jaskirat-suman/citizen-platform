"use client";

import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: "20px 32px",
      }}
    >
      <nav
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "14px 18px",
          background: "rgba(255, 255, 255, 0.75)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(0, 0, 0, 0.08)",
          borderRadius: "999px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <a
            href="/"
            style={{
              color: "#111",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: "18px",
            }}
          >
            Citizen Platform
          </a>

          <div className="desktop-nav">
            <a href="/" style={linkStyle}>
              Home
            </a>

            <a href="/issues" style={linkStyle}>
              Explore
            </a>

            <a href="/report" style={linkStyle}>
              Report
            </a>
          </div>

          <button
            className="mobile-menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            style={{
              display: "none",
              background: "transparent",
              border: "none",
              fontSize: "24px",
            }}
          >
            {menuOpen ? "×" : "☰"}
          </button>
        </div>

        {menuOpen && (
          <div className="mobile-nav">
            <a href="/" style={mobileLinkStyle}>
              Home
            </a>

            <a href="/issues" style={mobileLinkStyle}>
              Explore
            </a>

            <a href="/report" style={mobileLinkStyle}>
              Report
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}

const linkStyle = {
  color: "#444",
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: 500,
};

const mobileLinkStyle = {
  display: "block",
  color: "#111",
  textDecoration: "none",
  fontSize: "16px",
  fontWeight: 500,
  padding: "14px 4px",
};