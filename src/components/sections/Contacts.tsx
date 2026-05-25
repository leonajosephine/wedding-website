import {Mail, Phone} from 'lucide-react';
import {useTranslations} from 'next-intl';
import {SectionHeader} from '@/components/ui/SectionHeader';

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
        <SectionHeader eyebrow={t('eyebrow')} title={t('title')} />

        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {contacts.map((contact) => (
            <article
              key={contact.email}
              className="card rounded-[1.8rem] p-6 text-center transition duration-300 hover:-translate-y-1"
            >
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[rgba(173,169,142,0.55)] to-[rgba(93,103,78,0.35)] text-4xl">
                {contact.emoji}
              </div>

              <h3 className="serif text-2xl text-[var(--text)]">
                {contact.name}
              </h3>

              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[var(--olive)]">
                {contact.role}
              </p>

              <div className="mt-5 space-y-3">
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center justify-center gap-2 text-sm text-[var(--text-soft)] transition-colors hover:text-[var(--olive-dark)]"
                >
                  <Mail className="h-4 w-4" />
                  <span>{contact.email}</span>
                </a>

                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center justify-center gap-2 text-sm text-[var(--text-soft)] transition-colors hover:text-[var(--olive-dark)]"
                >
                  <Phone className="h-4 w-4" />
                  <span>{contact.phone}</span>
                </a>
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