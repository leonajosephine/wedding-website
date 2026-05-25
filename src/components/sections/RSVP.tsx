'use client';

import {useState} from 'react';
import {Check, ChevronLeft, ChevronRight} from 'lucide-react';
import {useTranslations} from 'next-intl';
import {SectionHeader} from '@/components/ui/SectionHeader';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  attending: 'yes' | 'no' | '';
  polterabend: boolean;
  menu: string;
  allergies: string;
  songWish: string;
};

export function RSVP() {
  const t = useTranslations('rsvp');

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    attending: '',
    polterabend: false,
    menu: '',
    allergies: '',
    songWish: ''
  });

  const totalSteps = formData.attending === 'yes' ? 3 : 2;

  const canProceed = () => {
    if (step === 1) return formData.firstName && formData.lastName && formData.email;
    if (step === 2) return formData.attending;
    return true;
  };

  const handleSubmit = () => {
    console.log('RSVP submitted:', formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="rsvp" className="section bg-gradient-to-br from-[#d8e4d9] via-[#f5efe3] to-[#d7d0b5]">
        <div className="container max-w-2xl text-center">
          <div className="card rounded-[2rem] p-10 md:p-14">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--olive-dark)]">
              <Check className="h-8 w-8 text-[var(--background)]" />
            </div>

            <h3 className="script mb-4 text-6xl text-[var(--olive-dark)]">
              {t('successTitle')}
            </h3>

            <p className="leading-7 text-[var(--text-soft)]">
              {t('successText')}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="section bg-gradient-to-br from-[#d8e4d9] via-[#f5efe3] to-[#d7d0b5]">
      <div className="container max-w-2xl">
        <SectionHeader eyebrow={t('eyebrow')} title={t('title')} />

        <div className="mb-8">
          <div className="mb-2 flex justify-between text-xs text-[var(--text-soft)]">
            <span>{t('step')} {step} / {totalSteps}</span>
            <span>{Math.round((step / totalSteps) * 100)}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-[rgba(93,103,78,0.18)]">
            <div
              className="h-full rounded-full bg-[var(--olive-dark)] transition-all duration-300"
              style={{width: `${(step / totalSteps) * 100}%`}}
            />
          </div>
        </div>

        <div className="card rounded-[2rem] p-7 md:p-10">
          {step === 1 && (
            <div>
              <h3 className="serif mb-2 text-3xl text-[var(--text)]">{t('contactTitle')}</h3>
              <p className="mb-6 text-sm text-[var(--text-soft)]">{t('contactText')}</p>

              <div className="grid gap-4 md:grid-cols-2">
                <Input label={t('firstName')} value={formData.firstName} onChange={(value) => setFormData({...formData, firstName: value})} />
                <Input label={t('lastName')} value={formData.lastName} onChange={(value) => setFormData({...formData, lastName: value})} />
              </div>

              <div className="mt-4">
                <Input type="email" label={t('email')} value={formData.email} onChange={(value) => setFormData({...formData, email: value})} />
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="serif mb-2 text-3xl text-[var(--text)]">{t('attendanceTitle')}</h3>
              <p className="mb-6 text-sm text-[var(--text-soft)]">{t('attendanceText')}</p>

              <div className="grid gap-4">
                <ChoiceCard active={formData.attending === 'yes'} onClick={() => setFormData({...formData, attending: 'yes'})} title={t('yesTitle')} text={t('yesText')} />
                <ChoiceCard active={formData.attending === 'no'} onClick={() => setFormData({...formData, attending: 'no'})} title={t('noTitle')} text={t('noText')} />
              </div>
            </div>
          )}

          {step === 3 && formData.attending === 'yes' && (
            <div>
              <h3 className="serif mb-2 text-3xl text-[var(--text)]">{t('detailsTitle')}</h3>
              <p className="mb-6 text-sm text-[var(--text-soft)]">{t('detailsText')}</p>

              <label className="mb-4 flex cursor-pointer gap-3 rounded-[1rem] border border-[var(--border)] p-4 text-sm text-[var(--text-soft)]">
                <input
                  type="checkbox"
                  checked={formData.polterabend}
                  onChange={(e) => setFormData({...formData, polterabend: e.target.checked})}
                  className="mt-1 accent-[var(--olive-dark)]"
                />
                <span>{t('polterabend')}</span>
              </label>

              <div className="space-y-4">
                <Select label={t('menu')} value={formData.menu} onChange={(value) => setFormData({...formData, menu: value})} />
                <Input label={t('allergies')} value={formData.allergies} onChange={(value) => setFormData({...formData, allergies: value})} />
                <Input label={t('songWish')} value={formData.songWish} onChange={(value) => setFormData({...formData, songWish: value})} />
              </div>
            </div>
          )}

          <div className="mt-8 flex items-center justify-between border-t border-[var(--border)] pt-6">
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              disabled={step === 1}
              className="inline-flex items-center gap-2 text-sm text-[var(--text-soft)] disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
              {t('back')}
            </button>

            {step < totalSteps ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
                className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-40"
              >
                {t('next')}
                <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <button type="button" onClick={handleSubmit} className="btn btn-primary">
                {t('submit')}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Input({label, value, onChange, type = 'text'}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-[0.14em] text-[var(--text-soft)]">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-[0.9rem] border border-[var(--border)] bg-[rgba(252,245,234,0.65)] px-4 py-3 text-sm outline-none transition focus:border-[var(--olive-dark)]"
      />
    </label>
  );
}

function Select({label, value, onChange}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-[0.14em] text-[var(--text-soft)]">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-[0.9rem] border border-[var(--border)] bg-[rgba(252,245,234,0.65)] px-4 py-3 text-sm outline-none transition focus:border-[var(--olive-dark)]"
      >
        <option value="">–</option>
        <option value="meat">Fleisch</option>
        <option value="vegetarian">Vegetarisch</option>
        <option value="vegan">Vegan</option>
      </select>
    </label>
  );
}

function ChoiceCard({active, onClick, title, text}: {
  active: boolean;
  onClick: () => void;
  title: string;
  text: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-[1.2rem] border p-5 text-left transition ${
        active
          ? 'border-[var(--olive-dark)] bg-[rgba(93,103,78,0.10)]'
          : 'border-[var(--border)] bg-transparent hover:border-[var(--olive)]'
      }`}
    >
      <div className="font-medium text-[var(--text)]">{title}</div>
      <div className="mt-1 text-sm text-[var(--text-soft)]">{text}</div>
    </button>
  );
}