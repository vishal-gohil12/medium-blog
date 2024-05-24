import FullBlog from "../components/FullBlog";
import { useBlog } from "../hooks"
import { useParams } from "react-router-dom";
import { Spiner } from "./Spiner";
import { Appbar } from "../components/Appbar";

export default function Blog() {
    const { id } = useParams();
    const { loading, blog } = useBlog({
        id: id || ' '
    });

    if (loading || !blog) {
        return <div>
            <Appbar />
            <div className="h-screen flex flex-col justify-center">
                <div className="flex justify-center">
                    <Spiner />
                </div>
            </div>
        </div>
    }

    return <div>
        <FullBlog blog={blog} />
    </div>
}
