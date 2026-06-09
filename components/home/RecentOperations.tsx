const operations = [
  "Organise LPA seminar for 250 attendees",
  "Create corporate seminar Spotify playlist",
  "Plan New York business trip",
  "Find client birthday gift ideas",
];

export default function RecentOperations() {
  return (
    <div className="mt-9 grid w-full max-w-4xl gap-4 md:grid-cols-4">
      {operations.map((operation, index) => (
        <div
          key={operation}
          className="rounded-3xl border border-seo-stone bg-seo-cream/55 p-5 text-left shadow-[0_18px_50px_rgba(48,67,45,0.08)] backdrop-blur-xl"
        >
          <p className="mb-3 text-[0.62rem] uppercase tracking-[0.28em] text-seo-muted">
            Operation 0{index + 1}
          </p>

          <h3 className="text-sm font-medium leading-6">{operation}</h3>
        </div>
      ))}
    </div>
  );
}