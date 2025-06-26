import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '호출이 - 민간구급차 플랫폼',
  description: '안전하고 빠른 응급의료 서비스',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
      </head>
      <body>
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-5">
          {children}
        </div>
      </body>
    </html>
  )
}