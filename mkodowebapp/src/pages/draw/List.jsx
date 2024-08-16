import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DetailedView } from '../../routing/AppUrls';

const List = () => {
    const navigate = useNavigate();
    const [draws, setDraws] = useState([]);

    const getData = () => {
        axios.get("/data.json").then((res) => {

            const formattedData = res.data.draws.map(m => {
                    return {
                        id: m.id,
                        drawDateWeekday: getWeekday(new Date(m.drawDate).getDay()),
                        drawDateDay: new Date(m.drawDate).getDate(),
                        drawDateMonth: getMonth(new Date(m.drawDate).getMonth()),
                        drawDateYear: new Date(m.drawDate).getFullYear(),
                        number1: m.number1,
                        number2: m.number2,
                        number3: m.number3,
                        number4: m.number4,
                        number5: m.number5,
                        number6: m.number6,
                        bonusBall: m["bonus-ball"],
                        topPrize: new Intl.NumberFormat().format(m.topPrize),
                    };
            })

            setDraws(formattedData);
        });
    }
    
    const toDetailedView = (draw) => {
        navigate((DetailedView), {
            state: { draw: draw }
        });
    }

    const getWeekday = (day) => {
        switch (day) {
            case 0:
                return "Sunday";
            case 1:
                return "Monday";
            case 2:
                return "Tuesday";
            case 3:
                return "Wednesday";
            case 4:
                return "Thursday";
            case 5:
                return "Friday";
            case 6:
                return "Saturday";
            default:
                return "";
        }
    }

    const getMonth = (day) => {
        switch (day) {
            case 0:
                return "January";
            case 1:
                return "February";
            case 2:
                return "March";
            case 3:
                return "April";
            case 4:
                return "May";
            case 5:
                return "June";
            case 6:
                return "July";
            case 7:
                return "August";
            case 8:
                return "September";
            case 9:
                return "October";
            case 10:
                return "November";
            case 11:
                return "December";
            default:
                return "";
        }
    }

    useEffect(() => {
        getData();        
    }, []);

    return (
        <body>
            <div>
                <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                    <h1 className="display-4">Draws</h1>
                    <p className="lead">Are you a winner? Check the results below to find out...</p>
                </div>
                <div className="container">
                    <div className="card-deck mb-3 text-center">
                        {draws && draws.map(draw => {
                            return (
                                <div key={draw.id} className="card mb-4 box-shadow">
                                    <div className="card-header">
                                        <h4 className="my-0 font-weight-normal">Draw for {draw.drawDateWeekday} {draw.drawDateDay} {draw.drawDateMonth} {draw.drawDateYear}</h4>
                                    </div>
                                    <div className="card-body">
                                        <button type="button" className="btn btn-lg btn-block btn-outline-primary" onClick={e => { e.preventDefault(); toDetailedView(draw); }}>View Draw</button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </body>
    )
};

export default List;