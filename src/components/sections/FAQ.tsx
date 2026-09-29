'use client';

import {useState} from 'react';
import {Heart, Plus} from 'lucide-react';
import {useTranslations} from 'next-intl';

type FAQItem = {
  question: string;
  answer: string;
};

export function FAQ() {
  const t = useTranslations('faq');
  const faqs = t.raw('items') as FAQItem[];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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

            return (
              <div
                key={faq.question}
                className="border-b border-[var(--border)]"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="group flex w-full items-center gap-4 py-6 text-left md:gap-5 md:py-7"
                  aria-expanded={isOpen}
                >
                  {/* Heart bullet */}
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

                  {/* Question */}
                  <span className="script flex-1 text-xl leading-snug text-[var(--text)] transition-colors group-hover:text-[var(--text-strong)] md:text-2xl">
                    {faq.question}
                  </span>

                  {/* Open / close */}
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
                  className={`overflow-hidden transition-all duration-500 ease-out ${
                    isOpen
                      ? 'max-h-96 pb-7 opacity-100'
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="pl-12 md:pl-[52px]">
                    <p className="max-w-2xl text-sm leading-7 text-[var(--text-soft)] md:text-base md:leading-8">
                      {faq.answer}
                    </p>
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