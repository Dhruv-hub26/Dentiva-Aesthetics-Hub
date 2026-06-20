import type { Metadata } from "next";
import { Jost, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Dentiva Aesthetics | Premium Modern Dental Clinic & Design",
  description: "Experience premium, state-of-the-art dental care and aesthetic design at Dentiva Aesthetics. Custom treatments, bento specialization grids, and transparent pricing in a charcoal-mint environment.",
  keywords: ["Dentiva Aesthetics", "Cosmetic Dentistry", "Premium Dental Clinic", "Vibrant Checkups", "Revitalized Cleaning", "Reinforced Fillings"],
  authors: [{ name: "Dentiva Aesthetics" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jost.variable} ${jakarta.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-white text-primary-dark">
        {children}
      </body>
    </html>
  );
}
