import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: payments = [], refetch } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user?.email}`);
            return res.data;
        }
    });
    return (
        <div>
            <Helmet>
                <title>Payments | Bistro Boss</title>
            </Helmet>
            <div>
                <SectionTitle heading={"Payment History"} subHeading={"At a Glance!"}></SectionTitle>
                <div className="overflow-x-auto mx-4">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Sl. No.</th>
                                <th>Email</th>
                                <th>Transaction ID</th>
                                <th>Total Price</th>
                                <th>Payment Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                payments.map((payment, index) => <tr key={payment._id}>
                                    <th>{index + 1}</th>
                                    <td>{payment.email}</td>
                                    <td>{payment.transactionId}</td>
                                    <td>${payment.price}</td>
                                    <td>{payment.date}</td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PaymentHistory;