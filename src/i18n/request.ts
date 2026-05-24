import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

type Locale = (typeof routing.locales)[number];

function isValidLocale(locale: unknown): locale is Locale {
  return routing.locales.includes(locale as Locale);
}

export default getRequestConfig(async ({requestLocale}) => {
  const requested = await requestLocale;

  const locale: Locale = isValidLocale(requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});