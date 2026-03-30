"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [status, setStatus] = useState<string>("checking…");

  useEffect(() => {
    fetch("/api/health")
      .then((r) => r.json())
      .then((data) => setStatus(data.status ?? JSON.stringify(data)))
      .catch(() => setStatus("unreachable"));
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-3xl font-bold">Testing Monorepo</h1>
      <div className="rounded-xl border border-gray-200 p-6 text-center shadow-sm">
        <p className="text-sm text-gray-500 mb-2">API /health</p>
        <p
          className={`text-xl font-semibold ${
            status === "ok" ? "text-green-600" : "text-red-500"
          }`}
        >
          {status}
        </p>
      </div>
    </main>
  );
}
