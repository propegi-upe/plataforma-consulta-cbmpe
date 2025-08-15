import type { Metadata } from 'next';
import { Geist, Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/providers';
import { Header } from '@/components';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'SIAP CBMPE',
  keywords: ['SIAP', 'CBMPE', 'Sistema Integrado de Acompanhamento de Processos'],
  authors: [{ name: 'LigaLabs', url: 'https://ligalabs.com.br' }],
  creator: 'LigaLabs',
  description: 'Sistema Integrado de Acompanhamento de Processos do CBMPE',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${geistSans.variable} font-sans antialiased bg-gray`}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
