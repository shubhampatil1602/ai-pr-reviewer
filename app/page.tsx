import { ModeToggle } from "@/components/theme/mode-toggle";

export default function Home() {
  return (
    <div className='bg-background h-screen flex flex-col justify-center items-center gap-6'>
      <h1>Home</h1>
      <ModeToggle />
    </div>
  );
}
