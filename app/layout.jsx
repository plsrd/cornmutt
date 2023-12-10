import './globals.css';

export const metadata = {
  title: 'Cornmutt Fitness',
  description: 'Fitness for the cornmutt',
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
