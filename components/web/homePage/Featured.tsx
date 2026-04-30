import Link from "next/link";
import BlogCard,{ type Post } from "./BlogCard";


const featured: Post[] = [
  {
    id: 1,
    title: "The Quiet Revolution of Slow Software",
    excerpt:
      "Why thoughtful, deliberate design is winning over speed-obsessed development cycles in modern teams.",
    author: "Elena Park",
    date: "Apr 24, 2026",
    category: "Tech",
    image: "/images/blog-1.jpg",
  },
  {
    id: 2,
    title: "Beyond the Prompt: Designing With AI as a Co-author",
    excerpt:
      "How creators are blending intuition and intelligence to craft experiences neither could build alone.",
    author: "Marcus Lin",
    date: "Apr 21, 2026",
    category: "AI",
    image: "/images/blog-2.jpg",
  },
  {
    id: 3,
    title: "A Field Guide to Reading More in a Noisy World",
    excerpt:
      "Small rituals, gentle environments, and the lost art of finishing what you started.",
    author: "Aria Chen",
    date: "Apr 18, 2026",
    category: "Lifestyle",
    image: "/images/blog-3.jpg",
  },
];

export default function Featured() {
  return (
    <section
      id="featured"
      className="mx-auto max-w-7xl px-6 py-20 sm:py-28"
    >
      <div className="mb-12 flex items-end justify-between gap-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b8623a]">
            Featured
          </p>
          <h2 className="mt-3 font-serif text-3xl font-medium  sm:text-4xl lg:text-5xl">
            Editor&apos;s picks
          </h2>
        </div>
        <Link
          href="/blog"
          className="story-link hidden text-sm font-medium text-muted-foreground sm:inline-block"
          prefetch={false}
        >
          View all
        </Link>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {featured.map((post, i) => (
          <BlogCard key={post.id} post={post} delay={i} />
        ))}
      </div>
    </section>
  );
}
