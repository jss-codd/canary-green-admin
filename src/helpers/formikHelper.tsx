import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { CSSProperties, memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { SelectPicker } from "rsuite";

import ButtonLoader from "../components/buttonLoader";

import { buttonLoaderStatus } from "../redux/reducers/ButtonLoader";

const PreventOverflowContainer = (props: { children: any; }) => {
    const { children } = props;
    const container = React.useRef(null);
    const content = React.useRef(null);

    return (
        <div style={{ position: 'relative' }} ref={container}>
            <div ref={content}>
                {children(() => container.current)}
            </div>
        </div>
    );
}

const FormikHelper = (props: {
    buttonStyle: CSSProperties | undefined; initialValues: any; validationSchema: any; sendFunction: any; fields: any; buttonText: string; loaderText: string, endpoint: string; inheritFunctions: any; divClass: string; updatedID: number; includeFiles: boolean; inheritFunctionsOnFail: any;
}) => {
    const { initialValues, validationSchema, sendFunction, fields, buttonText, loaderText, endpoint, inheritFunctions, divClass, updatedID, includeFiles, inheritFunctionsOnFail } = props;

    const dispatch = useDispatch();
    const buttonloader = useSelector((state: any) => state.buttonloader.value);

    return (
        <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
                if (includeFiles) {
                    const formData = new FormData();
                    for (let value in values) {
                        formData.append(value, values[value]);
                    }

                    values = formData;
                }

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
                                inheritFunctionsOnFail(data)
                            }
                        },
                        (err: any) => {
                            dispatch(buttonLoaderStatus());
                            toast.error('Something went wrong.')
                            console.log(err)
                        }
                    );
            }}
        >
            {(formik) => {
                const { errors, touched, isValid, dirty, values, setFieldValue } = formik;
                return (
                    <Form className="form-horizontal label-small" encType="multipart/form-data">
                        <div className='row'>
                            {fields.map((d: {
                                accept: string | undefined;
                                searchable: boolean | undefined | null;
                                divClass: string | undefined | null;
                                withOtherInput: any;
                                options: any;
                                readonly: boolean; type: any; className: any; placeholder: any; name: string; fieldset: boolean
                            }, i: number) => (
                                <React.Fragment key={`form-${i}`}>
                                    <div className={`${d?.divClass ? d.divClass : divClass} form-group`}>
                                        {d.type === 'select' ? (
                                            <>
                                                <PreventOverflowContainer>
                                                    {(getContainer: HTMLElement | (() => HTMLElement) | undefined) => (
                                                        <SelectPicker
                                                            style={{ width: 500 }}
                                                            container={getContainer}
                                                            value={formik.values[d.name]}
                                                            data={d?.withOtherInput === true ? [...[{ label: "Add New", value: "Add New" }], ...d.options] : d.options}
                                                            placeholder={d.placeholder}
                                                            onChange={(e) => setFieldValue(d.name, e || "")}
                                                            name={d.name}
                                                            searchable={d?.searchable || false}
                                                        />
                                                    )}
                                                </PreventOverflowContainer>
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
                                        ) : (d.type === 'file' ?
                                            (<input type='file' className={d.className || `form-control`} name={d.name} onChange={(e: any) => {
                                                formik.setFieldValue(d.name, e.currentTarget.files[0]);
                                            }
                                            } />) :
                                            (<Field
                                                type={d.type}
                                                className={d.className || `form-control`}
                                                placeholder={d.placeholder || `Enter value here`}
                                                name={d.name}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />))}
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
    inheritFunctionsOnFail: () => { console.log('form function fail console') },
    buttonText: 'SUBMIT',
    loaderText: 'Submitting',
    buttonStyle: { width: "auto" },
    divClass: 'col-xl-6',
    updatedID: 0,
    includeFiles: false
}

export default memo(FormikHelper);