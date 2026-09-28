import './globals.css';

import {
  Parisienne,
  Abhaya_Libre,
  Manrope,
  Just_Another_Hand
} from 'next/font/google';

const parisienne = Parisienne({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-parisienne'
});

const abhaya = Abhaya_Libre({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-abhaya'
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope'
});

const justAnotherHand = Just_Another_Hand({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-handwritten'
});

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" data-scroll-behavior="smooth">
      <body
        className={`${parisienne.variable} ${abhaya.variable} ${manrope.variable} ${justAnotherHand.variable}`}
      >
        {children}
      </body>
    </html>
  );
}