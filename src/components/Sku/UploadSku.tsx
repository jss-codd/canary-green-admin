import React, { memo, useRef, useState } from "react";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { Popover, Whisper } from "rsuite";
import * as Yup from "yup";
import FormikHelper from "../../helpers/formikHelper";
import { commonUpload } from "../../services/UserServices";

const PopUp = React.forwardRef(({ content, formProps, ...props }: any, ref) => {
    return (
        <Popover ref={ref} {...props} style={{ width: "70%" }}>
            <div className="px-1 mb-2"><a target="_blank" href={`${process.env.WEB_PATH}/sample/Canary-Product-Update-Upload-Sheet.xlsx`} className="text-primary"><FaCloudDownloadAlt /> Download Sample File</a></div>
            <FormikHelper {...formProps}></FormikHelper>
        </Popover>
    );
});

PopUp.displayName = 'PopUp';

const initialValues = {
    skuFile: ""
};

const FILE_SIZE = 1 * 1024 * 1024; // for 1MB

const SUPPORTED_FORMATS = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

const validationSchema = Yup.object().shape({
    skuFile: Yup
        .mixed()
        .required("A file is required")
        .test(
            "fileSize",
            "File too large (1 MB max limit)",
            (value: { size: number; }) => value && value.size <= FILE_SIZE
        )
        .test(
            "fileFormat",
            "Unsupported Format (Only xlsx files supported)",
            (value: { type: string; }) => value && SUPPORTED_FORMATS.includes(value.type)
        )
});

const UploadSku = (props: { helper: { buttonClass: string; buttonName: string; }; }) => {
    const { buttonClass, buttonName } = props.helper;
    const popUpTriggerRef = useRef<any>(null);

    const [formValues, setFormValues] = useState(initialValues);

    const closePopUp = () => popUpTriggerRef?.current?.close();

    const fields = [
        { type: "file", name: "skuFile", accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" }
    ];

    const inheritFunctionsOnFail = (data: any) => {
        closePopUp();
    }

    const inheritFunctions = (data: any) => {
        closePopUp();
        setTimeout(() => {
            //window.location.reload();
        }, 1000);
    }

    const formProps = {
        initialValues: formValues,
        validationSchema,
        sendFunction: commonUpload,
        fields,
        endpoint: 'upload-product',
        divClass: 'col-xl-12',
        includeFiles: true,
        inheritFunctionsOnFail,
        inheritFunctions
    }

    return (
        <Whisper
            trigger="click"
            controlId="control-id-click"
            ref={popUpTriggerRef}
            placement="auto"
            speaker={<PopUp content={""} formProps={formProps} />}
        >
            <button className={`${buttonClass}`}>
                {buttonName}
            </button>
        </Whisper>
    );
}

export default memo(UploadSku);