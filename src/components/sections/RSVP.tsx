'use client';

import Image from 'next/image';
import {useState} from 'react';
import {Calendar, Check, ChevronLeft, ChevronRight} from 'lucide-react';
import {useTranslations} from 'next-intl';
import {Button} from '@/components/ui/Button';
import {saveRsvpResponse} from '@/lib/rsvpStorage';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  attending: 'yes' | 'no' | '';
  polterabend: boolean;
  menu: 'meat' | 'vegetarian' | 'vegan' | '';
  allergies: string;
  songWish: string;
};

const initialFormData: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  attending: '',
  polterabend: false,
  menu: '',
  allergies: '',
  songWish: ''
};

export function RSVP() {
  const t = useTranslations('rsvp');

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const totalSteps = formData.attending === 'yes' ? 3 : 2;

  const canProceed = () => {
    if (step === 1) {
      return formData.firstName && formData.lastName && formData.email;
    }

    if (step === 2) {
      return formData.attending;
    }

    return true;
  };

  const handleSubmit = () => {
    if (formData.attending !== 'yes' && formData.attending !== 'no') return;
  
    saveRsvpResponse({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      attending: formData.attending,
      polterabend: formData.attending === 'yes' ? formData.polterabend : false,
      menu: formData.attending === 'yes' ? (formData.menu as FormData['menu']) : '',
      allergies: formData.attending === 'yes' ? formData.allergies : '',
      songWish: formData.attending === 'yes' ? formData.songWish : ''
    });
  
    setSubmitted(true);
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setStep(1);
    setSubmitted(false);
  };

  const addToCalendar = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:20270515T140000
DTEND:20270516T020000
SUMMARY:${t('calendarSummary')}
DESCRIPTION:${t('calendarDescription')}
LOCATION:${t('calendarLocation')}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], {type: 'text/calendar'});
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = t('calendarFileName');
    link.click();

    URL.revokeObjectURL(url);
  };

  if (submitted) {
    return (
      <section
        id="rsvp"
        className="section relative overflow-hidden bg-[linear-gradient(135deg,var(--brand-100),var(--background-soft)_52%,var(--sand))]"
      >
        <div className="container relative z-10 max-w-2xl text-center">
          <div className="paper-card rounded-[0.4rem] p-7 sm:p-10 md:p-14">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--brand-600)]">
              <Check className="h-8 w-8 text-[var(--background)]" />
            </div>

            <h3 className="script mb-4 text-5xl text-[var(--brand-600)] sm:text-6xl">
              {t('successTitle')}
            </h3>

            <p className="mx-auto max-w-xl text-sm leading-7 text-[var(--text-soft)] sm:text-base">
              {t('successText')}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              {formData.attending === 'yes' && (
                <Button variant="primary" onClick={addToCalendar} className="w-full sm:w-auto">
                  <Calendar className="h-4 w-4" />
                  {t('calendarCta')}
                </Button>
              )}

              <Button variant="secondary" onClick={resetForm} className="w-full sm:w-auto">
                {t('addAnotherCta')}
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="rsvp"
      className="section relative overflow-hidden bg-[linear-gradient(135deg,var(--brand-100),var(--background-soft)_52%,var(--sand))]"
      style={{
        backgroundImage: `url('/images/intro/bg.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity: 0.9
      }}
    >
      <div className="container relative z-10 max-w-2xl">
        <div className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
          <p className="eyebrow mb-3">{t('eyebrow')}</p>

          <h2 className="serif text-5xl leading-[0.95] text-[var(--text)] sm:text-6xl md:text-7xl lg:text-8xl">
            {t('title')}
          </h2>

          <div className="mx-auto mt-6 h-px w-14 bg-[rgba(42,37,34,0.22)]" />
        </div>

        <div className="mb-8">
          <div className="mb-2 flex justify-between text-xs text-[var(--text-soft)]">
            <span>
              {t('step')} {step} / {totalSteps}
            </span>
            <span>{Math.round((step / totalSteps) * 100)}%</span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-[rgba(83,99,75,0.18)]">
            <div
              className="h-full rounded-full bg-[var(--brand-600)] transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        <div className="paper-card rounded-[0.4rem] p-5 sm:p-7 md:p-10">
          {step === 1 && (
            <div>
              <h3 className="serif mb-2 text-2xl text-[var(--text)] sm:text-3xl">
                {t('contactTitle')}
              </h3>

              <p className="mb-6 text-sm leading-7 text-[var(--text-soft)]">
                {t('contactText')}
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label={t('firstName')}
                  value={formData.firstName}
                  onChange={(value) => setFormData({ ...formData, firstName: value })}
                />
                <Input
                  label={t('lastName')}
                  value={formData.lastName}
                  onChange={(value) => setFormData({ ...formData, lastName: value })}
                />
              </div>

              <div className="mt-4">
                <Input
                  type="email"
                  label={t('email')}
                  value={formData.email}
                  onChange={(value) => setFormData({ ...formData, email: value })}
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="serif mb-2 text-2xl text-[var(--text)] sm:text-3xl">
                {t('attendanceTitle')}
              </h3>

              <p className="mb-6 text-sm leading-7 text-[var(--text-soft)]">
                {t('attendanceText')}
              </p>

              <div className="grid gap-4">
                <ChoiceCard
                  active={formData.attending === 'yes'}
                  onClick={() => setFormData({ ...formData, attending: 'yes' })}
                  title={t('yesTitle')}
                  text={t('yesText')}
                />
                <ChoiceCard
                  active={formData.attending === 'no'}
                  onClick={() => setFormData({ ...formData, attending: 'no' })}
                  title={t('noTitle')}
                  text={t('noText')}
                />
              </div>
            </div>
          )}

          {step === 3 && formData.attending === 'yes' && (
            <div>
              <h3 className="serif mb-2 text-2xl text-[var(--text)] sm:text-3xl">
                {t('detailsTitle')}
              </h3>

              <p className="mb-6 text-sm leading-7 text-[var(--text-soft)]">
                {t('detailsText')}
              </p>

              <label className="mb-4 flex cursor-pointer gap-3 border border-[var(--border)] bg-[rgba(255,250,242,0.36)] p-4 text-sm leading-6 text-[var(--text-soft)]">
                <input
                  type="checkbox"
                  checked={formData.polterabend}
                  onChange={(e) =>
                    setFormData({ ...formData, polterabend: e.target.checked })
                  }
                  className="mt-1 accent-[var(--brand-600)]"
                />
                <span>{t('polterabend')}</span>
              </label>

              <div className="space-y-4">
                <Select
                  label={t('menu')}
                  value={formData.menu}
                  onChange={(value) =>
                    setFormData({ ...formData, menu: value as FormData['menu'] })
                  }
                  t={t}
                />
                <Input
                  label={t('allergies')}
                  value={formData.allergies}
                  onChange={(value) => setFormData({ ...formData, allergies: value })}
                />
                <Input
                  label={t('songWish')}
                  value={formData.songWish}
                  onChange={(value) => setFormData({ ...formData, songWish: value })}
                />
              </div>
            </div>
          )}

          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-[var(--border)] pt-6 sm:flex-row sm:items-center sm:justify-between">
            <Button
              variant="ghost"
              onClick={() => setStep(step - 1)}
              disabled={step === 1}
              className="w-full sm:w-auto"
            >
              <ChevronLeft className="h-4 w-4" />
              {t('back')}
            </Button>

            {step < totalSteps ? (
              <Button
                variant="primary"
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
                className="w-full sm:w-auto"
              >
                {t('next')}
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button variant="primary" onClick={handleSubmit} className="w-full sm:w-auto">
                {t('submit')}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Input({label, value, onChange, type = 'text'}: {label: string; value: string; onChange: (value: string) => void; type?: string}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-[0.14em] text-(--text-soft)">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-(--border) bg-[rgba(255,250,242,0.72)] px-4 py-3 text-sm outline-none transition focus:border-(--brand-600)"
      />
    </label>
  );
}

function Select({label, value, onChange, t}: {label: string; value: string; onChange: (value: string) => void; t: (key: string) => string}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-[0.14em] text-[var(--text-soft)]">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-[var(--border)] bg-[rgba(255,250,242,0.72)] px-4 py-3 text-sm outline-none transition focus:border-[var(--brand-600)]"
      >
        <option value="">{t('menuPlaceholder')}</option>
        <option value="meat">{t('menuMeat')}</option>
        <option value="vegetarian">{t('menuVegetarian')}</option>
        <option value="vegan">{t('menuVegan')}</option>
      </select>
    </label>
  );
}

function ChoiceCard({active, onClick, title, text}: {active: boolean; onClick: () => void; title: string; text: string}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border p-4 text-left transition sm:p-5 ${
        active
          ? 'border-[var(--brand-600)] bg-[rgba(184,196,170,0.22)]'
          : 'border-[var(--border)] bg-[rgba(255,250,242,0.34)] hover:border-[var(--border-brand)]'
      }`}
    >
      <div className="font-medium text-[var(--text)]">{title}</div>
      <div className="mt-1 text-sm leading-6 text-[var(--text-soft)]">{text}</div>
    </button>
  );
}