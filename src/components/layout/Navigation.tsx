'use client';

import Image from 'next/image';
import {useEffect, useState} from 'react';
import {Globe2, Menu, X} from 'lucide-react';
import {useLocale, useTranslations} from 'next-intl';
import {usePathname, useRouter} from 'next/navigation';
import {Button} from '@/components/ui/Button';

const navItems = [
  {key: 'story', href: '#story'},
  {key: 'schedule', href: '#schedule'},
  {key: 'dresscode', href: '#dresscode'},
  {key: 'location', href: '#location'},
  {key: 'contact', href: '#contacts'},
  {key: 'faq', href: '#faq'}
] as const;

const locales = [
  {label: 'DE', value: 'de'},
  {label: 'EN', value: 'en'},
  {label: 'DA', value: 'da'}
];

const LANGUAGE_HINT_KEY = 'wedding-language-hint-seen';

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [showLanguageHint, setShowLanguageHint] = useState(false);

  const t = useTranslations('navigation');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const activeLocale = locales.find(
    (item) => item.value === locale
  );

  // Show hint once after entering the website.
  useEffect(() => {
    const handleInvitationEntered = () => {
      if (sessionStorage.getItem(LANGUAGE_HINT_KEY)) return;

      sessionStorage.setItem(LANGUAGE_HINT_KEY, 'true');
      setShowLanguageHint(true);
    };

    window.addEventListener(
      'invitation-entered',
      handleInvitationEntered
    );

    return () => {
      window.removeEventListener(
        'invitation-entered',
        handleInvitationEntered
      );
    };
  }, []);

  // Automatically dismiss the hint.
  useEffect(() => {
    if (!showLanguageHint) return;

    const timeout = window.setTimeout(() => {
      setShowLanguageHint(false);
    }, 7000);

    return () => window.clearTimeout(timeout);
  }, [showLanguageHint]);

  // Prevent background scrolling while mobile menu is open.
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (href: string) => {
    document.querySelector(href)?.scrollIntoView({
      behavior: 'smooth'
    });

    setMobileMenuOpen(false);
    setLanguageOpen(false);
    setShowLanguageHint(false);
  };

  const switchLanguage = (nextLocale: string) => {
    const segments = pathname.split('/').filter(Boolean);
    const hasLocale = locales.some(
      (item) => item.value === segments[0]
    );

    const pathWithoutLocale = hasLocale
      ? segments.slice(1).join('/')
      : segments.join('/');

    router.push(
      `/${nextLocale}${
        pathWithoutLocale ? `/${pathWithoutLocale}` : ''
      }`
    );

    setLanguageOpen(false);
    setMobileMenuOpen(false);
    setShowLanguageHint(false);
  };

  const toggleLanguage = () => {
    setLanguageOpen((prev) => !prev);
    setMobileMenuOpen(false);
    setShowLanguageHint(false);
  };

  return (
    <>
      {/* Navigation bar */}
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-[rgba(72,67,63,0.07)] bg-[rgba(252,245,234,0.52)] px-4 py-3 backdrop-blur-xl sm:px-6 lg:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {/* Logo */}
          <button
            type="button"
            onClick={() => scrollToSection('#home')}
            className="group relative h-12 w-20 shrink-0 overflow-hidden bg-transparent outline-none transition duration-300 hover:scale-[1.03] hover:opacity-90 focus-visible:ring-2 focus-visible:ring-[var(--brand-500)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--background)]"
            aria-label={t('homeLabel')}
          >
            <Image
              src="/images/monogramm.png"
              alt=""
              fill
              priority
              className="object-cover transition duration-500 group-hover:scale-[1.05]"
              sizes="80px"
            />
          </button>

          {/* Desktop navigation */}
          <ul className="hidden items-center gap-6 xl:flex xl:gap-7">
            {navItems.map((item) => (
              <li key={item.href}>
                <button
                  type="button"
                  onClick={() => scrollToSection(item.href)}
                  className="group relative bg-transparent p-0 text-[0.65rem] uppercase tracking-[0.19em] text-[var(--text-soft)] outline-none transition hover:text-[var(--text)] focus-visible:text-[var(--text)]"
                >
                  {t(item.key)}

                  <span className="absolute -bottom-2 left-0 h-px w-0 bg-[var(--text)] transition-all duration-300 group-hover:w-full group-focus-visible:w-full" />
                </button>
              </li>
            ))}

            <li>
              <Button
                variant="primary"
                onClick={() => scrollToSection('#rsvp')}
                className="min-h-9 px-5 py-2 font-bold"
              >
                {t('rsvp')}
              </Button>
            </li>

            <li className="relative border-l border-[var(--border)] pl-5">
              <LanguageSelector
                locale={locale}
                activeLocale={activeLocale}
                languageOpen={languageOpen}
                onToggle={toggleLanguage}
                switchLanguage={switchLanguage}
              />

              {showLanguageHint && (
                <LanguageHint
                  onClose={() => setShowLanguageHint(false)}
                  onOpenLanguage={toggleLanguage}
                />
              )}
            </li>
          </ul>

          {/* Tablet / mobile actions */}
          <div className="ml-auto flex items-center gap-2 xl:hidden sm:gap-3">
            <Button
              variant="primary"
              onClick={() => scrollToSection('#rsvp')}
              className="min-h-9 px-3 py-2 text-[0.62rem] font-bold sm:px-5"
            >
              {t('rsvp')}
            </Button>

            {/* Language selector */}
            <div className="relative">
              <button
                type="button"
                onClick={toggleLanguage}
                className="flex h-9 items-center gap-1.5 bg-transparent px-1 text-[0.62rem] uppercase tracking-[0.12em] text-[var(--text-soft)] outline-none transition hover:text-[var(--text)] sm:gap-2 sm:px-2"
                aria-expanded={languageOpen}
                aria-label="Language"
              >
                <Globe2 className="h-4 w-4" />

                <span className="hidden sm:inline">
                  {activeLocale?.label ?? locale.toUpperCase()}
                </span>
              </button>

              {languageOpen && (
                <div className="absolute right-0 top-11 z-20 min-w-28 border border-[var(--border)] bg-[rgba(252,245,234,0.94)] p-2 shadow-[var(--shadow-soft)] backdrop-blur-xl">
                  {locales.map((item) => (
                    <button
                      type="button"
                      key={item.value}
                      onClick={() => switchLanguage(item.value)}
                      className={`block w-full px-3 py-2.5 text-left text-[0.65rem] uppercase tracking-[0.16em] transition ${
                        locale === item.value
                          ? 'text-[var(--text)]'
                          : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}

              {showLanguageHint && (
                <LanguageHint
                  onClose={() => setShowLanguageHint(false)}
                  onOpenLanguage={toggleLanguage}
                />
              )}
            </div>

            {/* Burger */}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen((prev) => !prev);
                setLanguageOpen(false);
                setShowLanguageHint(false);
              }}
              className="flex h-9 w-9 items-center justify-center border-0 bg-transparent outline-none transition hover:opacity-70 focus-visible:ring-2 focus-visible:ring-[var(--brand-500)]"
              aria-label={
                mobileMenuOpen
                  ? t('closeMenu')
                  : t('openMenu')
              }
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Full-screen mobile / tablet navigation */}
      <div
        className={`fixed inset-x-0 bottom-0 top-[73px] z-40 overflow-hidden border-t border-[rgba(72,67,63,0.06)] bg-[rgba(252,245,234,0.88)] backdrop-blur-2xl transition-all duration-500 xl:hidden ${
          mobileMenuOpen
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-3 opacity-0'
        }`}
        aria-hidden={!mobileMenuOpen}
        inert={!mobileMenuOpen}
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-32 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-[rgba(162,172,161,0.12)] blur-3xl" />
          <div className="absolute -left-40 bottom-[-120px] h-[360px] w-[360px] rounded-full bg-[rgba(222,210,189,0.18)] blur-3xl" />
        </div>

        <div className="container relative flex h-full flex-col">
          <div className="flex flex-1 items-center">
            <nav className="w-full">
              <div className="flex flex-col">
                {navItems.map((item, index) => (
                  <button
                    type="button"
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className="group flex w-full items-center border-b border-[var(--border-soft)] py-4 text-left sm:py-5"
                  >
                    <span className="mr-5 w-7 text-[0.58rem] tracking-[0.15em] text-[var(--text-muted)]">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <span className="serif text-3xl leading-none text-[var(--text)] transition duration-300 group-hover:translate-x-1 group-hover:text-[var(--brand-600)] sm:text-4xl">
                      {t(item.key)}
                    </span>

                    <span className="ml-auto h-px w-5 bg-[var(--border-brand)] transition-all duration-300 group-hover:w-10 group-hover:bg-[var(--brand-600)]" />
                  </button>
                ))}
              </div>
            </nav>
          </div>

          <div className="flex items-center justify-between border-t border-[var(--border-soft)] py-5">
            <p className="script text-2xl text-[var(--brand-600)] sm:text-3xl">
              Merle & Lasse
            </p>

            <p className="text-[0.58rem] uppercase tracking-[0.18em] text-[var(--text-muted)]">
              15 · 05 · 2027
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

function LanguageSelector({
  locale,
  activeLocale,
  languageOpen,
  onToggle,
  switchLanguage
}: {
  locale: string;
  activeLocale: {label: string; value: string} | undefined;
  languageOpen: boolean;
  onToggle: () => void;
  switchLanguage: (locale: string) => void;
}) {
  return (
    <>
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center gap-2 bg-transparent p-0 text-[0.65rem] uppercase tracking-[0.16em] text-[var(--text-soft)] outline-none transition hover:text-[var(--text)] focus-visible:text-[var(--text)]"
        aria-expanded={languageOpen}
        aria-label="Language"
      >
        <Globe2 className="h-4 w-4" />

        <span>
          {activeLocale?.label ?? locale.toUpperCase()}
        </span>
      </button>

      {languageOpen && (
        <div className="absolute right-0 top-8 z-20 min-w-28 border border-[var(--border)] bg-[rgba(252,245,234,0.96)] p-2 shadow-[var(--shadow-soft)] backdrop-blur-xl">
          {locales.map((item) => (
            <button
              type="button"
              key={item.value}
              onClick={() => switchLanguage(item.value)}
              className={`block w-full px-3 py-2.5 text-left text-[0.65rem] uppercase tracking-[0.16em] transition ${
                locale === item.value
                  ? 'text-[var(--text)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

function LanguageHint({
  onClose,
  onOpenLanguage
}: {
  onClose: () => void;
  onOpenLanguage: () => void;
}) {
  return (
    <div className="absolute right-0 top-[calc(100%+22px)] z-30 w-[min(290px,calc(100vw-32px))] animate-[invitationFadeIn_0.5s_ease_forwards] rounded-md border border-[var(--border)] bg-[var(--surface)] p-5 text-left shadow-[0_18px_55px_rgba(42,37,34,0.16)]">
      {/* Pointer towards language selector */}
      <div className="absolute -top-[6px] right-5 h-3 w-3 rotate-45 border-l border-t border-[var(--border)] bg-[var(--surface)]" />

      <div className="relative flex items-start justify-between gap-3">
        <p className="text-[0.62rem] font-medium uppercase tracking-[0.17em] text-[var(--brand-600)]">
          DE · EN · DA
        </p>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close language hint"
          className="-mr-1 -mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[var(--text-muted)] transition hover:bg-[var(--background-soft)] hover:text-[var(--text)]"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <button
        type="button"
        onClick={onOpenLanguage}
        className="mt-3 block w-full text-left"
      >
        <p className="text-sm leading-6 text-[var(--text)]">
          Hier kannst du die Sprache ändern.
        </p>

        <p className="mt-1.5 text-sm leading-6 text-[var(--text)]">
          You can change the language here.
        </p>

        <p className="mt-1.5 text-sm leading-6 text-[var(--text)]">
          Du kan ændre sproget her.
        </p>
      </button>
    </div>
  );
}