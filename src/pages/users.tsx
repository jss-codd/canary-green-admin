import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import "react-tagsinput/react-tagsinput.css";
import * as Yup from "yup";
import moment from 'moment';

import Sidebar from '../components/Sidebar';
import { FaCog, FaMinusSquare, FaSearch } from 'react-icons/fa';
import { commonFetchAllAuth, commonFetchAllUser } from '../services/UserServices';
import { fetchOprateRegion, operateRegions, operateRegionsStatus } from '../redux/reducers/OprateRegions';

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

const validationSchema = Yup.object().shape({
    firstName: Yup.string().trim().required("*required field"),
    lastName: Yup.string().trim().required("*required field"),
    email: Yup.string().trim().required("*required field"),
    phone: Yup.string().trim().required("*required field"),
    title: Yup.string().trim().required("*required field"),
    billingAddress: Yup.string().required("*required field"),
    timeZone: Yup.string().trim().required("*required field"),
    zipCode: Yup.string().trim().required("*required field"),
});

const subscriptionDataArr = ['90021 - 1555 Newton St - Project Cannabi', '51601 - 10842 Mangolia Blvd, Project Cannabi', '92018 - 3703 Camino del Rio S - THCSD', '92109 - 4645 De Soto St - Cannabist'];

const filteredUsersData = (filterText: string, userList: any[]) => {
    return userList.filter((d) => (d.FIRSTNAME || "").toLowerCase().includes(filterText.toLowerCase()) || d.EMAIL.toLowerCase().includes(filterText.toLowerCase()));
}

function Users() {
    const dispatch: any = useDispatch();

    const operateRegionsLoaded = useSelector(operateRegionsStatus);
    const operateRegionsData = useSelector(operateRegions);

    const [formInputs, setFormInputs] = useState<any>(initialValues);
    const [operateLocation, setOperateLocation] = useState<any[]>([]);
    const [userList, setUserList] = useState<any[]>([]);
    const [filterText, setFilterText] = useState("");
    const [userIndex, setUserIndex] = useState(0);
    const [subscriptionData, setSubscriptionData] = useState(subscriptionDataArr);
    const [bodyLoaderClass, setBodyLoaderClass] = useState("cover-spin");
    const [memberSince, setMemberSince] = useState("");
    const [lastLogin, setLastLogin] = useState("");

    const selectUser = (i: Number) => {
        setUserIndex(Number(i));

        const selectedData = userList.find((e) => e.ID == i);

        if (selectedData?.ID) {
            setFormInputs(() => {
                const datav = {
                    firstName: selectedData?.FIRSTNAME || "",
                    lastName: selectedData?.LASTNAME || '',
                    id: selectedData?.ID,
                    email: selectedData?.EMAIL,
                    phone: selectedData?.PHONE,
                    title: selectedData.TITLE || "",
                    billingAddress: selectedData?.BILLINGADDRESS || "",
                    timeZone: selectedData.TIMEZONE || "",
                    zipCode: selectedData?.ZIPCODE || ""
                };
                return datav;
            });
            setMemberSince(moment(selectedData.DATE_TIME).format('MM/DD/YYYY'));
            setLastLogin(moment(selectedData.LAST_LOGIN).format('MM/DD/YYYY @ HH:mm A'))
        }
    }

    const searchUsersChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setFilterText(e.target.value);
    }

    const filteredUsers = useMemo(() => filteredUsersData(filterText, userList), [filterText, userList.length]);

    const getCanaryUsers = async () => {
        commonFetchAllAuth('canary-users', dispatch)
            .then((res: any) => {
                if (!res || res.status != 200) {
                    throw new Error("Server responds with error!");
                }
                return res.json();
            })
            .then(
                (data) => {
                    setUserList(data);
                    setBodyLoaderClass("");
                },
                (err) => {
                    setBodyLoaderClass("");
                    console.log(err);
                }
            );
    }

    const searchSubscriptionHandler = (e: { target: { value: string; }; }) => {
        const filteredSubs = subscriptionDataArr.filter((d) => d.toLowerCase().includes(e.target.value.toLowerCase()));
        setSubscriptionData(filteredSubs);
    }

    useEffect(() => {
        if (!operateRegionsLoaded) {
            dispatch(fetchOprateRegion());
        }

        getCanaryUsers();
    }, [])

    useEffect(() => {
        if (operateRegionsLoaded) {
            setOperateLocation(operateRegionsData);
        }
    }, [operateRegionsLoaded]);

    return (
        <>
            <div className={bodyLoaderClass}></div>
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
                                                    <tr key={i} onClick={() => selectUser(d.ID)}>
                                                        <td className={userIndex == d.id ? 'bg-gradient-success text-white' : ''}>{d.FIRSTNAME}{" "}<span style={{ fontSize: "14px" }}>{d.EMAIL}</span></td>
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
                                                    validationSchema={validationSchema}
                                                    onSubmit={async (values, { resetForm, setErrors }) => {
                                                        toast.success("Successfully Updated");
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

                                                                {/* Markets & Locations */}
                                                                <div className="row">
                                                                    <div className='col-xl-4 form-group'>
                                                                        <h5 className='border-bottom border-info'>Active Markets</h5>
                                                                        <div style={{ maxHeight: "30vh" }} className='table-responsive fixTableHead border border-light rounded'>
                                                                            <table className='align-items-center table-flush table table-borderless padding-1'>
                                                                                <tbody>
                                                                                    {/* <tr>
                                                                                        <td>
                                                                                            <label>
                                                                                                <input type="checkbox" />&nbsp; Select All
                                                                                            </label>
                                                                                        </td>
                                                                                    </tr> */}
                                                                                    {operateLocation.map((d: { ID: number; NAME: string }) => (
                                                                                        <tr key={`region-${d.ID}`}>
                                                                                            <td>
                                                                                                <label>
                                                                                                    <input type="checkbox" />&nbsp; {d.NAME}
                                                                                                </label>
                                                                                            </td>
                                                                                        </tr>
                                                                                    ))}
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </div>

                                                                    <div className='col-xl-8 form-group'>
                                                                        <h5 className='border-bottom border-info'>Active Retail Locations</h5>
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
                                                                                                    <td>
                                                                                                        <label>
                                                                                                            <input type="checkbox" />&nbsp; {d}
                                                                                                        </label>
                                                                                                    </td>
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
                                                                    <div className='col-xl-12 form-group'>
                                                                        <h5 className='border-bottom border-info'>User Stats</h5>
                                                                        <h5>Member Since: {memberSince}</h5>
                                                                        <h5>Last Visit: {lastLogin}</h5>
                                                                        {/* <h5>Hours Logged: 122 hrs</h5> */}

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
                                                <span style={{ display: "table", margin: "0 auto" }}>
                                                    <FaCog size="3em" className="spinner" />
                                                    <FaCog style={{ verticalAlign: "top" }} size="1.2em" className="spinner" />
                                                    <FaCog style={{ verticalAlign: "bottom", marginLeft: "-19px" }} size="1.2em" className="spinner" />
                                                </span>
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

export default Users;