import { Avatar } from "./BlogCart"
import { Link } from "react-router-dom"

export const Appbar = () => {
    return <div className="border-b flex px-10 py-4 justify-between">
        <Link to="/blog" className="font-bold cursor-pointer flex justify-center">
            Medium
        </Link>
        <div>
            <Link to={`/publish`}>
                <button type="button" className="mr-4 text-white bg-green-700  font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">New</button>
            </Link>
            <Avatar name="vishal" />
        </div>
    </div>
}
