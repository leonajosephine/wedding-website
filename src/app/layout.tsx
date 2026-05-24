import './globals.css';

import {
  Pinyon_Script,
  Parisienne,
  Cedarville_Cursive,
  Abhaya_Libre,
  Manrope
} from 'next/font/google';

const pinyon = Pinyon_Script({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-pinyon'
});

const parisienne = Parisienne({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-parisienne'
});

const cedarville = Cedarville_Cursive({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-cedarville'
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

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body
        className={`${pinyon.variable} ${parisienne.variable} ${cedarville.variable} ${abhaya.variable} ${manrope.variable}`}
      >
        {children}
      </body>
    </html>
  );
}