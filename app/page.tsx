import MoriMascot from "@/components/home/MoriMascot";
import MissionInput from "@/components/home/MissionInput";
import RecentOperations from "@/components/home/RecentOperations";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-seo-paper text-seo-ink">
      <div className="seo-noise" />
      <div className="seo-orb seo-orb-one" />
      <div className="seo-orb seo-orb-two" />
      <div className="seo-orb seo-orb-three" />

      <nav className="relative z-20 flex items-center justify-between px-6 py-6 md:px-10">
        <div className="text-sm font-semibold tracking-[0.7em]">SEO</div>
        <div className="hidden text-sm text-seo-muted md:block">
          Silent Executive Operator
        </div>
      </nav>

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-88px)] max-w-6xl flex-col items-center justify-center px-6 pb-12 text-center">
        <p className="mb-5 text-xs uppercase tracking-[0.45em] text-seo-muted">
          Always working. Never interrupting.
        </p>

        <h1 className="max-w-4xl text-5xl font-medium leading-[1.05] tracking-[-0.04em] md:text-7xl">
          Your quiet executive operator.
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-7 text-seo-muted md:text-lg">
          Delegate operations to SEO. It researches, plans, compares, prepares,
          and waits for approval before sensitive actions.
        </p>

        <MoriMascot />

        <MissionInput />

        <RecentOperations />
      </section>
    </main>
  );
}