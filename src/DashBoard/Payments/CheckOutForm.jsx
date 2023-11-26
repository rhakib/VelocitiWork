// import React, { useEffect, useState } from 'react';
import useGetUsers from '../../Hooks/useGetUsers';

import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Button, DatePicker } from 'keep-react';
import useGetPayments from '../../Hooks/useGetPayments';
import Swal from 'sweetalert2';

const CheckOutForm = ({ user, setShowModal, showModal, handlePay }) => {

    //states
    const [error, setError] = useState()
    const [confirmError, setConfirmError] = useState('')
    const [payMonth, setPayMonth] = useState(null);
    const [trxId, setTrxId] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const [paidDate, setPaidDate] = useState(null)
    const salary = user?.salary;
    const paidMonth = paidDate?.payMonth
    
    //hooks
    const stripe = useStripe()
    const elements = useElements()
    // const [, refetch] = useGetUsers()
    const [payments, refetch] = useGetPayments()
    
    
    console.log(paidMonth, payMonth);


    const axiosSecure = useAxiosSecure()

    useEffect(() => {

        if (salary > 0) {
            axiosSecure.post('/create-payment-intent', { salary: salary })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret)
                })
        }

    }, [axiosSecure, salary])


    useEffect(() => {
        payments?.map(date => setPaidDate(date))       

    }, [payments])


    const handleSubmit = async (event) => {
        
        event.preventDefault()

        
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

        if (paidMonth == payMonth) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You already paid this month"
              });
        }
        else{
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
                    setTrxId(paymentIntent.id)

                    Swal.fire({
                        icon: "success",
                        title: "Done",
                        text: `Successfully paid to ${user?.name}`
                      });

                    refetch()
    
                    //now save the payment info in the database
                    const payment = {
                        payMonth,
                        trxId: paymentIntent?.id,
                        salary,
                        email: user?.email
    
                    }
    
                    const res = await axiosSecure.post('/payments', payment)
                    console.log('payment saved', res.data);
                    refetch()
    
                    // setShowModal(!showModal);
    
                }
    
            }
        }
        
        setTimeout(function() {
            setTrxId('')
          }, 3000);



    }

    // const myElement = document.getElementById('trxId')
    // setTimeout(function() {
    //     myElement.classList.add = 'hidden'; // Hide the element
    //   }, 5000);




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
                                    color: '#aab7c4',
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
                {
                    trxId && <p id='trxId' className='text-green-600 aria-hidden:duration-300'>Your transaction Id: {trxId}</p>
                }
            </form>
        </>
    );
};

export default CheckOutForm;