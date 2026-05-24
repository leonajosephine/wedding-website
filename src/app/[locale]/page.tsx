import {Navigation} from '@/components/layout/Navigation';
import { Hero } from '@/components/sections/Hero';

export default function HomePage() {
  return (
    <>
      <Navigation />

      <main>
        <Hero />

        <section id="story" className="section">
          <div className="container">
            <p className="eyebrow">Unsere Geschichte</p>
            <h2 className="script mt-4 text-7xl">How it started</h2>
          </div>
        </section>

        <section id="schedule" className="section">
          <div className="container">
            <p className="eyebrow">Ablauf</p>
            <h2 className="script mt-4 text-7xl">The Wedding Weekend</h2>
          </div>
        </section>

        <section id="gallery" className="section">
          <div className="container">
            <p className="eyebrow">Fotos</p>
            <h2 className="script mt-4 text-7xl">Moments</h2>
          </div>
        </section>

        <section id="location" className="section">
          <div className="container">
            <p className="eyebrow">Location</p>
            <h2 className="script mt-4 text-7xl">Getting there</h2>
          </div>
        </section>

        <section id="rsvp" className="section">
          <div className="container">
            <p className="eyebrow">RSVP</p>
            <h2 className="script mt-4 text-7xl">Will you join us?</h2>
          </div>
        </section>

        <section id="faq" className="section">
          <div className="container">
            <p className="eyebrow">FAQ</p>
            <h2 className="script mt-4 text-7xl">Good to know</h2>
          </div>
        </section>
      </main>
    </>
  );
}