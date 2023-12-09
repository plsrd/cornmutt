import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Cornmutt Fitness',
  description: 'Fitness for the cornmutt',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
