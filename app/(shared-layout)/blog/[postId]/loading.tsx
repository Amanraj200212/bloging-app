//this for loading state with only name with loading

import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function LoadingPage(){

  return(
    <>
      <Link className={buttonVariants({ variant: "outline", className: "mt-4" })} href="/blog">
        <ArrowLeft className="size-4"/>
        Back to blog
      </Link>
      <div className="max-w-3xl mx-auto py-8 px-4">
        <Skeleton className="w-full h-100 mb-8 rounded-xl"  />

        <div className="space-y-4 ">
          <Skeleton  className="h-12 w-3/4" />
          <Skeleton  className="h-12 w-32" />
        </div>

        <div className="mt-8 space-y-2">
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-2/3 h-4" />
        </div>
      </div>
    </>
  )
}