import '@/styles/global.css'
import Header from '@/components/Header'
import ThemeProviders from './ThemeProviders'
import Banner from '@/components/Banner'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="mx-auto max-w-7xl bg-zinc-100">
        <ThemeProviders>
          <Header></Header>
          {children}
          <Banner></Banner>
        </ThemeProviders>
      </body>
    </html>
  )
}
