// app/components/BlogCard.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

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
}: {
  post: Post;
  delay?: number;
}) {
  return (
    <article
      style={{ animationDelay: `${delay * 100}ms` }}
      className="group animate-fade-up flex flex-col overflow-hidden rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.18)] cursor-pointer"
    >
      <Card className="pt-0">
        <div className="relative h-48 w-full overflow-hidden">
          <Image 
            src={post.image} 
            className="rounded-t-lg object-cover" 
            alt={post.title}
            fill 
            loading="eager"
            sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
          />

           <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-semibold backdrop-blur-sm">
          {post.category}
        </span>
        </div>

        <CardContent>
          <Link href={`/blog`}>
            <h1 className="text-2xl h-20 font-bold hover:text-primary">{post.title}</h1>
          </Link>
          <p className="text-muted-foreground line-clamp-3 h-15">{post.excerpt}</p>
        </CardContent>

        <CardFooter className="mt-6 justify-between">
          <div className="text-xs text-muted-foreground/80">
            <p className="font-medium">{post.author}</p>
          </div>

          <Link
            href="#"
            className="inline-flex items-center gap-1 text-sm font-medium transition-all hover:gap-2 hover:text-primary"
          >
            Read
            <ArrowRight className="h-4 w-4" />
          </Link>
        </CardFooter>
      </Card>
    </article>
  );
}
