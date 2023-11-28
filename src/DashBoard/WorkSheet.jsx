
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import useAuth from '../Hooks/useAuth';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import { Badge, Table } from 'keep-react';
import moment from 'moment/moment';

const WorkSheet = () => {

    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()

    const getTasks = async () => {
        const res = await axiosSecure.get(`/tasks/${user?.email}`)
        return res.data;
    }

    const { data: tasks, refetch } = useQuery({
        queryKey: ['tasks', user?.email],
        queryFn: getTasks
    })



    const { register, handleSubmit, reset, formState: { errors } } = useForm()



    const onSubmit = async (data) => {
        console.log(data)
        const month = moment(data.date).format('ll')
        console.log(month);
        const newMonth = month.split(' ')
        const submittedMonth = newMonth[0]
        const submittedYear = newMonth[2]







        const tasksInfo = {
            email: user?.email,
            task: data.tasks,
            hours: parseInt(data.hours),
            date: submittedMonth,
            year: submittedYear,
            month: data.date,
            name: user?.displayName,
            photo: user?.photoURL


        }
        const tasksRes = await axiosSecure.post('/tasks', tasksInfo)
        if (tasksRes.data.insertedId) {
            reset()
            Swal.fire({
                icon: "success",
                title: "Submitted",
                text: `Successfully submitted your task for ${data.tasks}`
            });
            refetch()
        }
    }

    return (
        <div>
            <div>

                {
                    tasks?.length > 0 && <>
                        <h2 className='text-4xl text-center text-white mb-4'>Submitted Tasks</h2>
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
                                </div>
                            </Table.Caption>
                            <Table.Head className='text-lg'>

                                <Table.HeadCell className="min-w-[70px]">
                                    <p className="ml-4">#</p>
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
                                                {task?.date}
                                            </div>
                                        </Table.Cell>


                                    </Table.Row>)
                                }

                            </Table.Body>
                        </Table>
                    </>
                }
            </div>
            <div className=''>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6" action="#">
                    <div className="flex gap-2">
                        <div className="flex-1">
                            <label className="block mb-2 text-sm font-medium text-white dark:text-white">Select your task</label>
                            <select required={true} {...register("tasks", { required: true })} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option> </option>
                                <option value="Sales">Sales</option>
                                <option value="Support">Support</option>
                                <option value="Content">Content</option>
                                <option value="Paper Work">Paper Work</option>
                            </select>
                            {errors.tasks?.type === 'required' && <span className="text-red-500">This field is required</span>}

                        </div>
                        <div className="flex-1">
                            <label className="block mb-2 text-sm font-medium text-white dark:text-white">Hours</label>
                            <input type="number" required {...register("hours")} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Hours you worked" />
                        </div>
                        <div className="flex-1">
                            <label className="block mb-2 text-sm font-medium text-white dark:text-white">Date</label>
                            <input type="date" required {...register("date", { required: true })} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your email" />
                            {errors.email?.type === 'required' && <span className="text-red-500">This field is required</span>}
                        </div>
                    </div>

                    <div className='flex justify-center'>
                        <button type="submit" className="w-52 mx-auto text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Submit your task</button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default WorkSheet;