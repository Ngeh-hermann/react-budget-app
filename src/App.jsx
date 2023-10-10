/* eslint-disable no-unused-vars */
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import { Error } from "./pages/Error";
import Main, { mainLoader } from "./layout/Main";
import { logoutAction } from "./actions/logout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        path: "/",
        element: <Dashboard />,
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement: <Error />
      },
      {
        path: "/logout",
        action: logoutAction
      }
    ]
  },


]);

function App() {

  return (
    <>
      <div className="app">
        <RouterProvider router={router} />
        <ToastContainer />
      </div>
    </>
  )
}

export default App