import { requireAuth } from "@/modules/auth";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAuth();
  return <main className='min-h-svh max-w-7xl w-full mx-auto'>{children}</main>;
}
