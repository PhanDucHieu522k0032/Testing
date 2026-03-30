"use client";

import { useEffect, useState } from "react";

type HealthData = {
  status: string;
  version: string;
};

export default function HealthStatus() {
  const [data, setData] = useState<HealthData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/health")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<HealthData>;
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Unknown error");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-6 bg-white dark:bg-gray-800">
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Checking backend status…
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 dark:border-red-800 p-6 bg-red-50 dark:bg-red-950">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🔴</span>
          <div>
            <p className="font-semibold text-red-800 dark:text-red-200">
              Backend unreachable
            </p>
            <p className="text-sm text-red-600 dark:text-red-400 mt-1">
              {error}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Make sure the API is running:{" "}
              <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">
                uvicorn app.main:app --reload
              </code>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-green-200 dark:border-green-800 p-6 bg-green-50 dark:bg-green-950">
      <div className="flex items-center gap-3">
        <span className="text-2xl">🟢</span>
        <div>
          <p className="font-semibold text-green-800 dark:text-green-200">
            Backend is healthy
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            Status:{" "}
            <span className="font-mono font-medium">{data?.status}</span>
            {" · "}
            Version:{" "}
            <span className="font-mono font-medium">{data?.version}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
