
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useGetUsers = () => {
    
    const axiosSecure = useAxiosSecure()

    const getUsers = async () => {
        const res = await axiosSecure.get('/users')
        return res.data;
    }

    const { data: users, refetch, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: getUsers
    })


    return [users, refetch, isLoading]
};

export default useGetUsers;