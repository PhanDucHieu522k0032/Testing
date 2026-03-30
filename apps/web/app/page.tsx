"use client";

import { useEffect, useState } from "react";

type HealthResponse = { status: string; service: string };

export default function Home() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/health")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<HealthResponse>;
      })
      .then(setHealth)
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : String(err));
      });
  }, []);

  return (
    <div className="font-sans min-h-screen flex flex-col items-center justify-center p-8 gap-8">
      <h1 className="text-3xl font-bold">CRM Dashboard</h1>

      <div className="rounded-xl border border-black/[.08] dark:border-white/[.145] p-6 w-full max-w-sm">
        <h2 className="text-lg font-semibold mb-3">Backend Status</h2>
        {health ? (
          <p className="text-green-600 dark:text-green-400">
            ✅ <strong>{health.service}</strong> — {health.status}
          </p>
        ) : error ? (
          <p className="text-red-600 dark:text-red-400">
            ❌ Could not reach API: {error}
          </p>
        ) : (
          <p className="text-gray-500">Checking…</p>
        )}
      </div>

      <p className="text-sm text-gray-500">
        API:{" "}
        <a
          href="/api/health"
          className="underline hover:no-underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          /api/health
        </a>
      </p>
    </div>
  );
}
