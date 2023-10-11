/* eslint-disable no-unused-vars */
import { useLoaderData } from "react-router-dom";
import { createBudget, createExpense, fetchData, wait } from "../helpers"
import Intro from "../components/Intro";
import { toast } from "react-toastify";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";

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
    // new expense
    if (_action === "createExpense") {
        try {
            createExpense({
                name: values.newExpense,
                amount: values.newExpenseAmount,
                budgetId: values.newExpenseBudget
            })
            return toast.success(`Expense ${values.newExpense} created!`)
        } catch (e) {
            throw new Error("There was a problem creating your expense.")
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
                        {
                            budgets && budgets.length > 0 ? (

                                <div className="grid-lg">
                                    <div className="flex-lg">
                                        <AddBudgetForm />
                                        <AddExpenseForm budgets={budgets} />
                                    </div>
                                </div>
                            ) : (
                                <div className="grid-sm">
                                    <p>Personal budgeting is the secret to finacial freedom.</p>
                                    <p>Create a budget to get started!</p>
                                    <AddBudgetForm />
                                </div>
                            )
                        }
                    </div>
                </div>
            ) : <Intro />}
        </>
    )
}

export default Dashboard