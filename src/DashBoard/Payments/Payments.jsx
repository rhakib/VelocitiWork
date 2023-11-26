import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckOutForm from './CheckOutForm';


const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_key)


const Payments = ({user}) => {
    
    
    
    return (
        <div>
            <Elements stripe={stripePromise}>
                    <CheckOutForm user={user}></CheckOutForm>
                </Elements>
        </div>
    );
};

export default Payments;