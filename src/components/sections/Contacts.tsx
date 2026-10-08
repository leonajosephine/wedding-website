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
  phone?: string;
  phoneLabel?: string;
};

export function Contacts() {
  const t = useTranslations('contacts');
  const contacts =
    t.raw('items') as ContactPerson[];

  return (
    <section
      id="contacts"
      className="section bg-[var(--surface)]"
    >
      <div className="container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="eyebrow mb-4">
            {t('eyebrow')}
          </p>

          <h2 className="script text-6xl leading-[0.95] text-[var(--text)] md:text-7xl">
            {t('headingPartOne')}{' '}
            <span className="serif">
              {t('headingPartTwo')}
            </span>{' '}
            {t('headingPartThree')}{' '}
            <span className="serif">
              {t('headingPartFour')}
            </span>
          </h2>

          <div className="mx-auto mt-7 h-px w-20 bg-[rgba(42,37,34,0.22)]" />
        </div>

        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {contacts.map((contact) => (
            <ContactCard
              key={`${contact.name}-${contact.role}`}
              contact={contact}
            />
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-2xl text-center">
          <p className="mb-5 text-sm leading-7 text-[var(--text-soft)] md:text-base md:leading-8">
            {t('bottomText')}
          </p>

          <Button
            variant="secondary"
            onClick={() => {
              window.location.href =
                `tel:${t('urgentPhone')}`;
            }}
          >
            <Phone className="h-4 w-4" />
            {t('urgentCta')}
          </Button>
        </div>
      </div>
    </section>
  );
}

function ContactCard({
  contact
}: {
  contact: ContactPerson;
}) {
  return (
    <article className="group relative overflow-hidden rounded-md border border-[var(--border-soft)] bg-[rgba(255,250,242,0.68)] shadow-[var(--shadow-paper)] transition duration-500 lg:hover:-translate-y-1 lg:hover:shadow-lg">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={contact.image}
          alt={contact.name}
          fill
          className="
            object-cover
            grayscale-[0.88]
            sepia-[0.34]
            saturate-[0.72]
            contrast-[1.1]
            brightness-[0.96]
            transition-all
            duration-700

            lg:group-hover:scale-[1.035]
            lg:group-hover:grayscale-0
            lg:group-hover:sepia-0
            lg:group-hover:saturate-100
            lg:group-hover:contrast-100
            lg:group-hover:brightness-100
          "
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(17,17,17,0.08)] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5 text-center sm:p-6">
        <h3 className="serif text-2xl leading-tight text-[var(--text)]">
          {contact.name}
        </h3>

        <p className="mt-1.5 text-[0.65rem] uppercase tracking-[0.16em] text-[var(--text-muted)]">
          {contact.role}
        </p>

        {/*
          Mobile + tablet:
          content always visible.

          Desktop:
          subtle reveal on hover.
        */}
        <div
          className="
            mt-4
            opacity-100
            lg:mt-0
            lg:grid
            lg:grid-rows-[0fr]
            lg:opacity-0
            lg:transition-[grid-template-rows,opacity,margin]
            lg:duration-500
            lg:group-hover:mt-4
            lg:group-hover:grid-rows-[1fr]
            lg:group-hover:opacity-100
          "
        >
          <div className="lg:overflow-hidden">
            {contact.funFact && (
              <p className="mx-auto max-w-sm text-sm leading-6 text-[var(--text-soft)]">
                {contact.funFact}
              </p>
            )}

            {contact.phone && (
              <a
                href={`tel:${contact.phone.replace(
                  /\s/g,
                  ''
                )}`}
                className="
                  mt-4
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  border
                  border-[rgba(83,99,75,0.34)]
                  px-4
                  py-2
                  text-[0.65rem]
                  font-medium
                  uppercase
                  tracking-[0.13em]
                  text-[var(--brand-600)]
                  transition
                  hover:border-[var(--brand-600)]
                  hover:bg-[var(--brand-50)]
                "
              >
                <Phone className="h-3.5 w-3.5" />

                {contact.phoneLabel ??
                  contact.phone}
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}