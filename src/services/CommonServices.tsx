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