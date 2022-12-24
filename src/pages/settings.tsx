
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react';

import Sidebar from '../components/Sidebar';
import { FaRegCheckCircle } from 'react-icons/fa';

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

const arr = ['710 Labs', '215 Concentrates', '3C Forms', '420 Kingdom', '8 Bit', 'Absolute Extracts', 'AI EI Bluntito', 'Agua De For', 'AIMS', 'Alins Labs', 'Alomora Farm', 'Amber', 'Angel Oraganics', 'Animas', 'APE', 'Apex Canabis', 'Apex Soltuions', 'ASCND', 'Ball Family Famrs'];

const Settings = () => {
  const [formInputs, setFormInputs] = useState<any>(initialValues);
  const [userList, setUserList] = useState<any[]>([]);
  const [filterText, setFilterText] = useState("");
  const [userIndex, setUserIndex] = useState(0);
  const [assignedUsers, setAssignedUsers] = useState<any[]>([]);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState<any>();
  const [brandName, setBrandName] = useState(arr[0]);
  const [brandIndex, setBrandIndex] = useState(0);
  const [data, setData] = useState([])
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

  return (
    <>
      <Sidebar />
      <div className='main-content'>
        <div className='cantainer'>
          <div className='main-content card'>
            <div className='shadow'>
              <div className='row'>
                <div className='col-xl-9'>
                  <div className='shadow card'>
                    <div className="container py-4">
                      <Formik
                        enableReinitialize={true}
                        initialValues={formInputs}
                        // validationSchema={validationSchema}
                        onSubmit={async (values, { resetForm, setErrors }) => {
                          setData(values)
                          console.log(values, "values");
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
                              <div className="row">
                                <div className='col-xl-12 form-group'>
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
  )
}

export default Settings;