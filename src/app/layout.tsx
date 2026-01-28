import type { Metadata } from 'next'
import { JetBrains_Mono, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

const sans = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'InverseVote — Flip the Plutocracy',
  description: 'Sqrt voting power. Smaller holders get more weight per token.',
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
    <html lang="en" className={`${mono.variable} ${sans.variable}`}>
      <body className="bg-zinc-950 text-zinc-100 antialiased min-h-dvh">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
