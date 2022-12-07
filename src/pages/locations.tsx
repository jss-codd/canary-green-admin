import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";

import Sidebar from '../components/Sidebar';
import ButtonLoader from '../components/buttonLoader';
import { FaMinusSquare, FaRegCheckCircle, FaSearch } from 'react-icons/fa';
import { commonFetchAllUser } from '../services/UserServices';

const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    id: "",
    zipCode: "",
    timeZone: "",
    physicalAddress: "",
    retailStoreName: "",
    licenseNumber: "",
    apiKey: ""
};

const validationSchema = {
};

function Locations() {
    const dispatch = useDispatch();

    const [formInputs, setFormInputs] = useState<any>(initialValues);
    const [userList, setUserList] = useState<any[]>([]);
    const [filterText, setFilterText] = useState("");
    const [userIndex, setUserIndex] = useState(0);
    const [assignedUsers, setAssignedUsers] = useState<any[]>([]);

    const buttonloader = useSelector((state: any) => state.buttonloader.value)

    const selectUser = (i: Number) => {
        setUserIndex(Number(i));

        const selectedData = userList.find((e) => e.id == i);

        if (selectedData?.id) {
            setFormInputs(() => {
                const datav = {
                    firstName: selectedData?.name.split(' ')[0],
                    lastName: selectedData?.name.split(' ')[1] || '',
                    id: selectedData?.id,
                    email: selectedData?.email,
                    phone: selectedData?.phone,
                    physicalAddress: selectedData?.address?.street + ' ' + selectedData?.address?.suite + ' ' + selectedData?.address?.city,
                    timeZone: 'Pacific',
                    zipCode: selectedData?.address?.zipcode,
                    retailStoreName: selectedData.company.name,
                    licenseNumber: "LIC-420-2233",
                    apiKey: "YrrPc6RZhBBUSYqxOaKLJUq7WDm5fZCdUQrQJrvoqMFXOMnw"
                };
                return datav;
            });
        }
    }

    const searchUsersChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setFilterText(e.target.value);
    }

    const filteredUsers = userList.filter((d) => d.address.street.toLowerCase().includes(filterText.toLowerCase()) || d.address.suite.toLowerCase().includes(filterText.toLowerCase()) || d.address.city.toLowerCase().includes(filterText.toLowerCase()));

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
                    setAssignedUsers(data.slice(0,5));
                },
                (err) => {
                    console.log(err);
                }
            );
    }

    const searchAssignedUsersHandler = (e: { target: { value: string; }; }) => {
        const filteredUsers = userList.filter((d) => d.name.toLowerCase().includes(e.target.value.toLowerCase()) || d.email.toLowerCase().includes(e.target.value.toLowerCase()));
        setAssignedUsers(filteredUsers);
    }

    useEffect(() => {
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
                                    <h2 className="mb-0 pt-2 px-2">Locations</h2>
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
                                                        <td className={userIndex == d.id ? 'bg-gradient-success text-white' : ''}>{d.address.suite}, {d.address.street}, {d.address.city}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className='col-xl-9'>
                                    <div className='shadow card'>
                                        <div className="container py-4">
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
                                                                <div className='col-xl-6 form-group'>
                                                                    <label>Retail Store Name</label>
                                                                    <Field
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="Retail Store Name"
                                                                        name="retailStoreName"
                                                                        onChange={formik.handleChange}
                                                                        onBlur={formik.handleBlur}
                                                                        autoComplete="off"
                                                                    />
                                                                    <ErrorMessage
                                                                        name="retailStoreName"
                                                                        component="span"
                                                                        className="inputerror"
                                                                    />
                                                                </div>
                                                                <div className='col-xl-3 form-group'>
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
                                                                <div className='col-xl-3 form-group'>
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

                                                            <div className="row">
                                                                <div className='col-xl-8 form-group'>
                                                                    <label>Physical Address</label>
                                                                    <Field
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="Physical Address"
                                                                        name="physicalAddress"
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
                                                                    <label>POC First Name</label>
                                                                    <Field
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="POC First Name"
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
                                                                    <label>POC Last Name</label>
                                                                    <Field
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="POC Last Name"
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
                                                                <div className='col-xl-4 form-group'>
                                                                    <label>License Number</label>
                                                                    <div className='row align-items-center px-3'>
                                                                        <div className='col p-0'>
                                                                            <Field
                                                                                type="text"
                                                                                className="form-control"
                                                                                placeholder="License Number"
                                                                                name="licenseNumber"
                                                                                onChange={formik.handleChange}
                                                                                onBlur={formik.handleBlur}
                                                                                autoComplete="off"
                                                                            />
                                                                        </div>

                                                                        <div className='col-auto pe-0'>
                                                                            <FaRegCheckCircle className="text-muted" size="1.5rem" />
                                                                        </div>
                                                                    </div>

                                                                    <ErrorMessage
                                                                        name="licenseNumber"
                                                                        component="span"
                                                                        className="inputerror"
                                                                    />
                                                                </div>
                                                                <div className='col-xl-8 form-group'>
                                                                    <label>METRC API Key</label>
                                                                    <div className='row align-items-center px-3'>
                                                                        <div className='col p-0'>
                                                                            <Field
                                                                                type="text"
                                                                                className="form-control"
                                                                                placeholder="METRC API Key"
                                                                                name="apiKey"
                                                                                onChange={formik.handleChange}
                                                                                onBlur={formik.handleBlur}
                                                                                autoComplete="off"
                                                                            />
                                                                        </div>
                                                                        <div className='col-auto pe-0'>
                                                                            <FaRegCheckCircle className="text-muted" size="1.5rem" />
                                                                        </div>
                                                                    </div>

                                                                    <ErrorMessage
                                                                        name="apiKey"
                                                                        component="span"
                                                                        className="inputerror"
                                                                    />
                                                                </div>
                                                            </div>

                                                            {/* Assigned Users & Location Stats */}
                                                            <div className="row">
                                                                <div className='col-xl-6 form-group'>
                                                                    <h5 className='border-bottom border-info'>Assigned Users</h5>
                                                                    <div style={{ maxHeight: "30vh" }} className='table-responsive fixTableHead border border-light rounded'>
                                                                        <table className='align-items-center table-flush table table-borderless padding-1'>
                                                                        <thead>
                                                                                <tr>
                                                                                    <th style={{ paddingLeft: ".5rem", paddingRight: ".5rem" }}>
                                                                                        <fieldset className="position-relative has-icon-left">
                                                                                            <input onChange={searchAssignedUsersHandler} type="text" className='form-control autoheight' placeholder='search' />
                                                                                            <div className="form-control-position top-0">
                                                                                                <FaSearch />
                                                                                            </div>
                                                                                        </fieldset>
                                                                                    </th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {assignedUsers.length > 0 && (
                                                                                    <>
                                                                                    <tr>
                                                                                    <td><label><input type="checkbox" />&nbsp; Select All</label></td>
                                                                                </tr>
                                                                                {assignedUsers.map((d) => (
                                                                                    <tr key={`user-${d.id}`}>
                                                                                        <td>
                                                                                            <label><input type="checkbox" />&nbsp; {d.name} <span style={{fontSize:"13px"}}>{d.email}</span></label>
                                                                                        </td>
                                                                                    </tr>
                                                                                ))}
                                                                                    </>
                                                                                )}
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>

                                                                <div className='col-xl-6 form-group'>
                                                                    <h5 className='border-bottom border-info'>Location Stats</h5>
                                                                    <h5>Member Since: 8/14/2021</h5>
                                                                    <h5>Hours Logged: 122 hrs</h5>
                                                                    <h5># of Brands: 20</h5>
                                                                    <h5># of Subscribers: 30</h5>
                                                                    <h5>Weekly Trans: 5,203</h5>
                                                                    <h5>Weekly Revenue: $300,430</h5>
                                                                </div>
                                                            </div>

                                                            <div className="row">
                                                                <div className='col-xl-12 form-group'>
                                                                    <h4 className='text-muted'><span><FaMinusSquare /></span>&nbsp;&nbsp;User Blocked</h4>
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

export default Locations;