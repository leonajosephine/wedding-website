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
      <nav className="fixed left-0 right-0 top-0 z-50 px-6 py-4 lg:px-12 border-b border-[rgba(42,37,34,0.07)] bg-[rgba(252,245,234,0.38)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <button
            onClick={() => scrollToSection('#home')}
            className="serif text-2xl tracking-[0.22em] text-[var(--text)]"
            aria-label={t('homeLabel')}
          >
            M&L
          </button>

          <ul className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <button
                  onClick={() => scrollToSection(item.href)}
                  className="text-[0.65rem] uppercase tracking-[0.2em] text-[var(--text-soft)] transition hover:text-[var(--text)]"
                >
                  {t(item.key)}
                </button>
              </li>
            ))}

            <li>
              <Button variant="primary" onClick={() => scrollToSection('#rsvp')} className="min-h-9 px-5 py-2">
                {t('rsvp')}
              </Button>
            </li>

            <li className="flex items-center gap-2 border-l border-[var(--border)] pl-5">
              <Globe2 className="h-3.5 w-3.5 text-[var(--text-soft)]" />
              {locales.map((item) => (
                <button
                  key={item.value}
                  onClick={() => switchLanguage(item.value)}
                  className={`text-[0.65rem] uppercase tracking-[0.16em] ${
                    locale === item.value
                      ? 'text-[var(--text)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text)]'
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
        <div className="fixed left-4 right-4 top-[76px] z-40 border border-[var(--border)] bg-[rgba(252,245,234,0.94)] p-5 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="border-b border-[var(--border-soft)] py-2 text-left text-xs uppercase tracking-[0.18em] text-[var(--text-soft)]"
              >
                {t(item.key)}
              </button>
            ))}

            <Button variant="primary" onClick={() => scrollToSection('#rsvp')}>
              {t('rsvp')}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}