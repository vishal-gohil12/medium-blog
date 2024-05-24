import { Appbar } from "../components/Appbar"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom";

export default function Publish() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const navigate = useNavigate();

    return <div>
        <Appbar />
        <div className="flex justify-center w-full pt-8">
            <div className="max-w-screen-lg w-full">
                <input className="focus:outline-none bg-grey-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
                <TextEditor onChange={(e) => setContent(e.target.value)} />
                <button onClick={async () => {
                    const response = await axios.post(`${BACKEND_URL}/api/blog`, {
                        title,
                        content
                    }, {
                        headers: {
                            Authorization: localStorage.getItem('token')
                        }
                    });
                    navigate(`/blog/${response.data.id}`)
                }} className=" m-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-500 rounded-lg">
                    Publish Post
                </button>
            </div>
        </div>
    </div>
}


function TextEditor({ onChange }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {
    return <div>
        <div className="pt-4 w-full mb-4 rounded-lg bg-gray-50">
            <div className="flex items-center justify-between px-3 py-2 border">
                <div className="my-2 px-4 py-2 bg-white rounded-b-lg w-full">
                    <textarea className="focus:outline-none block w-full px-0 text-sm text-gray-800 bg-white" placeholder="Write an artical..." required onChange={onChange} />
                </div>
            </div>

        </div>
    </div>
}