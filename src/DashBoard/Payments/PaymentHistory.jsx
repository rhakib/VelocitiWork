import { useEffect, useState } from 'react';
import useGetPayments from '../../Hooks/useGetPayments';
import useAuth from '../../Hooks/useAuth';
import { Badge, Table } from "keep-react";

const PaymentHistory = () => {

    const [payments, refetch] = useGetPayments()
    const { user } = useAuth()
    const [paymentCollection, setPaymentCollection] = useState([])
    console.log(payments);

    useEffect(() => {
        const filteredPayments = payments?.filter(payment => payment?.email == user?.email)
        setPaymentCollection(filteredPayments)
        console.log(filteredPayments);

    }, [payments, user?.email])

    console.log(paymentCollection);


    return (
        <div>
            <Table
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
                                Total Payments:
                            </p>
                            <Badge size="xl" colorType="light" color="gray">
                                {paymentCollection?.length}
                            </Badge>
                        </div>
                    </div>
                </Table.Caption>
                <Table.Head>
                    <Table.HeadCell className="min-w-[150px]">
                        <p className="text-body-6 font-medium text-metal-400">Month</p>
                    </Table.HeadCell>
                    <Table.HeadCell className="min-w-[140px]">Amount</Table.HeadCell>
                    <Table.HeadCell className="min-w-[120px]">Transaction ID</Table.HeadCell>
                    <Table.HeadCell className="min-w-[120px]">Paid By</Table.HeadCell>



                </Table.Head>
                <Table.Body className="divide-y divide-gray-25">
                    {
                        paymentCollection?.map(payment => <Table.Row key={payment._id} className="bg-white">
                            <Table.Cell>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2">
                                            <div>
                                                <p className="-mb-0.5 text-body-4 font-medium text-metal-600">
                                                    {payment?.payMonth}
                                                </p>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Table.Cell>
                            <Table.Cell>
                                <div className="flex items-center gap-1">
                                   ${payment?.salary}
                                </div>
                            </Table.Cell>
                            <Table.Cell>
                                <div className="flex items-center gap-1">
                                    {payment?.trxId}
                                </div>
                            </Table.Cell>
                            <Table.Cell>
                                <div className="flex items-center gap-1">
                                    {payment?.paidBy}
                                </div>
                            </Table.Cell>


                        </Table.Row>)
                    }

                </Table.Body>
            </Table>
        </div>
    );
};

export default PaymentHistory;