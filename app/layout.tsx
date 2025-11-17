import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aching Kepret",
  description: "Aching Kepret brot broooottt aku nak berak babiiikk",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <div className='=========================='></div>
      <div className='HEHE KETAUAN... 🤨'></div>
      <div className='Ngapain inspect code woi!'></div>
      <div className='Gada apa-apa di sini...'></div>
      <div className='cuma kode penuh cinta'></div>
      <div className='untuk Aching Kepret 💖'></div>
      <div className='=========================='></div>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
