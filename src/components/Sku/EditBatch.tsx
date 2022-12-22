import React, { memo, useEffect, useRef, useState } from "react";
import { Popover, Whisper } from "rsuite";
import * as Yup from "yup";
import FormikHelper from "../../helpers/formikHelper";
import { commonSubmit, commonPut } from "../../services/UserServices";

const PopUp = React.forwardRef(({ content, formProps, ...props }: any, ref) => {
    return (
        <Popover ref={ref} {...props} style={{ width: "30%" }}>
            <h5>RFID: {formProps.initialValues.RFID}</h5>
            <h5>Product: {formProps.initialValues.ITEM_NAME}</h5>
            <h5>Location: {formProps.initialValues.LOC_NAME.replace(/___/g, ',')}</h5>
            <FormikHelper {...formProps}></FormikHelper>
        </Popover>
    );
});

PopUp.displayName = 'PopUp';

const initialValues = {
    QTY: "0",
    ITEM_NAME: "",
    LOC_NAME: "",
    RFID: "",
    ITEM_ID: ""
};

const validationSchema = Yup.object().shape({
    QTY: Yup.number().typeError('Must a digit').min(0, 'Negative value not allowed').required("*required field")
});

const EditBatch = (props: {
    helper: { setRFIDChanged: any; setRFIDItem: any; buttonName: string; buttonClass: string;};
    formData: { RFID: any; ITEM_NAME: any; NAME: any; ONHANDD_VALUE: any; ITEM_ID: any;};
}) => {
    const { setRFIDChanged, setRFIDItem, buttonName, buttonClass } = props.helper;
    const { RFID, ITEM_NAME, NAME, ONHANDD_VALUE, ITEM_ID } = props.formData;

    const triggerRef = useRef<any>(null);

    const [formValues, setFormValues] = useState(initialValues);

    const closePopUp = () => triggerRef?.current?.close();
    
    const inheritFunctions = (data: any) => {
        setRFIDItem((pre: any[]) => (pre.map(obj => data.res.find((o: { NAME: any; RFID: any; ITEM_NAME: any; ITEM_ID: any; }) => o.NAME === obj.NAME && o.RFID === obj.RFID && o.ITEM_NAME === obj.ITEM_NAME && o.ITEM_ID === obj.ITEM_ID) || obj)));
        setRFIDChanged((pre: boolean) => !pre);
        closePopUp();
    }

    const fields = [
        { type: "number", placeholder: "Quantity", name: "QTY" }
    ];

    const formProps = {
        initialValues: formValues,
        validationSchema,
        sendFunction: commonSubmit,
        fields,
        endpoint: 'update-batch-qty',
        divClass: 'col-xl-12',
        inheritFunctions,
        buttonText: 'Change'
    }

    useEffect(() => {
        if (NAME !== "") {
            setFormValues({ RFID: RFID || "", ITEM_NAME: ITEM_NAME || "", LOC_NAME: NAME || "", QTY: ONHANDD_VALUE || 0, ITEM_ID: ITEM_ID || "" });
        }
    }, [RFID, ITEM_NAME, NAME, ONHANDD_VALUE, ITEM_ID])

    return (
        <Whisper
            trigger="click"
            controlId="control-id-click"
            ref={triggerRef}
            placement="auto"
            speaker={<PopUp content={""} formProps={formProps} />}
        >
            <button className={`${buttonClass}`}>
                {buttonName}
            </button>
        </Whisper>
    );
}

export default memo(EditBatch);