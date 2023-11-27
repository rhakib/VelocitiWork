import useAxiosSecure from "../Hooks/useAxiosSecure";
import { Avatar, Badge, Button, Modal, Table } from "keep-react";
import { MdOutlineCancel, MdVerified, } from "react-icons/md";
import Swal from "sweetalert2";
import { useState } from "react";
import useGetUsers from "../Hooks/useGetUsers";
import Payments from "./Payments/Payments";
import { Spinner } from "keep-react";



const EmployeeList = () => {

    const axiosSecure = useAxiosSecure()
    const [showModal, setShowModal] = useState(false);
    const [user, setUser] = useState(null)

    const [users, refetch, isLoading] = useGetUsers()





    const handleVerified = (user) => {

        axiosSecure.patch(`/users/hr/${user?._id}`)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        title: "Updated!",
                        text: `${user.name} is Verified employee now`,
                        icon: "success"
                    });
                }
            })


    }

    const onClick = (user) => {
        setUser(user)
        setShowModal(!showModal);
    };


    return (
        <div className="max-w-5xl">
            {
                isLoading && <div className='flex my-4 justify-center'><Spinner color="info" size="lg" /></div>
            }
            <Modal
                size="md"
                show={showModal}
                position="top-center"
            >
                <Modal.Header>Pay to <span className="text-blue-600">{user?.name}</span></Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <p className="text-body-4 text-xl font-semibold leading-relaxed text-metal-500">
                            Salary: {user?.salary}
                        </p>
                        <Payments  user={user} showModal={showModal} setShowModal={setShowModal}></Payments>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="outlineGray" onClick={onClick}>
                        Cancel
                    </Button>

                </Modal.Footer>
            </Modal>
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
                                Total Employee:
                            </p>
                            <Badge size="xs" colorType="light" color="gray">
                                {users?.length} Employees
                            </Badge>
                        </div>
                    </div>
                </Table.Caption>
                <Table.Head>
                    <Table.HeadCell className="min-w-[200px]">
                        <p className="text-body-6 font-medium text-metal-400">Name</p>
                    </Table.HeadCell>
                    <Table.HeadCell className="min-w-[240px]">Email Address</Table.HeadCell>
                    <Table.HeadCell>Verfied?</Table.HeadCell>
                    <Table.HeadCell className="min-w-[215px]">Bank Account</Table.HeadCell>
                    <Table.HeadCell className="min-w-[152px]">Designation</Table.HeadCell>
                    <Table.HeadCell className="min-w-[120px]">Salary</Table.HeadCell>
                    <Table.HeadCell className="min-w-[100px]">Pay</Table.HeadCell>
                    <Table.HeadCell className="min-w-[100px]">Details</Table.HeadCell>

                </Table.Head>
                <Table.Body className="divide-y divide-gray-25">
                    {
                        users?.map(user => <Table.Row key={user._id} className="bg-white">
                            <Table.Cell>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2">
                                            <Avatar
                                                shape="circle"
                                                img={user?.photo}
                                                size="md"
                                            />
                                            <div>
                                                <p className="-mb-0.5 text-body-4 font-medium text-metal-600">
                                                    {user?.name}
                                                </p>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Table.Cell>
                            <Table.Cell>{user?.email}</Table.Cell>
                            <Table.Cell>
                                {user?.verified === 'yes' ? <MdVerified className="text-blue-600 text-2xl"></MdVerified>  : <button onClick={() => handleVerified(user)}><MdOutlineCancel className="text-2xl text-red-500"></MdOutlineCancel></button>}
                            </Table.Cell>
                            <Table.Cell>
                                <div className="flex items-center gap-3">
                                    {user?.bankAccount}
                                </div>
                            </Table.Cell>
                            <Table.Cell>
                                <p>{user?.designation}</p>
                            </Table.Cell>
                            <Table.Cell>
                                <div className="flex items-center gap-1">
                                    ${user?.salary}
                                </div>
                            </Table.Cell>
                            <Table.Cell>
                                {
                                    user?.verified == 'no' ? <p className=" bg-gray-500 text-white w-14 rounded-3xl px-4 py-2">Pay</p> :
                                        <Button className="rounded-3xl" size="sm" type='primary' onClick={() => onClick(user)}>Pay</Button>



                                }
                            </Table.Cell>
                            <Table.Cell>
                                <button>
                                    <Button className="rounded-3xl" size="sm" type="primary">
                                        Details
                                    </Button>
                                </button>
                            </Table.Cell>
                        </Table.Row>)
                    }

                </Table.Body>
            </Table>
        </div>
    );
};

export default EmployeeList;