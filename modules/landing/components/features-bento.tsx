"use client";

import { motion } from "motion/react";
import { ShieldCheck, Puzzle } from "lucide-react";

const features = [
  {
    title: "Deep Context Understanding",
    description:
      "Our AI doesn't just look at the diff. It reads your entire repository context to understand how changes impact the broader architecture.",
    className: "md:col-span-2 md:row-span-2",
    visual: (
      <div className='mt-6 flex-1 bg-muted/30 border-t border-border overflow-hidden flex flex-col font-mono text-xs md:text-sm'>
        <div className='flex border-b border-border bg-muted/50 px-3 py-2 items-center gap-2'>
          <div className='size-2 bg-red-400 rounded-full' />
          <div className='size-2 bg-amber-400 rounded-full' />
          <div className='size-2 bg-green-400 rounded-full' />
          <span className='text-muted-foreground ml-2'>repository-context</span>
        </div>
        <div className='p-4 md:p-6 space-y-2 opacity-80'>
          <div className='flex gap-4'>
            <span className='text-muted-foreground'>import</span>{" "}
            <span className='text-primary'>{"{ db }"}</span>{" "}
            <span className='text-muted-foreground'>from</span>{" "}
            <span>{"@/lib/db"}</span>
          </div>
          <div className='flex gap-4'>
            <span className='text-muted-foreground'>import</span>{" "}
            <span className='text-primary'>{"{ auth }"}</span>{" "}
            <span className='text-muted-foreground'>from</span>{" "}
            <span>{"@/lib/auth"}</span>
          </div>
          <div className='h-4' />
          <div className='text-muted-foreground'>
            {"// AI analyzes these imported files to"}
          </div>
          <div className='text-muted-foreground'>
            {"// understand the full data model cross-references"}
          </div>
          <div className='flex gap-4'>
            <span className='text-primary'>const</span>{" "}
            <span>user = await auth()</span>
          </div>
          <div className='flex gap-4'>
            <span className='text-primary'>const</span>{" "}
            <span>data = await db.query(user.id)</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Security Checks",
    description:
      "Automatically flag potential vulnerabilities before CI/CD runs.",
    className: "md:col-span-1 md:row-span-1",
    visual: (
      <div className='mt-4 flex-1 flex flex-col justify-end'>
        <div className='bg-red-500/10 border-t border-red-500/20 p-3'>
          <div className='flex items-center gap-2 text-red-600 dark:text-red-400 font-medium text-sm mb-1'>
            <ShieldCheck className='size-4 shrink-0' /> SQL Injection Risk
          </div>
          <div className='text-xs text-red-600/80 dark:text-red-400/80 line-clamp-2'>
            Unsanitized input detected in database query.
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Custom Rules",
    description: "Enforce your team's specific coding standards seamlessly.",
    className: "md:col-span-1 md:row-span-1",
    visual: (
      <div className='mt-4 flex-1 flex flex-col justify-end'>
        <div className='bg-muted/30 border-t border-border p-3 font-mono text-xs text-muted-foreground'>
          <span className='text-primary'>{"rules"}</span>: {"{"}
          <br />
          &nbsp;&nbsp;<span className='text-foreground'>
            {"no-console"}
          </span>: <span className='text-amber-500'>{"error"}</span>,<br />
          &nbsp;&nbsp;<span className='text-foreground'>{"require-types"}</span>
          : <span className='text-amber-500'>{"warn"}</span>
          <br />
          {"}"}
        </div>
      </div>
    ),
  },
  {
    title: "Centralized Dashboard",
    description:
      "Manage all your pull request reviews and team velocity from one single hub.",
    className: "md:col-span-2 md:row-span-1 flex-col md:flex-row gap-6",
    visual: (
      <div className='flex-1 flex flex-col gap-2 mt-4 md:mt-0 opacity-80 bg-muted/10 p-3 border-l border-t border-border w-full md:w-auto overflow-hidden -mb-6 md:-mr-6 md:-my-6 pt-6'>
        <div className='flex items-center justify-between p-2 bg-background border border-border'>
          <div className='flex flex-col gap-1'>
            <span className='text-xs font-medium text-foreground truncate'>
              Update auth.ts logic
            </span>
            <span className='text-[10px] text-muted-foreground'>
              #142 opened 2h ago
            </span>
          </div>
          <div className='size-2 bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)] shrink-0' />
        </div>
        <div className='flex items-center justify-between p-2 bg-background border border-border'>
          <div className='flex flex-col gap-1'>
            <span className='text-xs font-medium text-foreground truncate'>
              Fix navigation bug
            </span>
            <span className='text-[10px] text-muted-foreground'>
              #141 opened 5h ago
            </span>
          </div>
          <div className='size-2 bg-amber-500 shrink-0' />
        </div>
      </div>
    ),
  },
  {
    title: "Seamless Integrations",
    description:
      "Connects with GitHub, GitLab, Slack, and Jira out of the box.",
    className: "md:col-span-1 md:row-span-1 justify-center",
    icon: <Puzzle className='size-8 mb-4 text-primary' />,
  },
];

export function FeaturesBento() {
  return (
    <section id='features' className='py-24 md:py-32 bg-muted/30'>
      <div className='container mx-auto px-3 max-w-5xl'>
        <div className='mb-12'>
          <h2 className='text-3xl md:text-4xl font-bold tracking-tight mb-3 text-foreground text-center'>
            Autonomous AI workflow features
          </h2>
          <p className='text-muted-foreground text-lg mx-auto text-center max-w-3xl'>
            Everything you need to ship better code, designed to fit seamlessly
            into your existing workflow.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-3 auto-rows-[250px]'>
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`p-6 border border-border bg-card flex overflow-hidden ${feature.className} ${feature.className.includes("flex-row") ? "" : "flex-col"}`}
            >
              <div
                className={
                  feature.className.includes("flex-row")
                    ? "md:w-1/2 flex flex-col justify-center"
                    : ""
                }
              >
                {feature.icon && feature.icon}
                <h3 className='text-lg font-bold tracking-tight mb-2 text-foreground'>
                  {feature.title}
                </h3>
                <p className='text-muted-foreground text-sm'>
                  {feature.description}
                </p>
              </div>
              {feature.visual && feature.visual}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
