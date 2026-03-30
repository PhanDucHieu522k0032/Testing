import HealthStatus from "@/components/HealthStatus";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-8">
      <main className="w-full max-w-lg">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          CRM Dashboard
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          MVP CRM — FastAPI + Next.js
        </p>
        <HealthStatus />
      </main>
    </div>
  );
}
