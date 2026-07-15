"use client";

import { motion } from "motion/react";
import {
  DownloadIcon,
  GitPullRequestIcon,
  MessageSquareIcon,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Install the Github App",
    description:
      "One-click integration. Grant access to the repositories you want to protect, and you are good to go.",
    icon: <DownloadIcon className='size-6 text-primary' />,
  },
  {
    number: "02",
    title: "Open a Pull Request",
    description:
      "Work exactly as you normally do. Create a new branch, write code, and open a PR on GitHub.",
    icon: <GitPullRequestIcon className='size-6 text-primary' />,
  },
  {
    number: "03",
    title: "Get AI Feedback",
    description:
      "The bot automatically summarizes changes and leaves inline review comments in seconds.",
    icon: <MessageSquareIcon className='size-6 text-primary' />,
  },
];

export function HowItWorks() {
  return (
    <section
      id='how-it-works'
      className='py-24 md:py-32 bg-background border-y border-border'
    >
      <div className='container mx-auto px-4 max-w-5xl'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl md:text-4xl font-bold tracking-tight mb-3 text-foreground'>
            How it works
          </h2>
          <p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
            Get set up in less than a minute. No complex pipelines or
            configuration required.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 relative'>
          {/* Animated Connector Line */}
          <div className='hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 -z-10'>
            <svg width="100%" height="2" xmlns="http://www.w3.org/2000/svg">
              <motion.line 
                x1="0" y1="1" x2="100%" y2="1" 
                stroke="currentColor" strokeWidth="2" strokeDasharray="8 8"
                className="text-primary/40"
                animate={{ strokeDashoffset: [0, -16] }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </svg>
          </div>

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className='flex flex-col items-center text-center relative bg-background pt-4 px-4'
            >
              <div className='flex items-center justify-center size-16  bg-muted border-4 border-background mb-6 shadow-sm'>
                {step.icon}
              </div>
              <div className='text-xs font-bold text-muted-foreground tracking-widest mb-2'>
                STEP {step.number}
              </div>
              <h3 className='text-xl font-bold tracking-tight mb-3 text-foreground'>
                {step.title}
              </h3>
              <p className='text-muted-foreground text-sm leading-relaxed'>
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
