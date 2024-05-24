import { Link } from "react-router-dom";

interface Blogcart {
    authorName: string,
    title: string,
    content: string,
    publishDate: string,
    id: number;
}

export default function BlogCart({
    id,
    authorName,
    title,
    content,
    publishDate
}: Blogcart) {
    return <Link to={`/blog/${id}`}>
        <div className="p-4 border-b border-slate-200 pb-4 cursor-pointer w-screen">
            <div className="flex">
                <div className="flex flex-col justify-center">
                    <Avatar name={authorName} />
                </div>
                <div className="font-thin pl-2 justify-center">{authorName}</div>
                <div className="pl-3 font-light font">
                    {publishDate}
                </div>
            </div>
            <div className="text-xl font-semibold pt-4">
                {title}
            </div>
            <div className="text-md font-thin">
                {content.slice(0, 100) + '...'}
            </div>
            <div className="text-slate-400 text-sm font-thin pt-3">
                {`${Math.ceil(content.length / 100)} minutes`}
            </div>

        </div>
    </Link>
}


export function Avatar({ name }: { name: string }) {
    return (
        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-300 rounded-full dark:bg-gray-600">
            <span className=" text-l font-extralight text-gray-600 dark:text-gray-300">{name[0]}</span>
        </div >
    );

} 