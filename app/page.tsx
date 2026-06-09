export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f4f1e8] text-[#1d241c]">
      <div className="moss moss-one" />
      <div className="moss moss-two" />
      <div className="moss moss-three" />
      <div className="grain" />

      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
        <nav className="absolute left-8 top-8 right-8 flex items-center justify-between">
          <div className="tracking-[0.6em] text-sm font-semibold">SEO</div>
          <div className="text-xs italic text-[#45513e]">
            Smart Executive Operator
          </div>
        </nav>

        <div className="mb-10 text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.45em] text-[#66715f]">
            Autonomous Chief of Staff
          </p>

          <h1 className="max-w-4xl text-5xl font-medium leading-tight tracking-tight md:text-7xl">
            Delegate the mission.
            <br />
            Let SEO think, plan, and execute.
          </h1>
        </div>

        <div className="mascot-stage">
          <div className="thinking-ring ring-one" />
          <div className="thinking-ring ring-two" />

          <div className="mascot">
            <div className="mascot-head">
              <div className="mascot-eye left-eye" />
              <div className="mascot-eye right-eye" />
              <div className="mascot-glow" />
            </div>

            <div className="mascot-body" />
            <div className="mascot-shadow" />
          </div>

          <div className="thought-dot dot-one" />
          <div className="thought-dot dot-two" />
          <div className="thought-dot dot-three" />
        </div>

        <div className="mt-10 w-full max-w-2xl rounded-[2rem] border border-[#d9d5c9] bg-[#fffdf6]/70 p-3 shadow-[0_20px_80px_rgba(36,45,30,0.12)] backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <input
              className="w-full bg-transparent px-5 py-4 text-sm outline-none placeholder:text-[#8a927f]"
              placeholder="Give SEO a mission... e.g. Organise an LPA seminar for 250 pax under $10,000"
            />

            <button className="rounded-full bg-[#28351f] px-6 py-4 text-sm text-[#f4f1e8] transition hover:bg-[#3f522f]">
              Start
            </button>
          </div>
        </div>

        <div className="mt-8 grid w-full max-w-4xl gap-4 md:grid-cols-3">
          <div className="soft-card">
            <p className="card-label">Mission</p>
            <h3>Seminar Planning</h3>
          </div>

          <div className="soft-card">
            <p className="card-label">Agent</p>
            <h3>Researching with Exa</h3>
          </div>

          <div className="soft-card">
            <p className="card-label">Status</p>
            <h3>Awaiting instruction</h3>
          </div>
        </div>

        <footer className="absolute bottom-8 text-xs text-[#6f7768]">
          Privacy-first agentic assistant for executives.
        </footer>
      </section>
    </main>
  );
}