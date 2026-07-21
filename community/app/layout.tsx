import type { Metadata } from 'next';
import { Geist, Geist_Mono, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { SetupBanner } from '@/components/SetupBanner';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ThemeInitScript } from '@/components/ThemeInitScript';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' });

export const metadata: Metadata = {
  title: 'Orbital Community',
  description: 'Connect. Collaborate. Explore Beyond Earth. Orbital Community is the professional network and mission control center for the global space community.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.variable} ${spaceGrotesk.variable} ${geistMono.variable} font-sans`}>
        <ThemeInitScript />
        <ThemeProvider>
          <SetupBanner />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
