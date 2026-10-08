'use client';

import {useState} from 'react';
import {
  ArrowDownRight,
  ExternalLink,
  Heart,
  Plus
} from 'lucide-react';
import {useTranslations} from 'next-intl';

type FAQItem = {
  question: string;
  answer: string;
  link?: string;
  linkLabel?: string;
};

export function FAQ() {
  const t = useTranslations('faq');
  const faqs = t.raw('items') as FAQItem[];

  const [openIndex, setOpenIndex] =
    useState<number | null>(0);

  return (
    <section
      id="faq"
      className="section relative overflow-hidden bg-[var(--background-soft)]"
    >
      <div className="container max-w-4xl">
        <p className="eyebrow mx-auto max-w-2xl text-center">
          {t('eyebrow')}
        </p>

        <h2 className="serif mb-10 text-center text-3xl leading-tight text-[var(--text)] md:mb-12 md:text-7xl">
          {t('title')}
        </h2>

        <div className="mx-auto max-w-3xl">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const isExternalLink =
              faq.link?.startsWith('http');

            return (
              <div
                key={faq.question}
                className="border-b border-[var(--border)]"
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenIndex(
                      isOpen ? null : index
                    )
                  }
                  className="group flex w-full items-center gap-4 py-6 text-left md:gap-5 md:py-7"
                  aria-expanded={isOpen}
                >
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center transition-colors duration-300 ${
                      isOpen
                        ? 'text-[var(--brand-600)]'
                        : 'text-[var(--brand-400)]'
                    }`}
                  >
                    <Heart
                      strokeWidth={1.35}
                      className="h-[18px] w-[18px]"
                    />
                  </div>

                  <span className="script flex-1 text-xl leading-snug text-[var(--text)] transition-colors group-hover:text-[var(--text-strong)] md:text-2xl">
                    {faq.question}
                  </span>

                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                      isOpen
                        ? 'rotate-45 border-[var(--brand-600)] bg-[var(--brand-600)] text-[var(--background)]'
                        : 'border-[var(--border-brand)] text-[var(--brand-600)]'
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                  </div>
                </button>

                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
                    isOpen
                      ? 'grid-rows-[1fr] opacity-100'
                      : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="pb-7 pl-12 md:pl-[52px]">
                      <p className="max-w-2xl text-sm leading-7 text-[var(--text-soft)] md:text-base md:leading-8">
                        {faq.answer}
                      </p>

                      {faq.link &&
                        faq.linkLabel && (
                          <a
                            href={faq.link}
                            {...(isExternalLink
                              ? {
                                  target: '_blank',
                                  rel: 'noopener noreferrer'
                                }
                              : {})}
                            className="group/link mt-4 inline-flex items-center gap-2 border-b border-[rgba(83,99,75,0.32)] pb-1 text-xs font-medium uppercase tracking-[0.13em] text-[var(--brand-600)] transition-colors hover:border-[var(--brand-600)] md:text-[0.78rem]"
                          >
                            {faq.linkLabel}

                            {isExternalLink ? (
                              <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                            ) : (
                              <ArrowDownRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:translate-y-0.5" />
                            )}
                          </a>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}