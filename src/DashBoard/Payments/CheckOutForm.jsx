import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import {  DatePicker } from 'keep-react';
import useGetPayments from '../../Hooks/useGetPayments';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const CheckOutForm = ({ user, setShowModal, showModal }) => {

    //states
    const [error, setError] = useState()
    const [confirmError, setConfirmError] = useState('')
    const [payMonth, setPayMonth] = useState(null);
    // const [trxId, setTrxId] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const { user: currentUser } = useAuth()
    const salary = user?.salary;
    
    //hooks
    const stripe = useStripe()
    const elements = useElements()
    const [payments, refetch] = useGetPayments()

    


    const axiosSecure = useAxiosSecure()

    const axiosPublic = useAxiosPublic()

    useEffect(() => {

        if (salary > 0) {
            axiosSecure.post('/create-payment-intent', { salary: salary })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret)
                })
        }

    }, [axiosSecure, salary])

    const handleSubmit = async (event) => {

        event.preventDefault()


        const data = await axiosPublic.post('/route', { email: user?.email, payMonth })
        const isExist = data.data.success
        if (!isExist) {
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You already paid this month"
            });
        }


        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('payment error', error);
            setError(error.message)
        }

        if (paymentMethod) {
            console.log('payment method', paymentMethod);
            setError('')
        }


        //confirm payment

        if (!payMonth) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please select a month first"
            });
            return;
        }
        else {

            {
                const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
                    payment_method: {
                        card: card,
                        billing_details: {
                            email: user?.email || 'anonymous'
                        }
                    }
                })

                if (confirmError) {
                    console.log('confirm error', confirmError);
                    setConfirmError(confirmError)
                }
                else {
                    console.log('payment intent', paymentIntent);
                    if (paymentIntent.status === 'succeeded') {
                        // setTrxId(paymentIntent.id)

                        Swal.fire({
                            icon: "success",
                            title: "Paid",
                            text: `Successfully paid to ${user?.name}`
                        });

                        refetch()

                        setShowModal(!showModal);

                        //now save the payment info in the database
                        const payment = {
                            payMonth,
                            trxId: paymentIntent?.id,
                            salary,
                            email: user?.email,
                            paidBy: currentUser?.email,
                            id: user?._id


                        }

                        const res = await axiosSecure.post('/payments', payment)
                        console.log('payment saved', res.data);
                        refetch()

                    }

                }
            }
        }
    }




    return (
        <>
            <div>
                <DatePicker monthPicker={setPayMonth} placeholder="Select Month">
                    <DatePicker.Month />
                </DatePicker>
            </div>
            <form className='my-6' onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#',
                                },


                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className=' px-4 py-1 rounded-md bg-blue-700 text-white font-semibold my-4' type="submit" disabled={!stripe || !clientSecret}>

                    Pay
                </button>
                <p className='text-red-700'>{error}</p>

            </form>
        </>
    );
};

export default CheckOutForm;