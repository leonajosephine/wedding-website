'use client';

import {useState} from 'react';
import {Globe2, Menu, X} from 'lucide-react';
import {useLocale, useTranslations} from 'next-intl';
import {usePathname, useRouter} from 'next/navigation';

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

  const t = useTranslations('navigation');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const scrollToSection = (href: string) => {
    document.querySelector(href)?.scrollIntoView({behavior: 'smooth'});
    setMobileMenuOpen(false);
  };

  const switchLanguage = (nextLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = nextLocale;
    router.push(segments.join('/'));
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-[var(--border)] bg-[rgba(252,245,234,0.42)] px-6 py-4 backdrop-blur-md lg:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <button
            onClick={() => scrollToSection('#home')}
            className="script text-xl tracking-[0.22em] text-[var(--text)] lg:text-2xl"
            aria-label={t('homeLabel')}
          >
            M<span className="ampersand mx-1 text-xl text-[var(--olive)]">&</span>L
          </button>

          <ul className="hidden items-center gap-6 md:flex lg:gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <button
                  onClick={() => scrollToSection(item.href)}
                  className="text-xs uppercase tracking-[0.16em] text-[var(--text-soft)] transition-colors hover:text-[var(--olive-dark)]"
                >
                  {t(item.key)}
                </button>
              </li>
            ))}

            <li>
              <button
                onClick={() => scrollToSection('#rsvp')}
                className="rounded-full bg-[var(--olive-dark)] px-5 py-2 text-xs uppercase tracking-[0.14em] text-[var(--background)] transition-colors hover:bg-[var(--black)]"
              >
                {t('rsvp')}
              </button>
            </li>

            <li className="flex items-center gap-2 border-l border-[var(--border)] pl-5">
              <Globe2 className="h-4 w-4 text-[var(--olive-dark)]" />
              {locales.map((item) => (
                <button
                  key={item.value}
                  onClick={() => switchLanguage(item.value)}
                  className={`text-[0.65rem] uppercase tracking-[0.16em] transition-colors ${
                    locale === item.value
                      ? 'text-[var(--olive-dark)]'
                      : 'text-[var(--text-soft)] hover:text-[var(--text)]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </li>
          </ul>

          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="p-2 md:hidden"
            aria-label={mobileMenuOpen ? t('closeMenu') : t('openMenu')}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed left-0 right-0 top-[65px] z-40 border-b border-[var(--border)] bg-[var(--background)] px-6 py-5 md:hidden">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="border-b border-black/5 py-2 text-left text-sm uppercase tracking-[0.14em] text-[var(--text-soft)]"
              >
                {t(item.key)}
              </button>
            ))}

            <button
              onClick={() => scrollToSection('#rsvp')}
              className="py-2 text-left text-sm font-medium uppercase tracking-[0.14em] text-[var(--olive-dark)]"
            >
              {t('rsvp')} →
            </button>

            <div className="flex items-center gap-3 pt-3">
              <Globe2 className="h-4 w-4 text-[var(--olive-dark)]" />
              {locales.map((item) => (
                <button
                  key={item.value}
                  onClick={() => switchLanguage(item.value)}
                  className={`text-xs uppercase tracking-[0.16em] ${
                    locale === item.value ? 'text-[var(--olive-dark)]' : 'text-[var(--text-soft)]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}