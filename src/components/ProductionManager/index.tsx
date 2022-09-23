
import React from "react";

// import Chart from "chart.js";

function Productionmanager() {
    React.useEffect(() => {
        var config = {
            type: "line",
            data: {
                labels: [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July" 
                ],
                datasets: [
                    {
                        label: new Date().getFullYear(),
                        backgroundColor: "#3182ce",
                        borderColor: "#3182ce",
                        data: [65, 78, 66, 44, 56, 67, 75],
                        fill: false,
                    },
                    {
                        label: new Date().getFullYear() - 1,
                        fill: false,
                        backgroundColor: "#edf2f7",
                        borderColor: "#edf2f7",
                        data: [40, 68, 86, 74, 56, 60, 87],
                    },
                ],
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                title: {
                    display: false,
                    text: "Sales Charts",
                    fontColor: "white",
                },
                legend: {
                    labels: {
                        fontColor: "white",
                    },
                    align: "end",
                    position: "bottom",
                },
                tooltips: {
                    mode: "index",
                    intersect: false,
                },
                hover: {
                    mode: "nearest",
                    intersect: true,
                },
                scales: {
                    xAxes: [
                        {
                            ticks: {
                                fontColor: "rgba(255,255,255,.7)",
                            },
                            display: true,
                            scaleLabel: {
                                display: false,
                                labelString: "Month",
                                fontColor: "white",
                            },
                            gridLines: {
                                display: false,
                                borderDash: [2],
                                borderDashOffset: [2],
                                color: "rgba(33, 37, 41, 0.3)",
                                zeroLineColor: "rgba(0, 0, 0, 0)",
                                zeroLineBorderDash: [2],
                                zeroLineBorderDashOffset: [2],
                            },
                        },
                    ],
                    yAxes: [
                        {
                            ticks: {
                                fontColor: "rgba(255,255,255,.7)",
                            },
                            display: true,
                            scaleLabel: {
                                display: false,
                                labelString: "Value",
                                fontColor: "white",
                            },
                            gridLines: {
                                borderDash: [3],
                                borderDashOffset: [3],
                                drawBorder: false,
                                color: "rgba(255, 255, 255, 0.15)",
                                zeroLineColor: "rgba(33, 37, 41, 0)",
                                zeroLineBorderDash: [2],
                                zeroLineBorderDashOffset: [2],
                            },
                        },
                    ],
                },
            },
        };
    }, []);

    React.useEffect(() => {
        let config = {
            type: "bar",
            data: {
                labels: [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                ],
                datasets: [
                    {
                        label: new Date().getFullYear(),
                        backgroundColor: "#4a5568",
                        borderColor: "#4a5568",
                        data: [30, 78, 56, 34, 100, 45, 13],
                        fill: false,
                        barThickness: 8,
                    },
                    {
                        label: new Date().getFullYear() - 1,
                        fill: false,
                        backgroundColor: "#3182ce",
                        borderColor: "#3182ce",
                        data: [27, 68, 86, 74, 10, 4, 87],
                        barThickness: 8,
                    },
                ],
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                title: {
                    display: false,
                    text: "Orders Chart",
                },
                tooltips: {
                    mode: "index",
                    intersect: false,
                },
                hover: {
                    mode: "nearest",
                    intersect: true,
                },
                legend: {
                    labels: {
                        fontColor: "rgba(0,0,0,.4)",
                    },
                    align: "end",
                    position: "bottom",
                },
                scales: {
                    xAxes: [
                        {
                            display: false,
                            scaleLabel: {
                                display: true,
                                labelString: "Month",
                            },
                            gridLines: {
                                borderDash: [2],
                                borderDashOffset: [2],
                                color: "rgba(33, 37, 41, 0.3)",
                                zeroLineColor: "rgba(33, 37, 41, 0.3)",
                                zeroLineBorderDash: [2],
                                zeroLineBorderDashOffset: [2],
                            },
                        },
                    ],
                    yAxes: [
                        {
                            display: true,
                            scaleLabel: {
                                display: false,
                                labelString: "Value",
                            },
                            gridLines: {
                                borderDash: [2],
                                drawBorder: false,
                                borderDashOffset: [2],
                                color: "rgba(33, 37, 41, 0.2)",
                                zeroLineColor: "rgba(33, 37, 41, 0.15)",
                                zeroLineBorderDash: [2],
                                zeroLineBorderDashOffset: [2],
                            },
                        },
                    ],
                },
            },
        };
    }, []);
    return (
        <div className="mt--7 container-fluid">

            <div className="row align-items-center mb-3">
                <div className="col-sm-6">
                    <h2 className="text-white production-manager-head">Master PO for 3/28</h2>
                </div>
                <div className="col-sm-6 text-right">
                    <a href="" className="btn btn-primary"> <i className="far fa-print"></i> Production Order</a>
                    <a href="" className="btn btn-primary"> <i className="far fa-print"></i> Sales Orders</a>

                </div>

            </div>

            <div className="shadow card mb-5">
                <div className="border-0 card-header">
                    <h3 className="mb-0">Production Manager Table</h3>
                </div>
                <div className="table-responsive">
                    <table className="align-items-center table-flush table">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">SKU</th>
                                <th scope="col">Accounts</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Total</th>
                                <th scope="col">Per Unit</th>
                                <th scope="col">Earliest Due</th>
                                
                            </tr>
                        </thead>
                        <tbody>

                            <tr>
                                <th scope="row">
                                    <div className="align-items-center media">
                                        <div className="media"><span className="mb-0 text-sm">Jeeters Purple Kush 3.5g</span>
                                        </div>
                                    </div>
                                </th>
                                <td>4</td>
                                <td>4000</td>
                                <td>
                                    $36000
                                </td>
                                <td>$9.00</td>
                                <td>4/04/2022</td>

                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="py-4 card-footer">
                    <nav aria-label="...">
                        <nav className="pagination justify-content-end mb-0" aria-label="pagination">
                            <ul className="justify-content-end mb-0 pagination">
                                <li className="disabled page-item"><a href="#" tabIndex={-1}
                                    className="page-link"><i className="fas fa-angle-left"></i><span
                                        className="sr-only">Previous</span></a></li>
                                <li className="active page-item"><a href="#" className="page-link">1</a></li>
                                <li className="page-item"><a href="#" className="page-link">2 <span
                                    className="sr-only">(current)</span></a></li>
                                <li className="page-item"><a href="#" className="page-link">3</a></li>
                                <li className="page-item"><a href="#" className="page-link"><i
                                    className="fas fa-angle-right"></i><span className="sr-only">Next</span></a>
                                </li>
                            </ul>
                        </nav>
                    </nav>
                </div>
            </div>
            <>
            
                <div className="row">
                    <div className="col-md-6">
                        <div className=" rounded bg-dark mb-3">
                            <div className="rounded-t  px-4 py-3 bg-transparent">
                                <div className="flex flex-wrap items-center">
                                    <div className="relative w-full max-w-full flex-grow flex-1">

                                        <h2 className="text-white text-xl font-semibold">T-30 Day Sawtooth (All SKUs)</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 flex-auto">
                                {/* Chart */}
                                <div className="relative h-350-px">
                                    <canvas id="line-chart"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <>
                            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                                <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                                    <div className="flex flex-wrap items-center">
                                        <div className="relative w-full max-w-full flex-grow flex-1">

                                            <h2 className="text-blueGray-700 text-xl font-semibold">
                                                SKU Forecast (All SKUs)
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 flex-auto">
                                    {/* Chart */}
                                    <div className="relative h-350-px">
                                        <canvas id="bar-chart"></canvas>
                                    </div>
                                </div>
                            </div>
                        </>
                    </div>
                </div>

            </>

            <div className="row">
                <div className="col-xl-6">

                    <div className="shadow card mb-5">
                        <div className="border-0 card-header">
                            <h3 className="mb-0">Forecast Stats</h3>
                        </div>
                        <hr className="m-0"/>

                        <div className="p-3">
                            <div>
                                <ul>
                                    <li>T4 Wkly Demand: 4,000 Units</li>
                                    <li>Std Dev: 1,200 Variance: 900</li>
                                    <li>YoY Change: 35% </li>
                                    <li>4/4 Forecast: 4,800 Units (+/- 800)</li>
                                    <li>4 Week Forecast: 17,400 Units (+/- 2,200)</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-6">
                <div className="shadow card mb-5">
                        <div className="border-0 card-header">
                            <h3 className="mb-0">On Hand Inv Stats Recommendations</h3>
                        </div>
                        <hr className="m-0"/>

                        <div className="p-3">
                            <div>
                                <ul>
                                    <li>Daily Sell-Through: 700 </li>
                                    <li>Production Lead Time: 7 Days</li>
                                    <li>Avg Days on Hand: 10 (7,000 Units) WC: $44,100</li>
                                    <li>Suggested SS: 7 Days (4,900 Units) WC: $22,050</li>
                                    <li>Suggested Replenish Point: 9,800 Units</li>


                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default Productionmanager;