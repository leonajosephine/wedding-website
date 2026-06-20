'use client';

import {useMemo, useSyncExternalStore} from 'react';
import {Check, X, Users, PartyPopper, Beef, Leaf, Sprout} from 'lucide-react';
import {getRsvpResponses, RsvpResponse} from '@/lib/rsvpStorage';

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener('rsvp-storage-change', callback);

  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('rsvp-storage-change', callback);
  };
}

function getSnapshot() {
  return JSON.stringify(getRsvpResponses());
}

function getServerSnapshot() {
  return JSON.stringify([]);
}

export default function GuestlistPage() {
  const responsesJson = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const responses = useMemo<RsvpResponse[]>(
    () => JSON.parse(responsesJson),
    [responsesJson]
  );

  const stats = useMemo(() => {
    const attending = responses.filter((item) => item.attending === 'yes');
    const declined = responses.filter((item) => item.attending === 'no');

    return {
      total: responses.length,
      attending: attending.length,
      declined: declined.length,
      polterabend: responses.filter((item) => item.polterabend).length,
      meat: attending.filter((item) => item.menu === 'meat').length,
      vegetarian: attending.filter((item) => item.menu === 'vegetarian').length,
      vegan: attending.filter((item) => item.menu === 'vegan').length
    };
  }, [responses]);

  return (
    <main className="min-h-screen bg-[var(--background)] px-6 py-24">
      <div className="container">
        <div className="mb-12">
          <p className="eyebrow mb-4">Admin</p>

          <h1 className="serif text-5xl text-[var(--text)] md:text-7xl">
            Guestlist
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--text-soft)]">
            Mock-Daten aus dem RSVP-Formular. Später ersetzen wir die lokale
            Speicherung durch Supabase.
          </p>
        </div>

        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={<Users />} label="Antworten" value={stats.total} />
          <StatCard icon={<Check />} label="Zusagen" value={stats.attending} />
          <StatCard icon={<X />} label="Absagen" value={stats.declined} />
          <StatCard icon={<PartyPopper />} label="Polterabend" value={stats.polterabend} />
        </div>

        <div className="mb-10 grid gap-4 sm:grid-cols-3">
          <StatCard icon={<Beef />} label="Fleisch" value={stats.meat} />
          <StatCard icon={<Leaf />} label="Vegetarisch" value={stats.vegetarian} />
          <StatCard icon={<Sprout />} label="Vegan" value={stats.vegan} />
        </div>

        <div className="overflow-hidden rounded-sm border border-[var(--border-soft)] bg-[rgba(255,250,242,0.72)] shadow-[var(--shadow-paper)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse text-left text-sm">
              <thead className="border-b border-[var(--border-soft)] text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
                <tr>
                  <th className="px-5 py-4">Name</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Polterabend</th>
                  <th className="px-5 py-4">Menü</th>
                  <th className="px-5 py-4">Allergien</th>
                  <th className="px-5 py-4">Songwunsch</th>
                  <th className="px-5 py-4">E-Mail</th>
                </tr>
              </thead>

              <tbody>
                {responses.map((item) => (
                  <tr key={item.id} className="border-b border-[var(--border-soft)] last:border-b-0">
                    <td className="px-5 py-4 serif text-xl text-[var(--text)]">
                      {item.firstName} {item.lastName}
                    </td>
                    <td className="px-5 py-4">
                      {item.attending === 'yes' ? 'Kommt' : 'Kommt nicht'}
                    </td>
                    <td className="px-5 py-4">{item.polterabend ? 'Ja' : 'Nein'}</td>
                    <td className="px-5 py-4">{item.menu || '–'}</td>
                    <td className="px-5 py-4">{item.allergies || '–'}</td>
                    <td className="px-5 py-4">{item.songWish || '–'}</td>
                    <td className="px-5 py-4">{item.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

function StatCard({
  icon,
  label,
  value
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <article className="rounded-sm border border-[var(--border-soft)] bg-[rgba(255,250,242,0.72)] p-5 shadow-[var(--shadow-paper)]">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(184,196,170,0.24)] text-[var(--brand-600)]">
        {icon}
      </div>

      <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
        {label}
      </p>

      <p className="serif mt-2 text-4xl text-[var(--text)]">{value}</p>
    </article>
  );
}