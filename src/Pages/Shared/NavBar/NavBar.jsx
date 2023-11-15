import logo from '../../../assets/logo.png';

const NavBar = () => {
    const links = <>
        <li><a>Home</a></li>
        <li><a>Menu</a></li>
        <li><a>Shop</a></li>
        <li><a>Contact</a></li>
        <li><a>Dashboard</a></li>
    </>
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
            <div className="navbar-end">
                <a className="btn">Button</a>
            </div>
        </div>
    );
};

export default NavBar;