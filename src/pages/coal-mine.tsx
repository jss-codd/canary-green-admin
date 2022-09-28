import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";

import Sidebar from '../components/Sidebar';
import { FaSearch } from 'react-icons/fa';
import { commonFetchAllUser } from '../services/UserServices';


const subscriptionDataArr = ['90021 - 1555 Newton St - Project Cannabi', '51601 - 10842 Mangolia Blvd, Project Cannabi', '92018 - 3703 Camino del Rio S - THCSD', '92109 - 4645 De Soto St - Cannabist'];

function CoalMine() {
    const dispatch = useDispatch();
    
    const [operateLocation, setOperateLocation] = useState<any[]>([]);
    const [subscriptionData, setSubscriptionData] = useState(subscriptionDataArr);

    const getOperateLocation = async () => {
        commonFetchAllUser('operate-region', dispatch)
            .then((res: any) => {
                if (!res || res.status != 200) {
                    throw new Error("Server responds with error!");
                }
                return res.json();
            })
            .then(
                (data) => {
                    if (data.status) {
                        setOperateLocation(data.regions)
                    } else {
                        toast.error(data.message);
                        setOperateLocation([])
                    }
                },
                (err) => {
                    console.log(err);
                }
            );
    }

    const searchSubscriptionHandler = (e: { target: { value: string; }; }) => {
        const filteredSubs = subscriptionDataArr.filter((d) => d.toLowerCase().includes(e.target.value.toLowerCase()));
        setSubscriptionData(filteredSubs);
    }

    useEffect(() => {
        getOperateLocation();
    }, [])

    return (
        <>
            <Sidebar />
            <div className='main-content'>
                <div className='cantainer'>
                    <div className='main-content card'>
                        <div className='shadow'>
                            <div className='row'>
                                <div className='col-xl-3' id="sticky-sidebar">
                                    <div className="sticky-top-1">
                                        <h4 className='px-2 border-bottom py-2 fw-600'>Market</h4>

                                        <div style={{ maxHeight: "25vh" }} className='table-responsive fixTableHead-full border border-light rounded shadow-lg mb-2'>
                                            <table className='align-items-center table-flush table padding-1'>
                                                <tbody>
                                                    {operateLocation.length > 0 && operateLocation.map((d: { ID: number; NAME: string }) => (
                                                        <tr key={`region-${d.ID}`}>
                                                            <td><label><input type="checkbox" />&nbsp; {d.NAME}</label></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>

                                        <h4 className='px-2 border-bottom py-2 fw-600'>Category</h4>
                                        <div style={{ maxHeight: "25vh" }} className='table-responsive fixTableHead-full border border-light rounded shadow-lg mb-2'>
                                            <table className='align-items-center table-flush table padding-1'>
                                                <tbody>
                                                    <tr>
                                                        <td><label htmlFor="all-checkbox-category"><input type="checkbox" id="all-checkbox-category" /> &nbsp;Select All</label></td>
                                                    </tr>
                                                    <tr>
                                                        <td><label htmlFor="checkbox-category-1"><input type="checkbox" id="checkbox-category-1" /> &nbsp; Flower</label></td>
                                                    </tr>
                                                    <tr>
                                                        <td><label htmlFor="checkbox-category-2"><input type="checkbox" id="checkbox-category-2" /> &nbsp; Edibles - Gummy</label></td>
                                                    </tr>
                                                    <tr>
                                                        <td><label htmlFor="checkbox-category-3"><input type="checkbox" id="checkbox-category-3" /> &nbsp; Edibles - Gummy</label></td>
                                                    </tr>
                                                    <tr>
                                                        <td><label htmlFor="checkbox-category-4"><input type="checkbox" id="checkbox-category-4" />&nbsp; Edibles - Gummy</label></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        <h4 className='px-2 border-bottom py-2 fw-600'>Brands</h4>
                                        <div style={{ maxHeight: "25vh" }} className='table-responsive fixTableHead-full border border-light rounded shadow-lg mb-2'>
                                            <table className='align-items-center table-flush table padding-1'>
                                                <tbody>
                                                    <tr>
                                                        <td><label htmlFor="all-checkbox-brand"><input type="checkbox" id="all-checkbox-brand" /> &nbsp; Select All</label></td>
                                                    </tr>
                                                    <tr>
                                                        <td><label><input type="checkbox" /> &nbsp; 1907</label></td>
                                                    </tr>
                                                    <tr>
                                                        <td><label htmlFor="checkbox-brand-2"><input type="checkbox" id="checkbox-brand-2" /> &nbsp; Nector B</label></td>
                                                    </tr>
                                                    <tr>
                                                        <td><label htmlFor="checkbox-brand-3"><input type="checkbox" id="checkbox-brand-3" /> &nbsp; Edibles - Gummy</label></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        <h4 className='px-2 border-bottom py-2 fw-600'>Locations</h4>
                                        <div style={{ maxHeight: "25vh" }} className='table-responsive fixTableHead-full border border-light rounded shadow-lg mb-2'>
                                            <table className='align-items-center table-flush table padding-1'>
                                                <thead>
                                                    <tr>
                                                        <th style={{ paddingLeft: "0.5rem", paddingRight: "0.5rem" }}>
                                                            <fieldset className="position-relative has-icon-left">
                                                                <input onChange={searchSubscriptionHandler} type="text" className='form-control autoheight' placeholder='search' />
                                                                <div className="form-control-position top-0">
                                                                    <FaSearch />
                                                                </div>
                                                            </fieldset>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {subscriptionData.length > 0 && (
                                                        <>
                                                            <tr>
                                                                <td><label><input type="checkbox" /> &nbsp; Select All</label></td>
                                                            </tr>
                                                            {subscriptionData.map((d, i) => (
                                                                <tr key={`loc-${i}`}>
                                                                    <td><label><input type="checkbox" /> &nbsp; {d}</label></td>
                                                                </tr>
                                                            ))}
                                                        </>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-xl-9' id='main'>
                                    <h2 className="mb-0 pt-2 px-2">Coal Mine</h2>
                                    <div className='shadow card'>
                                        <div className="container py-4">
                                            <div className="row">
                                                <h3 className='px-2 border-bottom fw-600'>
                                                    Low Inventory
                                                </h3>
                                                <div className='table-responsive border border-light rounded shadow-lg fixTableHead shadow-lg mb-2 bg-white rounded'>
                                                    <table className='align-items-center table-flush table padding-1'>
                                                        <thead className='thead-light'>
                                                            <tr>
                                                                <th>Retailer</th>
                                                                <th>Location</th>
                                                                <th>SKU</th>
                                                                <th>Days of Inv</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>Columbia Care</td>
                                                                <td>1555 Newton ST</td>
                                                                <td>Hybrid .5g Joint Indica</td>
                                                                <td>0 days</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Columbia Care</td>
                                                                <td>1555 Newton ST</td>
                                                                <td>Hybrid .5g Sativa Vape</td>
                                                                <td>0 days</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Kind Love</td>
                                                                <td>1555 Newton ST</td>
                                                                <td>Hybrif .5g Joint Indica</td>
                                                                <td>0 days</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Best Buds</td>
                                                                <td>1555 Newton ST</td>
                                                                <td>.5g Joint Indica</td>
                                                                <td>0 days</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Columbia Care</td>
                                                                <td>1555 Newton ST</td>
                                                                <td>Hybrif .5g Joint Indica</td>
                                                                <td>0 days</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Columbia Care</td>
                                                                <td>1555 Newton ST</td>
                                                                <td>Hybrif .5g Joint Indica</td>
                                                                <td>0 days</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Columbia Care</td>
                                                                <td>1555 Newton ST</td>
                                                                <td>Hybrif .5g Joint Indica</td>
                                                                <td>0 days</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Columbia Care</td>
                                                                <td>1555 Newton ST</td>
                                                                <td>Hybrif .5g Joint Indica</td>
                                                                <td>0 days</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>

                                                <h3 className='px-2 border-bottom fw-600'>
                                                    Aging Inventory
                                                </h3>
                                                <div className='table-responsive border border-light rounded shadow-lg fixTableHead shadow-lg mb-2 bg-white rounded'>
                                                    <table className='align-items-center table-flush table padding-1'>
                                                        <thead className='thead-light'>
                                                            <tr>
                                                                <th>Retailer</th>
                                                                <th>Location</th>
                                                                <th>SKU</th>
                                                                <th>Days of Inv</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>Columbia Care</td>
                                                                <td>1555 Newton ST</td>
                                                                <td>Hybrid .5g Joint Indica</td>
                                                                <td>0 days</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Columbia Care</td>
                                                                <td>1555 Newton ST</td>
                                                                <td>Hybrid .5g Sativa Vape</td>
                                                                <td>0 days</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Kind Love</td>
                                                                <td>1555 Newton ST</td>
                                                                <td>Hybrif .5g Joint Indica</td>
                                                                <td>0 days</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Best Buds</td>
                                                                <td>1555 Newton ST</td>
                                                                <td>.5g Joint Indica</td>
                                                                <td>0 days</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Columbia Care</td>
                                                                <td>1555 Newton ST</td>
                                                                <td>Hybrif .5g Joint Indica</td>
                                                                <td>0 days</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Columbia Care</td>
                                                                <td>1555 Newton ST</td>
                                                                <td>Hybrif .5g Joint Indica</td>
                                                                <td>0 days</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Columbia Care</td>
                                                                <td>1555 Newton ST</td>
                                                                <td>Hybrif .5g Joint Indica</td>
                                                                <td>0 days</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Columbia Care</td>
                                                                <td>1555 Newton ST</td>
                                                                <td>Hybrif .5g Joint Indica</td>
                                                                <td>0 days</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>

                                                <h3 className='px-2 border-bottom fw-600'>
                                                    Products Approaching Expiration
                                                </h3>
                                                <div className='table-responsive border border-light rounded shadow-lg fixTableHead shadow-lg mb-2 bg-white rounded'>
                                                    <table className='align-items-center table-flush table padding-1'>
                                                        <thead className='thead-light'>
                                                            <tr>
                                                                <th>Retailer</th>
                                                                <th>Location</th>
                                                                <th>SKU</th>
                                                                <th>Days Until Exp.</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>Columbia Care</td>
                                                                <td>1555 Newton ST</td>
                                                                <td>Hybrid .5g Joint Indica</td>
                                                                <td>0 days</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Columbia Care</td>
                                                                <td>1555 Newton ST</td>
                                                                <td>Hybrid .5g Sativa Vape</td>
                                                                <td>0 days</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Kind Love</td>
                                                                <td>1555 Newton ST</td>
                                                                <td>Hybrif .5g Joint Indica</td>
                                                                <td>0 days</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Best Buds</td>
                                                                <td>1555 Newton ST</td>
                                                                <td>.5g Joint Indica</td>
                                                                <td>0 days</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Columbia Care</td>
                                                                <td>1555 Newton ST</td>
                                                                <td>Hybrif .5g Joint Indica</td>
                                                                <td>0 days</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Columbia Care</td>
                                                                <td>1555 Newton ST</td>
                                                                <td>Hybrif .5g Joint Indica</td>
                                                                <td>0 days</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Columbia Care</td>
                                                                <td>1555 Newton ST</td>
                                                                <td>Hybrif .5g Joint Indica</td>
                                                                <td>0 days</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Columbia Care</td>
                                                                <td>1555 Newton ST</td>
                                                                <td>Hybrif .5g Joint Indica</td>
                                                                <td>0 days</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>

                                                <h3 className='px-2 border-bottom fw-600'>
                                                    Forecast Variance
                                                </h3>
                                                <div className='table-responsive border border-light rounded shadow-lg fixTableHead shadow-lg mb-2 bg-white rounded'>
                                                    <table className='align-items-center table-flush table padding-1'>
                                                        <thead>
                                                            <tr>
                                                                <th>Retailer</th>
                                                                <th>Location</th>
                                                                <th>SKU</th>
                                                                <th>Forecas</th>
                                                                <th>Actua</th>
                                                                <th>Varianc</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>Columbia Care</td>
                                                                <td>1555 Newton ST</td>
                                                                <td>Hybrid .5g Joint Indica</td>
                                                                <td>100</td>
                                                                <td>120</td>
                                                                <td>20%</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Columbia Care</td>
                                                                <td>1555 Newton ST</td>
                                                                <td>Hybrid .5g Sativa Vape</td>
                                                                <td>100</td>
                                                                <td>120</td>
                                                                <td>20%</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Kind Love</td>
                                                                <td>1555 Newton ST</td>
                                                                <td>Hybrif .5g Joint Indica</td>
                                                                <td>100</td>
                                                                <td>120</td>
                                                                <td>20%</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Best Buds</td>
                                                                <td>1555 Newton ST</td>
                                                                <td>.5g Joint Indica</td>
                                                                <td>100</td>
                                                                <td>120</td>
                                                                <td>20%</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Columbia Care</td>
                                                                <td>1555 Newton ST</td>
                                                                <td>Hybrif .5g Joint Indica</td>
                                                                <td>100</td>
                                                                <td>120</td>
                                                                <td>20%</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Columbia Care</td>
                                                                <td>1555 Newton ST</td>
                                                                <td>Hybrif .5g Joint Indica</td>
                                                                <td>100</td>
                                                                <td>120</td>
                                                                <td>20%</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Columbia Care</td>
                                                                <td>1555 Newton ST</td>
                                                                <td>Hybrif .5g Joint Indica</td>
                                                                <td>100</td>
                                                                <td>120</td>
                                                                <td>20%</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Columbia Care</td>
                                                                <td>1555 Newton ST</td>
                                                                <td>Hybrif .5g Joint Indica</td>
                                                                <td>100</td>
                                                                <td>120</td>
                                                                <td>20%</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>

                                                <h3 className='px-2 border-bottom fw-600'>
                                                    Top Priced Locations
                                                </h3>
                                                <div className='table-responsive border border-light rounded shadow-lg fixTableHead shadow-lg mb-2 bg-white rounded'>
                                                    <table className='align-items-center table-flush table padding-1'>
                                                        <thead>
                                                            <tr>
                                                                <th>Retailer</th>
                                                                <th>Location</th>
                                                                <th>SKU</th>
                                                                <th>Price</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>Columbia Care</td>
                                                                <td>1555 Newton ST</td>
                                                                <td>Hybrid .5g Joint Indica</td>
                                                                <td>$29.95</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Columbia Care</td>
                                                                <td>1555 Newton ST</td>
                                                                <td>Hybrid .5g Sativa Vape</td>
                                                                <td>$12.98</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Kind Love</td>
                                                                <td>1555 Newton ST</td>
                                                                <td>Hybrif .5g Joint Indica</td>
                                                                <td>$120.00</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Best Buds</td>
                                                                <td>1555 Newton ST</td>
                                                                <td>.5g Joint Indica</td>
                                                                <td>$100.00</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Columbia Care</td>
                                                                <td>1555 Newton ST</td>
                                                                <td>Hybrif .5g Joint Indica</td>
                                                                <td>$20.00</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Columbia Care</td>
                                                                <td>1555 Newton ST</td>
                                                                <td>Hybrif .5g Joint Indica</td>
                                                                <td>$21.67</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Columbia Care</td>
                                                                <td>1555 Newton ST</td>
                                                                <td>Hybrif .5g Joint Indica</td>
                                                                <td>$45.99</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Columbia Care</td>
                                                                <td>1555 Newton ST</td>
                                                                <td>Hybrif .5g Joint Indica</td>
                                                                <td>$55.00</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>

                                                <h3 className='px-2 border-bottom fw-600'>
                                                    Lowest Priced Locations
                                                </h3>
                                                <div className='table-responsive border border-light rounded shadow-lg fixTableHead shadow-lg mb-2 bg-white rounded'>
                                                    <table className='align-items-center table-flush table padding-1'>
                                                        <thead>
                                                            <tr>
                                                                <th>Retailer</th>
                                                                <th>Location</th>
                                                                <th>SKU</th>
                                                                <th>Price</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>Columbia Care</td>
                                                                <td>1555 Newton ST</td>
                                                                <td>Hybrid .5g Joint Indica</td>
                                                                <td>$29.95</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Columbia Care</td>
                                                                <td>1555 Newton ST</td>
                                                                <td>Hybrid .5g Sativa Vape</td>
                                                                <td>$12.98</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Kind Love</td>
                                                                <td>1555 Newton ST</td>
                                                                <td>Hybrif .5g Joint Indica</td>
                                                                <td>$120.00</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Best Buds</td>
                                                                <td>1555 Newton ST</td>
                                                                <td>.5g Joint Indica</td>
                                                                <td>$100.00</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Columbia Care</td>
                                                                <td>1555 Newton ST</td>
                                                                <td>Hybrif .5g Joint Indica</td>
                                                                <td>$20.00</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Columbia Care</td>
                                                                <td>1555 Newton ST</td>
                                                                <td>Hybrif .5g Joint Indica</td>
                                                                <td>$21.67</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Columbia Care</td>
                                                                <td>1555 Newton ST</td>
                                                                <td>Hybrif .5g Joint Indica</td>
                                                                <td>$45.99</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Columbia Care</td>
                                                                <td>1555 Newton ST</td>
                                                                <td>Hybrif .5g Joint Indica</td>
                                                                <td>$55.00</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CoalMine;