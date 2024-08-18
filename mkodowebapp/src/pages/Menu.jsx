import React from 'react';
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { Home, DrawList, TicketView } from '../routing/AppUrls';
import Logo from '../assets/images/logo.jpg';

const Menu = () => {
    return (
        <div className="dashboard-nav">
            <header>
                <a href="#!" className="menu-toggle">
                    <i className="fas fa-bars"></i>
                </a>
                <Link to={Home} className="brand-logo">
                    <img src={Logo} alt="logo" style={{ width: "100%", height: "auto", maxHeight: 100 }}></img>
                </Link>
            </header>
            <nav className="dashboard-nav-list">
                <Link to={Home} className="dashboard-nav-item">
                    Home
                </Link>
                <Link to={DrawList} className="dashboard-nav-item">
                    Draws
                </Link>
                <Link to={TicketView} className="dashboard-nav-item">
                    Tickets
                </Link>
            </nav>
        </div>
    )
};

export default Menu;