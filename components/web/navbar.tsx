"use client";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { ThemeToggle } from "./theme-toggle";
import { useConvexAuth } from "convex/react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import SearchInput from "./SearchInput";


export function Navbar() {
  const {isLoading, isAuthenticated} = useConvexAuth();

  const router = useRouter();
  // const {data: session} = authClient.useSession();

  return (
    <nav className="w-full py-5 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Link href="/">
          <h1 className="text-3xl font-bold">
            Web<span className="text-primary">App</span>
          </h1>
        </Link>

        <div className="flex items-center gap-2">
          <Link className={buttonVariants({variant: "ghost"})} href="/">Home</Link>
          <Link className={buttonVariants({variant: "ghost"})} href="/blog" prefetch={false}>Blog</Link>
          <Link className={buttonVariants({variant: "ghost"})} href="/create" prefetch={false}>Create</Link>          
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden md:block mr-2">
          <SearchInput />
        </div>
        
        {/* {session?.user ? (
          <p>sign out</p>
        ) : (
          <div>
            <p>signup</p>
            <p>login in</p>
            
          </div>
        )} */}

        {isLoading ? null : isAuthenticated ? (
          <Button className="text-white hover: cursor-pointer" onClick={() => authClient.signOut({
            // for showing toast notification on successful logout
            fetchOptions: {
              onSuccess: () =>{
                toast.success("Logged out successfully!");
                router.replace("/");
                router.refresh();
              },
              onError: (error) => {
                toast.error(error.error.message);
              }
            },
          })
        } 
        >
          Logout
        </Button>
        ) : ( <>
          <Link className={`${buttonVariants()} text-white`} href="/auth/sign-up">Sign Up</Link>
          <Link className={buttonVariants({ variant: "secondary" })} href="/auth/login">Log In</Link>
        </>)}
        <ThemeToggle />
      </div>
    </nav>
  )
}
