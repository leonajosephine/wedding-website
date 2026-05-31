import {Mail, Phone} from 'lucide-react';
import {useTranslations} from 'next-intl';

type ContactPerson = {
  name: string;
  role: string;
  emoji: string;
  email: string;
  phone: string;
};

export function Contacts() {
  const t = useTranslations('contacts');
  const contacts = t.raw('items') as ContactPerson[];

  return (
    <section className="section bg-[var(--surface)]">
      <div className="container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="eyebrow mb-4">{t('eyebrow')}</p>

          <h2 className="script text-6xl leading-[0.95] text-[var(--text)] md:text-7xl">
            Wir <span className="serif">sind für</span> euch <span className="serif">da</span> 
          </h2>

          <div className="mx-auto mt-7 h-px w-20 bg-[rgba(42,37,34,0.22)]" />
        </div>

        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {contacts.map((contact) => (
            <article
              key={contact.email}
              className="relative border rounded-md border-[var(--border-soft)] bg-[rgba(255,250,242,0.68)] p-6 text-center shadow-[var(--shadow-paper)] transition duration-300 before:pointer-events-none before:absolute before:inset-[10px] before:border before:border-[rgba(42,37,34,0.05)] before:content-[''] hover:-translate-y-1"
            >
              <div className="relative">
                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[rgba(184,196,170,0.45)] to-[rgba(83,99,75,0.20)] text-4xl">
                  {contact.emoji}
                </div>

                <h3 className="serif text-2xl text-[var(--text)]">
                  {contact.name}
                </h3>

                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
                  {contact.role}
                </p>

                <div className="mt-5 space-y-3">
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center justify-center gap-2 text-sm text-[var(--text-soft)] transition-colors hover:text-[var(--text)]"
                  >
                    <Mail className="h-4 w-4" />
                    <span>{contact.email}</span>
                  </a>

                  <a
                    href={`tel:${contact.phone}`}
                    className="flex items-center justify-center gap-2 text-sm text-[var(--text-soft)] transition-colors hover:text-[var(--text)]"
                  >
                    <Phone className="h-4 w-4" />
                    <span>{contact.phone}</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-2xl text-center text-sm leading-7 text-[var(--text-soft)]">
          {t('bottomText')}
        </p>
      </div>
    </section>
  );
}