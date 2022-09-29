import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";

import { BUTTON_LOADER } from '../redux/actions';
import Sidebar from '../components/Sidebar';
import ButtonLoader from '../components/buttonLoader';
import { FaMinusSquare, FaSearch, FaSpinner } from 'react-icons/fa';
import { commonFetchAllUser } from '../services/UserServices';


const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    id: "",
    zipCode: "",
    title: "",
    timeZone: "",
    billingAddress: "",
};

const validationSchema = {
};

const subscriptionDataArr = ['90021 - 1555 Newton St - Project Cannabi', '51601 - 10842 Mangolia Blvd, Project Cannabi', '92018 - 3703 Camino del Rio S - THCSD', '92109 - 4645 De Soto St - Cannabist'];

function Subscriptions() {
    const dispatch = useDispatch();

    const [formInputs, setFormInputs] = useState<any>(initialValues);
    const [operateLocation, setOperateLocation] = useState<any[]>([]);
    const [userList, setUserList] = useState<any[]>([]);
    const [filterText, setFilterText] = useState("");
    const [userIndex, setUserIndex] = useState(0);
    const [subscriptionData, setSubscriptionData] = useState(subscriptionDataArr);

    const buttonloader = useSelector(
        (state: any) => state.buttonloader
    );

    const selectUser = (i: Number) => {
        setUserIndex(Number(i));

        const selectedData = userList.find((e) => e.id == i);

        if(selectedData?.id){
            setFormInputs(() => {
                const datav = {
                    firstName: selectedData?.name.split(' ')[0],
                    lastName: selectedData?.name.split(' ')[1] || '',
                    id: selectedData?.id,
                    email: selectedData?.email,
                    phone: selectedData?.phone,
                    title: 'Marketing Specialist',
                    billingAddress: selectedData?.address?.street +' '+ selectedData?.address?.suite +' '+ selectedData?.address?.city,
                    timeZone: 'Pacific',
                    zipCode: selectedData?.address?.zipcode,
                };
                return datav;
            });
        }
    }

    const searchUsersChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setFilterText(e.target.value);
    }

    const filteredUsers = userList.filter((d) => d.name.toLowerCase().includes(filterText.toLowerCase()) || d.email.toLowerCase().includes(filterText.toLowerCase()));

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

    const getFakeUsers = async () => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((res: any) => {
                if (!res || res.status != 200) {
                    throw new Error("Server responds with error!");
                }
                return res.json();
            })
            .then(
                (data) => {
                    setUserList(data);
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
        getFakeUsers();
    }, [])

    return (
        <>
            <Sidebar />
            <div className='main-content'>
                <div className='cantainer'>
                    <div className='main-content card'>
                        <div className='shadow'>
                            <div className='row'>
                                <div className='col-xl-3'>
                                <h2 className="mb-0 pt-2 px-2">Users</h2>
                                    <div className='table-responsive fixTableHead-full border border-light rounded'>
                                        <table className='align-items-center table-flush table selectable padding-1'>
                                            <thead>
                                                <tr>
                                                    <th style={{ paddingLeft: ".5rem", paddingRight: ".5rem" }}>
                                                        <fieldset className="position-relative has-icon-left">
                                                            <input onChange={searchUsersChange} value={filterText} type="text" className='form-control autoheight' placeholder='search' />
                                                            <div className="form-control-position top-0">
                                                                <FaSearch />
                                                            </div>
                                                        </fieldset>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredUsers.map((d, i) => (
                                                    <tr key={i} onClick={() => selectUser(d.id)}>
                                                        <td className={userIndex == d.id ? 'bg-gradient-success text-white' : ''}>{d.name} <span style={{fontSize: "14px"}}>{d.email}</span></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className='col-xl-9'>
                                    <div className='shadow card'>
                                        <div className="container py-4">
                                        {operateLocation.length > 0 ? (
                                            <Formik
                                            enableReinitialize={true}
                                            initialValues={formInputs}
                                            //validationSchema={validationSchema}
                                            onSubmit={async (values, { resetForm, setErrors }) => {
                                                console.log(values);
                                                return;
                                            }}
                                        >
                                            {(formik) => {
                                                const { errors, touched, isValid, dirty, setFieldValue } = formik;
                                                return (
                                                    <Form className="form-horizontal label-small">
                                                        {/* User details form fieldsets */}
                                                        <div className="row">
                                                            <div className='col-xl-4 form-group'>
                                                                <label>First Name</label>
                                                                <Field
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="First Name"
                                                                    name="firstName"
                                                                    onChange={formik.handleChange}
                                                                    onBlur={formik.handleBlur}
                                                                    autoComplete="off"
                                                                />
                                                                <ErrorMessage
                                                                    name="firstName"
                                                                    component="span"
                                                                    className="inputerror"
                                                                />
                                                            </div>
                                                            <div className='col-xl-4 form-group'>
                                                                <label>Last Name</label>
                                                                <Field
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Last Name"
                                                                    name="lastName"
                                                                    onChange={formik.handleChange}
                                                                    onBlur={formik.handleBlur}
                                                                    autoComplete="off"
                                                                />
                                                                <ErrorMessage
                                                                    name="lastName"
                                                                    component="span"
                                                                    className="inputerror"
                                                                />
                                                            </div>
                                                            <div className='col-xl-4 form-group'>
                                                                <label>Email</label>
                                                                <Field
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Email"
                                                                    name="email"
                                                                    onChange={formik.handleChange}
                                                                    onBlur={formik.handleBlur}
                                                                    autoComplete="off"
                                                                />
                                                                <ErrorMessage
                                                                    name="email"
                                                                    component="span"
                                                                    className="inputerror"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className='col-xl-8 form-group'>
                                                                <label>Billing Address</label>
                                                                <Field
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Billing Address"
                                                                    name="billingAddress"
                                                                    onChange={formik.handleChange}
                                                                    onBlur={formik.handleBlur}
                                                                    autoComplete="off"
                                                                />
                                                                <ErrorMessage
                                                                    name="billingAddress"
                                                                    component="span"
                                                                    className="inputerror"
                                                                />
                                                            </div>
                                                            <div className='col-xl-4 form-group'>
                                                                <label>Zip Code</label>
                                                                <Field
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Zip Code"
                                                                    name="zipCode"
                                                                    onChange={formik.handleChange}
                                                                    onBlur={formik.handleBlur}
                                                                    autoComplete="off"
                                                                />
                                                                <ErrorMessage
                                                                    name="zipCode"
                                                                    component="span"
                                                                    className="inputerror"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className='col-xl-4 form-group'>
                                                                <label>Title</label>
                                                                <Field
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Title"
                                                                    name="title"
                                                                    onChange={formik.handleChange}
                                                                    onBlur={formik.handleBlur}
                                                                    autoComplete="off"
                                                                />
                                                                <ErrorMessage
                                                                    name="title"
                                                                    component="span"
                                                                    className="inputerror"
                                                                />
                                                            </div>
                                                            <div className='col-xl-4 form-group'>
                                                                <label>Phone</label>
                                                                <Field
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Phone"
                                                                    name="phone"
                                                                    onChange={formik.handleChange}
                                                                    onBlur={formik.handleBlur}
                                                                    autoComplete="off"
                                                                />
                                                                <ErrorMessage
                                                                    name="phone"
                                                                    component="span"
                                                                    className="inputerror"
                                                                />
                                                            </div>
                                                            <div className='col-xl-4 form-group'>
                                                                <label>Time Zone</label>
                                                                <Field
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Time Zone"
                                                                    name="timeZone"
                                                                    onChange={formik.handleChange}
                                                                    onBlur={formik.handleBlur}
                                                                    autoComplete="off"
                                                                />
                                                                <ErrorMessage
                                                                    name="timeZone"
                                                                    component="span"
                                                                    className="inputerror"
                                                                />
                                                            </div>
                                                        </div>

                                                        {/* Markets & Subscriptions */}
                                                        <div className="row">
                                                            <div className='col-xl-4 form-group'>
                                                                <h5 className='border-bottom border-info'>Active Markets</h5>
                                                                <div style={{ maxHeight: "30vh" }} className='table-responsive fixTableHead border border-light rounded'>
                                                                    <table className='align-items-center table-flush table table-borderless padding-1'>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td><label><input type="checkbox" />&nbsp; Select All</label></td>
                                                                            </tr>
                                                                            {operateLocation.length > 0 && operateLocation.map((d: { ID: number; NAME: string }) => (
                                                                                <tr key={`region-${d.ID}`}>
                                                                                    <td><label><input type="checkbox" />&nbsp; {d.NAME}</label></td>
                                                                                </tr>
                                                                            ))}
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>

                                                            <div className='col-xl-8 form-group'>
                                                                <h5 className='border-bottom border-info'>Active Subscriptions</h5>
                                                                <div style={{ maxHeight: "30vh" }} className='table-responsive fixTableHead border border-light rounded'>
                                                                    <table className='align-items-center table-flush table padding-1'>
                                                                        <thead>
                                                                            <tr>
                                                                                <th style={{ paddingLeft: ".5rem", paddingRight: ".5rem" }}>
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
                                                                            {operateLocation.length > 0 && subscriptionData.length > 0 && (
                                                                                <>
                                                                                    <tr>
                                                                                        <td><label><input type="checkbox" />&nbsp; Select All</label></td>
                                                                                    </tr>
                                                                                    {subscriptionData.map((d, i) => (
                                                                                        <tr key={`loc-${i}`}>
                                                                                            <td><label><input type="checkbox" />&nbsp; {d}</label></td>
                                                                                        </tr>
                                                                                    ))}
                                                                                </>
                                                                            )}
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* Brands & Stats */}
                                                        <div className="row">
                                                            <div className='col-xl-4 form-group'>
                                                                <h5 className='border-bottom border-info'>Active Brands</h5>
                                                                <div className='table-responsive fixTableHead border border-light rounded'>
                                                                    <table style={{ maxHeight: "30vh" }} className='align-items-center table-flush table table-borderless padding-1'>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td><label><input type="checkbox" />&nbsp; Select All</label></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td><label><input type="checkbox" />&nbsp; 710 Labs</label></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td><label><input type="checkbox" />&nbsp; Cosmic Cla</label></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td><label><input type="checkbox" />&nbsp; Puff Balls</label></td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>

                                                            <div className='col-xl-8 form-group'>
                                                                <h5 className='border-bottom border-info'>User Stats</h5>
                                                                <h5>Member Since: 8/14/2021</h5>
                                                                <h5>Last Visit: 8/13/22 @ 11:32AM</h5>
                                                                <h5>Hours Logged: 122 hrs</h5>

                                                                <h4 className='text-muted mt-3'><span><FaMinusSquare /></span>&nbsp;&nbsp;User Blocked</h4>
                                                                <h4 className='text-muted'><span><FaMinusSquare /></span>&nbsp;&nbsp;Premium Subscription</h4>

                                                                <button type="submit" className="btn bg-gradient-primary text-white float-right">
                                                                    Save
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </Form>
                                                )
                                            }
                                            }
                                        </Formik>
                                        ) : (
                                            <FaSpinner style={{ display: "block", margin: "0 auto" }} size="3em" className="spinner" />
                                        )}
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

export default Subscriptions;