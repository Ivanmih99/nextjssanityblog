import '@/styles/global.css'
import Header from '../../components/Header'
import ThemeProviders from '../(user)/ThemeProviders'

export default function Page() {
	return (
		<html lang="en">
      <body className="mx-auto max-w-7xl bg-zinc-100">
        <ThemeProviders>
          <Header></Header>
        </ThemeProviders>
      </body>
    </html>
	)
  }