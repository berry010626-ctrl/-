import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "장마 무드 테스트 | MAYBLUE",
  description: "이번 장마, 나는 어떻게 보내게 될까? MAYBLUE 장마 무드 테스트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Jua&family=Pretendard:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
