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

type LocationFiltersProps = {
  issues: Issue[];
};

export default function LocationFilters({
  issues,
}: LocationFiltersProps) {
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [locality, setLocality] = useState("");

  const [appliedState, setAppliedState] = useState("");
  const [appliedDistrict, setAppliedDistrict] = useState("");
  const [appliedCity, setAppliedCity] = useState("");
  const [appliedLocality, setAppliedLocality] = useState("");

  const [warning, setWarning] = useState("");

  const states = useMemo(
    () =>
      Array.from(
        new Set(
          issues.map((issue) => issue.state).filter(Boolean)
        )
      ).sort(),
    [issues]
  );

  const districts = useMemo(
    () =>
      Array.from(
        new Set(
          issues
            .filter(
              (issue) =>
                !state || issue.state === state
            )
            .map((issue) => issue.district)
            .filter(Boolean)
        )
      ).sort(),
    [issues, state]
  );

  const cities = useMemo(
    () =>
      Array.from(
        new Set(
          issues
            .filter(
              (issue) =>
                (!state || issue.state === state) &&
                (!district || issue.district === district)
            )
            .map((issue) => issue.city)
            .filter(Boolean)
        )
      ).sort(),
    [issues, state, district]
  );

  const localities = useMemo(
    () =>
      Array.from(
        new Set(
          issues
            .filter(
              (issue) =>
                (!state || issue.state === state) &&
                (!district || issue.district === district) &&
                (!city || issue.city === city)
            )
            .map((issue) => issue.locality)
            .filter(Boolean)
        )
      ).sort(),
    [issues, state, district, city]
  );

  const filteredIssues = useMemo(
    () =>
      issues.filter(
        (issue) =>
          (!appliedState ||
            issue.state === appliedState) &&
          (!appliedDistrict ||
            issue.district === appliedDistrict) &&
          (!appliedCity ||
            issue.city === appliedCity) &&
          (!appliedLocality ||
            issue.locality === appliedLocality)
      ),
    [
      issues,
      appliedState,
      appliedDistrict,
      appliedCity,
      appliedLocality,
    ]
  );

  const hasAppliedFilters =
    appliedState ||
    appliedDistrict ||
    appliedCity ||
    appliedLocality;

  function handleStateChange(value: string) {
    setState(value);
    setDistrict("");
    setCity("");
    setLocality("");
    setWarning("");
  }

  function handleDistrictChange(value: string) {
    setDistrict(value);
    setCity("");
    setLocality("");
    setWarning("");
  }

  function handleCityChange(value: string) {
    setCity(value);
    setLocality("");
    setWarning("");
  }

  function handleLocalityChange(value: string) {
    setLocality(value);
    setWarning("");
  }

  function applyFilters() {
    if (!state) {
      setWarning(
        "Please select at least a State before applying filters."
      );
      return;
    }

    setWarning("");

    setAppliedState(state);
    setAppliedDistrict(district);
    setAppliedCity(city);
    setAppliedLocality(locality);
  }

  function clearFilters() {
    setState("");
    setDistrict("");
    setCity("");
    setLocality("");

    setAppliedState("");
    setAppliedDistrict("");
    setAppliedCity("");
    setAppliedLocality("");

    setWarning("");
  }

  return (
    <div>
      {/* FILTER CONTROLS */}

      <div
        style={{
          background: "#111",
          color: "#fff",
          borderRadius: "28px",
          padding: "28px",
        }}
      >
        <p
          style={{
            fontSize: "13px",
            fontWeight: 700,
            margin: "0 0 18px",
            letterSpacing: "0.04em",
            color: "#aaa",
          }}
        >
          LOCATION FILTERS
        </p>

        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <select
            value={state}
            onChange={(event) =>
              handleStateChange(event.target.value)
            }
            style={selectStyle}
          >
            <option value="">Select State</option>

            {states.map((stateName) => (
              <option
                key={stateName}
                value={stateName}
              >
                {stateName}
              </option>
            ))}
          </select>

          <select
            value={district}
            onChange={(event) =>
              handleDistrictChange(event.target.value)
            }
            disabled={!state}
            style={{
              ...selectStyle,
              opacity: state ? 1 : 0.45,
            }}
          >
            <option value="">Select District</option>

            {districts.map((districtName) => (
              <option
                key={districtName}
                value={districtName}
              >
                {districtName}
              </option>
            ))}
          </select>

          <select
            value={city}
            onChange={(event) =>
              handleCityChange(event.target.value)
            }
            disabled={!district}
            style={{
              ...selectStyle,
              opacity: district ? 1 : 0.45,
            }}
          >
            <option value="">Select City</option>

            {cities.map((cityName) => (
              <option
                key={cityName}
                value={cityName}
              >
                {cityName}
              </option>
            ))}
          </select>

          <select
            value={locality}
            onChange={(event) =>
              handleLocalityChange(event.target.value)
            }
            disabled={!city}
            style={{
              ...selectStyle,
              opacity: city ? 1 : 0.45,
            }}
          >
            <option value="">Select Locality</option>

            {localities.map((localityName) => (
              <option
                key={localityName}
                value={localityName}
              >
                {localityName}
              </option>
            ))}
          </select>
        </div>

        {/* BUTTONS */}

        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            marginTop: "20px",
          }}
        >
          <button
            type="button"
            onClick={applyFilters}
            style={{
              background: "#fff",
              color: "#111",
              border: "none",
              borderRadius: "999px",
              padding: "14px 24px",
              fontWeight: 700,
            }}
          >
            Apply Filters →
          </button>

          {hasAppliedFilters && (
            <button
              type="button"
              onClick={clearFilters}
              style={{
                background: "transparent",
                color: "#fff",
                border: "1px solid #777",
                borderRadius: "999px",
                padding: "14px 24px",
                fontWeight: 600,
              }}
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* WARNING */}

        {warning && (
          <div
            style={{
              marginTop: "20px",
              padding: "16px 20px",
              background: "#2a2a2a",
              border: "1px solid #555",
              borderRadius: "16px",
              color: "#fff",
              fontSize: "14px",
              lineHeight: 1.5,
            }}
          >
            {warning}
          </div>
        )}
      </div>

      {/* FILTERED RESULTS */}

      {hasAppliedFilters && (
        <section
          style={{
            marginTop: "48px",
          }}
        >
          <p
            style={{
              fontSize: "13px",
              fontWeight: 700,
              color: "#888",
              margin: "0 0 8px",
              letterSpacing: "0.04em",
            }}
          >
            FILTERED RESULTS
          </p>

          <h3
            style={{
              fontSize: "clamp(30px, 5vw, 42px)",
              letterSpacing: "-0.04em",
              margin: "0 0 12px",
            }}
          >
            {appliedLocality
              ? `Issues in ${appliedLocality}`
              : appliedCity
                ? `Issues in ${appliedCity}`
                : appliedDistrict
                  ? `Issues in ${appliedDistrict}`
                  : `Issues in ${appliedState}`}
          </h3>

          <p
            style={{
              color: "#777",
              fontSize: "14px",
              margin: "0 0 24px",
            }}
          >
            {filteredIssues.length} matching issue
            {filteredIssues.length === 1 ? "" : "s"}
          </p>

          {filteredIssues.length === 0 ? (
            <div
              style={{
                background: "#fff",
                border: "1px solid #e5e5e5",
                borderRadius: "22px",
                padding: "28px",
                color: "#666",
              }}
            >
              No issues match the selected location.
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gap: "16px",
              }}
            >
              {filteredIssues.map((issue) => (
                <a
                onMouseEnter={(event) => {
  event.currentTarget.style.transform =
    "translateY(-4px)";
  event.currentTarget.style.boxShadow =
    "0 12px 30px rgba(0, 0, 0, 0.08)";
}}
onMouseLeave={(event) => {
  event.currentTarget.style.transform =
    "translateY(0)";
  event.currentTarget.style.boxShadow =
    "0 4px 16px rgba(0, 0, 0, 0.04)";
}}
                  key={issue.id}
                  href={`/issues/${issue.id}`}
                  style={{
                    display: "block",
                    background: "#fff",
                    color: "#111",
                    border: "1px solid #e5e5e5",
                    borderRadius: "22px",
                    padding: "24px",
                    textDecoration: "none",
                  boxShadow:
  "0 4px 16px rgba(0, 0, 0, 0.04)",
transition:
  "transform 0.25s ease, box-shadow 0.25s ease",
                  }}
                >
                  <p
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      margin: "0 0 8px",
                      color: "#777",
                    }}
                  >
                    {issue.category.toUpperCase()}
                  </p>

                  <h4
                    style={{
                      fontSize: "24px",
                      margin: "0 0 10px",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {issue.title}
                  </h4>

                  <p
                    style={{
                      color: "#555",
                      lineHeight: 1.5,
                      margin: 0,
                    }}
                  >
                    {issue.description}
                  </p>

                <p
  style={{
    color: "#666",
    fontSize: "14px",
    margin: "18px 0 0",
    paddingTop: "14px",
    borderTop: "1px solid #eeeeee",
  }}
>
                    📍 {issue.locality}, {issue.city},{" "}
                    {issue.district}, {issue.state}
                  </p>

                 <p
  style={{
    margin: "18px 0 0",
    paddingTop: "16px",
    borderTop: "1px solid #eeeeee",
    fontSize: "14px",
    fontWeight: 700,
  }}
>
                    View Issue →
                  </p>
                </a>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}

const selectStyle = {
  background: "#fff",
  color: "#111",
  border: "none",
  borderRadius: "999px",
  padding: "14px 22px",
  fontWeight: 600,
 minWidth: "200px",
flex: "1 1 200px",
};