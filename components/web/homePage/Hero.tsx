// app/components/Hero.tsx  (or components/Hero.tsx for pages router)
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#faf7f2]">
      <Image
        src="/images/hero-bg.jpg"
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="pointer-events-none object-cover opacity-40 mix-blend-multiply"
      />

      <div className="relative mx-auto max-w-4xl px-6 pt-28 pb-24 text-center sm:pt-36 sm:pb-32 lg:pt-44 lg:pb-40">
        <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-[#ebe4d8] bg-white/70 px-4 py-1.5 text-xs font-medium text-neutral-500 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-[#b8623a]" />
          New essays every week
        </div>

        <h1 className="animate-fade-up [animation-delay:150ms] mt-8 font-serif text-5xl font-medium leading-[1.05] text-neutral-900 sm:text-6xl lg:text-7xl">
          Discover Stories,
          <br />
          <span className="italic text-[#b8623a]">Ideas</span> &amp; Insights
        </h1>

        <p className="animate-fade-up [animation-delay:300ms] mx-auto mt-6 max-w-xl text-base text-neutral-500 sm:text-lg">
          A modern journal for curious minds — thoughtful writing on technology,
          craft, and the quiet moments in between.
        </p>

        <div className="animate-fade-up [animation-delay:450ms] mt-10 flex items-center justify-center gap-4">
          <Link
            href="#featured"
            className="group inline-flex h-12 items-center gap-1 rounded-full bg-[#b8623a] px-7 text-base font-medium text-white shadow-[0_12px_40px_-12px_rgba(184,98,58,0.45)] transition-all hover:-translate-y-0.5 hover:bg-[#a4552f]"
          >
            Start Reading
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="#featured"
            className="story-link text-sm font-medium text-neutral-900"
          >
            Browse essays
          </Link>
        </div>
      </div>
    </section>
  );
}
