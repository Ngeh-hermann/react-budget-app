/* eslint-disable no-unused-vars */
import { useLoaderData } from "react-router-dom";
import { createBudget, fetchData, wait } from "../helpers"
import Intro from "../components/Intro";
import { toast } from "react-toastify";
import AddBudgetForm from "../components/AddBudgetForm";

//loader function
export function dashboardLoader() {
    const userName = fetchData("userName");
    const budgets = fetchData("budgets");
    return {
        userName,
        budgets
    }
}

export async function dashboardAction({ request }) {

    await wait();

    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data);

    // new user
    if (_action === "newUser") {
        try {
            localStorage.setItem("userName", JSON.stringify(values.userName))
            return toast.success(`Welcome ${values.userName}`);
        } catch (e) {
            throw new Error("There was a problem when creating your account!");
        }
    }

    // new budget
    if (_action === "createBudget") {
        try {
            createBudget({
                name: values.newBudget,
                amount: values.newBudgetAmount
            })
            return toast.success("Budget created!")
        } catch (e) {
            throw new Error("There was a problem creating your budget.")
        }
    }
}

const Dashboard = () => {
    const { userName, budgets } = useLoaderData()
    return (
        <>
            {userName ? (
                <div className="dashboard">
                    <h1>Welcome back, <span className="accent">
                        {userName}</span></h1>
                    <div className="grid-sm">
                        {/* {budgets ? () : ()} */}
                        <div className="grid-lg">
                            <div className="flex-lg">
                                <AddBudgetForm />
                            </div>
                        </div>
                    </div>
                </div>
            ) : <Intro />}
        </>
    )
}

export default Dashboard