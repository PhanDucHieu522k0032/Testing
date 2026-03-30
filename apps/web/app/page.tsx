"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [health, setHealth] = useState<string>("checking…");

  useEffect(() => {
    fetch("/api/health")
      .then((r) => r.json())
      .then((data) => setHealth(JSON.stringify(data)))
      .catch(() => setHealth("❌ API unreachable – is the backend running?"));
  }, []);

  return (
    <main style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1>CRM Starter</h1>
      <p>
        API health: <strong>{health}</strong>
      </p>
      <hr />
      <ul>
        <li>
          Backend docs:{" "}
          <a href="http://localhost:8000/docs" target="_blank" rel="noreferrer">
            http://localhost:8000/docs
          </a>
        </li>
        <li>
          Frontend:{" "}
          <a href="http://localhost:3000" target="_blank" rel="noreferrer">
            http://localhost:3000
          </a>
        </li>
      </ul>
    </main>
  );
}
