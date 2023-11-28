import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useHR = () => {
    const {user, loading} = useAuth()
    const axiosSecure = useAxiosSecure()

    const getHr = async () => {
        const res =  await axiosSecure.get(`/users/hr/${user?.email}`)     
        console.log(res.data);  
        return res.data.hr;
    }
    
    const {data: isHR, isPending: isHRLoading} = useQuery({
        queryKey: [user?.email, 'isHR'],
        enabled: !loading && !!localStorage.getItem('access-token'),
        queryFn: getHr
        
    })

    return [isHR, isHRLoading]
};

export default useHR;