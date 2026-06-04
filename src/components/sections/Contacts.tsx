'use client';

import Image from 'next/image';
import {Phone} from 'lucide-react';
import {useTranslations} from 'next-intl';
import {Button} from '@/components/ui/Button';

type ContactPerson = {
  name: string;
  role: string;
  image: string;
  funFact?: string;
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
            Wir <span className="serif">sind für</span> euch{' '}
            <span className="serif">da</span>
          </h2>

          <div className="mx-auto mt-7 h-px w-20 bg-[rgba(42,37,34,0.22)]" />
        </div>

        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {contacts.map((contact) => (
            <article
              key={`${contact.name}-${contact.role}`}
              className="group relative overflow-hidden rounded-md border border-[var(--border-soft)] bg-[rgba(255,250,242,0.68)] shadow-[var(--shadow-paper)] transition duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={contact.image}
                  alt={contact.name}
                  fill
                  className="object-cover grayscale contrast-[0.95] transition duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
                  sizes="(max-width: 768px) 100vw, 380px"
                />
              </div>

              <div className="p-6 text-center">
                <h3 className="serif text-2xl text-[var(--text)]">
                  {contact.name}
                </h3>

                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
                  {contact.role}
                </p>

                {contact.funFact && (
                  <p className="mx-auto mt-4 max-w-xs text-sm leading-7 text-[var(--text-soft)] hidden group-hover:block transform transition-transform duration-500 ease-out">
                    {contact.funFact}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-2xl text-center">
          <p className="mb-5 text-sm leading-7 text-[var(--text-soft)]">
            {t('bottomText')}
          </p>

          <Button
            variant="secondary"
            onClick={() => window.location.href = `tel:${t('urgentPhone')}`}
          >
            <Phone className="h-4 w-4" />
            {t('urgentCta')}
          </Button>
        </div>
      </div>
    </section>
  );
}