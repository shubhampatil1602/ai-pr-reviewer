"use client";

import Link from "next/link";

import {
  TwitterLogoIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
} from "@phosphor-icons/react";
import { Rocket, Globe } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className='border-t border-border/40 bg-background pt-16 overflow-hidden'>
      <div className='container mx-auto px-4 flex flex-col'>
        {/* Top Section */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-16'>
          {/* Left: Brand */}
          <div className='flex items-start'>
            <div className='flex items-center gap-2 font-bold text-xl'>
              <Rocket className='size-6 text-primary' />
              <span>PR Pilot</span>
            </div>
          </div>

          {/* Middle: Links */}
          <div className='flex flex-col gap-4 text-sm text-muted-foreground'>
            <Link
              href='#terms'
              className='hover:text-foreground transition-colors'
            >
              Terms & Conditions
            </Link>
            <Link
              href='#privacy'
              className='hover:text-foreground transition-colors'
            >
              Privacy Policy
            </Link>
            <Link
              href='#refund'
              className='hover:text-foreground transition-colors'
            >
              Refund & Cancellation
            </Link>
          </div>

          {/* Right: Social & Copyright */}
          <div className='flex flex-col items-start md:items-end gap-6'>
            <div className='flex items-center gap-4'>
              <Link
                href='https://www.shubhamspatil.me/'
                target='_blank'
                className='flex items-center justify-center size-10 rounded-lg bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors'
              >
                <Globe className='size-5' />
              </Link>
              <Link
                href='https://x.com/shubhamsp1602'
                target='_blank'
                className='flex items-center justify-center size-10 rounded-lg bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors'
              >
                <TwitterLogoIcon className='size-5' />
              </Link>
              <Link
                href='https://github.com/shubhampatil1602'
                target='_blank'
                className='flex items-center justify-center size-10 rounded-lg bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors'
              >
                <GithubLogoIcon className='size-5' />
              </Link>
              <Link
                href='https://www.linkedin.com/in/shubhmpatil/'
                target='_blank'
                className='flex items-center justify-center size-10 rounded-lg bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors'
              >
                <LinkedinLogoIcon className='size-5' />
              </Link>
            </div>
            <p className='text-sm text-muted-foreground'>
              © 2026 PR Pilot. All rights reserved.
            </p>
          </div>
        </div>

        {/* Bottom Section: Massive faded text */}
        <div className='flex justify-center w-full mt-4 select-none pointer-events-none'>
          <h1 className='text-[18vw] leading-[0.8] font-black tracking-tighter uppercase bg-gradient-to-b from-foreground/20 to-transparent bg-clip-text text-transparent'>
            PR PILOT
          </h1>
        </div>
      </div>
    </footer>
  );
}
