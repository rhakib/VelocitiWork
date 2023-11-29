import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useGetUsers from '../Hooks/useGetUsers';
import { Avatar, Card } from 'keep-react';
import { Heart } from '@phosphor-icons/react';
import useGetPayments from '../Hooks/useGetPayments';


import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';
const UserDetails = () => {
    const { id } = useParams()
    console.log(id);
    const [users, ,] = useGetUsers()
    const [userData, setUserData] = useState({})
    const [paymentsData, setPaymentsData] = useState([])

    const { name, photo, designation, salary } = userData;

    const [payments, refetch, isLoading] = useGetPayments()

    useEffect(() => {
        const filteredData = users?.find(user => user._id == id)
        setUserData(filteredData)
    }, [users, id])

    useEffect(() => {

        const filteredPaymentData = payments?.filter(data => data.id == id)
        setPaymentsData(filteredPaymentData)
    }, [payments, id])

    console.log(paymentsData);

    const salaryAmount = paymentsData?.map(item => item.salary)
    console.log(salaryAmount);

    return (
        <div className='flex  items-center gap-6'>
            <div>
                <Card
                    imgSrc="https://imageio.forbes.com/specials-images/imageserve/5f302109ffad89f9130e07db/Programming-source-code-abstract-background/0x0.jpg?format=jpg&crop=4800,2700,x0,y243,safe&width=960"
                    imgSize="md"
                    className="max-w-xs">
                    <Card.Container className="absolute right-3.5 top-3.5 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-metal-200">
                        <Heart size={20} weight="bold" color="white" />
                    </Card.Container>
                    <Card.Container className="flex flex-col items-center justify-center">
                        <Card.Container className="absolute top-32  rounded-full ring-4 ring-white ring-offset-0">
                            <Avatar size="2xl" shape="circle" img={photo} />
                        </Card.Container>
                        <Card.Container className="mb-3 mt-10 text-center">
                            <Card.Title className="text-body-5 font-semibold text-metal-800 md:text-body-4">{name}</Card.Title>
                            <Card.Title className="!text-body-6 font-normal text-metal-400 md:text-body-5">{designation}</Card.Title>
                        </Card.Container>
                        <Card.Container className="flex w-full justify-between border-t border-t-metal-50 px-5 py-3">
                            <Card.Container className="text-center">
                                <Card.Title className="text-body-5 !font-normal text-metal-400 md:text-body-5 md:!font-medium">
                                    Salary
                                </Card.Title>
                                <Card.Title className="!text-body-1 !font-semibold text-metal-800">${salary}</Card.Title>
                            </Card.Container>
                            <Card.Container className="text-center">
                                <Card.Title className="text-body-5 !font-normal text-metal-400 md:text-body-5 md:!font-medium">
                                    Followers
                                </Card.Title>
                                <Card.Title className="!text-body-1 !font-semibold text-metal-800">1245M</Card.Title>
                            </Card.Container>
                            <Card.Container className="text-center">
                                <Card.Title className="text-body-5 !font-normal text-metal-400 md:text-body-5 md:!font-medium">
                                    Following
                                </Card.Title>
                                <Card.Title className="!text-body-1 !font-semibold text-metal-800">58</Card.Title>
                            </Card.Container>
                        </Card.Container>
                    </Card.Container>
                </Card>


            </div>
            {paymentsData.length > 0 && <div className='mt-4'>
                <BarChart
                    width={600}
                    height={350}
                    data={paymentsData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    barSize={20}
                >
                    <XAxis dataKey="payMonth" scale="point" padding={{ left: 10, right: 10 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Bar dataKey="salary" fill="#8884d8" background={{ fill: '#eee' }} />
                    <Tooltip></Tooltip>
                </BarChart>

            </div>}
        </div>
    );
};

export default UserDetails;