import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../Pages/Home";
import Signup from "../Pages/Signup";
import Login from "../Pages/Login";
import Contact from "../Pages/Contact";
import DashBoard from "../Layout/DashBoard";
import EmployeeList from "../DashBoard/EmployeeList";
import HrHome from "../DashBoard/HrHome";
import PaymentHistory from "../DashBoard/Payments/PaymentHistory";
import WorkSheet from "../DashBoard/WorkSheet";
import UserHome from "../DashBoard/UserHome";
import Progress from "../DashBoard/Progress";
import AdminHome from "../DashBoard/AdminHome";
import AllEmployees from "../DashBoard/AllEmployees";
import UserDetails from "../DashBoard/UserDetails";
import AdminRoute from "./AdminRoute";
import HrRoute from "./HrRoute";
import PrivateRoute from "./PrivateRoute";


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
    element: <PrivateRoute><DashBoard></DashBoard></PrivateRoute>,
    children: [
      //hr routes
      {
        path: 'employeelist',
        element: <HrRoute><EmployeeList></EmployeeList></HrRoute>
      },
      {
        path: 'hrhome',
        element: <HrRoute><HrHome></HrHome></HrRoute>
      },
      {
        path: 'progress',
        element: <HrRoute><Progress></Progress></HrRoute>
      },
      {
        path: 'employeelist/userdetails/:id',
        element: <HrRoute><UserDetails></UserDetails></HrRoute>
      },
      //user/employee routes
      {
        path: 'paymentHistory',
        element: <PrivateRoute><PaymentHistory></PaymentHistory></PrivateRoute>
      },
      {
        path: 'workSheet',
        element: <PrivateRoute><WorkSheet></WorkSheet></PrivateRoute>
      },
      {
        path: 'userHome',
        element: <PrivateRoute><UserHome></UserHome></PrivateRoute>
      },
      //admin routes
      {
        path: 'adminhome',
        element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
      },
      {
        path: 'allEmployees',
        element: <AdminRoute><AllEmployees></AllEmployees></AdminRoute>
      },
    ]
  }


]);

export default router;