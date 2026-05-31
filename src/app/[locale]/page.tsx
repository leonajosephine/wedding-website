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

export default function HomePage() {
  return (
    <>
      <Navigation />

      <main>
        <Hero />
        <Story />
        <Schedule />
        <Gallery />
        <Location />
        <CountdownDivider />
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