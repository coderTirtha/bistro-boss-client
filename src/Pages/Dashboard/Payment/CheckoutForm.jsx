import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";

const CheckoutForm = () => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const [cart] = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                });
        }
    }, [axiosSecure, totalPrice]);
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });
        if (error) {
            console.log('Payment error', error);
            setError(error.message);
        } else {
            console.log('Payment method', paymentMethod);
            setError('');
        }

        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'Anonymous',
                    name: user?.displayName || 'Anonymous'
                }
            }
        });

        if (paymentIntent) {
            console.log('Payment Intent', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                setTransactionId(paymentIntent.id);
                const payment = {
                    email: user.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: `${moment().day()}-${moment().month()}-${moment().year()}, at ${moment().hour()}:${moment().minute()}:${moment().second()}`,
                    cartIDs: cart.map(item => item._id),
                    menuIDs: cart.map(item => item.foodId),
                    status: 'pending'
                }
                const res = await axiosSecure.post('/payments', payment);
                console.log(res.data);
            }
        }
    }
    return (
        <form onSubmit={handleSubmit} className="mx-6 my-8 bg-base-100 shadow-md rounded-md p-4">
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
            <button className="btn bg-[#D1A054] text-white border-0 hover:text-[#D1A054] m-4" type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className="text-red-500">{error}</p>
            {transactionId && <p className="text-green-500">Your Transaction ID is : {transactionId}</p>}
        </form>
    );
};

export default CheckoutForm;