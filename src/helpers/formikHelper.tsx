import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { CSSProperties, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import ButtonLoader from "../components/buttonLoader";

import { buttonLoaderStatus } from "../redux/reducers/ButtonLoader";

const FormikHelper = (props: {
    buttonStyle: CSSProperties | undefined; initialValues: any; validationSchema: any; sendFunction: any; fields: any; buttonText: string; loaderText: string, endpoint: string; inheritFunctions: any; divClass: string;
}) => {
    const { initialValues, validationSchema, sendFunction, fields, buttonText, loaderText, endpoint, inheritFunctions, divClass } = props;

    const dispatch = useDispatch();
    const buttonloader = useSelector((state: any) => state.buttonloader.value);
    console.log('form render')
    return (
        <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                dispatch(buttonLoaderStatus());
                sendFunction(values, endpoint, dispatch)
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
                const { errors, touched, isValid, dirty } = formik;
                return (
                    <Form className="form-horizontal label-small">
                        <div className='row'>
                            {fields.map((d: {
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
                                                    {d.options.map((o: { value: string | number | boolean; label: string | number | boolean }, i: number) => (
                                                        <option key={`option-${o.value}-${i}`} value={`${o.value}`}>{o.label}</option>
                                                    ))}
                                                </Field>
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
    divClass: 'col-xl-6'
}

export default memo(FormikHelper);