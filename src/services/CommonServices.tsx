import { Dispatch, AnyAction } from "redux";
import { commonFetchAllAuth } from "./UserServices";

export const getBrandList = async (dispatch: Dispatch<AnyAction>) => {
    return commonFetchAllAuth('brand-list', dispatch)
        .then((res: any) => {
            if (!res || res.status != 200) {
                throw new Error("Server responds with error!");
            }
            return res.json();
        })
        .then(
            (data) => {
                return data;
            },
            (err) => {
                console.log(err);
            }
        );
};

export const getSizeList = async (dispatch: Dispatch<AnyAction>) => {
    return commonFetchAllAuth('sku-size-list', dispatch)
        .then((res: any) => {
            if (!res || res.status != 200) {
                throw new Error("Server responds with error!");
            }
            return res.json();
        })
        .then(
            (data) => {
                return data;
            },
            (err) => {
                console.log(err);
            }
        );
};

export const getCategoryList = async (dispatch: Dispatch<AnyAction>) => {
    return commonFetchAllAuth('sku-category-list', dispatch)
        .then((res: any) => {
            if (!res || res.status != 200) {
                throw new Error("Server responds with error!");
            }
            return res.json();
        })
        .then(
            (data) => {
                return data;
            },
            (err) => {
                console.log(err);
            }
        );
};

export const getDominanceList = async (dispatch: Dispatch<AnyAction>) => {
    return commonFetchAllAuth('sku-dominance-list', dispatch)
        .then((res: any) => {
            if (!res || res.status != 200) {
                throw new Error("Server responds with error!");
            }
            return res.json();
        })
        .then(
            (data) => {
                return data;
            },
            (err) => {
                console.log(err);
            }
        );
};

export const getFlavorStrainList = async (dispatch: Dispatch<AnyAction>) => {
    return commonFetchAllAuth('sku-flavorstrain-list', dispatch)
        .then((res: any) => {
            if (!res || res.status != 200) {
                throw new Error("Server responds with error!");
            }
            return res.json();
        })
        .then(
            (data) => {
                return data;
            },
            (err) => {
                console.log(err);
            }
        );
};

export const getFormList = async (dispatch: Dispatch<AnyAction>) => {
    return commonFetchAllAuth('sku-form-list', dispatch)
        .then((res: any) => {
            if (!res || res.status != 200) {
                throw new Error("Server responds with error!");
            }
            return res.json();
        })
        .then(
            (data) => {
                return data;
            },
            (err) => {
                console.log(err);
            }
        );
};