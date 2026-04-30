"use client";

import { useState } from "react";
import BlogCard, { type Post } from "./BlogCard";

const latest: Post[] = [
  {
    id: 4,
    title: "Wandering the Dolomites in Late Spring",
    excerpt:
      "Misty trails, alpine villages, and the quiet thrill of being a little bit lost.",
    author: "Sofia Marlow",
    date: "Apr 15, 2026",
    category: "Travel",
    image: "/images/blog-4.jpg",
  },
  {
    id: 5,
    title: "Writing Code That Future-You Will Thank You For",
    excerpt:
      "Naming, structure, and the small habits that compound into maintainable systems.",
    author: "Daniel Reeve",
    date: "Apr 12, 2026",
    category: "Programming",
    image: "/images/blog-5.jpg",
  },
  {
    id: 6,
    title: "The Morning Pages Experiment",
    excerpt:
      "Three weeks of stream-of-consciousness writing — and what it taught me about clarity.",
    author: "Iris Bennett",
    date: "Apr 09, 2026",
    category: "Lifestyle",
    image: "/images/blog-6.jpg",
  },
];

const more: Post[] = [
  {
    id: 7,
    title: "The Quiet Revolution of Slow Software",
    excerpt:
      "Why thoughtful, deliberate design is winning over speed-obsessed development cycles.",
    author: "Elena Park",
    date: "Apr 24, 2026",
    category: "Tech",
    image: "/images/blog-1.jpg",
  },
  {
    id: 8,
    title: "Beyond the Prompt: Designing With AI as a Co-author",
    excerpt:
      "How creators are blending intuition and intelligence to craft experiences.",
    author: "Marcus Lin",
    date: "Apr 21, 2026",
    category: "AI",
    image: "/images/blog-2.jpg",
  },
  {
    id: 9,
    title: "A Field Guide to Reading More in a Noisy World",
    excerpt:
      "Small rituals, gentle environments, and the lost art of finishing what you started.",
    author: "Aria Chen",
    date: "Apr 18, 2026",
    category: "Lifestyle",
    image: "/images/blog-3.jpg",
  },
];

export default function Latest() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? [...latest, ...more] : latest;

  return (
    <section id="latest" className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
      <div className="mb-12">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b8623a]">
          Latest
        </p>
        <h2 className="mt-3 font-serif text-3xl font-medium text-neutral-900 sm:text-4xl">
          Fresh from the journal
        </h2>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((post, i) => (
          <BlogCard key={`${post.id}-${i}`} post={post} delay={i} />
        ))}
      </div>

      <div className="mt-14 flex justify-center">
        <button
          onClick={() => setShowAll((s) => !s)}
          className="h-12 rounded-full border border-[#ebe4d8] bg-white px-8 text-sm font-medium text-neutral-900 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all hover:-translate-y-0.5 hover:border-[#b8623a] hover:text-[#b8623a]"
        >
          {showAll ? "Show less" : "Load more"}
        </button>
      </div>
    </section>
  );
}
