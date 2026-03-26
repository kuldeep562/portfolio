import type { Metadata, Viewport } from 'next'
import { Inter, Syne, JetBrains_Mono } from 'next/font/google'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#030303' },
  ],
}

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
})

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Kuldeep Solanki — AI/ML Engineer',
  description:
    'AI/ML Engineer specializing in LLM fine-tuning, edge deployment, and computer vision for healthcare. Building production AI systems that actually ship.',
  keywords: ['AI', 'ML', 'Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision', 'Edge ML', 'Healthcare AI', 'Portfolio'],
  authors: [{ name: 'Kuldeep Solanki' }],
  openGraph: {
    title: 'Kuldeep Solanki — AI/ML Engineer',
    description: 'Building production AI systems that ship in healthcare. YOLO on Raspberry Pi, 93% precision, 30K+ records.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kuldeep Solanki — AI/ML Engineer',
    description: 'Building production AI systems that ship in healthcare.',
  },
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('portfolio-theme');
                  if (!theme) {
                    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  }
                  if (theme === 'light') {
                    document.documentElement.classList.add('light');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${syne.variable} ${jetbrainsMono.variable}`}>
        {children}
      </body>
    </html>
  )
}
