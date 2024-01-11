import Link from "next/link"

function Banner() {
  return (
    <div className="mb-10 px-10 py-8 font-bold lg:flex-row lg:space-x-5">
      <div className="flex flex-col items-center gap-5">
        <h1 className="text-5xl">Go to projects</h1>
        <Link href="/my-projects">
        <button className="bg-blue-500 hover:bg-blue-700 text-white w-max font-bold py-2 px-4 rounded-lg">See more</button>
        </Link>
      </div>
      
    </div>
  )
}
export default Banner
