type TopNavProps = {
  label?: string;
};

export default function TopNav({ label = "Operations" }: TopNavProps) {
  return (
    <nav className="relative z-20 flex items-center justify-between px-6 py-6 md:px-10">
      <div className="text-sm font-semibold tracking-[0.7em]">SEO</div>

      <div className="hidden items-center gap-6 text-sm text-seo-muted md:flex">
        <span>{label}</span>
        <span>Workspace</span>
        <span>History</span>
        <span>Settings</span>
      </div>
    </nav>
  );
}