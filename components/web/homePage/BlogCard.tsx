// app/components/BlogCard.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export type Post = {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  image: string;
};

export default function BlogCard({
  post,
  delay = 0,
  priority = false,
}: {
  post: Post;
  delay?: number;
  priority?: boolean;
}) {
  return (
    <article
      style={{ animationDelay: `${delay * 100}ms` }}
      className="group animate-fade-up flex flex-col overflow-hidden rounded-2xl border border-[#ebe4d8] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.18)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
          priority={priority}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-neutral-900 backdrop-blur-sm">
          {post.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-xl font-semibold leading-snug text-neutral-900 transition-colors group-hover:text-[#b8623a]">
          {post.title}
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-neutral-500">
          {post.excerpt}
        </p>

        <div className="mt-6 flex items-center justify-between border-t border-[#ebe4d8] pt-4">
          <div className="text-xs text-neutral-500">
            <p className="font-medium text-neutral-900">{post.author}</p>
          </div>
          <Link
            href="#"
            className="inline-flex items-center gap-1 text-sm font-medium text-[#b8623a] transition-all hover:gap-2"
          >
            Read
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
