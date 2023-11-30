import { Badge, Button, Table } from 'keep-react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';


const AllEmployees = () => {

      
    const [verifiedUser, setVerifiedUser] = useState([])

    const axiosSecure = useAxiosSecure()

    const getUsers = async () => {
        const res = await axiosSecure.get('/users/admin')
        return res.data;
    }

    const { data: users, refetch, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: getUsers
    })

    useEffect(() => {
        const filteredUser = users?.filter(user => user?.verified == 'yes' && user?.role == 'Employee' || user?.role == 'HR' )
        setVerifiedUser(filteredUser)
        console.log(filteredUser);

    }, [users])

    const handleMakeHR = (user) => {


        axiosSecure.patch(`/users/admin/${user?._id}`)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        title: "Updated!",
                        text: `${user.name} is now in the HR department.`,
                        icon: "success"
                    });
                }
            })


    }
    const handleFire = (user) => {

        const firedUsers = {
            email: user?.email,
            name: user?.name,

        }

        Swal.fire({
            title: "Are you sure you want to Fire?",
            text: "He won't be able to access his account anymore!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Fire!"
        }).then((result) => {
            if (result.isConfirmed) {


                axiosSecure.put(`/users/admin/${user?._id}`)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.modifiedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Fired!",
                                text: `${user.name} is Fired, he can't access anymore in his account`,
                                icon: "success"
                            });
                        }
                    })

                axiosSecure.post('/firedUsers', firedUsers)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.insertedId) {
                            // refetch()
                            // Swal.fire({
                            //     title: "Fired!",
                            //     text: `${user.name} is Fired, he can't access anymore in his account`,
                            //     icon: "success"
                            // });
                        }
                    })
            }
        });

    }


    return (
        <div>
            <Table className='mb-6'
                showCheckbox={false}
                showBorder={true}
                showBorderPosition="right"
                striped={true}
                hoverable={true}
            >
                <Table.Caption>
                    <div className="my-5 flex items-center justify-between px-6">
                        <div className="flex items-center gap-5">
                            <p className="text-body-1 font-semibold text-metal-600">
                                All Employees:
                            </p>
                            <Badge size="xl" colorType="light" color="gray">
                                {verifiedUser?.length}
                            </Badge>
                        </div>
                    </div>
                </Table.Caption>
                <Table.Head className='text-lg'>

                    <Table.HeadCell className="min-w-[70px]">
                        <p className="ml-4">#</p>
                    </Table.HeadCell>
                    <Table.HeadCell className="min-w-[150px]">
                        <p className="">Name</p>
                    </Table.HeadCell>
                    <Table.HeadCell className="min-w-[140px]">Designation</Table.HeadCell>
                    <Table.HeadCell className="min-w-[120px]">Make HR</Table.HeadCell>
                    <Table.HeadCell className="min-w-[120px]">Fire</Table.HeadCell>

                </Table.Head>
                <Table.Body className="divide-y divide-gray-25">
                    {
                        verifiedUser?.map((user, idx) => <Table.Row key={user._id} className="bg-white">
                            <Table.Cell>
                                <div>
                                    <p className="-mb-0.5 ml-4 text-body-4 font-medium text-metal-600">
                                        {idx + 1}
                                    </p>

                                </div>
                            </Table.Cell>
                            <Table.Cell>
                                <div>
                                    <p className="-mb-0.5 text-body-4 font-medium text-metal-600">
                                        {user?.name}
                                    </p>

                                </div>
                            </Table.Cell>
                            <Table.Cell>
                                <div className="flex items-center gap-1">
                                    {user?.designation}
                                </div>
                            </Table.Cell>
                            <Table.Cell>
                                <div className="flex items-center gap-1">
                                    {user?.fired === 'yes' ? <p className='bg-gray-500 px-2 py-1 rounded-md text-white'>Make HR</p> : user?.role === 'HR' ? <Button size="md" color="success">HR</Button> : <Button onClick={() => handleMakeHR(user)} className="rounded-xl" size="sm" type="primary">
                                        Make HR
                                    </Button>}
                                </div>
                            </Table.Cell>
                            <Table.Cell>
                                {user?.fired === 'yes' ? <p className='text-red-600 ml-4 font-bold'>Fired</p> : <Button onClick={() => handleFire(user)} size="sm" className='bg-red-500 px-2 hover:bg-red-700  rounded-md text-white'>
                                    Fire
                                </Button>}
                            </Table.Cell>


                        </Table.Row>)
                    }

                </Table.Body>
            </Table>
        </div>
    );
};

export default AllEmployees;