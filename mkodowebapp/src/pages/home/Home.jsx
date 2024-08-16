import React from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import Logo from '../../assets/images/logo.jpg';
import { DrawList, TicketView } from '../../routing/AppUrls';

const Home = () => {
    const navigate = useNavigate();

    const toListView = () => {
        navigate((DrawList));
    }

    const toTicketView = () => {
        navigate((TicketView));
    }

    return (
        <body>
            <div>
                <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                    <img src={Logo} alt="logo" style={{ width: "100%", height: "auto", maxHeight: 200, maxWidth: 200 }}></img>
                    <h1 className="display-4">Lucky Stars</h1>
                    <p className="lead">Welcome to Lucky Stars Lottery</p>
                    <p className="lead">Check out our Draws and Lottery Tickets below to see if you&#39;re a winner!</p>
                </div>
                <div style={{ float: 'left', minWidth:500 }}>
                    <div className="card-deck mb-3 text-center">
                        <div className="card mb-4 box-shadow">
                            <div className="card-body">
                                <ul className="list-unstyled mt-3 mb-4">
                                    <li>
                                        <h2>Draws</h2>
                                    </li>
                                    <li>
                                        <h5>See the results of all our draws!</h5>
                                    </li>
                                </ul>
                                <button type="button" className="btn btn-lg btn-block btn-outline-primary" onClick={e => { e.preventDefault(); toListView(); }}>View Draws</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ float: 'left', minWidth: 500 }}>
                    <div className="card-deck mb-3 text-center">
                        <div className="card mb-4 box-shadow">
                            <div className="card-body">
                                <ul className="list-unstyled mt-3 mb-4">
                                    <li>
                                        <h2>Tickets</h2>
                                    </li>
                                    <li>
                                        <h5>Check your tickets to see if you&#39;ve won!</h5>
                                    </li>
                                </ul>
                                <button type="button" className="btn btn-lg btn-block btn-outline-primary" onClick={e => { e.preventDefault(); toTicketView(); }}>View Tickets</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    )
};

export default Home;