import useAuth from '../Hooks/useAuth';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Avatar, Badge, Spinner, Table } from "keep-react";

const Progress = () => {

    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()

    const getTasks = async () => {
        const res = await axiosSecure.get('/tasks')
        return res.data;
    }

    const { data: tasks, isLoading } = useQuery({
        queryKey: ['tasks'],
        queryFn: getTasks
    })
    console.log(tasks);

    return (
        <div>
            {
                isLoading && <div className='flex my-4 justify-center'><Spinner color="info" size="lg" /></div>
            }

            <Table className='mb-6'
                showCheckbox={true}
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
                    </div>
                </Table.Caption>
                <Table.Head>
                    <Table.HeadCell className="min-w-[150px]">
                        <p className="text-body-6 font-medium text-metal-400">Name</p>
                    </Table.HeadCell>
                    <Table.HeadCell className="min-w-[150px]">
                        <p className="text-body-6 font-medium text-metal-400">Tasks</p>
                    </Table.HeadCell>
                    <Table.HeadCell className="min-w-[140px]">Hours worked</Table.HeadCell>
                    <Table.HeadCell className="min-w-[120px]">Date</Table.HeadCell>

                </Table.Head>
                <Table.Body className="divide-y divide-gray-25">
                    {
                        tasks?.map(task => <Table.Row key={task._id} className="bg-white">
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
                                    {task?.hours}
                                </div>
                            </Table.Cell>
                            <Table.Cell>
                                <div className="flex items-center gap-1">
                                    {task?.date}
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