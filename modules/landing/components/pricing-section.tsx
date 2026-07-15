"use client";

import { motion } from "motion/react";
import { CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function PricingSection() {
  return (
    <section id='pricing' className='py-24 md:py-32 bg-muted/30'>
      <div className='container mx-auto px-4 max-w-5xl'>
        <div className='text-center mb-16'>
          <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3 text-foreground text-balance'>
            Simple, transparent pricing
          </h2>
          <p className='text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto text-balance'>
            Start for free, upgrade when you need more power. No hidden fees.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto'>
          {/* Free Tier */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className='flex flex-col p-8  border border-border bg-card shadow-sm'
          >
            <h3 className='text-xl font-bold mb-2'>Free</h3>
            <p className='text-muted-foreground mb-6'>
              Perfect for solo developers and small side projects.
            </p>
            <div className='mb-6'>
              <span className='text-4xl font-bold'>₹0</span>
              <span className='text-muted-foreground'>/mo</span>
            </div>

            <ul className='space-y-4 mb-8 flex-1'>
              <li className='flex items-start gap-3'>
                <CheckIcon className='size-5 text-primary shrink-0' />
                <span className='text-sm'>5 AI reviews</span>
              </li>
              <li className='flex items-start gap-3'>
                <CheckIcon className='size-5 text-primary shrink-0' />
                <span className='text-sm'>Standard context window</span>
              </li>
              <li className='flex items-start gap-3'>
                <CheckIcon className='size-5 text-primary shrink-0' />
                <span className='text-sm'>Public repositories only</span>
              </li>
            </ul>

            <Button variant='outline' className='w-full'>
              <Link href='/sign-in'>Get Started for Free</Link>
            </Button>
          </motion.div>

          {/* Pro Tier */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='flex flex-col p-8  border-2 border-primary bg-card shadow-md relative'
          >
            <div className='absolute top-0 right-8 -translate-y-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold  uppercase tracking-wider'>
              Most Popular
            </div>
            <h3 className='text-xl font-bold mb-2'>Pro</h3>
            <p className='text-muted-foreground mb-6'>
              For professional teams shipping critical code.
            </p>
            <div className='mb-6'>
              <span className='text-4xl font-bold'>₹299</span>
              <span className='text-muted-foreground'>/mo</span>
            </div>

            <ul className='space-y-4 mb-8 flex-1'>
              <li className='flex items-start gap-3'>
                <CheckIcon className='size-5 text-primary shrink-0' />
                <span className='text-sm'>Unlimited AI reviews</span>
              </li>
              <li className='flex items-start gap-3'>
                <CheckIcon className='size-5 text-primary shrink-0' />
                <span className='text-sm'>
                  Priority queue (instant feedback)
                </span>
              </li>
              <li className='flex items-start gap-3'>
                <CheckIcon className='size-5 text-primary shrink-0' />
                <span className='text-sm'>Private & Public repositories</span>
              </li>
              <li className='flex items-start gap-3'>
                <CheckIcon className='size-5 text-primary shrink-0' />
                <span className='text-sm'>Custom repository rules</span>
              </li>
            </ul>

            <Button className='w-full'>
              <Link href='/sign-in'>Start Pro Trial</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
