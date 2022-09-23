import axios from 'axios';
import React, { useState } from 'react';

const URL = "http://localhost:8080/api/retailers/:{_id: ObjectId('62d28650be1c0d8c52067ac7')}"

function SalesManager() {

    const [data, setData] = useState();
    const getUser =
        axios
            .get(URL, {
                responseType: "json",
            })
            .then(function (response) {
                console.log(response.data);
            });    
return (
    <div className="mt--7 container-fluid">
        <div className="row">
            <div className="col">
                <div className="shadow card mb-5">
                    <div className="border-0 card-header">
                        <h3 className="mb-0">Account Level Review - Does the account have access to inventory?</h3>
                    </div>
                    <div className="table-responsive">
                        <table className="align-items-center table-flush table">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Account</th>
                                    <th scope="col">SKU</th>
                                    <th scope="col">Trailing 30 Sell Through</th>
                                    <th scope="col">Last Order Date</th>
                                    <th scope="col">Current Inventory</th>
                                    <th scope="col">Days on Hand</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">
                                        <div className="align-items-center media">
                                            <div className="media"><span className="mb-0 text-sm">Columbia Care</span>
                                            </div>
                                        </div>
                                    </th>
                                    <td>1555 Newton St</td>
                                    <td><span className="">Hybrid</span><br />
                                        <span>  0.5g Joint</span></td>
                                    <td>
                                        23/09/2022
                                    </td>
                                    <td>main</td>
                                    <td>2 Days</td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <div className="align-items-center media">
                                            <div className="media"><span className="mb-0 text-sm">Columbia Care</span>
                                            </div>
                                        </div>
                                    </th>
                                    <td>4645 De Soto</td>
                                    <td><span className="">Indica</span><br />
                                        <span>
                                            1.0g Joint</span></td>
                                    <td>
                                        23/09/2022
                                    </td>
                                    <td>main</td>
                                    <td>2 Days</td>
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
                <div className="shadow card mb-5">
                    <div className="border-0 card-header">
                        <h3 className="mb-0">Store Level Sell Through</h3>
                    </div>
                    <div className="table-responsive">
                        <table className="align-items-center table-flush table">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Store Fr</th>
                                    <th scope="col">SKU</th>
                                    <th scope="col">Current In St</th>
                                    <th scope="col">Daily Sal</th>
                                    <th scope="col">Days to Stoc</th>
                                    <th scope="col">Warehouse</th>
                                    <th scope="col">Last Repl</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">
                                        <div className="align-items-center media">
                                            <div className="media"><span className="mb-0 text-sm">THCSD</span>
                                            </div>
                                        </div>
                                    </th>
                                    <td>Jeeters pre-</td>
                                    <td>20</td>
                                    <td>
                                        20
                                    </td>
                                    <td>1</td>
                                    <td>Yes (500)</td>
                                    <td>14</td>
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
            </div>
        </div>

    </div>

)
}

export default SalesManager;
