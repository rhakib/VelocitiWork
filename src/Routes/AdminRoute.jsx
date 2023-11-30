import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";
import { Spinner } from "keep-react";
import toast from "react-hot-toast";


const AdminRoute = ({ children }) => {
    const { user, loading, logOutUser } = useAuth()
    const [isAdmin, isAdminLoading] = useAdmin()
    const location = useLocation()

    if (loading || isAdminLoading) {
        return <div className='flex my-4 justify-center'><Spinner color="info" size="lg" /></div>
    }

    if (user && isAdmin) {
        return children
    }
    

    toast.error('Unauthorized access')
    logOutUser()
    return <Navigate to='/login' ></Navigate>



};

export default AdminRoute;