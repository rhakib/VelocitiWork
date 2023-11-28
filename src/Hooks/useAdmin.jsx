
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useAdmin = () => {
    const {user, loading} = useAuth()
    const axiosSecure = useAxiosSecure()

    const getAdmin = async () => {
        const res =  await axiosSecure.get(`/users/admin/${user?.email}`)     
        console.log(res.data);  
        return res.data.admin;
    }
    
    const {data: isAdmin, isPending: isAdminLoading} = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !loading && !!localStorage.getItem('access-token'),
        queryFn: getAdmin
        
    })

    return [isAdmin, isAdminLoading]
};

export default useAdmin;