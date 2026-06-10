'use client';

import {useState} from 'react';
import {Globe2, Menu, X} from 'lucide-react';
import {useLocale, useTranslations} from 'next-intl';
import {usePathname, useRouter} from 'next/navigation';
import {Button} from '@/components/ui/Button';

const navItems = [
  {key: 'story', href: '#story'},
  {key: 'schedule', href: '#schedule'},
  {key: 'gallery', href: '#gallery'},
  {key: 'location', href: '#location'},
  {key: 'faq', href: '#faq'}
] as const;

const locales = [
  {label: 'DE', value: 'de'},
  {label: 'EN', value: 'en'},
  {label: 'DA', value: 'da'}
];

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);

  const t = useTranslations('navigation');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const activeLocale = locales.find((item) => item.value === locale);

  const scrollToSection = (href: string) => {
    document.querySelector(href)?.scrollIntoView({behavior: 'smooth'});
    setMobileMenuOpen(false);
  };

  const switchLanguage = (nextLocale: string) => {
    const segments = pathname.split('/').filter(Boolean);
    const hasLocale = locales.some((item) => item.value === segments[0]);
  
    const pathWithoutLocale = hasLocale
      ? segments.slice(1).join('/')
      : segments.join('/');
  
    router.push(`/${nextLocale}${pathWithoutLocale ? `/${pathWithoutLocale}` : ''}`);
  
    setLanguageOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-[rgba(42,37,34,0.07)] bg-[rgba(252,245,234,0.38)] px-6 py-4 backdrop-blur-xl lg:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <button
            type="button"
            onClick={() => scrollToSection('#home')}
            className="serif border-0 bg-transparent p-0 text-3xl leading-none tracking-[0.18em] text-[var(--text)] outline-none transition hover:opacity-70 focus-visible:ring-2 focus-visible:ring-[var(--brand-500)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--background)]"
            aria-label={t('homeLabel')}
          >
            M&L
          </button>

          <ul className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <button
                  type="button"
                  onClick={() => scrollToSection(item.href)}
                  className="group relative bg-transparent p-0 text-[0.65rem] uppercase tracking-[0.2em] text-[var(--text-soft)] outline-none transition hover:text-[var(--text)] focus-visible:text-[var(--text)]"
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
                className="min-h-9 px-5 py-2"
              >
                {t('rsvp')}
              </Button>
            </li>

            <li className="relative border-l border-[var(--border)] pl-5">
              <button
                type="button"
                onClick={() => setLanguageOpen((prev) => !prev)}
                className="flex items-center gap-2 bg-transparent p-0 text-[0.65rem] uppercase tracking-[0.16em] text-[var(--text-soft)] outline-none transition hover:text-[var(--text)] focus-visible:text-[var(--text)]"
                aria-expanded={languageOpen}
              >
                <Globe2 className="h-4 w-4" />
                <span>{activeLocale?.label ?? locale.toUpperCase()}</span>
              </button>

              {languageOpen && (
                <div className="absolute right-0 top-8 min-w-28 border border-[var(--border)] bg-[rgba(252,245,234,0.96)] p-2 shadow-[var(--shadow-soft)] backdrop-blur-xl">
                  {locales.map((item) => (
                    <button
                      type="button"
                      key={item.value}
                      onClick={() => switchLanguage(item.value)}
                      className={`block w-full px-3 py-2 text-left text-[0.65rem] uppercase tracking-[0.16em] transition ${
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
            </li>
          </ul>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="border-0 bg-transparent p-2 outline-none transition hover:opacity-70 focus-visible:ring-2 focus-visible:ring-[var(--brand-500)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--background)] lg:hidden"
            aria-label={mobileMenuOpen ? t('closeMenu') : t('openMenu')}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed left-4 right-4 top-[76px] z-40 border border-[var(--border)] bg-[rgba(252,245,234,0.94)] p-5 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <button
                type="button"
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="border-b border-[var(--border-soft)] bg-transparent py-2 text-left text-xs uppercase tracking-[0.18em] text-[var(--text-soft)]"
              >
                {t(item.key)}
              </button>
            ))}

            <Button variant="primary" onClick={() => scrollToSection('#rsvp')}>
              {t('rsvp')}
            </Button>

            <div className="mt-2 border-t border-[var(--border-soft)] pt-4">
              <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[var(--text-soft)]">
                <Globe2 className="h-4 w-4" />
                {activeLocale?.label ?? locale.toUpperCase()}
              </div>

              <div className="flex gap-2">
                {locales.map((item) => (
                  <button
                    type="button"
                    key={item.value}
                    onClick={() => switchLanguage(item.value)}
                    className={`border px-4 py-2 text-xs uppercase tracking-[0.16em] transition ${
                      locale === item.value
                        ? 'border-[var(--text)] text-[var(--text)]'
                        : 'border-[var(--border)] text-[var(--text-muted)]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}