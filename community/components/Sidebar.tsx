'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import {
  Bell,
  BookOpen,
  Bot,
  BriefcaseBusiness,
  Compass,
  Hash,
  Home,
  MessageCircle,
  Rocket,
  Settings,
  User,
  Users,
  Plus,
  Bookmark,
  CalendarDays,
  Menu,
  Link2,
  X,
} from 'lucide-react';
import { clsx } from 'clsx';

type Profile = {
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  online_status: string;
} | null;

type Channel = { id: string; name: string; slug: string };
type Group = { id: string; name: string; slug: string };

export function Sidebar({
  profile,
  userId,
  workspaceId,
}: {
  profile: Profile;
  userId: string;
  workspaceId: string;
}) {
  const pathname = usePathname();
  const [channels, setChannels] = useState<Channel[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data: cm } = await supabase
        .from('channel_members')
        .select('channel_id, channels(id, name, slug)')
        .eq('profile_id', userId);
      const chs = (cm ?? [])
        .map((c: { channels: Channel | null }) => c.channels)
        .filter(Boolean) as Channel[];
      setChannels(chs);

      const { data: gm } = await supabase
        .from('study_group_members')
        .select('study_group_id, study_groups(id, name, slug)')
        .eq('profile_id', userId);
      const grps = (gm ?? [])
        .map((g: { study_groups: Group | null }) => g.study_groups)
        .filter(Boolean) as Group[];
      setGroups(grps);
    }
    load();
  }, [userId, supabase]);

  const primaryItems = [
    { href: '/community', label: 'Home', icon: Home },
    { href: '/discover', label: 'Discover', icon: Compass },
    { href: '/channels', label: 'Communities', icon: Users },
    { href: '/missions', label: 'Missions', icon: Rocket },
    { href: '/events', label: 'Events', icon: CalendarDays },
    { href: '/learning', label: 'Learning', icon: BookOpen },
    { href: '/jobs', label: 'Jobs', icon: BriefcaseBusiness },
    { href: '/dm', label: 'Messages', icon: MessageCircle },
    { href: '/notifications', label: 'Notifications', icon: Bell },
    { href: '/bookmarks', label: 'Bookmarks', icon: Bookmark },
    { href: '/astrobot', label: 'AstroBot', icon: Bot },
  ];

  const content = (
    <>
      <div className="border-b border-app p-4">
        <Link href="/community" className="flex items-center gap-3 text-app font-semibold">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 text-primary ring-app">
            <Rocket className="h-5 w-5" />
          </span>
          <span>
            <span className="block font-heading text-base">Orbital Community</span>
            <span className="block text-[11px] uppercase tracking-[0.22em] text-muted">Mission network</span>
          </span>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto scrollbar-thin py-2">
        <div className="px-3 pb-4">
          <div className="space-y-1">
            {primaryItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={clsx(
                    'flex items-center gap-3 rounded-2xl px-3 py-3 text-sm transition',
                    active
                      ? 'bg-white/8 text-app ring-app'
                      : 'text-muted hover:bg-white/5 hover:text-app'
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <button
            type="button"
            className="mt-4 flex w-full items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold button-primary"
          >
            Create Post
          </button>
        </div>

        <div className="px-3">
          <div className="flex items-center justify-between px-2 py-2">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Channels</span>
            <Link href="/channels/browse" className="p-1 text-muted transition hover:text-app">
              <Plus className="w-4 h-4" />
            </Link>
          </div>
          {channels.length === 0 ? (
            <p className="px-2 py-1 text-sm text-muted">Join a channel to start</p>
          ) : (
            channels.map((ch) => (
              <Link
                key={ch.id}
                href={`/channels/${ch.id}`}
                className={clsx(
                  'flex items-center gap-2 rounded-xl px-3 py-2 text-sm',
                  pathname === `/channels/${ch.id}`
                    ? 'bg-white/8 text-app ring-app'
                    : 'text-muted hover:bg-white/5 hover:text-app'
                )}
              >
                <Hash className="w-4 h-4 shrink-0" />
                <span className="truncate">{ch.slug}</span>
              </Link>
            ))
          )}
        </div>

        <div className="mt-4 px-3">
          <div className="flex items-center justify-between px-2 py-2">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Mission groups</span>
            <Link href="/groups/new" className="p-1 text-muted transition hover:text-app">
              <Plus className="w-4 h-4" />
            </Link>
          </div>
          {groups.length === 0 ? (
            <p className="px-2 py-1 text-sm text-muted">Create or join a group</p>
          ) : (
            groups.map((g) => (
              <Link
                key={g.id}
                href={`/groups/${g.id}`}
                className={clsx(
                  'flex items-center gap-2 rounded-xl px-3 py-2 text-sm',
                  pathname === `/groups/${g.id}`
                    ? 'bg-white/8 text-app ring-app'
                    : 'text-muted hover:bg-white/5 hover:text-app'
                )}
              >
                <Users className="w-4 h-4 shrink-0" />
                <span className="truncate">{g.slug}</span>
              </Link>
            ))
          )}
        </div>
      </nav>

      <div className="space-y-1 border-t border-app p-3">
        <Link
          href="/invite"
          className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-muted transition hover:bg-white/5 hover:text-app"
        >
          <Link2 className="w-4 h-4" />
          <span>Invite</span>
        </Link>
        <Link
          href="/profile"
          className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-muted transition hover:bg-white/5 hover:text-app"
        >
          <User className="w-4 h-4" />
          <span>{profile?.display_name || profile?.username || 'Profile'}</span>
        </Link>
        <Link
          href="/settings"
          className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-muted transition hover:bg-white/5 hover:text-app"
        >
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </Link>
      </div>
    </>
  );

  return (
    <>
      <button
        type="button"
        className="fixed left-4 top-4 z-50 rounded-2xl border border-app bg-elevated p-2 text-app md:hidden"
        onClick={() => setMobileOpen(true)}
      >
        <Menu className="w-5 h-5" />
      </button>

      <aside
        className={clsx(
          'surface-panel w-72 shrink-0 flex-col border-r border-app',
          'md:relative fixed inset-y-0 left-0 z-40 transform transition-transform md:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <button
          type="button"
          className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-app bg-white/5 text-app md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-label="Close navigation"
        >
          <X className="h-4 w-4" />
        </button>
        {content}
      </aside>

      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden
        />
      )}
    </>
  );
}
