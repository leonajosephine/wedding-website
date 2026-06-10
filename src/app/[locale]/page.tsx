import { setRequestLocale } from 'next-intl/server';

import {Navigation} from '@/components/layout/Navigation';
import { Hero } from '@/components/sections/Hero';
import { CountdownDivider } from '@/components/sections/CountdownDivider';
import { Story } from '@/components/sections/Story';
import { FullWidthPhoto } from '@/components/sections/FullWidthPhoto';
import { Schedule } from '@/components/sections/Schedule';
import { Gallery } from '@/components/sections/Gallery';
import { Location } from '@/components/sections/Location';
import { Dresscode } from '@/components/sections/Dresscode';
import { RSVP } from '@/components/sections/RSVP';
import { Message } from '@/components/sections/Message';
import { FAQ } from '@/components/sections/FAQ';
import { Contacts } from '@/components/sections/Contacts';
import { Footer } from '@/components/layout/Footer';
import { QuoteDivider } from '@/components/sections/QuoteDivider';
import { EucalyptusDivider } from '@/components/sections/EucalyptusDivider';

type Props = {
  params: Promise<{locale:string}>;
}

export default async function HomePage({params}: Props) {
  const {locale} = await params;

  setRequestLocale(locale);
  
  return (
    <>
      <Navigation />

      <main>
        <Hero />
        <Story />
        <CountdownDivider />
        <Schedule />
        <Gallery />
        <Location />
        <QuoteDivider />
        {/*<EucalyptusDivider /> */}
        <Dresscode />
        <RSVP />
        <Message />
        <FullWidthPhoto />
        <FAQ />
        <Contacts />
      </main>

      <Footer />
    </>
  );
}