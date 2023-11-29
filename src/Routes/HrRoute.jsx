import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import useHR from '../Hooks/useHR';
import toast from 'react-hot-toast';
import { Spinner } from 'keep-react';

const HrRoute = ({children}) => {
    const { user, loading } = useAuth()
    const [isHR, isHRLoading] = useHR()
    const location = useLocation()

    if (loading || isHRLoading) {
        return <div> <Spinner color="info" size="lg" /></div>
    }

    if (user && isHR) {
        return children;
    }

    return <Navigate to='/login' state={{ from: location }} replace ></Navigate>
};

export default HrRoute;