import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const users = await axiosSecure.get('/users');
            return users.data;
        }
    });
    const handleMakeAdmin = user => {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make Admin!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/admin/${user._id}`)
                    .then(res => {
                        if (res.data.modifiedCount) {
                            Swal.fire({
                                title: "Updated!",
                                text: `${user.name} is now an Admin!`,
                                icon: "success"
                            });
                            refetch();
                        }
                    })
            }
        });
    }
    const handleDeleteUser = id => {
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
                axiosSecure.delete(`/users/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "User removed from the application!",
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
            <SectionTitle heading={"Manage All Users"} subHeading={"How Many?"}></SectionTitle>
            <div className="shadow-md rounded-md py-4 px-10 mx-12">
                <div className="my-4">
                    <h2 className="text-3xl font-semibold">Total Users: {users.length}</h2>
                </div>
                <div>
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead className="bg-[#D1A054] text-white">
                                <tr>
                                    <th>Sl. No.</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map((user, index) => <tr key={user._id}>
                                        <th>{index + 1}</th>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            {
                                                user?.role ?
                                                    <p className="uppercase">{user.role}</p> :
                                                    <button
                                                        onClick={() => handleMakeAdmin(user)}
                                                        className="btn btn-md bg-[#D1A054] text-white border-0 hover:text-[#D1A054]">
                                                        <FaUsers />
                                                    </button>
                                            }
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => handleDeleteUser(user._id)}
                                                className="btn btn-md bg-[#B91C1C] text-white border-0 hover:text-[#B91C1C]"><RiDeleteBinLine className="text-lg" /></button>
                                        </td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;