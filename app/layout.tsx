import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ThemeBootstrap from '@/components/providers/ThemeBootstrap'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://kuldeep562.github.io/portfolio/'),
  title: 'Kuldeep Solanki — AI/ML & Full-Stack Engineer',
  description:
    'AI/ML engineer developing healthcare AI, computer vision, speech and LLM applications, backend services and systems integrations.',
  authors: [{ name: 'Kuldeep Solanki' }],
  openGraph: {
    title: 'Kuldeep Solanki — AI/ML & Full-Stack Engineer',
    description: 'Applied AI engineering across healthcare, computer vision, speech and systems integration.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://kuldeep562.github.io/portfolio/',
  },
  twitter: {
    card: 'summary',
    title: 'Kuldeep Solanki — AI/ML & Full-Stack Engineer',
    description: 'Applied AI engineering across healthcare, computer vision, speech and systems integration.',
  },
  icons: { icon: '/portfolio/favicon.svg' },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>
        <ThemeBootstrap />
        {children}
      </body>
    </html>
  )
}
