import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata = {
  title: "Pahal Design - Online Test Series",
  description: "India's leading entrance preparation & mock test platform for NIFT, NID, UCEED, CEED, and NATA aspirants.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Instrument+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        {/* Avoid flash of the wrong theme on load */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("pd-theme");if(t!=="dark"&&t!=="light")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.dataset.theme=t}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-screen bg-slate-50 antialiased selection:bg-blue-600 selection:text-white">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}