import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";

const TicketView = () => {
    const [numbers, setNumbers] = useState([]);
    const [bonusBall, setBonusBall] = useState(null);
    const [draws, setDraws] = useState([]);
    const [prizeMoney, setPrizeMoney] = useState(null);
    const [drawDate, setDrawDate] = useState({
        drawDateWeekday: null,
        drawDateDay: null,
        drawDateMonth: null,
        drawDateYear: null
    });
    const [ticketCounter, setTicketCounter] = useState(1);

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

    const checkIfWinner = (numbers) => {
        //convert ticket numbers to string for comparison
        const stringNumbers = numbers.map(String);
        const ticketBonusBall = stringNumbers[6];
        let isWinner = false;
        setPrizeMoney(null);
        setDrawDate({
            drawDateWeekday: null,
            drawDateDay: null,
            drawDateMonth: null,
            drawDateYear: null
        });

        draws.map(draw => {
            let drawNumbers = [
                draw.number1,
                draw.number2,
                draw.number3,
                draw.number4,
                draw.number5,
                draw.number6,
                draw.bonusBall,
            ];
            let drawBonusBall = draw.bonusBall

            //sort both arrays
            drawNumbers.sort(function (a, b) {
                return a - b;
            });
            stringNumbers.sort(function (a, b) {
                return a - b;
            });

            //check if first 6 numbers match then check bonus balls match
            if (JSON.stringify(drawNumbers) === JSON.stringify(stringNumbers) && ticketBonusBall === drawBonusBall) { 
                isWinner = true;
                setPrizeMoney(draw.topPrize);
                setDrawDate({
                    drawDateWeekday: draw.drawDateWeekday,
                    drawDateDay: draw.drawDateDay,
                    drawDateMonth: draw.drawDateMonth,
                    drawDateYear: draw.drawDateYear
                });
            }
        });

        return isWinner;
    }

    const showWinningMessage = () => {
        let idleMessage = document.getElementById("idleMessage");
        idleMessage.classList.add("hide");

        let losingMessage = document.getElementById("losingMessage");
        losingMessage.classList.add("hide");

        let numbersTable = document.getElementById("numbersTable");
        numbersTable.classList.remove("hide");

        let winningMessage = document.getElementById("winningMessage");
        winningMessage.classList.remove("hide");
    }

    const hideWinningMessage = () => {
        let idleMessage = document.getElementById("idleMessage");
        idleMessage.classList.add("hide");

        let winningMessage = document.getElementById("winningMessage");
        winningMessage.classList.add("hide");

        let numbersTable = document.getElementById("numbersTable");
        numbersTable.classList.remove("hide");

        let losingMessage = document.getElementById("losingMessage");
        losingMessage.classList.remove("hide");
    }

    const generateRandomNumbers = () => {
        let randomNumbers = [];

        //so you can see the functionality for a winning ticket, every 5th ticket generated will be a guaranteed winner
        if (ticketCounter % 5 != 0) {
            while (randomNumbers.length < 7) {
                const newNumber = Math.floor(Math.random() * 59) + 1;
                if (!randomNumbers.includes(newNumber)) {
                    randomNumbers.push(newNumber);
                }
            }
        }
        else {
            const ticket = Math.floor(Math.random() * 3) + 1;
            switch (ticket) {
                case 1:
                    randomNumbers = ["2", "16", "23", "44", "47", "52", "14"]
                    break;
                case 2:
                    randomNumbers = ["5", "45", "51", "32", "24", "18", "28"];
                    break;
                case 3:
                    randomNumbers = ["34", "21", "4", "58", "1", "15", "51"];
                    break;
                default:
                    randomNumbers = ["2", "16", "23", "44", "47", "52", "14"];
                    break;
            }
        }
        //check if the generated ticket has won
        if (checkIfWinner(randomNumbers)) {
            showWinningMessage();
        }
        else {
            hideWinningMessage();
        }

        //set bonus ball
        setBonusBall(randomNumbers[6]);

        //remove bonus ball from other numbers once set above
        randomNumbers.pop();

        //set other numbers
        setNumbers(randomNumbers);

        //increment ticket counter
        setTicketCounter(ticketCounter + 1);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <body>
            <div>
                <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                    <h1 className="display-4">Tickets</h1>
                    <h3>Generate some tickets below and see if you win...</h3>
                    <button onClick={generateRandomNumbers}>Generate New Ticket</button>
                </div>
                <div className="container">
                    <div className="card-deck mb-3 text-center">
                        <div className="card mb-4 box-shadow" style={{ minWidth: 1000 }}>
                            <div className="card-header">
                                <h4 className="my-0 font-weight-normal">Your Ticket</h4>
                            </div>
                            <div className="card-body">
                                <div id="idleMessage">
                                    <br />
                                    <h5>Generate a new ticket above</h5>
                                </div>
                                <table id="numbersTable" className="hide" style={{ marginLeft: "auto", marginRight: "auto" }}>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>&nbsp;&nbsp;&nbsp; Bonus Ball</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td style={{ float: "left", columns: 6 }}>
                                                {numbers && numbers.map(number => {
                                                    return (
                                                        <h1 key={number}>{number}</h1>
                                                    )
                                                })}
                                            </td>
                                            <td>
                                                <h1>&nbsp; <b>{bonusBall}</b></h1>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <ul className="list-unstyled mt-3 mb-4">
                                    <li id="winningMessage" className="hide">
                                        <br />  
                                        <h2>Congratulations!</h2>
                                        <h3>Your ticket matches the draw from {drawDate.drawDateWeekday} {drawDate.drawDateDay} {drawDate.drawDateMonth} {drawDate.drawDateYear}</h3>
                                        <h3>You&#39;ve won the Top Prize of &#163;{prizeMoney}!</h3>
                                    </li>
                                    <li id="losingMessage" className="hide">
                                        <br />  
                                        <h2>Sorry, you&#39;re not a winner this time!</h2>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    );
};

export default TicketView;