import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useGetPayments = () => {
    const axiosSecure = useAxiosSecure()

    const getPayments = async () => {
        const res = await axiosSecure.get('/payments')
        return res.data;
    }

    const { data: payments, refetch, isLoading, isPending } = useQuery({
        queryKey: ['payments'],
        queryFn: getPayments
    })


    return [payments, refetch, isLoading, isPending]
};

export default useGetPayments;