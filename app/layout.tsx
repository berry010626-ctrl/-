import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "장마 무드 테스트 | MAYBLUE",
  description: "이 장마, 당신은 어떤 무드로 버티는 사람일까? MAYBLUE 장마 무드 테스트",
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
          href="https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Pretendard:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
