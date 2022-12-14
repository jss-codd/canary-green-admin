import React, { memo, useEffect, useRef, useState } from "react";
import { Popover, Whisper } from "rsuite";
import * as Yup from "yup";
import FormikHelper from "../../helpers/formikHelper";
import { commonSubmit, commonPut } from "../../services/UserServices";

const AddProductPopUp = React.forwardRef(({ content, formProps, RFID, ...props }: any, ref) => {
    return (
        <Popover ref={ref} {...props} style={{ width: "70%" }}>
            {formProps.updatedID > 0 ? <h3 className="text-center">SKU ID: {formProps.updatedID}</h3> : ""}
            <FormikHelper {...formProps}></FormikHelper>
        </Popover>
    );
});

AddProductPopUp.displayName = 'AddProductPopUp';

const initialValues = {
    productName: "",
    productSize: "",
    productBrand: "",
    productCategory: "",
    dominance: "",
    tier: "",
    flavorStrain: "",
    form: "",
};

const validationSchema = Yup.object().shape({
    productName: Yup.string().trim(),
    productSize: Yup.string().trim().required("*required field"),
    productBrand: Yup.string().trim().required("*required field"),
    productCategory: Yup.string().trim().required("*required field"),
    dominance: Yup.string().trim(),
    tier: Yup.string().trim().oneOf(['Good', 'Better', 'Best'], 'Invalid tier selection').required("*required field"),
    flavorStrain: Yup.string().trim(),
    form: Yup.string().trim().required("*required field"),
});

const tier = ['Good', 'Better', 'Best'];

const AddSku = (props: {
    helper: { setProduct: any; setSkuChanged: any; setPosts: any; brandList: any[]; sizeList: any[]; categoryList: any[]; dominanceList: any[]; flavorStrainList: any[]; setFlavorStrainList: any; formList: any[]; setFormList: any; buttonName: any; buttonClass: any; };
    formData: { ID: any; SIZE: any; BRAND: any; CATEGORY_NAME: any; DOMINANCE: any; TIER: any; FLAVOR_STRAIN: any; FORM: any; ITEM_NAME: any; RFID: any; };
}) => {
    const { setProduct, setSkuChanged, setPosts, brandList, sizeList, categoryList, dominanceList, flavorStrainList, setFlavorStrainList, formList, setFormList, buttonName, buttonClass } = props.helper;
    const { ID, SIZE, BRAND, CATEGORY_NAME, DOMINANCE, TIER, FLAVOR_STRAIN, FORM, ITEM_NAME, RFID } = props.formData;

    const addProductTriggerRef = useRef<any>(null);

    const [formValues, setFormValues] = useState(initialValues);

    const closeProductPopUp = () => addProductTriggerRef?.current?.close();

    const inheritFunctionsOnAdd = (data: any) => {
        const statusStrain = flavorStrainList.filter((d) => d.label == data.res[0].FLAVOR_STRAIN).length;

        if(statusStrain === 0) {
            setFlavorStrainList((pre: any[]) => ([...pre, ...[{value: 0, label: data.res[0].FLAVOR_STRAIN}]]));
        }

        const statusForm = formList.filter((d) => d.label == data.res[0].FORM).length;
        
        if(statusForm === 0) {
            setFormList((pre: any[]) => ([...pre, ...[{value: 0, label: data.res[0].FORM}]]));
        }

        setPosts((pre: any[]) => ([...data.res, ...pre]));
        setProduct((pre: any[]) => ([...[{ label: data.res[0].ITEM_NAME, value: data.res[0].ID }], ...pre]));
        setSkuChanged((pre: boolean) => !pre);
        closeProductPopUp();
    }

    const inheritFunctionsOnUpdate = (data: any) => {
        setPosts((pre: any[]) => (pre.map(obj => data.res.find((o: { ID: Number; }) => o.ID === obj.ID) || obj)));
        setProduct((pre: any[]) => (pre.map(obj => { return data.res.find((o: { ID: Number; }) => o.ID === obj.value) && { label: data.res[0].ITEM_NAME, value: obj.value } || obj })));
        setSkuChanged((pre: boolean) => !pre);
        closeProductPopUp();
    }

    const fields = [
        { type: "text", placeholder: "If left blank Product Name Will Be Generated based on Attributes", name: "productName", readonly: true },
        { type: "select", name: "productSize", placeholder: "Select Product Size", options: sizeList?.map((d) => ({ label: d.label, value: d.label })).sort((a, b) => a.label.localeCompare(b.label)), searchable: true },
        { type: "select", name: "productBrand", placeholder: "Select Brand", options: brandList?.map((d: { label: any; }) => ({ label: d.label, value: d.label })).sort((a: { label: string; }, b: { label: any; }) => a.label.localeCompare(b.label)), searchable: true },
        { type: "select", name: "productCategory", placeholder: "Select Category", options: categoryList?.map((d) => ({ label: d.label, value: d.label })).sort((a, b) => a.label.localeCompare(b.label)), searchable: true },
        { type: "select", name: "dominance", placeholder: "Select Dominance", options: dominanceList?.map((d) => ({ label: d.label, value: d.label })).sort((a, b) => a.label.localeCompare(b.label)) },
        { type: "select", name: "tier", placeholder: "Select Tier", options: tier?.map((d) => ({ label: d, value: d })) },
        { type: "select", name: "flavorStrain", placeholder: "Flavor or Strain (Choose or Add New)", options: flavorStrainList?.map((d) => ({ label: d.label, value: d.label })).sort((a, b) => a.label.localeCompare(b.label)), withOtherInput: true, searchable: true },
        { type: "select", name: "form", placeholder: "Select Form (Choose or Add New)", options: formList?.map((d) => ({ label: d.label, value: d.label })).sort((a, b) => a.label.localeCompare(b.label)), withOtherInput: true, searchable: true }
    ];

    const formProps = {
        initialValues: formValues,
        validationSchema,
        sendFunction: ID === 0 ? commonSubmit : commonPut,
        fields,
        endpoint: ID === 0 ? 'add-product' : 'update-product',
        divClass: 'col-xl-6',
        inheritFunctions: ID === 0 ? inheritFunctionsOnAdd : inheritFunctionsOnUpdate,
        updatedID: ID
    }

    useEffect(() => {
        setFormValues({ productName: ITEM_NAME || "", productSize: SIZE || "", productBrand: BRAND || "", productCategory: CATEGORY_NAME || "", dominance: DOMINANCE || "", tier: TIER || "", flavorStrain: FLAVOR_STRAIN || "", form: FORM || "" });
    }, [ITEM_NAME, SIZE, BRAND, CATEGORY_NAME, DOMINANCE, TIER, FLAVOR_STRAIN, FORM])

    return (
        <Whisper
            trigger="click"
            controlId="control-id-click"
            ref={addProductTriggerRef}
            placement="auto"
            speaker={<AddProductPopUp content={""} formProps={formProps} RFID={RFID} />}
        >
            <button className={`${buttonClass}`}>
                {buttonName}
            </button>
        </Whisper>
    );
}

export default memo(AddSku);