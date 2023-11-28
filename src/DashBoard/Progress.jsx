import { useState } from 'react';
import useAuth from '../Hooks/useAuth';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Avatar, Badge, Spinner, Table } from "keep-react";
import useGetUsers from '../Hooks/useGetUsers';

const Progress = () => {

    const axiosSecure = useAxiosSecure()
    const [name, setName] = useState('')
    const [date, setDate] = useState('')
    const { user } = useAuth()
    const [users, , ] = useGetUsers()


    console.log(name, date);

    const getTasks = async () => {
        const res = await axiosSecure.get(`/tasks?name=${name}&date=${date}`)
        console.log(res);
        return res.data;
    }

    const { data: tasks, isLoading, refetch } = useQuery({
        queryKey: ['tasks', name, date],
        queryFn: getTasks
    })
    console.log(tasks);
  

   
    return (
        <div>
            {
                isLoading && <div className='flex my-4 justify-center'><Spinner color="info" size="lg" /></div>
            }

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
                                Total submitted:
                            </p>
                            <Badge size="xl" colorType="light" color="gray">
                                {tasks?.length}
                            </Badge>
                        </div>
                        <div className='my-5 flex gap-3 items-center justify-between px-2'>
                            <select onChange={(e) => setName(e.target.value)}  required={true} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected disabled>Sort by Name </option>
                                {
                                    users?.map(name=> <option key={name._id} value={name?.name}>{name?.name}</option>)
                                }

                            </select>
                            <select onChange={(e) => setDate(e.target.value)}  required={true} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected disabled>Sort by Month </option>
                                <option value='Jan'>Jan, 23 </option>
                                <option value='Feb'>Feb, 23 </option>
                                <option value='Mar'>March, 23 </option>
                                <option value='Apr'>April, 23 </option>
                                <option value='May'>May, 23 </option>
                                <option value='Jun'>June, 23 </option>
                                <option value='Jul'>July, 23 </option>
                                <option value='Aug'>Aug, 23 </option>
                                <option value='Sep'>Sept, 23 </option>
                                <option value='Oct'>Oct, 23 </option>
                                <option value='Nov'>Nov, 23 </option>
                                <option value='Dec'>Dec, 23 </option>
                               
                                
                            </select>
                        </div>
                    </div>
                </Table.Caption>
                <Table.Head className='text-lg'>
                    <Table.HeadCell className="min-w-[80px]">
                        <p className="ml-4">#</p>
                    </Table.HeadCell>
                    <Table.HeadCell className="min-w-[150px]">
                        <p className="">Name</p>
                    </Table.HeadCell>
                    <Table.HeadCell className="min-w-[150px]">
                        <p className="">Tasks</p>
                    </Table.HeadCell>
                    <Table.HeadCell className="min-w-[140px]">Hours worked</Table.HeadCell>
                    <Table.HeadCell className="min-w-[120px]">Date</Table.HeadCell>

                </Table.Head>
                <Table.Body className="divide-y divide-gray-25">
                    {
                        tasks?.map((task, idx) => <Table.Row key={task._id} className="bg-white">
                            <Table.Cell>
                                <div>
                                    <p className="-mb-0.5 ml-4 text-body-4 font-medium text-metal-600">
                                        {idx + 1}
                                    </p>

                                </div>
                            </Table.Cell>
                            <Table.Cell>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2">
                                            <Avatar
                                                shape="circle"
                                                img={task?.photo}
                                                size="md"
                                            />
                                            <div>
                                                <p className="-mb-0.5 text-body-4 font-medium text-metal-600">
                                                    {task?.name}
                                                </p>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Table.Cell>
                            <Table.Cell>
                                <div>
                                    <p className="-mb-0.5 text-body-4 font-medium text-metal-600">
                                        {task?.task}
                                    </p>

                                </div>
                            </Table.Cell>
                            <Table.Cell>
                                <div className="flex items-center gap-1">
                                    {task?.hours} hours
                                </div>
                            </Table.Cell>
                            <Table.Cell>
                                <div className="flex items-center gap-1">
                                    {task?.month}
                                </div>
                            </Table.Cell>


                        </Table.Row>)
                    }

                </Table.Body>
            </Table>


        </div>
    );
};

export default Progress;