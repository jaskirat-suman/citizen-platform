import Header from "../components/Header";
import LocationFilters from "../components/LocationFilters";
import { db } from "../lib/db";

const categoryStyle = {
  background: "#ffffff",
  border: "1px solid #e5e5e5",
  borderRadius: "24px",
  padding: "28px",
  minHeight: "180px",
};

export default async function IssuesPage() {
  const issues = await db.orm.public.Issue
    .select(
      "id",
      "title",
      "category",
      "description",
      "country",
      "state",
      "district",
      "city",
      "locality",
      "supporters",
      "comments",
      "status"
    )
    .all();

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f5f7",
        padding: "140px 32px 80px",
      }}
    >
      <Header />

      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <p
          style={{
            fontSize: "14px",
            fontWeight: 600,
            marginBottom: "20px",
          }}
        >
          EXPLORE
        </p>

        <h1
          style={{
            fontSize: "clamp(48px, 7vw, 80px)",
            lineHeight: 1,
            letterSpacing: "-0.05em",
            margin: "0 0 24px",
          }}
        >
          Issues that
          <br />
          matter.
        </h1>

        <p
          style={{
            fontSize: "20px",
            lineHeight: 1.5,
            color: "#555",
            maxWidth: "650px",
          }}
        >
          Discover problems reported by people in communities
          across the country.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "16px",
            marginTop: "64px",
          }}
        >
          <a
            href="/issues/roads-transport"
            style={{
              ...categoryStyle,
              display: "block",
              color: "#111",
              textDecoration: "none",
            }}
          >
            <h2>Roads & Transport</h2>
            <p>
              Potholes, roads, traffic and public transportation.
            </p>
          </a>

          <a
            href="/issues/water-sanitation"
            style={{
              ...categoryStyle,
              display: "block",
              color: "#111",
              textDecoration: "none",
            }}
          >
            <h2>Water & Sanitation</h2>
            <p>
              Drinking water, drainage, sewage and waste.
            </p>
          </a>

          <a
            href="/issues/electricity"
            style={{
              ...categoryStyle,
              display: "block",
              color: "#111",
              textDecoration: "none",
            }}
          >
            <h2>Electricity</h2>
            <p>
              Power supply, streetlights and electrical infrastructure.
            </p>
          </a>

          <a
            href="/issues/healthcare"
            style={{
              ...categoryStyle,
              display: "block",
              color: "#111",
              textDecoration: "none",
            }}
          >
            <h2>Healthcare</h2>
            <p>
              Hospitals, clinics and access to healthcare.
            </p>
          </a>

          <a
            href="/issues/education"
            style={{
              ...categoryStyle,
              display: "block",
              color: "#111",
              textDecoration: "none",
            }}
          >
            <h2>Education</h2>
            <p>
              Schools, facilities and education services.
            </p>
          </a>

          <a
            href="/issues/environment"
            style={{
              ...categoryStyle,
              display: "block",
              color: "#111",
              textDecoration: "none",
            }}
          >
            <h2>Environment</h2>
            <p>
              Pollution, green spaces and environmental problems.
            </p>
          </a>
        </div>

        <section style={{ marginTop: "80px" }}>
          <p
            style={{
              fontSize: "14px",
              fontWeight: 600,
              marginBottom: "12px",
            }}
          >
            FIND LOCAL ISSUES
          </p>

          <h2
            style={{
              fontSize: "36px",
              letterSpacing: "-0.03em",
              margin: "0 0 12px",
            }}
          >
            Start with your location.
          </h2>

          <p
            style={{
              color: "#555",
              maxWidth: "600px",
              lineHeight: 1.5,
              marginBottom: "24px",
            }}
          >
            Choose a state, district, city, or local area to
            discover issues affecting your community.
          </p>

          <LocationFilters issues={issues} />
        </section>
      </section>
    </main>
  );
}