export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-6 animate-pulse">
      <div className="h-8 w-48 bg-slate-200 dark:bg-slate-700 rounded-lg" />
      <div className="h-4 w-96 bg-slate-200 dark:bg-slate-700 rounded-lg mb-8" />
      
      <div className="grid gap-6 md:grid-cols-3">
        <div className="h-32 bg-slate-200 dark:bg-slate-700 rounded-2xl" />
        <div className="h-32 bg-slate-200 dark:bg-slate-700 rounded-2xl" />
        <div className="h-32 bg-slate-200 dark:bg-slate-700 rounded-2xl" />
      </div>

      <div className="h-64 bg-slate-200 dark:bg-slate-700 rounded-2xl mt-8" />
    </div>
  );
}
