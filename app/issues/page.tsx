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
    const categoryCounts = {
  "Roads & Transport": issues.filter(
    (issue) => issue.category === "Roads & Transport"
  ).length,
  "Water & Sanitation": issues.filter(
    (issue) => issue.category === "Water & Sanitation"
  ).length,
  Electricity: issues.filter(
    (issue) => issue.category === "Electricity"
  ).length,
  Healthcare: issues.filter(
    (issue) => issue.category === "Healthcare"
  ).length,
  Education: issues.filter(
    (issue) => issue.category === "Education"
  ).length,
  Environment: issues.filter(
    (issue) => issue.category === "Environment"
  ).length,
  Others: issues.filter(
    (issue) => issue.category === "Others"
  ).length,
};

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
  "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "16px",
            marginTop: "64px",
          }}
        >
          <a
  className="issue-card"
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
        <div
  style={{
    marginTop: "28px",
    paddingTop: "16px",
    borderTop: "1px solid #eeeeee",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: "14px",
    fontWeight: 700,
    color: "#555",
  }}
>
  <span>
    {categoryCounts["Roads & Transport"]}{" "}
    {categoryCounts["Roads & Transport"] === 1
      ? "issue"
      : "issues"}
  </span>

  <span
    style={{
      fontSize: "18px",
      color: "#111",
    }}
  >
    →
  </span>
</div>
          </a>

          <a
  className="issue-card"
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
            <div
  style={{
    marginTop: "28px",
    paddingTop: "16px",
    borderTop: "1px solid #eeeeee",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: "14px",
    fontWeight: 700,
    color: "#555",
  }}
>
  <span>
    {categoryCounts["Water & Sanitation"]}{" "}
    {categoryCounts["Water & Sanitation"] === 1
      ? "issue"
      : "issues"}
  </span>

  <span
    style={{
      fontSize: "18px",
      color: "#111",
    }}
  >
    →
  </span>
</div>
          </a>

          <a
  className="issue-card"
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
           <div
  style={{
    marginTop: "28px",
    paddingTop: "16px",
    borderTop: "1px solid #eeeeee",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: "14px",
    fontWeight: 700,
    color: "#555",
  }}
>
  <span>
    {categoryCounts.Electricity}{" "}
    {categoryCounts.Electricity === 1 ? "issue" : "issues"}
  </span>

  <span
    style={{
      fontSize: "18px",
      color: "#111",
    }}
  >
    →
  </span>
</div>
          </a>

        <a
  className="issue-card"
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
            <div
  style={{
    marginTop: "28px",
    paddingTop: "16px",
    borderTop: "1px solid #eeeeee",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: "14px",
    fontWeight: 700,
    color: "#555",
  }}
>
  <span>
    {categoryCounts.Healthcare}{" "}
    {categoryCounts.Healthcare === 1 ? "issue" : "issues"}
  </span>

  <span
    style={{
      fontSize: "18px",
      color: "#111",
    }}
  >
    →
  </span>
</div>
          </a>

          <a
  className="issue-card"
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
            <div
  style={{
    marginTop: "28px",
    paddingTop: "16px",
    borderTop: "1px solid #eeeeee",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: "14px",
    fontWeight: 700,
    color: "#555",
  }}
>
  <span>
    {categoryCounts.Education}{" "}
    {categoryCounts.Education === 1 ? "issue" : "issues"}
  </span>

  <span
    style={{
      fontSize: "18px",
      color: "#111",
    }}
  >
    →
  </span>
</div>
          </a>

          <a
  className="issue-card"
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
            <div
  style={{
    marginTop: "28px",
    paddingTop: "16px",
    borderTop: "1px solid #eeeeee",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: "14px",
    fontWeight: 700,
    color: "#555",
  }}
>
  <span>
    {categoryCounts.Environment}{" "}
    {categoryCounts.Environment === 1 ? "issue" : "issues"}
  </span>

  <span
    style={{
      fontSize: "18px",
      color: "#111",
    }}
  >
    →
  </span>
</div>
          </a>
<a
  className="issue-card"
  href="/issues/others"
  style={{
    ...categoryStyle,
    display: "block",
    color: "#111",
    textDecoration: "none",
  }}
>
  <h2>Others</h2>
  <p>
    Civic problems that do not fit into the other categories.
  </p>
  <div
  style={{
    marginTop: "28px",
    paddingTop: "16px",
    borderTop: "1px solid #eeeeee",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: "14px",
    fontWeight: 700,
    color: "#555",
  }}
>
  <span>
    {categoryCounts.Others}{" "}
    {categoryCounts.Others === 1 ? "issue" : "issues"}
  </span>

  <span
    style={{
      fontSize: "18px",
      color: "#111",
    }}
  >
    →
  </span>
</div>
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