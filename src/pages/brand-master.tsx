import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Switch from "react-switch";

import Sidebar from '../components/Sidebar';
import { FaSearch } from 'react-icons/fa';
import { commonFetchAllUser } from '../services/UserServices';
import { getBrandList } from '../services/CommonServices';

const tableData = [
    {
        company: 'Sunderstorm B.',
        name: 'John Smith',
        title: 'CEO',
        email: 'john.smith@k',
        phone: '999.98.88',
        otherbrands: ['Diamond Reefer', '710 Gardens'],
        distributors: ['Herbl', 'Mile High Distributions', 'Chronic Classic'],
        id: 1,
        zipCode: '90210',
        timezone: 'Mountain US',
        type: ['Retailer', 'Distributor'],
        billingAddress: '111 S Main St',
    },
    {
        company: 'Cannaco Inc',
        name: 'Sally',
        title: 'Sales Manager',
        email: 'sally.doe@w',
        phone: '999.98.88.989',
        id: 2,
        zipCode: '90210',
        timezone: 'Mountain US',
        type: ['Retailer'],
        otherbrands: ['Diamond Reefer', '710 Gardens', 'Chronic Classic'],
        distributors: ['Mile High Distributions', 'Chronic Classic'],
        billingAddress: '111 S Main St',
    },
    {
        company: 'Sunderstorm B.',
        name: 'Edward Jones',
        title: 'Sales Manager',
        email: 'edward.jones@sunderstorm.com',
        phone: '999.98.88',
        id: 3,
        zipCode: '90210',
        timezone: 'Mountain US',
        type: ['Retailer'],
        otherbrands: ['Diamond Reefer', '710 Gardens', 'Chronic Classic'],
        distributors: ['Herbl', 'Mile High Distributions', 'Chronic Classic'],
        billingAddress: '111 S Main St',
    },
    {
        company: 'Sunderstorm B.',
        name: 'Smokey DoePew',
        title: 'CEO',
        email: 'smokey.doe@k',
        phone: '999.98.8877',
        id: 4,
        zipCode: '90210',
        timezone: 'Mountain US',
        type: ['Retailer'],
        otherbrands: ['Diamond Reefer', '710 Gardens', 'Chronic Classic'],
        distributors: ['Herbl', 'Mile High Distributions', 'Chronic Classic'],
        billingAddress: '111 S Main St',
    },
    {
        company: 'Sunderstorm B.',
        name: 'Elliot Smith',
        title: 'CEO',
        email: 'elliot.smith@k',
        phone: '999.98.8856',
        id: 5,
        zipCode: '90210',
        timezone: 'Mountain US',
        type: ['Retailer'],
        otherbrands: ['Diamond Reefer', '710 Gardens', 'Chronic Classic'],
        distributors: ['Herbl', 'Mile High Distributions', 'Chronic Classic'],
        billingAddress: '111 S Main St',
    },
    {
        company: 'Sunderstorm B.',
        name: 'Andrew Mackey',
        title: 'CEO',
        email: 'andrew.mackey@k',
        phone: '999.98.8856',
        id: 6,
        zipCode: '90210',
        timezone: 'Mountain US',
        type: ['Retailer', 'Brand'],
        otherbrands: ['Diamond Reefer', '710 Gardens', 'Chronic Classic'],
        distributors: ['Herbl', 'Mile High Distributions', 'Chronic Classic'],
        billingAddress: '125 S Mountain Hill',
    },
];

const billingInputs = {}

const subscriptionDataArr = ['90021 - 1555 Newton St - Project Cannabi', '51601 - 10842 Mangolia Blvd, Project Cannabi', '92018 - 3703 Camino del Rio S - THCSD', '92109 - 4645 De Soto St - Cannabist'];

const UserTab = React.memo(function UserTab(props: any) {
    const { formInputs, selectUser } = props;

    return (
        <>
            <div className="row">
                <div className='col-xl-4 form-group'>
                    <div style={{ maxHeight: "60vh" }} className='table-responsive fixTableHead border border-light rounded'>
                        <table className='align-items-center table-flush table mb-2 selectable'>
                            <tbody>
                                {tableData.map((d) => (
                                    <tr key={`user-${d.id}`} onClick={() => selectUser(d.id)}><td>{d.name}</td></tr>
                                ))}
                                <tr><td>+ Add new user</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='col-xl-8 form-group'>
                    <Formik
                        enableReinitialize={true}
                        initialValues={formInputs}
                        onSubmit={(values) => {
                            console.log(values, 'values')
                        }}
                    >
                        {(formik) => {
                            const { errors, touched, isValid, dirty, setFieldValue } = formik;
                            return (
                                <Form className="form-horizontal label-small">
                                    <div className='row'>
                                        <div className='col-xl-4 form-group'>
                                            <label>First Name</label>
                                            <Field
                                                type="text"
                                                className="form-control"
                                                placeholder="First Name"
                                                name="firstName"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                //style={getFormikBorderStyles(errors, "apiKey")}
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

                                    <div className='row'>
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

                                    <div className='row'>
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
                                            <label>Timezone</label>
                                            <Field
                                                type="text"
                                                className="form-control"
                                                placeholder="Timezone"
                                                name="timezone"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                autoComplete="off"
                                            />
                                            <ErrorMessage
                                                name="timezone"
                                                component="span"
                                                className="inputerror"
                                            />
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-xl-8 form-group'>
                                            <label>Other User Brands</label>
                                            <TagsInput
                                                value={formik.values.otherbrands}
                                                onChange={(otherbrands: any) => {
                                                    setFieldValue("otherbrands", otherbrands);
                                                }}
                                                inputProps={{ placeholder: 'Brand name here' }}
                                                onlyUnique={true}
                                            />
                                        </div>
                                        <div className='col-xl-4 form-group'>
                                            <label>&nbsp;</label>
                                            <label>
                                                <Field
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    name="type"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value="Retailer"
                                                />
                                                &nbsp;&nbsp;
                                                Retailer
                                            </label>
                                            <label>
                                                <Field
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    name="type"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value="Brand"
                                                />
                                                &nbsp;&nbsp;
                                                Brand
                                            </label>
                                            <label>
                                                <Field
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    name="type"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value="Distributor"
                                                />
                                                &nbsp;&nbsp;
                                                Distributor
                                            </label>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-xl-8 form-group'>
                                            <label>Distributors</label>
                                            <TagsInput
                                                value={formik.values.distributors}
                                                onChange={(distributors: any) => {
                                                    setFieldValue("distributors", distributors);
                                                }}
                                                inputProps={{ placeholder: 'Distributors name here' }}
                                                onlyUnique={true}
                                            />
                                        </div>
                                        <div className='col-xl-4 form-group'>
                                            <label>&nbsp;</label>
                                            <button type="submit" className="btn bg-gradient-primary text-white btn-block">
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </Form>
                            )
                        }
                        }
                    </Formik>
                </div>
            </div>
        </>
    )
});

const SubscriptionTab = React.memo(function SubscriptionTab(props: any) {
    const { operateLocation } = props;
    const [subscriptionData, setSubscriptionData] = useState(subscriptionDataArr);

    const searchSubscriptionHandler = (e: { target: { value: string; }; }) => {
        const filteredSubs = subscriptionDataArr.filter((d) => d.toLowerCase().includes(e.target.value.toLowerCase()));
        setSubscriptionData(filteredSubs);
    }
    
    return (
        <>
            <div className="row">
                <div className='col-xl-4 form-group'>
                    <h4>Active Markets</h4>
                    <div className='table-responsive fixTableHead border border-light rounded'>
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
                    <h4>Active Subscriptions</h4>
                    <div className='table-responsive fixTableHead border border-light rounded'>
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

            <div className="row mt-4">
                <div className='col-xl-9'>
                    <h4 className='pt-2'>Estimated Monthly Subscription: $9.00</h4>
                </div>
                <div className='col-xl-3'>
                    <button type="submit" className="btn bg-gradient-primary text-white btn-block">
                        Save
                    </button>
                </div>
            </div>
        </>
    )
});

const SettingTab = React.memo(function SettingTab(props: any) {
    const [apiStatus, setApiStatus] = useState(false);

    const handleChange = (checked: boolean | ((prevState: boolean) => boolean)) => {
        setApiStatus(checked);
    }

    return (
        <>
            <div className="row">
                <div className='col-xl-12 form-group'>
                    <h4>METRC API Keys</h4>
                    <div className='table-responsive fixTableHead border border-light rounded'>
                        <table className='align-items-center table-flush table table-borderless padding-1'>
                            <thead>
                                <tr>
                                    <th>Market</th>
                                    <th>API Key</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>California</td>
                                    <td>sKwf0zfZ3iRQpAw7qz8ZaAfAX...</td>
                                    <td>
                                        <Switch offColor="#d33333" handleDiameter={25} boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)" activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)" height={20} width={48} onChange={handleChange} checked={apiStatus} />
                                    </td>
                                    <td><a href="#!">Edit</a></td>
                                </tr>
                                <tr>
                                    <td>Colorrado</td>
                                    <td>sKwf0zfZ3iRQpAw7qz887uWd...</td>
                                    <td>
                                        <Switch offColor="#d33333" handleDiameter={25} boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)" activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)" height={20} width={48} onChange={handleChange} checked={apiStatus} />
                                    </td>
                                    <td><a href="#!">Edit</a></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='col-xl-12 form-group'>
                    <h4>Active Licenses</h4>
                    <div className='table-responsive fixTableHead border border-light rounded'>
                        <table className='align-items-center table-flush table padding-1'>
                            <thead>
                                <tr>
                                    <th>Market</th>
                                    <th>License</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>California</td>
                                    <td>LIC-230-2303</td>
                                    <td>
                                        <Switch offColor="#d33333" handleDiameter={25} boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)" activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)" height={20} width={48} onChange={handleChange} checked={apiStatus} />
                                    </td>
                                    <td><a href="#!">Edit</a></td>
                                </tr>
                                <tr>
                                    <td>Colorrado</td>
                                    <td>LIC-593-2393</td>
                                    <td>
                                        <Switch offColor="#d33333" handleDiameter={25} boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)" activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)" height={20} width={48} onChange={handleChange} checked={apiStatus} />
                                    </td>
                                    <td><a href="#!">Edit</a></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <div className='col-xl-9'>
                    <Switch offColor="#d33333" handleDiameter={25} boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)" activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)" height={20} width={48} onChange={handleChange} checked={apiStatus} />
                    <label style={{ verticalAlign: "bottom" }}>&nbsp; &nbsp;Active Brand</label>
                </div>
                <div className='col-xl-3'>
                    <button type="submit" className="btn bg-gradient-primary text-white btn-block">
                        Save
                    </button>
                </div>
            </div>
        </>
    )
});

const BillingTab = React.memo(function BillingTab(props: any) {
    return (
        <>
            <div className="row">
                <div className='col-xl-12 form-group'>
                    <h3>Billing Contact</h3>
                    <Formik
                        enableReinitialize={true}
                        initialValues={billingInputs}
                        onSubmit={(values) => {
                            console.log(values, 'values')
                        }}
                    >
                        {(formik) => {
                            const { errors, touched, isValid, dirty, setFieldValue } = formik;
                            return (
                                <Form className="form-horizontal label-small mt-4">
                                    <div className='row'>
                                        <div className='col-xl-3 form-group'>
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
                                        <div className='col-xl-3 form-group'>
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
                                        <div className='col-xl-6 form-group'>
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

                                    <div className='row'>
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

                                    <div className='row'>
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

                                    <div className='row'>
                                        <div className='col-xl-3 form-group'>
                                            <label>Payment Terms</label>
                                            <label>
                                                <Field
                                                    type="radio"
                                                    name="paymentTerms"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    autoComplete="off"
                                                    value="N15"
                                                /> &nbsp; N15
                                            </label>

                                            <label>
                                                <Field
                                                    type="radio"
                                                    name="paymentTerms"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    autoComplete="off"
                                                    value="N30"
                                                /> &nbsp; N30
                                            </label>

                                            <label>
                                                <Field
                                                    type="radio"
                                                    name="paymentTerms"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    autoComplete="off"
                                                    value="COD"
                                                /> &nbsp; COD
                                            </label>

                                            <label>
                                                <Field
                                                    type="radio"
                                                    name="paymentTerms"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    autoComplete="off"
                                                    value="PrePay"
                                                /> &nbsp; PrePay
                                            </label>

                                            <ErrorMessage
                                                name="paymentTerms"
                                                component="span"
                                                className="inputerror"
                                            />
                                        </div>
                                        <div className='col-xl-3 form-group'>
                                            <label>Payment Method</label>
                                            <label>
                                                <Field
                                                    type="radio"
                                                    name="paymentMethod"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value="ACH"
                                                />&nbsp; ACH
                                            </label>

                                            <label>
                                                <Field
                                                    type="radio"
                                                    name="paymentMethod"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value="Credit Card"
                                                />&nbsp; Credit Card
                                            </label>

                                            <label>
                                                <Field
                                                    type="radio"
                                                    name="paymentMethod"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value="Check"
                                                />&nbsp; Check
                                            </label>

                                            <ErrorMessage
                                                name="paymentMethod"
                                                component="span"
                                                className="inputerror"
                                            />
                                        </div>
                                        <div className='col-xl-6 form-group'>
                                            <a href="#!"><u>Manage ACH Information</u></a>
                                            <br></br>
                                            <a href="#!"><u>Manage Credit Card Information</u></a>
                                            <div className='form-group mt-4'>
                                                <Switch disabled={true} offColor="#d33333" handleDiameter={25} boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)" activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)" height={20} width={48} onChange={() => console.log(1)} checked={true} /> <span style={{ verticalAlign: "super" }}>&nbsp; Paper Invoice</span>
                                                <button type="submit" className="btn bg-gradient-primary text-white float-right">
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            )
                        }
                        }
                    </Formik>
                </div>
            </div>
        </>
    )
});

const StatsTab = React.memo(function StatsTab(props: any) {
    return (
        <>
            <div className="row">
                <div className='col-xl-12'>
                    <h4 className='bg-gradient-secondary'>Member Since: 8/14/2021</h4>
                    <h4 className='bg-gradient-secondary'>Total Subscription Paid: $900.00</h4>
                </div>
            </div>
            <hr className='my-2'></hr>
            <div className="row">
                <div className='col-xl-4'>
                    <h4 className='p-2 bg-gradient-primary text-white'># Products: 25</h4>
                </div>
                <div className='col-xl-4'>
                    <h4 className='p-2 bg-gradient-success text-white'># Markets: 2</h4>
                </div>
                <div className='col-xl-4'>
                    <h4 className='p-2 bg-gradient-danger text-white'># Monthly Unit Sold: 2500</h4>
                </div>

                <div className='col-xl-4'>
                    <h4 className='p-2 bg-gradient-dark text-white'># Location: 314</h4>
                </div>
                <div className='col-xl-4'>
                    <h4 className='p-2 bg-gradient-info text-white'># Category: 2</h4>
                </div>
                <div className='col-xl-4'>
                    <h4 className='p-2 bg-gradient-warning text-white'># Basket Size: 1.3</h4>
                </div>
            </div>
            <hr className='my-2'></hr>
            <div className="row">
                <div className='col-xl-12'>
                    <h4 className='bg-gradient-secondary'>Average Monthly Revenue: $25,000</h4>
                    <h4 className='bg-gradient-secondary'>Average Product Retail Price: $900.00</h4>
                    <h4 className='bg-gradient-secondary'>Increase in revenue since joining: 17%</h4>
                    <h4 className='bg-gradient-secondary'>Top Product: Sky walker OG kuch 1/4oz Flower</h4>
                    <h4 className='bg-gradient-secondary'>Category Rank: (2/2345)</h4>
                </div>
            </div>
            <hr className='my-2'></hr>
            <div className="row">
                <div className='col-xl-12'>
                    <textarea rows={5} className='form-control' placeholder="Journal Entries:"></textarea>
                </div>
            </div>
        </>
    )
});

const initialValues = {
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    id: "",
    otherbrands: [],
    distributors: [],
    zipCode: "",
    title: "",
    timezone: "",
    type: [],
    billingAddress: "",
};

const validationSchema = {
};

const arr = ['710 Labs', '215 Concentrates', '3C Forms', '420 Kingdom', '8 Bit', 'Absolute Extracts', 'AI EI Bluntito', 'Agua De For', 'AIMS', 'Alins Labs', 'Alomora Farm', 'Amber', 'Angel Oraganics', 'Animas', 'APE', 'Apex Canabis', 'Apex Soltuions', 'ASCND', 'Ball Family Famrs'];

function Brand_Master() {
    const dispatch = useDispatch();

    const [formInputs, setFormInputs] = useState<any>(initialValues);
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState<any>();
    const [brandName, setBrandName] = useState(arr[0]);
    const [brandIndex, setBrandIndex] = useState(0);
    const [operateLocation, setOperateLocation] = useState<any[]>([]);
    const [brandList, setBrandList] = useState<any[]>([]);
    const [allBrandList, setAllBrandList] = useState<any[]>([]);

    const buttonloader = useSelector((state: any) => state.buttonloader.value)

    const onSelectFile = (e: any) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0]);
    }

    const selectBrand = (index: any) => {
        setBrandName(arr[index]);
        setBrandIndex(index);
    }

    const searchBrandHandler = (e: { target: { value: string; }; }) => {
        const filteredLabs = allBrandList.filter((d) => d.toLowerCase().includes(e.target.value.toLowerCase()));
        setBrandList(filteredLabs);
    }

    const selectUser = (id: Number) => {
        const selectedData = tableData.find((e) => e.id == id);

        setFormInputs(() => {
            const datav = {
                ...selectedData,
                firstName: selectedData?.name.split(' ')[0],
                lastName: selectedData?.name.split(' ')[1] || '',
                id: '#' + selectedData?.id,
            };
            return datav;
        });
    }

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

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined);
            return;
        }

        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile])

    useEffect(() => {
        getOperateLocation();

        getBrandList(dispatch).then((data) => setAllBrandList(data?.map((d: { BRAND_NAME: any; }) => (d.BRAND_NAME)))); 
    }, [])

    useEffect(() => {
        if(allBrandList.length > 0){
            setBrandList(allBrandList)
        }
      }, [allBrandList.length])

    return (
        <>
            <Sidebar />
            <div className='main-content'>
                <div className='cantainer'>
                    <div className='main-content card'>
                        <div className='shadow'>
                            <div className='row'>
                                <div className='col-xl-3'>
                                    <div className='table-responsive fixTableHead-full border border-light rounded'>
                                        <table className='align-items-center table-flush table selectable padding-1'>
                                            <thead>
                                                <tr>
                                                    <th style={{ paddingLeft: ".5rem", paddingRight: ".5rem" }}>
                                                        <fieldset className="position-relative has-icon-left">
                                                            <input onChange={searchBrandHandler} type="text" className='form-control autoheight' placeholder='search' />
                                                            <div className="form-control-position top-0">
                                                                <FaSearch />
                                                            </div>
                                                        </fieldset>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {brandList?.map((d, i) => (
                                                    <tr key={i} onClick={() => selectBrand(i)}>
                                                        <td className={brandIndex == i ? 'bg-gradient-success text-white' : ''}>{d}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className='col-xl-9'>
                                    <div className='shadow card'>
                                        <div className="container py-4">
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <div className="border rounded-lg text-center p-3">
                                                        {selectedFile ? <img src={preview} className="img-fluid img-thumbnail float-left" /> : <img className="img-fluid img-thumbnail float-left" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20200%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_183690e506a%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_183690e506a%22%3E%3Crect%20width%3D%22200%22%20height%3D%22200%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2274.4296875%22%20y%3D%22104.5%22%3E200x200%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" />}
                                                        <p className='mt-2 text-center mb-0'>{brandName}</p>
                                                    </div>

                                                </div>
                                                <div className="col-sm-9">
                                                    <div className="input-group mt-5 float-left">
                                                        <div className="custom-file">
                                                            <input type="file" className="custom-file-input" onChange={onSelectFile} />
                                                            <label className="custom-file-label" aria-describedby="inputGroupFileAddon">Choose brand image</label>
                                                        </div>
                                                        <div className="input-group-append" style={{ display: "block" }}>
                                                            <button type="submit" className="btn btn-success">
                                                                Update Logo
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="container">
                                            <div className="row">
                                                <div className='col-xl-12'>
                                                    <Tabs
                                                        defaultActiveKey='users'
                                                        transition={false}
                                                        className='mb-3 justify-content-center'
                                                        variant='tabs'
                                                    >
                                                        <Tab key={`users`} eventKey={`users`} title={`Users`}>
                                                            <UserTab formInputs={formInputs} selectUser={selectUser} />
                                                        </Tab>

                                                        <Tab key={`subscriptions`} eventKey={`subscriptions`} title={`Subscriptions`}>
                                                            <SubscriptionTab operateLocation={operateLocation} />
                                                        </Tab>
                                                        <Tab key={`Settings`} eventKey={`Settings`} title={`Settings`}>
                                                            <SettingTab />
                                                        </Tab>
                                                        <Tab key={`Billings`} eventKey={`Billings`} title={`Billings`}>
                                                            <BillingTab />
                                                        </Tab>
                                                        <Tab key={`Stats`} eventKey={`Stats`} title={`Stats`}>
                                                            <StatsTab />
                                                        </Tab>
                                                    </Tabs>
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

export default Brand_Master;