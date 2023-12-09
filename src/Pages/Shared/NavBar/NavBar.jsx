import { Link, NavLink } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import userImg from '../../../assets/others/profile.png';
import { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaShoppingCart } from 'react-icons/fa';
import useCart from '../../../hooks/useCart';

const NavBar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [cart] = useCart();
    const links = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to='/menu'>Menu</NavLink></li>
        <li><NavLink to='/shop/salad'>Shop</NavLink></li>
        <li><a>Contact</a></li>
    </>
    const handleLogOut = () => {
        logOut()
            .then(res => {
                toast.success("Successfully logged out the user!");
            })
            .catch(error => {
                toast.error(error.message);
            })
    }
    return (
        <div className="navbar fixed z-20 bg-black bg-opacity-40 text-white">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {links}
                    </ul>
                </div>
                <div className='flex items-center gap-2'>
                    <img src={logo} alt="" className='w-[50px]' />
                    <p className='text-xl'>Bistro Boss</p>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end gap-4">
                <Link to={'/dashboard/cart'}>
                    <div className='relative'>
                        <FaShoppingCart className='text-xl' />
                        <div className='badge badge-error absolute -right-4 -top-4'>{cart.length}</div>
                    </div>
                </Link>
                {
                    user ?
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img alt="User" src={user?.photoURL ? user?.photoURL : userImg} />
                                </div>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 text-black rounded-box w-52">
                                <div className='text-center'>
                                    <p className='text-lg font-semibold'>{user?.displayName}</p>
                                    <p className='py-2'>{user?.email}</p>
                                    <hr />
                                </div>
                                <li>
                                    <a className="justify-between">
                                        Profile
                                    </a>
                                </li>
                                <li onClick={handleLogOut}><a>Logout</a></li>
                            </ul>
                        </div>
                        :
                        <Link to={'/login'} className="btn">Login</Link>
                }
            </div>
            <ToastContainer />
        </div>
    );
};

export default NavBar;