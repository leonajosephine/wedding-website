'use client';

import {useMemo, useSyncExternalStore} from 'react';
import {
  Beef,
  Check,
  Leaf,
  PartyPopper,
  Sprout,
  Users,
  X
} from 'lucide-react';
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
      polterabend: attending.filter((item) => item.polterabend).length,
      meat: attending.filter((item) => item.menu === 'meat').length,
      vegetarian: attending.filter((item) => item.menu === 'vegetarian').length,
      vegan: attending.filter((item) => item.menu === 'vegan').length
    };
  }, [responses]);

  const attendingPercent =
    stats.total > 0 ? Math.round((stats.attending / stats.total) * 100) : 0;

  const declinedPercent =
    stats.total > 0 ? Math.round((stats.declined / stats.total) * 100) : 0;

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

        <div className="mb-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="relative overflow-hidden rounded-sm border border-[var(--border-soft)] bg-[rgba(255,250,242,0.72)] p-7 shadow-[var(--shadow-paper)] md:p-9">
            <div className="pointer-events-none absolute inset-[12px] border border-[rgba(42,37,34,0.05)]" />

            <div className="relative flex flex-col items-center gap-8 text-center sm:flex-row sm:text-left">
              <DonutChart
                attendingPercent={attendingPercent}
                declinedPercent={declinedPercent}
                centerLabel={`${attendingPercent}%`}
              />

              <div>
                <p className="eyebrow mb-3">Antwortstatus</p>

                <h2 className="serif text-4xl leading-none text-[var(--text)] md:text-5xl">
                  {stats.total} Antworten
                </h2>

                <p className="mt-4 max-w-sm text-sm leading-7 text-[var(--text-soft)]">
                  Aktueller Überblick über Zusagen und Absagen aus dem
                  RSVP-Formular.
                </p>

                <div className="mt-6 grid gap-3 text-sm">
                  <LegendRow
                    icon={<Check className="h-4 w-4" />}
                    label="Zusagen"
                    value={`${stats.attending} · ${attendingPercent}%`}
                  />

                  <LegendRow
                    icon={<X className="h-4 w-4" />}
                    label="Absagen"
                    value={`${stats.declined} · ${declinedPercent}%`}
                    muted
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-4 sm:grid-cols-2">
            <MiniStat
              icon={<PartyPopper />}
              label="Polterabend"
              value={stats.polterabend}
              hint="kommen am Freitag"
            />

            <MiniStat
              icon={<Users />}
              label="Zusagen"
              value={stats.attending}
              hint="für den Hochzeitstag"
            />

            <MenuSummary
              meat={stats.meat}
              vegetarian={stats.vegetarian}
              vegan={stats.vegan}
            />
          </section>
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
                  <tr
                    key={item.id}
                    className="border-b border-[var(--border-soft)] last:border-b-0"
                  >
                    <td className="px-5 py-4 serif text-xl text-[var(--text)]">
                      {item.firstName} {item.lastName}
                    </td>
                    <td className="px-5 py-4">
                      {item.attending === 'yes' ? 'Kommt' : 'Kommt nicht'}
                    </td>
                    <td className="px-5 py-4">
                      {item.polterabend ? 'Ja' : 'Nein'}
                    </td>
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

function DonutChart({
  attendingPercent,
  declinedPercent,
  centerLabel
}: {
  attendingPercent: number;
  declinedPercent: number;
  centerLabel: string;
}) {
  const radius = 72;
  const circumference = 2 * Math.PI * radius;

  const attendingStroke = (attendingPercent / 100) * circumference;
  const declinedStroke = (declinedPercent / 100) * circumference;

  return (
    <div className="relative h-48 w-48 shrink-0">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 180 180">
        <circle
          cx="90"
          cy="90"
          r={radius}
          fill="none"
          stroke="rgba(42,37,34,0.08)"
          strokeWidth="13"
        />

        <circle
          cx="90"
          cy="90"
          r={radius}
          fill="none"
          stroke="var(--brand-500)"
          strokeWidth="13"
          strokeLinecap="round"
          strokeDasharray={`${attendingStroke} ${circumference}`}
        />

        {declinedPercent > 0 && (
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke="rgba(42,37,34,0.28)"
            strokeWidth="13"
            strokeLinecap="round"
            strokeDasharray={`${declinedStroke} ${circumference}`}
            strokeDashoffset={-attendingStroke - 8}
          />
        )}
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <p className="serif text-5xl leading-none text-[var(--text)]">
          {centerLabel}
        </p>
        <p className="mt-2 text-[0.58rem] uppercase tracking-[0.18em] text-[var(--text-muted)]">
          Zusagen
        </p>
      </div>
    </div>
  );
}

function LegendRow({
  icon,
  label,
  value,
  muted = false
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-t border-[var(--border-soft)] pt-3">
      <div className="flex items-center gap-2 text-[var(--text-soft)]">
        <span
          className={`flex h-7 w-7 items-center justify-center rounded-full ${
            muted
              ? 'bg-[rgba(42,37,34,0.08)] text-[var(--text-muted)]'
              : 'bg-[rgba(184,196,170,0.26)] text-[var(--brand-600)]'
          }`}
        >
          {icon}
        </span>
        <span>{label}</span>
      </div>

      <span className="serif text-xl text-[var(--text)]">{value}</span>
    </div>
  );
}

function MiniStat({
  icon,
  label,
  value,
  hint
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  hint: string;
}) {
  return (
    <article className="relative overflow-hidden rounded-sm border border-[var(--border-soft)] bg-[rgba(255,250,242,0.72)] p-5 shadow-[var(--shadow-paper)]">
      <div className="pointer-events-none absolute inset-[10px] border border-[rgba(42,37,34,0.05)]" />

      <div className="relative">
        <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(184,196,170,0.24)] text-[var(--brand-600)]">
          {icon}
        </div>

        <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
          {label}
        </p>

        <p className="serif mt-2 text-5xl text-[var(--text)]">{value}</p>

        <p className="mt-2 text-sm text-[var(--text-soft)]">{hint}</p>
      </div>
    </article>
  );
}

function MenuSummary({
  meat,
  vegetarian,
  vegan
}: {
  meat: number;
  vegetarian: number;
  vegan: number;
}) {
  return (
    <article className="relative overflow-hidden rounded-sm border border-[var(--border-soft)] bg-[rgba(255,250,242,0.72)] p-5 shadow-[var(--shadow-paper)] sm:col-span-2">
      <div className="pointer-events-none absolute inset-[10px] border border-[rgba(42,37,34,0.05)]" />

      <div className="relative">
        <p className="eyebrow mb-5">Menüauswahl</p>

        <MenuRow icon={<Beef />} label="Fleisch" value={meat} />
        <MenuRow icon={<Leaf />} label="Vegetarisch" value={vegetarian} />
        <MenuRow icon={<Sprout />} label="Vegan" value={vegan} />
      </div>
    </article>
  );
}

function MenuRow({
  icon,
  label,
  value
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="flex items-center justify-between border-t border-[var(--border-soft)] py-3 first:border-t-0">
      <div className="flex items-center gap-3 text-sm text-[var(--text-soft)]">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(184,196,170,0.22)] text-[var(--brand-600)]">
          {icon}
        </span>
        {label}
      </div>

      <span className="serif text-2xl text-[var(--text)]">{value}</span>
    </div>
  );
}