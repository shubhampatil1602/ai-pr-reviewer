import { ModeToggle } from "@/components/theme/mode-toggle";
import { UserMenuWithSession } from "@/modules/auth";
import Link from "next/link";

export default function Home() {
  return (
    <div className='bg-background h-screen flex flex-col justify-center items-center gap-6 max-w-7xl w-full mx-auto'>
      <Link href='/dashboard'>Go to /dashboard</Link>
      <Link href='/sign-in'>Go to /sign-in</Link>
      <UserMenuWithSession variant='compact' />
      <ModeToggle />
    </div>
  );
}
