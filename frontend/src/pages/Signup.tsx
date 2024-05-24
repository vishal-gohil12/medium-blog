import Auth from "../components/Auth";
import { Quote } from "../components/Quote";


export default function Signup() {
    return (<div>
        <div className="grid grid-cols-2">
            <div>
                <Auth type="signup" />
            </div>
            <div className="invisible md:visible">
                <Quote />
            </div>
        </div>

    </div>
    )
}
