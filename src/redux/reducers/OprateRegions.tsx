import { createSlice } from '@reduxjs/toolkit'
import { commonFetchAllAuth, commonFetchAllUser } from '../../services/UserServices';

const initialState = {
    data: [],
    loaded: false
};

export const oprateRegionsSlice = createSlice({
    name: 'operateregion',
    initialState,
    reducers: {
        setOprateRegion: (state, action) => {
            state.data = action?.payload
            state.loaded = true
        },
    },
});

export const fetchOprateRegion = () => async (dispatch: any) => {
    commonFetchAllUser('operate-region', dispatch)
        .then((res: any) => {
            if (!res || res.status != 200) {
                throw new Error("Server responds with error!");
            }
            return res.json();
        })
        .then(
            (data) => {
                if(data?.status && data?.regions?.length > 0){
                    dispatch(setOprateRegion(data.regions));
                }
            },
            (err) => {
                console.log(err);
            }
        );
};
export const { setOprateRegion } = oprateRegionsSlice.actions;

export const operateRegions = (state: { operateregion: { data: any[]; }; }) => state.operateregion.data;
export const operateRegionsStatus = (state: { operateregion: { loaded: boolean; }; }) => state.operateregion.loaded;

export default oprateRegionsSlice.reducer;