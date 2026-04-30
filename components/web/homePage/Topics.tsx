import { Cpu, Sparkles, Code2, Coffee, Plane, type LucideIcon } from "lucide-react";

const categories: { name: string; icon: LucideIcon; count: number }[] = [
  { name: "Tech", icon: Cpu, count: 48 },
  { name: "AI", icon: Sparkles, count: 36 },
  { name: "Programming", icon: Code2, count: 52 },
  { name: "Lifestyle", icon: Coffee, count: 27 },
  { name: "Travel", icon: Plane, count: 19 },
];

export default function Topics() {
  return (
    // bg-[#1F1F20]/60
    <section className=" py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[3px] text-[#b8623a] ">
            Topics
          </p>
          <h2 className="mt-3 text-3xl font-medium sm:text-4xl">
            Wander by category
          </h2>
          <p className="mt-3 text-muted-foreground/70">
            From deep technical essays to slow-living reflections — find what
            speaks to you.
          </p>
        </div>

        <div className="-mx-6 overflow-x-auto px-6 pb-2 sm:mx-0 sm:overflow-visible sm:px-0">
          <div className="flex gap-4 sm:grid sm:grid-cols-3 lg:grid-cols-5">
            {categories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.name}
                  style={{ animationDelay: `${i * 80}ms` }}
                  className="group animate-fade-up flex min-w-[180px] flex-col items-start gap-4 rounded-2xl border border-[#2e2e30] bg-white p-6 text-left shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.18)] sm:min-w-0"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#dedef3] text-[#232326] transition-colors group-hover:bg-[#232326] group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900">
                      {cat.name}
                    </h3>
                    <p className="mt-1 text-sm text-neutral-500">
                      {cat.count} articles
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
