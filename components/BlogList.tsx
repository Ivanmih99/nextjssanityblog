import Image from 'next/image'
import urlFor from '@/lib/urlFor'
import category from '@/schemas/category'
import { ArrowUpRightIcon } from '@heroicons/react/24/solid'
import ClientSideRoute from './ClientSideRoute'
import type { Post } from 'common-types'

type BlogListProps = {
  posts: Post[]
}

function BlogList({ posts }: BlogListProps) {
  // console.log('[BlogList]posts:', posts)
  return (
    <div>
      <hr className="mb-10" />

      <div className="grid grid-cols-1 gap-x-10 gap-y-16 px-10 pb-24 md:grid-cols-2">
        {/* Posts */}
        {posts.map(post => (
          <ClientSideRoute
            key={post._id}
            route={`/post/${post.slug.current}`}
          >
            <div className="group flex cursor-pointer flex-col">
              <div className="relative h-80 w-full transform-gpu drop-shadow-xl transition-transform duration-200 ease-out rounded-xl group-hover:shadow-xl">
                <Image
                  className="object-cover object-left rounded-xl lg:object-center"
                  src={urlFor(post.mainImage).url()}
                  alt={post.author.name}
                  fill
                ></Image>
                <div className="absolute bottom-0 flex w-full justify-between bg-neutral-900 bg-opacity-20 p-5 text-white drop-shadow-lg rounded-b-xl backdrop-blur-lg">
                  <div>
                    <p className="font-bold">{post.title}</p>
                    <p className="transform-gpu subpixel-antialiased">
                      {new Date(post._createdAt).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>

                  <div className="flex flex-col gap-y-2 md:flex-row md:gap-x-2">
                    {post.categories.map(category => (
                      <div
                        key={category._id}
                        className="h-fit rounded-md bg-[#505050] px-2 py-1 text-center text-sm font-semibold text-white bg-gradient-to-r from-pink-500 via-red-500 to-yellow-600"
                      >
                        <p>{category.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5 flex-1">
                <p className="text-lg font-bold">{post.title}</p>
                <p className="text-gray-500 line-clamp-2">{post.description}</p>
              </div>

              {/* <p className="mt-2 flex items-center font-bold group-hover:underline">
                Read Post
                <ArrowUpRightIcon className="ml-2 h-4 w-4"></ArrowUpRightIcon>
              </p> */}
            </div>
          </ClientSideRoute>
        ))}
      </div>
    </div>
  )
}
export default BlogList
