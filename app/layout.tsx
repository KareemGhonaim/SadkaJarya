import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "صدقة جارية - تذكار المرحوم الحاجة فاطمة محمد عبدالله",
  description: "موقع تذكاري لروح المرحوم الحاجة فاطمة محمد عبدالله، ادعُ له بالرحمة واقرأ القرآن الكريم وأهدِ الثواب لروحه الطاهرة. صدقة جارية في ميزان حسناته.",
  keywords: ["صدقة جارية", "ترحم", "قرآن", "دعاء", "ذكر", "مغفرة"],
  authors: [{ name: "أهل وذوو المرحوم" }],
  openGraph: {
    title: "صدقة جارية - تذكار المرحوم الحاجة فاطمة محمد عبدالله",
    description: "ادعُ للمرحوم بالرحمة والمغفرة، اقرأ القرآن وأهدِ الثواب لروحه",
    type: "website",
    locale: "ar_SA",
    siteName: "صدقة جارية",
  },
  twitter: {
    card: "summary_large_image",
    title: "صدقة جارية - تذكار المرحوم الحاجة فاطمة محمد عبدالله",
    description: "ادعُ للمرحوم بالرحمة والمغفرة",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "صدقة جارية - تذكار المرحوم الحاجة فاطمة محمد عبدالله",
              "description": "موقع تذكاري لروح المرحوم الحاجة فاطمة محمد عبدالله",
              "inLanguage": "ar",
              "about": {
                "@type": "Person",
                "name": "الحاجة فاطمة محمد عبدالله",
                "birthDate": "1963",
                "deathDate": "2026"
              }
            })
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
