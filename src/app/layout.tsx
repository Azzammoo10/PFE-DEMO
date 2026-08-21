import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Soutenance PFE DLP-LAB - Mohamed AZZAM',
  description: 'Présentation PFE - Conception et mise en œuvre d’une architecture DLP hybride avec supervision SOC et validation offensive',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
