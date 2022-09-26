import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import * as Yup from "yup";

import { BUTTON_LOADER } from '../redux/actions';
import Sidebar from '../components/Sidebar';
import { commonFetchAllAuth, commonFetchAllUser, commonSubmit, commonSubmitNoAuthUser } from '../services/UserServices';
import ButtonLoader from '../components/buttonLoader';
import { FaRegCheckCircle, FaSpinner, FaUser } from 'react-icons/fa';

const initialValues = {
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    region: [],
    brands: [],
    licenseno: "",
    autoid: "",
    id: "",
    title: ""
};

const validationSchema = Yup.object().shape({
    firstName: Yup.string().trim()
        .required("First name is required"),
    lastName: Yup.string().trim()
        .required("Last name is required"),
    company: Yup.string().trim()
        .required("Company name is required"),
    email: Yup.string().trim().email("Invalid email address")
        .required("Email is required"),
    phone: Yup.string().trim()
        .required("Phone is required"),
    licenseno: Yup.string().trim()
        .required("License no. is required"),
    brands: Yup.array().min(1, "Minimum of 1 brand required"),
    region: Yup.array().min(1, "Minimum of 1 market required"),
    autoid: Yup.string().required("Auto generated User ID is required"),
    title: Yup.string().trim().required("Title is required"),
});

function BrandRegistration() {
    const dispatch = useDispatch();

    const [operateLocation, setOperateLocation] = useState<any[]>([]);
    const [formInputs, setFormInputs] = useState<any>(initialValues);
    const [filterText, setFilterText] = useState("");
    const [pendingBrandUsers, setPendingBrandUsers] = useState<any[]>([]);
    const [pendingBrandUsersLoaded, setPendingBrandUsersLoaded] = useState(false);
    const [licenseValidate, setLicenseValidate] = useState(false);


    const buttonloader = useSelector(
        (state: any) => state.buttonloader
    );

    const selectRow = (id: Number) => {
        const selectedData = pendingBrandUsers.find((e) => e.ID == id);

        setFormInputs(() => {
            const datav = {
                firstName: selectedData?.NAME.split(' ')[0],
                lastName: selectedData?.NAME.split(' ')[1] || '',
                autoid: '#' + selectedData?.ID,
                id: selectedData?.ID,
                company: selectedData?.COMPANY,
                email: selectedData?.EMAIL,
                phone: selectedData?.PHONE,
                region: selectedData?.RETAIL_OPERATE_REGION ? [selectedData?.RETAIL_OPERATE_REGION?.toString()] : [],
                brands: selectedData?.BRAND_NAME?.split(',') || [],
                licenseno: selectedData?.LICENSENUMBER,
                title: selectedData.TITLE
            };
            return datav;
        });
    }

    const searchTextChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setFilterText(e.target.value);
    }

    const filteredItems = pendingBrandUsers.filter(
        (item) =>
            item.NAME && item.NAME.toLowerCase().includes(filterText.toLowerCase())
    );

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

    const getPendingBrandUsers = async () => {
        commonFetchAllAuth('pending-brand-users', dispatch)
            .then((res: any) => {
                if (!res || res.status != 200) {
                    throw new Error("Server responds with error!");
                }
                return res.json();
            })
            .then(
                (data) => {
                    setPendingBrandUsersLoaded(true);
                    if (data.status) {
                        setPendingBrandUsers(data.list);
                    } else {
                        toast.error(data.message);
                        setPendingBrandUsers([]);
                    }
                },
                (err) => {
                    console.log(err);
                    setPendingBrandUsersLoaded(true);
                }
            );
    }

    //get operate-region
    useEffect(() => {
        getOperateLocation();
        getPendingBrandUsers();
    }, [])

    return (
        <>
            <Sidebar />
            <div className='main-content'>
                <div className='cantainer'>
                    <div className='main-content'>
                        <div
                            className='border-0 card-header'
                            style={{ padding: '1.25rem 1.5rem 1.25rem 0.6rem' }}
                        >
                            <div className='align-items-center row'>
                                <div className='col'>
                                    <h2 className='mb-0'>New Registrations</h2>
                                </div>
                                <form className='form-inline my-2 my-lg-0'>
                                    <input onChange={searchTextChange} value={filterText} className='form-control mr-sm-2' type='search' placeholder='Search' aria-label='Search' />
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className='shadow card'>
                        <div className='table-responsive fixTableHead border border-light rounded'>
                            <table className='align-items-center table-flush table mb-2 selectable'>
                                <thead className='thead-light'>
                                    <tr>
                                        <th scope='col'>Date</th>
                                        <th scope='col'>Company</th>
                                        <th scope='col'>Name</th>
                                        <th scope='col'>Title</th>
                                        <th scope='col'>Email</th>
                                        <th scope='col'>Phone</th>
                                        <th scope='col'>Market</th>
                                        <th scope='col'>Brands</th>
                                        <th scope='col'>License</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!pendingBrandUsersLoaded ? (
                                        <>
                                            <tr className='text-center'><td colSpan={9}><FaSpinner size="2em" className="spinner" /></td></tr>
                                        </>) : (
                                        <>
                                            {filteredItems.length > 0 ? filteredItems.map((t) => (
                                                <tr key={`users-${t.ID}`} onClick={() => selectRow(t.ID)}>
                                                    <td>{t.DATE_TIME}</td>
                                                    <td>{t.COMPANY}</td>
                                                    <td>{t.NAME}</td>
                                                    <td>{t.TITLE}</td>
                                                    <td>{t.EMAIL}</td>
                                                    <td>{t.PHONE}</td>
                                                    <td>{t.RETAIL_OPERATE_REGION}</td>
                                                    <td>{t.BRAND_NAME}</td>
                                                    <td>{t.LICENSENUMBER}</td>
                                                </tr>
                                            )) : (
                                                <tr className='text-center'><td colSpan={9}>No Data Found</td></tr>
                                            )}
                                        </>)}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className='shadow card py-3 user-input'>
                        <fieldset>
                            <legend>User Input</legend>
                            {operateLocation.length > 0 ? (
                                <>
                                    <Formik
                                        enableReinitialize={true}
                                        initialValues={formInputs}
                                        validationSchema={validationSchema}
                                        onSubmit={async (values, { resetForm, setErrors }) => {
                                            dispatch({ type: BUTTON_LOADER });
                                            
                                            const dataSend = { regionId: values.region[0], licenseNumber: values.licenseno, apiKey: pendingBrandUsers.find((d) => d.ID == values.id)?.BRAND_API_KEY };
                                            commonSubmitNoAuthUser(dataSend, 'licence-validate', dispatch)
                                                .then((res: any) => {
                                                    if (!res || res.status != 200) {
                                                        throw new Error("Server responds with error!");
                                                    }
                                                    return res.json();
                                                })
                                                .then(
                                                    (data) => {
                                                        if (data.status) {
                                                            setLicenseValidate(true);
                                                            //now submit
                                                            commonSubmit(values, 'brand-admin-registration', dispatch)
                                                                .then((res: any) => {
                                                                    if (!res || res.status != 200) {
                                                                        throw new Error("Server responds with error!");
                                                                    }
                                                                    return res.json();
                                                                })
                                                                .then(
                                                                    (data) => {
                                                                        dispatch({ type: BUTTON_LOADER });
                                                                        if (data.status) {
                                                                            toast.success(data.message);
                                                                            window.location.reload();
                                                                        } else {
                                                                            toast.error(data.message);
                                                                        }
                                                                    },
                                                                    (err) => {
                                                                        dispatch({ type: BUTTON_LOADER });
                                                                        console.log(err, 'err');
                                                                    }
                                                                );
                                                        } else {
                                                            dispatch({ type: BUTTON_LOADER });
                                                            setLicenseValidate(false);
                                                            toast.error(data.message);
                                                            setErrors({ licenseno: data.message });
                                                            return;
                                                        }
                                                    },
                                                    (err) => {
                                                        dispatch({ type: BUTTON_LOADER });
                                                        setLicenseValidate(false);
                                                        console.log(err, 'err');
                                                    }
                                                );
                                        }}
                                    >
                                        {(formik) => {
                                            const { errors, touched, isValid, dirty, setFieldValue } = formik;
                                            return (
                                                <Form className="form-horizontal">
                                                    <div className='row'>
                                                        <div className='col-xl-2 form-group'>
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
                                                        <div className='col-xl-2 form-group'>
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
                                                        <div className='col-xl-3 form-group'>
                                                            <Field
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Company"
                                                                name="company"
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                autoComplete="off"
                                                            />
                                                            <ErrorMessage
                                                                name="company"
                                                                component="span"
                                                                className="inputerror"
                                                            />
                                                        </div>
                                                        <div className='col-xl-3 form-group'>
                                                            <Field
                                                                readOnly={true}
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
                                                        <div className='col-xl-2 form-group'>
                                                            <Field
                                                                readOnly={true}
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
                                                    </div>
                                                    <div className='row form-group mt-3'>
                                                        <div className='col-xl-3 form-group'>
                                                            <fieldset className="mt-2">
                                                                {operateLocation.length > 0 && operateLocation.map((o) => (
                                                                    <label key={o.ID.toString()}>
                                                                        <Field
                                                                            disabled={o.ID != 1 ? true : false}
                                                                            type="checkbox"
                                                                            className="form-check-input"
                                                                            name="region"
                                                                            onChange={formik.handleChange}
                                                                            onBlur={formik.handleBlur}
                                                                            value={`${o.ID}`}
                                                                        />
                                                                        {" "}
                                                                        {o.NAME}
                                                                    </label>
                                                                ))}
                                                                <ErrorMessage
                                                                    name="region"
                                                                    component="span"
                                                                    className="inputerror"
                                                                />
                                                            </fieldset>
                                                        </div>

                                                        <div className='col-xl-3 mt-2 form-group'>
                                                            <TagsInput
                                                                value={formik.values.brands}
                                                                onChange={(brands: any) => {
                                                                    setFieldValue("brands", brands);
                                                                }}
                                                                inputProps={{ placeholder: 'Brand name here' }}
                                                                onlyUnique={true}
                                                            />
                                                            <ErrorMessage
                                                                name="brands"
                                                                component="span"
                                                                className="inputerror"
                                                            />
                                                        </div>

                                                        <div className='col-xl-6 mt-2'>
                                                            <div className='row align-items-center px-3 mb-1'>
                                                                <div className='col p-0'>
                                                                    <Field
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="License No."
                                                                        name="licenseno"
                                                                        onChange={formik.handleChange}
                                                                        onBlur={formik.handleBlur}
                                                                        autoComplete="off"
                                                                    />
                                                                </div>
                                                                <div className='col-auto pe-0'>
                                                                    {licenseValidate && (
                                                                        <FaRegCheckCircle className="text-success" size="1.5rem" />
                                                                    )}
                                                                    {!licenseValidate && (
                                                                        <FaRegCheckCircle className="text-muted" size="1.5rem" />
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <ErrorMessage
                                                                name="licenseno"
                                                                component="span"
                                                                className="inputerror"
                                                            />

                                                            <div className='row'>
                                                            <div className='col-xl-6 form-group'>
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
                                                                <div className='col-xl-6 form-group'>
                                                                    <Field
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="Auto Generated User ID"
                                                                        name="autoid"
                                                                        onChange={formik.handleChange}
                                                                        onBlur={formik.handleBlur}
                                                                        autoComplete="off"
                                                                    />
                                                                    <ErrorMessage
                                                                        name="autoid"
                                                                        component="span"
                                                                        className="inputerror"
                                                                    />
                                                                </div>
                                                                <div className='col-xl-12 form-group'>
                                                                    <div className="d-grid gap-2 text-right">
                                                                        {!buttonloader && (
                                                                            <button type="submit" className="btn btn-success">
                                                                                Create New User
                                                                            </button>
                                                                        )}
                                                                        {buttonloader && (
                                                                            <ButtonLoader text="Creating..." />
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Form>
                                            )
                                        }
                                        }
                                    </Formik>
                                </>
                            ) : (
                                <></>
                            )}
                        </fieldset>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BrandRegistration;
