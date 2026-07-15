import { motion } from "motion/react";
import { BotIcon, CheckCircle2, AlertTriangle, FileCode2 } from "lucide-react";
import { useEffect, useState } from "react";

export function InteractivePRDiff() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-full max-w-2xl mx-auto  border border-border bg-card shadow-lg overflow-hidden text-sm"
    >
      {/* GitHub Comment Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-muted/30">
        <div className="flex items-center justify-center size-8  bg-primary/10 text-primary">
          <BotIcon className="size-4" />
        </div>
        <div className="flex-1">
          <span className="font-semibold text-foreground">pr-pilot<span className="text-muted-foreground font-normal"> [bot]</span></span>
          <span className="text-muted-foreground ml-2">commented just now</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-2 py-1  border border-border bg-background text-xs font-medium text-muted-foreground">
          <span className="flex size-2  bg-emerald-500" />
          Review Complete
        </div>
      </div>

      {/* GitHub Comment Body */}
      <div className="p-5 space-y-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showContent ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
            🤖 PR Pilot Summary
          </h3>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            This PR implements payload encryption for the authentication flow and adds the necessary cryptographic dependencies.
          </p>

          <div className="space-y-4">
            <div className=" border border-border bg-muted/20 p-4">
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <FileCode2 className="size-4 text-blue-500" />
                Key Changes
              </h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-emerald-500">+</span>
                  <span><code className="text-xs bg-muted px-1 py-0.5  text-foreground">auth.ts</code>: Added payload encryption to the login function.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-emerald-500">+</span>
                  <span><code className="text-xs bg-muted px-1 py-0.5  text-foreground">package.json</code>: Added bcrypt dependency.</span>
                </li>
              </ul>
            </div>

            <div className=" border border-amber-500/20 bg-amber-500/5 p-4">
              <h4 className="font-semibold text-amber-600 dark:text-amber-400 mb-3 flex items-center gap-2">
                <AlertTriangle className="size-4" />
                Security & Code Quality
              </h4>
              <ul className="space-y-2 text-amber-700/80 dark:text-amber-300/80">
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-amber-500">•</span>
                  <span><strong>Potential Null Reference:</strong> In <code className="text-xs bg-amber-500/10 px-1 py-0.5  text-amber-700 dark:text-amber-300">auth.ts</code>, the <code className="text-xs bg-amber-500/10 px-1 py-0.5  text-amber-700 dark:text-amber-300">login</code> function might fail if the user payload is undefined. Consider adding an early return.</span>
                </li>
              </ul>
            </div>
            
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mt-2">
              <CheckCircle2 className="size-4" />
              <span className="font-medium text-xs uppercase tracking-wider">0 Vulnerabilities Found</span>
            </div>
          </div>
        </motion.div>
        
        {/* Loading Skeleton before content appears */}
        {!showContent && (
          <div className="absolute inset-0 p-5 bg-card flex flex-col gap-4">
            <div className="h-6 w-48 bg-muted  animate-pulse" />
            <div className="h-4 w-full max-w-[80%] bg-muted  animate-pulse" />
            <div className="h-4 w-full max-w-[60%] bg-muted  animate-pulse" />
            <div className="h-24 w-full bg-muted  animate-pulse mt-4" />
          </div>
        )}
      </div>
    </motion.div>
  );
}
