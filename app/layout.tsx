import type { Metadata } from 'next'
import './globals.css'
import GrainOverlay from '@/components/GrainOverlay'
import ThemeToggle from '@/components/ThemeToggle'

export const metadata: Metadata = {
  title: 'Samriddhi Bagchi | ML Researcher & Developer',
  description: 'Portfolio of Samriddhi Bagchi, B.Tech in CST student at IEM Kolkata exploring and building systems in machine learning, human-computer interaction, and cybersecurity.',
  keywords: ['machine learning', 'HCI', 'cybersecurity', 'IEM Kolkata', 'portfolio', 'Samriddhi Bagchi'],
  authors: [{ name: 'Samriddhi Bagchi' }],
  openGraph: {
    title: 'Samriddhi Bagchi — ML Researcher & Developer',
    description: 'B.Tech CST at IEM Kolkata. Exploring ML, HCI, and Cybersecurity.',
    url: 'https://yoursite.com',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <GrainOverlay />
        {children}
        <ThemeToggle />
      </body>
    </html>
  )
}