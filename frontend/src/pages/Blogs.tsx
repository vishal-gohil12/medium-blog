import { Appbar } from "../components/Appbar";
import BlogCart from "../components/BlogCart";
import { useBlogs } from "../hooks";


export default function Blogs() {
    const { loading, blogs } = useBlogs();

    if (loading) {
        <div>
            Loading...
        </div>
    }

    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div className="max-w-xl">
                {blogs.map((blog, index) => (
                    <BlogCart
                        key={index}
                        id={blog.id}
                        authorName={blog.authorName || "Vishal"}
                        title={blog.title || "AI Power World"}
                        content={blog.content || "Artificial Intelligence (AI) is revolutionizing the world by enhancing efficiency and innovation across various sectors. From healthcare to finance, AI is enabling smarter decision-making, automating routine tasks, and providing insights from vast amounts of data. It’s driving advancements in robotics, natural language processing, and machine learning, creating opportunities for growth and problem-solving at an unprecedented scale. The AI-powered world is one of limitless potential and transformative change."}
                        publishDate={blog.publishDate || "5th May 2024"}
                    />
                ))}
            </div>
        </div>
    </div>
}
