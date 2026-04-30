"use client";

import Link from "next/link";
import { FaFacebook, FaInstagram, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 py-12 sm:flex-row">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold text-foreground">Blog<span className="text-primary">App</span></h1>
          <span className="text-sm text-muted-foreground">-share your tthoughts</span>
        </div>
        <nav className="flex items-center gap-6 text-sm text-muted-foreground">
          <Link className="story-link hover:text-primary" href="#">About</Link>
          <Link className="story-link hover:text-primary" href="#">Contact</Link>
          <Link className="story-link hover:text-primary" href="#">Donate us</Link>
        </nav>
        
        <div className="flex items-center justify-center gap-4 text-muted-foreground">
          <Link className="p-2 border rounded-2xl hover:text-primary hover:border-primary" href="#">
            <FaFacebook />
          </Link>

          <Link className="p-2 border rounded-2xl hover:text-primary hover:border-primary" href="#">
            <FaInstagram />
          </Link>

          <Link className="p-2 border rounded-2xl hover:text-primary hover:border-primary" href="#">
            <FaGithub />
          </Link>

          <Link className="p-2 border rounded-2xl hover:text-primary hover:border-primary" href="#">
            <FaXTwitter />
          </Link>
      </div>

      </div>
      <div>
        <p>

        </p>
      </div>
    </footer>
  );
}