import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { GithubSignInForm } from "./github-sign-in-form";
import type { GithubSignInFormProps } from "../types";

import Link from "next/link";
import { Rocket } from "lucide-react";

export function SignInForm({
  className,
  callbackUrl,
  ...props
}: React.ComponentProps<"div"> & GithubSignInFormProps) {
  return (
    <div
      className={cn("flex flex-col gap-3 w-full max-w-sm", className)}
      {...props}
    >
      <Card className='shadow rounded-none'>
        <CardHeader className='text-center pt-3'>
          <div className='flex justify-center mb-4'>
            <div className='flex h-12 w-12 items-center justify-center bg-primary/10 text-primary'>
              <Rocket className='h-6 w-6' />
            </div>
          </div>
          <CardTitle className='text-xl font-medium mb-0.5'>
            Welcome to {PRPilot}
          </CardTitle>
          <CardDescription>
            Sign in with Github to review and manage your code.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              <GithubSignInForm callbackUrl={callbackUrl} />
            </Field>
            <FieldDescription className='text-center text-xs'>
              We only request the permissions needed to identify your account.
              You can revoke access anytime from GitHub settings.
            </FieldDescription>
          </FieldGroup>
        </CardContent>
        <CardFooter className='flex justify-center rounded-none'>
          <div className='text-center text-xs text-muted-foreground'>
            By clicking continue, you agree to our{" "}
            <a
              href='#'
              className='underline underline-offset-4 hover:text-primary'
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href='#'
              className='underline underline-offset-4 hover:text-primary'
            >
              Privacy Policy
            </a>
            .
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

const PRPilot = (
  <Link href='/' className='relative inline-block text-primary'>
    PR Pilot
    {/* Hand-drawn sketchy underline effect */}
    <svg
      className='absolute w-[105%] h-3 -bottom-1.5 -left-1 text-primary'
      viewBox='0 0 100 20'
      preserveAspectRatio='none'
    >
      <path
        d='M2,14 C 30,11 70,11 98,13'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
      />
      <path
        d='M5,13 C 40,10 80,10 95,14'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        opacity='0.6'
      />
    </svg>
  </Link>
);
