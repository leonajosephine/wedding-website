'use client';

import {useState} from 'react';
import {Plus} from 'lucide-react';
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
    <section id="faq" className="section relative overflow-hidden bg-[var(--background-soft)]">
      <div className="container max-w-4xl">
        <p className="eyebrow mx-auto max-w-2xl text-center">
          {t('eyebrow')}
        </p>

        <h2 className="serif mb-8 text-center text-3xl leading-tight text-[var(--text)] md:text-7xl">
          {t('title')}
        </h2>

        <div className="mx-auto max-w-3xl">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={faq.question} className="overflow-hidden border-b border-[var(--border)]">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="group flex w-full items-center justify-between gap-5 py-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-base leading-relaxed text-[var(--text)] transition-colors group-hover:text-[var(--text-strong)] md:text-lg">
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

                <div className={`overflow-hidden transition-all duration-500 ease-out ${
                  isOpen ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <p className="max-w-2xl text-sm leading-7 text-[var(--text-soft)] md:text-base">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}