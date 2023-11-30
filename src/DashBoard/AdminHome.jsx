import React from 'react';
import useAuth from '../Hooks/useAuth';

const AdminHome = () => {
    const {user} = useAuth()
    return (
        <div> 
            <h2 className='text-4xl text-white font-semibold'>Hello <span className='text-blue-600'>{user?.displayName}</span>,
            <br /> Welcome to Dashboard</h2>
        </div>
    );
};

export default AdminHome;