import { Appbar } from "./Appbar"
import { Blog } from "../hooks"
import { Avatar } from "./BlogCart"

export default function FullBlog({ blog }: { blog: Blog }) {
  return <div>
    <Appbar />
    <div className="flex justify-center">
      <div className="grid grid-cols-12 px-10 w-full pt-14 max-w-screen-xl">
        <div className="col-span-8">
          <div className="text-3xl font-extrabold">
            {blog.title}
          </div>
          <div className="text-slate-500 pt-4">
            Posted On 2nd
          </div>
          <div className="pt-2">
            {blog.content}
          </div>
        </div>
        <div className="col-span-4">
          <div className="text-slate-600 text-lg">
            Author
          </div>
          <div className="flex ">
            <div className="pr-4 flex flex-col justify-center">
              <Avatar name={blog.author?.name || "Annoymous"} />
            </div>
            <div>
              <div className="text-2xl font-bold">
                {blog.author?.name || "Annoymous"}
              </div>
              <div className="pt-2 text-slate-500">
                SomeRandom Blogs of the user
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
}
