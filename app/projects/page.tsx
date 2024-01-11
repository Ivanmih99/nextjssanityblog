import '@/styles/global.css'
import Header from '../../components/Header'
import ThemeProviders from '../(user)/ThemeProviders'
import Image from 'next/image'
import App1 from "@/public/app1.jpg"
import App2 from "@/public/app2.jpg"

export default function Page() {
	return (
		<html lang="en">
      <body className="mx-auto max-w-7xl bg-zinc-100">
        <ThemeProviders>
          <Header></Header>
         <div className='flex flex-col gap-5 pb-10 mx-10'>
          <h1 className='mb-4 mt-6 text-4xl text-center font-bold'>These are my projects that look good and work.</h1>
          <Image className='w-screen rounded-md shadow-lg' src={App1} alt='Weather app'></Image>
          <Image className='w-screen rounded-md shadow-lg' src={App2} alt='Investition'></Image>
         </div>
        </ThemeProviders>
      </body>
    </html>
	)
  }