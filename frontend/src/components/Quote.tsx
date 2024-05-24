import axios from "axios";
import "../index.css";
import { useEffect, useState } from "react";

export const Quote = () => {
    const [quotes, setQuotes] = useState([]);
    const [author, setAuthor] = useState("");
    const [currentQuote, setCurrentQuote] = useState("");

    useEffect(() => {
        const fetchQuotes = async () => {
            try {
                const response = await axios.get("https://type.fit/api/quotes");
                setQuotes(response.data);
                const random = Math.floor(Math.random() * response.data.length);
                setAuthor(response.data[random].author);
                setCurrentQuote(response.data[random].text);
                console.log(quotes);

            } catch (error) {
                console.error("Error fetching quotes", error);
            }
        };

        fetchQuotes();
    }, []);


    return (
        <div className="bg-slate-200 h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div className="max-w-md">
                    <div className="text-center text-3xl font-bold">
                        "{currentQuote}"
                    </div>
                </div>
            </div>

            <div className="mx-w-md text-center text-xl font-light">
                - {author.split(' ')[0]}
            </div>
        </div>
    );
};
