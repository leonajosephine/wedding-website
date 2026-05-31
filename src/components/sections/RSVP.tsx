'use client';

import Image from 'next/image';
import {useState} from 'react';
import {Calendar, Check, ChevronLeft, ChevronRight} from 'lucide-react';
import {useTranslations} from 'next-intl';
import {Button} from '@/components/ui/Button';

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
      return (
        formData.firstName &&
        formData.lastName &&
        formData.email
      );
    }

    if (step === 2) {
      return formData.attending;
    }

    return true;
  };

  const handleSubmit = () => {
    console.log('RSVP submitted:', formData);
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
SUMMARY:Hochzeit Merle & Lasse
DESCRIPTION:Wir heiraten! Feiert mit uns diesen besonderen Tag.
LOCATION:Heimathaus Tornesch, Schleswig-Holstein
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], {type: 'text/calendar'});
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'hochzeit-merle-lasse.ics';
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
          <div className="paper-card rounded-[0.4rem] p-10 md:p-14">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--brand-600)]">
              <Check className="h-8 w-8 text-[var(--background)]" />
            </div>

            <h3 className="script mb-4 text-6xl text-[var(--brand-600)]">
              {t('successTitle')}
            </h3>

            <p className="mx-auto max-w-xl leading-7 text-[var(--text-soft)]">
              {t('successText')}
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              {formData.attending === 'yes' && (
                <Button variant="primary" onClick={addToCalendar}>
                  <Calendar className="h-4 w-4" />
                  Zum Kalender hinzufügen
                </Button>
              )}

              <Button variant="secondary" onClick={resetForm}>
                Weitere Person hinzufügen
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
    >

      <div className="container relative z-10 max-w-2xl">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="eyebrow mb-3">{t('eyebrow')}</p>

          <h2 className="serif text-6xl leading-[0.95] text-[var(--text)] md:text-7xl lg:text-8xl">
            {t('title')}
          </h2>

          <div className="mx-auto mt-6 h-px w-14 bg-[rgba(42,37,34,0.22)]" />
        </div>

        {/* progress */}
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
              style={{width: `${(step / totalSteps) * 100}%`}}
            />
          </div>
        </div>

        {/* form card */}
        <div className="paper-card rounded-[0.4rem] p-7 md:p-10">
          {step === 1 && (
            <div>
              <h3 className="serif mb-2 text-3xl text-[var(--text)]">
                {t('contactTitle')}
              </h3>

              <p className="mb-6 text-sm text-[var(--text-soft)]">
                {t('contactText')}
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  label={t('firstName')}
                  value={formData.firstName}
                  onChange={(value) =>
                    setFormData({...formData, firstName: value})
                  }
                />

                <Input
                  label={t('lastName')}
                  value={formData.lastName}
                  onChange={(value) =>
                    setFormData({...formData, lastName: value})
                  }
                />
              </div>

              <div className="mt-4">
                <Input
                  type="email"
                  label={t('email')}
                  value={formData.email}
                  onChange={(value) =>
                    setFormData({...formData, email: value})
                  }
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="serif mb-2 text-3xl text-[var(--text)]">
                {t('attendanceTitle')}
              </h3>

              <p className="mb-6 text-sm text-[var(--text-soft)]">
                {t('attendanceText')}
              </p>

              <div className="grid gap-4">
                <ChoiceCard
                  active={formData.attending === 'yes'}
                  onClick={() =>
                    setFormData({...formData, attending: 'yes'})
                  }
                  title={t('yesTitle')}
                  text={t('yesText')}
                />

                <ChoiceCard
                  active={formData.attending === 'no'}
                  onClick={() =>
                    setFormData({...formData, attending: 'no'})
                  }
                  title={t('noTitle')}
                  text={t('noText')}
                />
              </div>
            </div>
          )}

          {step === 3 && formData.attending === 'yes' && (
            <div>
              <h3 className="serif mb-2 text-3xl text-[var(--text)]">
                {t('detailsTitle')}
              </h3>

              <p className="mb-6 text-sm text-[var(--text-soft)]">
                {t('detailsText')}
              </p>

              <label className="mb-4 flex cursor-pointer gap-3 border border-[var(--border)] bg-[rgba(255,250,242,0.36)] p-4 text-sm text-[var(--text-soft)]">
                <input
                  type="checkbox"
                  checked={formData.polterabend}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      polterabend: e.target.checked
                    })
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
                    setFormData({...formData, menu: value})
                  }
                />

                <Input
                  label={t('allergies')}
                  value={formData.allergies}
                  onChange={(value) =>
                    setFormData({...formData, allergies: value})
                  }
                />

                <Input
                  label={t('songWish')}
                  value={formData.songWish}
                  onChange={(value) =>
                    setFormData({...formData, songWish: value})
                  }
                />
              </div>
            </div>
          )}

          <div className="mt-8 flex items-center justify-between border-t border-[var(--border)] pt-6">
            <Button
              variant="ghost"
              onClick={() => setStep(step - 1)}
              disabled={step === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              {t('back')}
            </Button>

            {step < totalSteps ? (
              <Button
                variant="primary"
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
              >
                {t('next')}
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button variant="primary" onClick={handleSubmit}>
                {t('submit')}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Input({
  label,
  value,
  onChange,
  type = 'text'
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-[0.14em] text-[var(--text-soft)]">
        {label}
      </span>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-[var(--border)] bg-[rgba(255,250,242,0.72)] px-4 py-3 text-sm outline-none transition focus:border-[var(--brand-600)]"
      />
    </label>
  );
}

function Select({
  label,
  value,
  onChange
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
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
        <option value="">–</option>
        <option value="meat">Fleisch</option>
        <option value="vegetarian">Vegetarisch</option>
        <option value="vegan">Vegan</option>
      </select>
    </label>
  );
}

function ChoiceCard({
  active,
  onClick,
  title,
  text
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  text: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border p-5 text-left transition ${
        active
          ? 'border-[var(--brand-600)] bg-[rgba(184,196,170,0.22)]'
          : 'border-[var(--border)] bg-[rgba(255,250,242,0.34)] hover:border-[var(--border-brand)]'
      }`}
    >
      <div className="font-medium text-[var(--text)]">
        {title}
      </div>

      <div className="mt-1 text-sm text-[var(--text-soft)]">
        {text}
      </div>
    </button>
  );
}