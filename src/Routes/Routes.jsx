import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../Pages/Home";
import Signup from "../Pages/Signup";
import Login from "../Pages/Login";
import Contact from "../Pages/Contact";
import DashBoard from "../Layout/DashBoard";
import EmployeeList from "../DashBoard/EmployeeList";
import HrHome from "../DashBoard/HrHome";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: 'signup',
        element: <Signup></Signup>
      },
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'contact',
        element: <Contact></Contact>
      }
    ]
  },
  {
    path: '/dashboard',
    element: <DashBoard></DashBoard>,
    children: [
      {
        path: 'employeelist',
        element: <EmployeeList></EmployeeList>
      },
      {
        path: 'hrhome',
        element: <HrHome></HrHome>
      }
    ]
  }


]);

export default router;