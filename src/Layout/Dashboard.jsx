import { FaBook, FaCalendar, FaHome, FaList, FaShoppingCart, FaUser, FaUtensils } from 'react-icons/fa';
import { BsFillCreditCard2FrontFill, BsCalendarCheck } from "react-icons/bs";
import { MdOutlineRateReview, MdOutlineRestaurantMenu, MdOutlineShoppingBag } from "react-icons/md";
import { NavLink, Outlet } from 'react-router-dom';
import logo from '../assets/logo.png';
import useAdmin from '../hooks/useAdmin';

const Dashboard = () => {
    const [isAdmin] = useAdmin();
    return (
        <div className='flex'>
            <div className='w-60 bg-[#D1A054] min-h-screen'>
                <div className='fixed'>
                    <div className='flex gap-x-4 items-center justify-center h-20 mx-4'>
                        <img src={logo} alt="" className='w-[60px]' />
                        <h2 className='flex-1 text-xl font-semibold'>Bistro Boss</h2>
                    </div>
                    <ul className="menu w-full text-md">
                        {
                            isAdmin ? <>
                                <li>
                                    <NavLink to={'adminHome'}>
                                        <FaHome />
                                        Admin Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={'addItem'}>
                                        <FaUtensils />
                                        Add Item
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={'manageItems'}>
                                        <FaList />
                                        Manage Items
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={'bookings'}>
                                        <FaBook />
                                        Manage Bookings
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={'users'}>
                                        <FaUser />
                                        All Users
                                    </NavLink>
                                </li>
                            </> :
                                <>
                                    <li>
                                        <NavLink to={'userHome'}>
                                            <FaHome />
                                            User Home
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/'}>
                                            <FaCalendar />
                                            Reservation
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'payment'}>
                                            <BsFillCreditCard2FrontFill />
                                            Payment History
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'cart'}>
                                            <FaShoppingCart />
                                            My Cart
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'review'}>
                                            <MdOutlineRateReview />
                                            Add Review
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'booking'}>
                                            <BsCalendarCheck />
                                            My Bookings
                                        </NavLink>
                                    </li>
                                </>
                        }
                        <div className='divider'></div>
                        <li>
                            <NavLink to={'/'}>
                                <FaHome />
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/menu'}>
                                <MdOutlineRestaurantMenu />
                                Menu
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/shop/salad'}>
                                <MdOutlineShoppingBag />
                                Shop
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='flex-1'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;