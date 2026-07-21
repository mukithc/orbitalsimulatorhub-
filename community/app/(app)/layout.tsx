import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Sidebar } from '@/components/Sidebar';

const WORKSPACE_ID = process.env.NEXT_PUBLIC_WORKSPACE_ID ?? 'a0000000-0000-0000-0000-000000000001';

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  let user: { id: string } | null = null;
  try {
    const { data } = await supabase.auth.getUser();
    user = data?.user ?? null;
  } catch {
    // Invalid Supabase config or network
  }
  if (!user) redirect('/sign-in');

  let profile = null;
  try {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    profile = data;
  } catch {
    // RLS or table missing
  }

  return (
    <div className="flex h-screen overflow-hidden bg-app orbital-grid">
      <Sidebar profile={profile} userId={user.id} workspaceId={WORKSPACE_ID} />
      <main className="flex-1 flex flex-col min-w-0">
        {children}
      </main>
    </div>
  );
}
