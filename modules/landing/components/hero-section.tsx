"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, Code2, Braces, TerminalSquare } from "lucide-react";

import { Button } from "@/components/ui/button";
import { InteractivePRDiff } from "./interactive-pr-diff";
import { GithubIcon } from "@/modules/dashboard/components/github-icon";
import { GridPattern } from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <section className='relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden'>
      {/* Animated Grid Background */}
      <div className='absolute inset-0 z-0'>
        <GridPattern
          width={40}
          height={40}
          x={-1}
          y={-1}
          squares={[
            [4, 4],
            [5, 1],
            [8, 2],
            [5, 8],
            [2, 5],
            [1, 9],
            [10, 5],
            [12, 7],
            [15, 3],
            [18, 6],
            [22, 2],
            [25, 8],
          ]}
          className={cn(
            "[mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-0 h-full w-full fill-foreground/10 stroke-foreground/10",
          )}
        />
      </div>

      {/* Floating Elements Background */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <motion.div
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className='absolute top-[15%] left-[10%] text-primary/30'
        >
          <Code2 className='size-16' />
        </motion.div>

        <motion.div
          animate={{ y: [0, 30, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className='absolute top-[25%] right-[12%] text-primary/20'
        >
          <Braces className='size-24' />
        </motion.div>

        <motion.div
          animate={{ y: [0, -15, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className='absolute bottom-[20%] left-[15%] text-amber-500/20'
        >
          <TerminalSquare className='size-12' />
        </motion.div>
      </div>

      <div className='container mx-auto px-4 relative z-10'>
        <div className='flex flex-col items-center text-center max-w-4xl mx-auto mb-16 relative'>
          {/* Text Background Glow/Blur */}
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-64 bg-background/90 dark:bg-background/80 blur-[80px] -z-10 rounded-[100%]' />
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 max-w-lg h-48 bg-primary/10 blur-[100px] -z-10 rounded-[100%]' />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className='inline-flex items-center gap-2 px-3 py-1 bg-background/40 backdrop-blur-md text-primary text-sm font-medium mb-8 border border-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.2)] rounded-3xl'
          >
            <span className='flex size-2 bg-primary rounded-full animate-pulse' />
            PR Pilot is now available in Beta
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className='text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 text-foreground '
          >
            <span className="whitespace-nowrap">Automate your Pull Request</span> <br className="hidden md:block" /> reviews with{" "}
            <span style={{ fontFamily: "var(--font-dancing)" }} className='text-primary font-bold px-2 inline-block -rotate-2 transform-gpu'>
              PR Pilot
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className='text-xs sm:text-lg text-muted-foreground max-w-xl mb-10 drop-shadow-sm'
          >
            Get instant, intelligent code reviews, catch bugs before they merge,
            and save your engineering team hours every week.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className='flex flex-col sm:flex-row items-center gap-4'
          >
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button size='lg' className='h-12 px-8  text-base font-medium'>
                <Link href='/sign-in' className='flex items-center'>
                  <GithubIcon className='mr-2 size-5' />
                  Get Started / Connect GitHub
                </Link>
              </Button>
            </motion.div>

            <Button
              variant='outline'
              size='lg'
              className='h-12 px-8  text-base font-medium'
            >
              <Link href='#features' className='flex items-center'>
                See how it works <ArrowRight className='ml-2 size-4' />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* The Signature Element */}
        <div className='relative'>
          <InteractivePRDiff />
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className='absolute inset-0 bg-primary/5 blur-[100px] -z-10 rounded-full'
          />
        </div>
      </div>
    </section>
  );
}
