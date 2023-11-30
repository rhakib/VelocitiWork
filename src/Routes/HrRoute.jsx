import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import useHR from '../Hooks/useHR';
import toast from 'react-hot-toast';
import { Spinner } from 'keep-react';

const HrRoute = ({children}) => {
    const { user, loading, logOutUser } = useAuth()
    const [isHR, isHRLoading] = useHR()
    const location = useLocation()

    console.log(isHR);

    if (loading || isHRLoading) {
        return <div> <Spinner color="info" size="lg" /></div>
    }

    if (user && isHR) {
        return children;
    }

    logOutUser()
    toast.error('Unauthorized access')
    return <Navigate to='/login' ></Navigate>
};

export default HrRoute;