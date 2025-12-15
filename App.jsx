import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from './register/Register.jsx';
import Login from "./login/Login.jsx";
import { ToastContainer } from "react-toastify";
import Protected from "./Protected.jsx";
import Admin from "./admin/Admin.jsx";
import Nav from "./admin/Nav.jsx";
import Create from "./admin/Create.jsx";
import View from "./admin/View.jsx";
import Update from "./admin/Update.jsx";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Register />
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/home",
    element: <Protected/>
  },
  {
    path: "/admin",
    element: <Admin/>,
    children: [
      {
        path: "/admin",
        element: <Nav/>,
        children: [
          {
            path: "/admin/create",
            element: <Create/>
          },
          {
            path: "/admin/view",
            element: <View/>
          },
          {
            path: "/admin/update/:id",
            element: <Update/>
          }
        ]
      }
    ]
  }
]);

const App = () => {
  return (
    <>
      <ToastContainer 
        position="top-right" 
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={true}
        pauseOnHover={true}
      />
      <RouterProvider router={router}/>
    </>
  );
};

export default App;