import React from 'react';
import Menu from './Menu';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const Layout = () => {

    return (
        <React.Fragment>
            <div className="tap-top"></div>
            <div className="" id="pageWrapper">
                <Menu />
                <div className="">
                    <Outlet />
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable={false}
                pauseOnHover
                theme="light" />
        </React.Fragment>
    );
}

export default Layout;
