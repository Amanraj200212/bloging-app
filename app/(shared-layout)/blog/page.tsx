import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { Metadata } from "next";
import { cacheLife, cacheTag } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Blog | Next.js webApp",
  description: "Read our latest article and insights",
  category: "Web Development",
  authors: [{name: "Aman Gupta"}]
}

// export const dynamic = "force-static";
// export const revalidate = 0;

export default  function BlogPage(){
  return (
    <div className="py-12">
      <div className="text-center pb-12">
        <h1 className="text-4xl font-extrabold tracking-tight  sm:text-5xl">Our Blog</h1>
        <p className="pt-4 max-w-2xl mx-auto text-xl text-muted-foreground" >Insights, thoughts and trends from our team</p>
      </div>

        {/* i make blog cache comp so i need <suspense>Boundary */}
        <Suspense fallback={<BlogSkeletonUi />}>
          <LoadBlogList />
        </Suspense>
    </div>
  )
}


// Calling fetchqueries from server side rendring data (docs)
async function LoadBlogList(){

  //make blog page cacahe
  // "use cache";
  // cacheLife("hours");
  // cacheTag("blog");
  await connection();
  

  const dataOfPosts = await fetchQuery(api.posts.getPosts);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {dataOfPosts?.map((post) => (
          <Card key={post._id} className="pt-0">
            <div className="relative h-48 w-full overflow-hidden">
              <Image 
                src={post.imageUrl ?? "/noImageUpload.png"} 
                className="rounded-t-lg object-cover" 
                alt="post-image" 
                fill 
                loading="eager"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>

            <CardContent>
              <Link href={`/blog/${post._id}`}>
               <h1 className="text-2xl font-bold hover:text-primary">{post.title}</h1>
              </Link>
              <p className="text-muted-foreground line-clamp-3 h-15">{post.body}</p>
            </CardContent>
            <CardFooter>
              <Link className={buttonVariants({className: "w-full text-white"})} href={`/blog/${post._id}`}>Read more</Link>
            </CardFooter>
          </Card>
        ))}
      </div>
  )
}


function BlogSkeletonUi() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="border rounded-lg p-4 space-y-4">
          <Skeleton className="h-48 w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      ))}
    </div>
  );
}
