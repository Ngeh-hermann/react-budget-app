import { formatCurrency, formatDate } from "../helpers"

/* eslint-disable react/prop-types */
const ExpenseItem = ({ expense }) => {
    return (
        <>
            <td>{expense.name}</td>
            <td>{formatCurrency(expense.amount)}</td>
            <td>{formatDate(expense.createdAt)}</td>
        </>
    )
}

export default ExpenseItem