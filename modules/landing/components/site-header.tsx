import React, { Suspense } from "react";
import Link from "next/link";
import { Rocket } from "lucide-react";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { NavbarActions } from "./navbar-actions";

export function SiteHeader() {
  return (
    <header className='sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60'>
      <div className='container mx-auto px-4 h-14 flex items-center justify-between'>
        <div className='flex items-center gap-2 font-bold'>
          <Rocket className='size-5 text-primary' />
          <Link href='/'>PR Pilot</Link>
        </div>

        <nav className='hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground'>
          <Link
            href='#how-it-works'
            className='hover:text-foreground transition-colors'
          >
            How it Works
          </Link>
          <Link
            href='#features'
            className='hover:text-foreground transition-colors'
          >
            Features
          </Link>
          <Link
            href='#pricing'
            className='hover:text-foreground transition-colors'
          >
            Pricing
          </Link>
          <Link href='#faq' className='hover:text-foreground transition-colors'>
            FAQ
          </Link>
        </nav>

        <div className='flex items-center gap-4'>
          <ModeToggle />
          <Suspense fallback={<div className="h-9 w-20 animate-pulse bg-muted rounded-md" />}>
            <NavbarActions />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
