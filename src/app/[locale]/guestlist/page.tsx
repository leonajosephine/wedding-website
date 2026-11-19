'use client';

import {useMemo, useState, type FormEvent} from 'react';
import {
  Check,
  PartyPopper,
  Sprout,
  Users,
  X
} from 'lucide-react';
import type {RsvpResponse} from '@/lib/rsvp';

export default function GuestlistPage() {
  const [responses, setResponses] = useState<RsvpResponse[] | null>(null);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');

  async function unlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!password || loading) return;
    setLoading(true);
    setError('');

    try {
      const result = await fetch('/api/rsvp', {
        headers: {Authorization: 'Bearer ' + password},
        cache: 'no-store'
      });
      if (!result.ok) {
        setError(result.status === 401 ? 'Das Passwort stimmt nicht.' : 'Die Gästeliste konnte nicht geladen werden.');
        return;
      }
      setResponses(await result.json());
      setPassword('');
    } catch {
      setError('Die Gästeliste konnte nicht geladen werden.');
    } finally {
      setLoading(false);
    }
  }

  const stats = useMemo(() => {
    const entries = responses ?? [];
    const attending = entries.filter((item) => item.attending === 'yes');
    const declined = entries.filter((item) => item.attending === 'no');

    return {
      total: entries.length,
      attending: attending.length,
      declined: declined.length,
      polterabend: entries.filter((item) => item.polterabend).length,
      vegan: attending.filter((item) => item.vegan === true).length
    };
  }, [responses]);

  const sortedResponses = useMemo(() => {
    const compareNames = (a: RsvpResponse, b: RsvpResponse) =>
      a.lastName.localeCompare(b.lastName, 'de', {sensitivity: 'base'}) ||
      a.firstName.localeCompare(b.firstName, 'de', {sensitivity: 'base'});

    return [...(responses ?? [])].sort((a, b) => {
      if (sortOrder === 'name') return compareNames(a, b);
      if (sortOrder === 'attendance') {
        return Number(b.attending === 'yes') - Number(a.attending === 'yes') || compareNames(a, b);
      }
      return Date.parse(b.submittedAt) - Date.parse(a.submittedAt);
    });
  }, [responses, sortOrder]);

  const attendingPercent =
    stats.total > 0 ? Math.round((stats.attending / stats.total) * 100) : 0;

  const declinedPercent =
    stats.total > 0 ? Math.round((stats.declined / stats.total) * 100) : 0;

  if (!responses) {
    return (
      <main className="min-h-screen bg-[var(--background)] px-4 py-12 sm:px-6 sm:py-24">
        <form onSubmit={unlock} className="mx-auto max-w-md space-y-4">
          <h1 className="serif text-4xl">Gästeliste</h1>
          <label className="block">
            Passwort für die Gästeliste
            <input
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 block w-full border border-[var(--border)] p-3"
            />
          </label>
          <button type="submit" disabled={loading} className="bg-[var(--brand-600)] px-5 py-2 text-white">
            {loading ? 'Wird geladen …' : 'Gästeliste öffnen'}
          </button>
          {error && <p role="alert">{error}</p>}
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-12 sm:px-6 sm:py-24">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-12">
          <p className="eyebrow mb-4">Admin</p>

          <h1 className="serif text-5xl text-[var(--text)] md:text-7xl">
            Gästeliste 💒
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--text-soft)]">
            Rückmeldungen aus dem Hochzeitsformular.
          </p>
        </div>

        <div className="mb-12 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <section className="relative overflow-hidden rounded-sm border border-[var(--border-soft)] bg-[rgba(255,250,242,0.72)] p-5 shadow-[var(--shadow-paper)] md:p-9">
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
              hint="kommen am Mittwoch, 12. Mai"
            />

            <MiniStat
              icon={<Users />}
              label="Zusagen"
              value={stats.attending}
              hint="für den Hochzeitstag"
            />

            <MenuSummary
              vegan={stats.vegan}
            />
          </section>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
          <label htmlFor="guestlist-sort" className="text-sm text-[var(--text-soft)]">Sortieren nach</label>
          <select id="guestlist-sort" value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}
            className="min-h-11 rounded-sm border border-[var(--border-soft)] bg-[var(--surface)] px-3 py-2 text-sm">
            <option value="newest">Anmeldedatum · neueste zuerst</option>
            <option value="name">Nachname · A–Z</option>
            <option value="attendance">Zusagen zuerst · danach Absagen</option>
          </select>
        </div>

        {responses.length === 0 && (
          <p className="py-8 text-center text-[var(--text-soft)]">Es sind noch keine Rückmeldungen eingegangen.</p>
        )}

        <div className="min-w-0 overflow-hidden rounded-sm border border-[var(--border-soft)] bg-[rgba(255,250,242,0.72)] shadow-[var(--shadow-paper)]">
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
                {sortedResponses.map((item) => (
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
                    <td className="px-5 py-4">{item.attending === 'yes' ? (item.vegan ? 'Vegan' : 'Keine vegane Auswahl') : '–'}</td>
                    <td className="max-w-xs whitespace-pre-wrap break-words px-5 py-4 [overflow-wrap:anywhere]">{item.allergies || '–'}</td>
                    <td className="max-w-xs whitespace-pre-wrap break-words px-5 py-4 [overflow-wrap:anywhere]">{item.songWish || '–'}</td>
                    <td className="max-w-xs break-words px-5 py-4 [overflow-wrap:anywhere]">{item.email}</td>
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
  vegan
}: {
  vegan: number;
}) {
  return (
    <article className="relative overflow-hidden rounded-sm border border-[var(--border-soft)] bg-[rgba(255,250,242,0.72)] p-5 shadow-[var(--shadow-paper)] sm:col-span-2">
      <div className="pointer-events-none absolute inset-[10px] border border-[rgba(42,37,34,0.05)]" />

      <div className="relative">
        <p className="eyebrow mb-5">Menüauswahl</p>

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