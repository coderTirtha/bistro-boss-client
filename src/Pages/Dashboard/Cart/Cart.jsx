import Swal from "sweetalert2";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useCart from "../../../hooks/useCart";
import { RiDeleteBinLine } from "react-icons/ri";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const Cart = () => {
    const [cart, refetch] = useCart();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0).toFixed(2);
    const axiosSecure = useAxiosSecure();
    const handleItemDeletion = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/orders/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Item removed from your cart!",
                                icon: "success"
                            });
                            refetch();
                        }
                    })
            }
        });
    }
    return (
        <div>
            <div className="my-4">
                <SectionTitle heading={"Wanna add more?"} subHeading={"My Cart"}></SectionTitle>
            </div>
            <div className="shadow-lg rounded-md p-4 mx-12">
                <div className="flex justify-between">
                    <h2 className="text-3xl font-semibold">Total items : {cart.length}</h2>
                    <h2 className="text-3xl font-semibold">Total price : ${totalPrice}</h2>
                    {
                        cart.length ?
                        <Link to={'/dashboard/payment'}>
                            <button className="btn bg-[#D1A054] text-white border-0 hover:text-[#D1A054]">Proceed to Checkout</button>
                        </Link> :
                        <button className="btn bg-[#D1A054] text-white border-0 hover:text-[#D1A054]" disabled>Proceed to Checkout</button>
                    }
                </div>
                {/* Cart Table */}
                <div className="overflow-x-auto my-8">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Sl. No.</th>
                                <th>Item Image</th>
                                <th>Item Name</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                cart.map((item, index) => <tr key={item._id}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <img src={item.image} alt="" className="w-[70px]" />
                                    </td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>
                                        <button onClick={() => handleItemDeletion(item._id)} className="btn bg-[#B91C1C] text-white border-0 hover:text-[#B91C1C]"><RiDeleteBinLine /></button>
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Cart;