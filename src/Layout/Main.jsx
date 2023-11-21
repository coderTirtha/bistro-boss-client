import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavBar from '../Pages/Shared/NavBar/NavBar';
import Footer from '../Pages/Shared/Footer/Footer';

const Main = () => {
    const location = useLocation();
    const navFooterTrue = location.pathname.includes('login');
    return (
        <div>
            {navFooterTrue || <NavBar></NavBar>}
            <Outlet></Outlet>
            {navFooterTrue || <Footer></Footer>}
        </div>
    );
};

export default Main;