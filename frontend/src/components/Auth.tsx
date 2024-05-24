import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";


export default function Auth({ type }: { type: 'signin' | 'signup' }) {
    const navigate = useNavigate();
    const [postInput, setPostInput] = useState({
        email: " ",
        password: " ",
        name: ""
    })

    async function handleSendingRequest() {
        try {
            const responst = await axios.post(`${BACKEND_URL}/api/user/${type === "signup" ? "signup" : "signin"}`, postInput);
            const jwt = responst.data;
            console.log(jwt.jwt);

            localStorage.setItem("token", jwt.jwt);
            navigate("/blog");
        } catch (e) {
            alert("Signup failed try agian");
        }

    }

    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center px-20">
            <div>
                <div className="px-10">
                    <div className="text-3xl font-semibold pt-5">
                        Create an Account
                    </div>
                    <div className="text-slate-400">
                        {type === "signin" ? "Don't have account? " : "Aldreay have account"}
                        <Link to={type === "signin" ? "/signup" : "/signin"} className="pl-2 underline">
                            {type === "signin" ? "Sign Up" : "Sign In"}
                        </Link>
                    </div>
                </div>

                <LableInput lable="Email" placeholder="Enter Email" onChaneg={(e) => {
                    setPostInput(c => ({
                        ...c,
                        email: e.target.value
                    }));
                }} />

                <LableInput lable="password" type="password" placeholder="Enter passowrd" onChaneg={(e) => {
                    setPostInput(c => ({
                        ...c,
                        password: e.target.value
                    }));
                }} />

                {type === "signup" ? <LableInput lable="name" placeholder="Enter name" onChaneg={(e) => {
                    setPostInput(c => ({
                        ...c,
                        name: e.target.value
                    }));
                }} /> : null}
                <div className="pt-5">
                    <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-full" onClick={handleSendingRequest}>{type === "signin" ? "Sign In" : "Sign Up"}</button>
                </div>
            </div>
        </div>
    </div>
}


interface lableInputType {
    lable: string,
    type?: string,
    placeholder: string,
    onChaneg: (e: ChangeEvent<HTMLInputElement>) => void;
}

function LableInput({ lable, type, placeholder, onChaneg }: lableInputType) {
    return <div>
        <div>
            <label className="block mt-3 mb-2 text-sm font-semibold text-gray-900 dark:text-white">{lable}</label>
            <input type={type || "text"} onChange={onChaneg} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
        </div>
    </div>
}
