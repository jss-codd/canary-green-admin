import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";

import { BUTTON_LOADER } from '../redux/actions';
import Sidebar from '../components/Sidebar';
import { commonFetchAll } from '../services/UserServices';
import ButtonLoader from '../components/buttonLoader';

const initialValues = {
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    region: [],
    brands: [],
    licenseno: "",
    id: ""
};

const validationSchema = {

};

const tableData = [
    {
        date: '08/08/2022',
        company: 'Sunderstorm B.',
        name: 'John Smith',
        title: 'CEO',
        email: 'john.smith@k',
        phone: '999.98.88',
        marketName: 'CA',
        marketID: '1',
        brands: ['Kanha', 'Brand 1'],
        licenseno: 'LIC-42022',
        id: 1,
    },
    {
        date: '08/08/2022',
        company: 'Cannaco Inc',
        name: 'Sally',
        title: 'Sales Manager',
        email: 'sally.doe@w',
        phone: '999.98.88.989',
        marketName: 'CA',
        marketID: '1',
        brands: ['Brand 1'],
        licenseno: 'LIC-42022454',
        id: 2,
    },
    {
        date: '08/08/2022',
        company: 'Sunderstorm B.',
        name: 'John Smith',
        title: 'CEO',
        email: 'john.smith@k',
        phone: '999.98.88',
        marketName: 'CA',
        marketID: '1',
        brands: ['Brand 1'],
        licenseno: 'LIC-42022',
        id: 3,
    },
    {
        date: '08/08/2022',
        company: 'Sunderstorm B.',
        name: 'John Smith',
        title: 'CEO',
        email: 'john.smith@k',
        phone: '999.98.88',
        marketName: 'CA',
        marketID: '1',
        brands: ['Brand 1'],
        licenseno: 'LIC-42022',
        id: 4,
    },
    {
        date: '08/08/2022',
        company: 'Sunderstorm B.',
        name: 'John Smith',
        title: 'CEO',
        email: 'john.smith@k',
        phone: '999.98.88',
        marketName: 'CA',
        marketID: '1',
        brands: ['Brand 1', 'Brand 2'],
        licenseno: 'LIC-42022',
        id: 5,
    }
];

function BrandRegistration() {
    const dispatch = useDispatch();

    const [operateLocation, setOperateLocation] = useState<any[]>([]);
    const [formInputs, setFormInputs] = useState<any>(initialValues);
    const [filterText, setFilterText] = useState("");

    const buttonloader = useSelector(
        (state: any) => state.buttonloader
    );

    const selectRow = (id: Number) => {
        const selectedData = tableData.find((e) => e.id == id);
        setFormInputs(selectedData);

        setFormInputs(() => {
            const datav = {
                ...selectedData,
                firstName: selectedData?.name.split(' ')[0],
                lastName: selectedData?.name.split(' ')[1] || '',
                id: '#' + selectedData?.id,
                region: selectedData?.marketID.split('')
            };
            return datav;
        });
    }

    const searchTextChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setFilterText(e.target.value);
    }

    const filteredItems = tableData.filter(
        (item) =>
            item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
    );

    const getOperateLocation = async () => {
        commonFetchAll('operate-region', dispatch)
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

    //get operate-region
    useEffect(() => {
        getOperateLocation()
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
                                    {filteredItems.length > 0 ? filteredItems.map((t) => (
                                        <tr key={`users-${t.id}`} onClick={() => selectRow(t.id)}>
                                            <td>{t.date}</td>
                                            <td>{t.company}</td>
                                            <td>{t.name}</td>
                                            <td>{t.title}</td>
                                            <td>{t.email}</td>
                                            <td>{t.phone}</td>
                                            <td>{t.marketName}</td>
                                            <td>{t.brands.join(', ')}</td>
                                            <td>{t.licenseno}</td>
                                        </tr>
                                    )) : (
                                        <tr className='text-center'><td colSpan={9}>No Data Found</td></tr>
                                    )}
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
                                        //validationSchema={validationSchema}
                                        onSubmit={(values) => {
                                            // dispatch({
                                            //     type: BUTTON_LOADER,
                                            // });
                                            console.log(values, 'values')
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
                                                            <div className='row'>
                                                                <div className='col-xl-12 form-group'>
                                                                    <Field
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="License No."
                                                                        name="licenseno"
                                                                        onChange={formik.handleChange}
                                                                        onBlur={formik.handleBlur}
                                                                        autoComplete="off"
                                                                    />
                                                                    <ErrorMessage
                                                                        name="licenseno"
                                                                        component="span"
                                                                        className="inputerror"
                                                                    />
                                                                </div>

                                                                <div className='col-xl-12 form-group'>
                                                                    <Field
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="Auto Generated User ID"
                                                                        name="id"
                                                                        onChange={formik.handleChange}
                                                                        onBlur={formik.handleBlur}
                                                                        autoComplete="off"
                                                                    />
                                                                    <ErrorMessage
                                                                        name="id"
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
