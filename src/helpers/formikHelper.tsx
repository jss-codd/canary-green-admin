import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { CSSProperties, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import ButtonLoader from "../components/buttonLoader";

import { buttonLoaderStatus } from "../redux/reducers/ButtonLoader";

const FormikHelper = (props: {
    buttonStyle: CSSProperties | undefined; initialValues: any; validationSchema: any; sendFunction: any; fields: any; buttonText: string; loaderText: string, endpoint: string; inheritFunctions: any; divClass: string; updatedID: number;
}) => {
    const { initialValues, validationSchema, sendFunction, fields, buttonText, loaderText, endpoint, inheritFunctions, divClass, updatedID } = props;

    const dispatch = useDispatch();
    const buttonloader = useSelector((state: any) => state.buttonloader.value);

    return (
        <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                dispatch(buttonLoaderStatus());
                const mutation = updatedID > 0 ? sendFunction(values, updatedID, endpoint, dispatch) : sendFunction(values, endpoint, dispatch);
                mutation
                    .then((res: any) => {
                        if (!res || res.status != 200) {
                            throw new Error("Server responds with error!");
                        }
                        return res.json();
                    })
                    .then(
                        (data: any) => {
                            if (data.status) {
                                toast.success(data.message);
                                inheritFunctions(data);
                                dispatch(buttonLoaderStatus());
                            } else {
                                toast.error(data.message);
                                dispatch(buttonLoaderStatus());
                            }
                        },
                        (err: any) => {
                            dispatch(buttonLoaderStatus());
                            toast.error('Something went wrong.');
                            console.log(err)
                        }
                    );
            }}
        >
            {(formik) => {
                const { errors, touched, isValid, dirty, values } = formik;
                return (
                    <Form className="form-horizontal label-small">
                        <div className='row'>
                            {fields.map((d: {
                                withOtherInput: any;
                                options: any;
                                readonly: boolean; type: any; className: any; placeholder: any; name: string; fieldset: boolean
                            }, i: number) => (
                                <React.Fragment key={`form-${i}`}>
                                    <div className={`${divClass} form-group`}>
                                        {d.type === 'select' ? (
                                            <>
                                                <Field
                                                    as={d.type}
                                                    className={d.className || `form-control`}
                                                    name={d.name}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                >
                                                    <option value="">{d.placeholder}</option>
                                                    {d?.withOtherInput === true && (
                                                        <option value="Add New">Add New</option>
                                                    )}
                                                    {d.options.map((o: { value: string | number | boolean; label: string | number | boolean }, i: number) => (
                                                        <option key={`option-${o.value}-${i}`} value={`${o.value}`}>{o.label}</option>
                                                    ))}
                                                </Field>
                                                {d?.withOtherInput && formik.values[d.name] === 'Add New' && (
                                                    <>
                                                        <Field
                                                            type="text"
                                                            className={d.className || `form-control`}
                                                            placeholder={`Enter value here`}
                                                            name={`${d.name}_other`}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                        />
                                                        <ErrorMessage
                                                            name={`${d.name}_other`}
                                                            component="span"
                                                            className="inputerror"
                                                        />
                                                    </>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                <Field
                                                    type={d.type}
                                                    className={d.className || `form-control`}
                                                    placeholder={d.placeholder || `Enter value here`}
                                                    name={d.name}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                            </>
                                        )}

                                        <ErrorMessage
                                            name={d.name}
                                            component="span"
                                            className="inputerror"
                                        />
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                        <div className='row'>
                            <div className='col-xl-12 form-group' style={{ textAlign: "center" }}>
                                {!buttonloader && (
                                    <button
                                        type="submit"
                                        className="btn btn-outline-primary btn-block"
                                        style={props.buttonStyle}
                                    >
                                        <i className="feather icon-unlock"></i> {buttonText}
                                    </button>
                                )}
                                {buttonloader && (
                                    <ButtonLoader text={loaderText} />
                                )}
                            </div>
                        </div>

                    </Form>
                )
            }
            }
        </Formik >
    )
}

FormikHelper.defaultProps = {
    inheritFunctions: () => { console.log('form function console') },
    buttonText: 'SUBMIT',
    loaderText: 'Submitting',
    buttonStyle: { width: "auto" },
    divClass: 'col-xl-6',
    updatedID: 0
}

export default memo(FormikHelper);