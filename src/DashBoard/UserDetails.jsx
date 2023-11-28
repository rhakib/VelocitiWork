import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useGetUsers from '../Hooks/useGetUsers';

const UserDetails = () => {
    const { id } = useParams()
    console.log(id);
    const [users, ,] = useGetUsers()
    const [userData, setUserData] = useState({})

    const {name, photo, designation, salary } = userData;

    useEffect(()=>{
        const filteredData = users?.find(user => user._id == id)
        setUserData(filteredData)

    }, [users, id])

    console.log(userData);

    return (
        <div>
            <h2 className='text-2xl text-white'>Here is our user details</h2>
            <p className='text-2xl text-white'>{name}</p>
        </div>
    );
};

export default UserDetails;