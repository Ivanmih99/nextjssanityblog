'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from 'next-themes'

function Header() {
  const { theme } = useTheme()

  return (
    <header className="flex items-center justify-between space-x-2 px-10 py-4 font-bold">
      <div>
			<Link href="/">
			<Image priority src="https://cdn.sanity.io/images/hl9czw39/production/585a74794cdb4e46c42127e2fcf022e5e84f7c68-308x72.svg" width={200} height={200} alt="logo"/>
			</Link>
			</div>
		<div className="flex gap-5 ">
			<Link href="/">HOME</Link>
			<Link href="/my-projects">MY PROJECTS</Link>
			<Link href="/products">PRODUCTS</Link>
		</div>
      
    </header>
  )
}
export default Header
