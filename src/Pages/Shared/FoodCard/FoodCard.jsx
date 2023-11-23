import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";

const FoodCard = ({ item }) => {
    const { name, recipe, image, price } = item;
    const {user} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [, refetch] = useCart();

    const handleAddToCart = food => {
        if(user && user.email) {
            //allow the user to add to cart
            const cartItem = {
                foodId: food._id,
                email: user.email,
                price,
                image,
                name
            }
            axiosSecure.post('/orders', cartItem)
            .then(res => {
                if(res.data.insertedId) {
                    toast.success(`${name} added to your cart!`, {
                        autoClose: 2000
                    });
                    refetch();
                }
            })
        } else {
            Swal.fire({
                title: "You are not logged in!",
                text: "Wanna log in to add this item to your cart?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Login!"
              }).then((result) => {
                if (result.isConfirmed) {
                  navigate('/login', {state: {from: location}});
                }
              });
        }
    }
    return (
        <div className='rounded-md shadow-lg p-4 relative'>
            <div>
                <img src={image} />
            </div>
            <p className='px-4 py-2 bg-slate-800 rounded absolute right-5 top-5 text-white'>${price}</p>
            <div className='flex flex-col gap-2 items-center my-6'>
                <h1 className='text-xl font-semibold'>{name}</h1>
                <p className='text-center'>{recipe}</p>
                <button
                    onClick={() => handleAddToCart(item)}
                    className='btn btn-outline border-0 border-b-2 text-[#BB8506] border-b-[#BB8506] hover:text-[#BB8506] hover:border-b-[#BB8506]'
                >Add to Cart</button>
            </div>
            <ToastContainer autoClose={2000} />
        </div>
    );
};

export default FoodCard;