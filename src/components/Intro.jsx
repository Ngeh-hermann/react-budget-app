import { UserPlusIcon } from "@heroicons/react/24/solid"
import { Form } from "react-router-dom"
import homeIllustration from "../assets/illustration.jpg"

const Intro = () => {
    return (
        <div className="intro">
            <div>
                <h1>
                    Take Control of <span className="accent">Your Money</span>
                </h1>
                <p>
                    Personal budgeting is the secret to financial freedom. Start your journey today.
                </p>
                <Form method="post">
                    <input type="text" name="userName" required placeholder="Enter your name" aria-label="Your Name" autoComplete="given-name" />
                    <button type="submit" className="btn btn--dark">
                        <span>Create Account</span>
                        <UserPlusIcon width={20} />
                    </button>
                </Form>
            </div>
            <img src={homeIllustration} alt="person with miney" width={600} />
        </div>
    )
}

export default Intro