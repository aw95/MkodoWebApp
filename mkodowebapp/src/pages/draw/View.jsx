import React from 'react';
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DrawList } from '../../routing/AppUrls';

const View = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [draw, setDraw] = useState(location.state.draw);

    const toListView = () => {
        navigate((DrawList));
    }

    return (
        <body>
            <div>
                <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                    <h1 className="display-4">Draw for {draw.drawDateWeekday} {draw.drawDateDay} {draw.drawDateMonth} {draw.drawDateYear}</h1>
                </div>
                <div className="container">
                    <div className="card-deck mb-3 text-center">
                        <div key={draw.id} className="card mb-4 box-shadow" style={{ minWidth: 1000 }}>
                            <div className="card-body">
                                <table style={{ marginLeft: "auto", marginRight: "auto" }}>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>&nbsp;&nbsp;&nbsp; Bonus Ball</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <h1>{draw.number1} &nbsp; {draw.number2} &nbsp; {draw.number3} &nbsp; {draw.number4} &nbsp; {draw.number5} &nbsp; {draw.number6}</h1>
                                            </td>
                                            <td>
                                                <h1>&nbsp; <b>{draw.bonusBall}</b></h1>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <ul className="list-unstyled mt-3 mb-4">
                                    <li>
                                        <br />  
                                        <h2>Top Prize of &#163;{draw.topPrize}!</h2>
                                    </li>
                                </ul>
                                <button type="button" className="btn btn-lg btn-block btn-outline-primary" onClick={e => { e.preventDefault(); toListView(); }}>Back to All Draws</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    )
};

export default View;