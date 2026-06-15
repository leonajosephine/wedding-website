'use client';

import Image from 'next/image';
import {ArrowRight} from 'lucide-react';
import {useLocale, useTranslations} from 'next-intl';
import {usePathname, useRouter} from 'next/navigation';
import {useState} from 'react';

const locales = [
  {label: 'DE', value: 'de'},
  {label: 'EN', value: 'en'},
  {label: 'DA', value: 'da'}
];

export function InvitationOverlay() {
  const t = useTranslations('invitationOverlay');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [step, setStep] = useState<'closed' | 'opened'>('closed');
  const [letterVisible, setLetterVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const switchLanguage = (nextLocale: string) => {
    const segments = pathname.split('/').filter(Boolean);
    const hasLocale = locales.some((item) => item.value === segments[0]);

    const pathWithoutLocale = hasLocale
      ? segments.slice(1).join('/')
      : segments.join('/');

    router.push(`/${nextLocale}${pathWithoutLocale ? `/${pathWithoutLocale}` : ''}`);
  };

  const openInvitation = () => {
    setStep('opened');

    window.setTimeout(() => {
      setLetterVisible(true);
    }, 850);
  };

  const enterWebsite = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden bg-[var(--background)]">
      <Image
        src="/images/intro/bg.png"
        alt=""
        fill
        priority
        className="hidden object-cover md:block md:opacity-90"
        sizes="100vw"
      />

      <Image
        src="/images/intro/bg-mobile.png"
        alt=""
        fill
        priority
        className="block object-cover opacity-90 md:opacity-0 md:hidden"
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-[rgba(252,245,234,0.08)]" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-10">
        {step === 'closed' && (
          <div className="flex w-full max-w-4xl flex-col items-center text-center">
            <LanguageSelector locale={locale} onChange={switchLanguage} />

            <button
              type="button"
              onClick={openInvitation}
              className="group mt-10 block w-full max-w-md md:max-w-xl desk:max-w-3xl"
              aria-label={t('openCta')}
            >
              <Image
                src="/images/intro/envelope-closed3.png"
                alt=""
                width={1800}
                height={1200}
                priority
                className="mx-auto h-auto w-full animate-[envelopeFloat_6s_ease-in-out_infinite] drop-shadow-[0_20px_50px_rgba(42,37,34,0.14)] transition duration-700 group-hover:scale-[1.02]"
              />
            </button>

            <button
              type="button"
              onClick={openInvitation}
              className="group mt-12 inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-[var(--text)] transition hover:text-[var(--brand-600)]"
            >
              {t('openCta')}
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </button>

            <div className="mt-5 h-px w-16 bg-[rgba(183,138,111,0.55)]" />
          </div>
        )}

        {step === 'opened' && (
          <div className="flex w-full flex-col items-center">
            <div className="relative w-full max-w-md animate-[invitationFadeIn_0.5s_ease_forwards] md:max-w-[560px] desk:max-w-[720px]">
              <Image
                src="/images/intro/envelope-open3.png"
                alt=""
                width={1800}
                height={1800}
                priority
                className="relative z-10 mx-auto h-auto w-full drop-shadow-[0_20px_50px_rgba(42,37,34,0.14)]"
              />

              <div
                className={`absolute left-1/2 top-1/2 z-30 w-[90%] max-w-[520px] md:w-[86%] desk:w-[82%] ${
                  letterVisible
                    ? 'animate-[letterPullOutCentered_1.55s_ease-in-out_forwards]'
                    : 'opacity-0 -translate-x-1/2 translate-y-[18%] scale-[0.86]'
                }`}
              >
                <Image
                  src="/images/intro/letter3.png"
                  alt=""
                  width={1800}
                  height={2400}
                  priority
                  className="h-auto w-full drop-shadow-[0_30px_90px_rgba(42,37,34,0.16)]"
                />

                <div className="absolute inset-x-[14%] top-[15%] flex flex-col items-center text-center">
                  <p className="mb-5 text-[0.48rem] uppercase tracking-[0.2em] text-[var(--text-soft)] sm:mb-7 sm:text-[0.55rem] md:text-[0.6rem]">
                    {t('cardEyebrow')}
                  </p>

                  <h2 className="script text-4xl leading-[0.9] text-[var(--brand-600)] sm:text-5xl md:text-6xl">
                    Merle <span className="ampersand">&</span> Lasse
                  </h2>

                  <p className="mt-5 max-w-[13rem] text-[0.48rem] uppercase leading-4 tracking-[0.16em] text-[var(--text-soft)] sm:mt-6 sm:max-w-[14rem] sm:text-[0.54rem] md:mt-8 md:max-w-[15rem] md:text-[0.62rem] md:leading-5 md:tracking-[0.22em]">
                    {t('cardIntro')}
                  </p>

                  <div className="my-4 h-px w-14 bg-[rgba(183,138,111,0.55)] sm:my-5 sm:w-16 md:my-7 md:w-20" />

                  <p className="serif text-xl tracking-[0.14em] text-[var(--brand-600)] sm:text-2xl md:text-3xl md:tracking-[0.18em]">
                    15 · 05 · 2027
                  </p>

                  <p className="mt-3 text-[0.5rem] uppercase leading-4 tracking-[0.16em] text-[var(--text-soft)] sm:mt-4 sm:text-[0.58rem] md:mt-5 md:text-[0.68rem] md:leading-5 md:tracking-[0.22em]">
                    Heimathaus Tornesch
                    <br />
                    Schleswig-Holstein
                  </p>

                  <div className="mt-20 hidden flex-col items-center md:flex">
                    <EnterButton label={t('enterCta')} onClick={enterWebsite} />
                    <div className="mt-4 h-px w-14 bg-[rgba(183,138,111,0.55)]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col items-center md:hidden">
              <EnterButton label={t('enterCta')} onClick={enterWebsite} />
              <div className="mt-4 h-px w-14 bg-[rgba(183,138,111,0.55)]" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function EnterButton({
  label,
  onClick
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group inline-flex animate-[softPulse_2.1s_ease-in-out_infinite] items-center gap-3 text-xs uppercase tracking-[0.28em] text-[var(--text)] transition hover:text-[var(--brand-600)]"
    >
      {label}
      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
    </button>
  );
}

function LanguageSelector({
  locale,
  onChange
}: {
  locale: string;
  onChange: (locale: string) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-5">
      {locales.map((item, index) => (
        <div key={item.value} className="flex items-center gap-5">
          <button
            type="button"
            onClick={() => onChange(item.value)}
            className={`pb-1 text-lg uppercase tracking-[0.18em] transition ${
              locale === item.value
                ? 'border-b border-[var(--text)] text-[var(--text)]'
                : 'border-b border-transparent text-[var(--text-soft)] hover:text-[var(--text)]'
            }`}
          >
            {item.label}
          </button>

          {index < locales.length - 1 && (
            <span className="text-[var(--text-soft)]">·</span>
          )}
        </div>
      ))}
    </div>
  );
}