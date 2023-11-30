import { Spinner } from 'keep-react';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import useHR from '../Hooks/useHR';
import useAdmin from '../Hooks/useAdmin';
import toast from 'react-hot-toast';

const PrivateRoute = ({ children }) => {
    const { user, loading, logOutUser } = useAuth()
    
    const location = useLocation()
    const [isHR, isHRLoading] = useHR()
    const [isAdmin, isAdminLoading] = useAdmin()
    

    if (loading) {
        return <div> <Spinner color="info" size="lg" /></div>
    }

    if (user && !isHR && !isAdmin) {
        return children
    }

    logOutUser()
    toast.error('Unauthorized access')
    return <Navigate to='/login' state={{ from: location }} replace ></Navigate>
};

export default PrivateRoute;