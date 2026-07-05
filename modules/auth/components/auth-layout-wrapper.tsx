import { Dancing_Script } from "next/font/google";

const dancingScript = Dancing_Script({ subsets: ["latin"] });

export function AuthLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <main className='flex min-h-screen w-full'>
      {/* Left side: Design Panel */}
      <section className='hidden lg:block relative flex-1 border-r border-border/40'>
        {/* Abstract pattern & gradients */}
        <div className='absolute inset-0 overflow-hidden'>
          {/* Glowing orbs */}
          <div className='absolute top-[-25%] left-[-20%] w-[70%] h-[70%] bg-primary/20 dark:bg-primary/10 blur-[120px] rounded-full pointer-events-none opacity-50 dark:opacity-40'></div>
          <div className='absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-primary/15 dark:bg-primary/5 blur-[100px] rounded-full pointer-events-none opacity-50 dark:opacity-40'></div>

          {/* Subtle grid pattern */}
          {/* Subtle grid pattern - Light Mode */}
          <div className='absolute inset-0 dark:hidden bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]'></div>
          {/* Subtle grid pattern - Dark Mode */}
          <div className='absolute inset-0 hidden dark:block bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]'></div>
        </div>

        {/* Content */}
        <div className='relative z-10 flex flex-col h-full max-w-xl mx-auto py-6'>
          {/* Feature Highlight */}
          <div className='flex-1 flex flex-col justify-center mx-auto text-center max-w-lg space-y-4'>
            <h1
              className={`text-3xl sm:text-5xl tracking-wide leading-tight ${dancingScript.className}`}
            >
              Code reviews on autopilot.
            </h1>
            <p className='text-zinc-400'>
              PR Pilot integrates seamlessly with your GitHub workflow to catch
              bugs, enforce standards, and summarize changes before you merge.
            </p>
          </div>
        </div>
      </section>

      {/* Right side: Form */}
      <section className='relative flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6 lg:flex-none lg:w-1/2 xl:w-5/12 bg-background'>
        {/* Form Container */}
        <div className='w-full max-w-sm'>{children}</div>
      </section>
    </main>
  );
}
