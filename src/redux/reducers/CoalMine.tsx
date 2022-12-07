import { createSlice } from '@reduxjs/toolkit'
import { commonFetchAllAuth } from '../../services/UserServices';

const initialState = {
    data: { lowInventoryItems: [], agingInventoryItems: [], expirationApproachingItems: [], topPricedLocations: [], lowestPricedLocations: [] },
    loaded: { lowInventoryItems: false, agingInventoryItems: false, expirationApproachingItems: false, topPricedLocations: false, lowestPricedLocations: false },
    categories: { lowInventoryItems: [], agingInventoryItems: [], expirationApproachingItems: [], topPricedLocations: [], lowestPricedLocations: [] },
    location: { lowInventoryItems: [], agingInventoryItems: [], expirationApproachingItems: [], topPricedLocations: [], lowestPricedLocations: [] },
    items: { lowInventoryItems: [], agingInventoryItems: [], expirationApproachingItems: [], topPricedLocations: [], lowestPricedLocations:[] },
};

export const coalMineSlice = createSlice({
    name: 'coalmine',
    initialState,
    reducers: {
        setLowInventoryItems: (state, action) => {
            state.data = {
                ...state.data,
                lowInventoryItems: action?.payload
            }

            state.loaded = {
                ...state.loaded,
                lowInventoryItems: true
            }

            state.categories = {
                ...state.categories,
                lowInventoryItems: action.payload.filter((value: { CATEGORY: any; }, index: any, self: any[]) => self.map(x => x.CATEGORY).indexOf(value.CATEGORY) == index).map((k: { CATEGORY: any; }) => { return { CATEGORY: k.CATEGORY } })
            }

            state.location = {
                ...state.location,
                lowInventoryItems: action.payload.filter((value: { NAME: any; }, index: any, self: any[]) => self.map(x => x.NAME).indexOf(value.NAME) == index).map((k: { NAME: any; }) => { return { LOCATION: k.NAME } })
            }

            state.items = {
                ...state.items,
                lowInventoryItems: action.payload.filter((value: { ITEM_ID: any; }, index: any, self: any[]) => self.map(x => x.ITEM_ID).indexOf(value.ITEM_ID) == index).map((k: { ITEM_ID: any; PACKAGES_ITEM_NAME: any; }) => { return { ITEM_ID: k.ITEM_ID, ITEM_NAME: k.PACKAGES_ITEM_NAME } })
            }
        },

        setAgingInventoryItems: (state, action) => {
            state.data = {
                ...state.data,
                agingInventoryItems: action?.payload
            }

            state.loaded = {
                ...state.loaded,
                agingInventoryItems: true
            }

            state.categories = {
                ...state.categories,
                agingInventoryItems: action.payload.filter((value: { CATEGORY: any; }, index: any, self: any[]) => self.map(x => x.CATEGORY).indexOf(value.CATEGORY) == index).map((k: { CATEGORY: any; }) => { return { CATEGORY: k.CATEGORY } })
            }

            state.location = {
                ...state.location,
                agingInventoryItems: action.payload.filter((value: { NAME: any; }, index: any, self: any[]) => self.map(x => x.NAME).indexOf(value.NAME) == index).map((k: { NAME: any; }) => { return { LOCATION: k.NAME } })
            }

            state.items = {
                ...state.items,
                agingInventoryItems: action.payload.filter((value: { ITEM_ID: any; }, index: any, self: any[]) => self.map(x => x.ITEM_ID).indexOf(value.ITEM_ID) == index).map((k: { ITEM_ID: any; PACKAGES_ITEM_NAME: any; }) => { return { ITEM_ID: k.ITEM_ID, ITEM_NAME: k.PACKAGES_ITEM_NAME } })
            }
        },

        setExpirationApproachingItems: (state, action) => {
            state.data = {
                ...state.data,
                expirationApproachingItems: action?.payload
            }

            state.loaded = {
                ...state.loaded,
                expirationApproachingItems: true
            }

            state.categories = {
                ...state.categories,
                expirationApproachingItems: action.payload.filter((value: { CATEGORY: any; }, index: any, self: any[]) => self.map(x => x.CATEGORY).indexOf(value.CATEGORY) == index).map((k: { CATEGORY: any; }) => { return { CATEGORY: k.CATEGORY } })
            }

            state.location = {
                ...state.location,
                expirationApproachingItems: action.payload.filter((value: { NAME: any; }, index: any, self: any[]) => self.map(x => x.NAME).indexOf(value.NAME) == index).map((k: { NAME: any; }) => { return { LOCATION: k.NAME } })
            }

            state.items = {
                ...state.items,
                expirationApproachingItems: action.payload.filter((value: { ITEM_ID: any; }, index: any, self: any[]) => self.map(x => x.ITEM_ID).indexOf(value.ITEM_ID) == index).map((k: { ITEM_ID: any; PACKAGES_ITEM_NAME: any; }) => { return { ITEM_ID: k.ITEM_ID, ITEM_NAME: k.PACKAGES_ITEM_NAME } })
            }
        },

        setTopPricedLocations: (state, action) => {
            state.data = {
                ...state.data,
                topPricedLocations: action?.payload
            }

            state.loaded = {
                ...state.loaded,
                topPricedLocations: true
            }

            state.categories = {
                ...state.categories,
                topPricedLocations: action.payload.filter((value: { CATEGORY: any; }, index: any, self: any[]) => self.map(x => x.CATEGORY).indexOf(value.CATEGORY) == index).map((k: { CATEGORY: any; }) => { return { CATEGORY: k.CATEGORY } })
            }

            state.location = {
                ...state.location,
                topPricedLocations: action.payload.filter((value: { NAME: any; }, index: any, self: any[]) => self.map(x => x.NAME).indexOf(value.NAME) == index).map((k: { NAME: any; }) => { return { LOCATION: k.NAME } })
            }

            state.items = {
                ...state.items,
                topPricedLocations: action.payload.filter((value: { ITEM_ID: any; }, index: any, self: any[]) => self.map(x => x.ITEM_ID).indexOf(value.ITEM_ID) == index).map((k: { ITEM_ID: any; ITEM_NAME: any; }) => { return { ITEM_ID: k.ITEM_ID, ITEM_NAME: k.ITEM_NAME } })
            }
        },

        setLowestPricedLocations: (state, action) => {
            state.data = {
                ...state.data,
                lowestPricedLocations: action?.payload
            }

            state.loaded = {
                ...state.loaded,
                lowestPricedLocations: true
            }

            state.categories = {
                ...state.categories,
                lowestPricedLocations: action.payload.filter((value: { CATEGORY: any; }, index: any, self: any[]) => self.map(x => x.CATEGORY).indexOf(value.CATEGORY) == index).map((k: { CATEGORY: any; }) => { return { CATEGORY: k.CATEGORY } })
            }

            state.location = {
                ...state.location,
                lowestPricedLocations: action.payload.filter((value: { NAME: any; }, index: any, self: any[]) => self.map(x => x.NAME).indexOf(value.NAME) == index).map((k: { NAME: any; }) => { return { LOCATION: k.NAME } })
            }

            state.items = {
                ...state.items,
                lowestPricedLocations: action.payload.filter((value: { ITEM_ID: any; }, index: any, self: any[]) => self.map(x => x.ITEM_ID).indexOf(value.ITEM_ID) == index).map((k: { ITEM_ID: any; ITEM_NAME: any; }) => { return { ITEM_ID: k.ITEM_ID, ITEM_NAME: k.ITEM_NAME } })
            }
        },
    },
});

export const fetchLowInventoryItems = () => async (dispatch: any) => {
    commonFetchAllAuth('low-inventory-items', dispatch)
        .then((res: any) => {
            if (!res || res.status != 200) {
                throw new Error("Server responds with error!");
            }
            return res.json();
        })
        .then(
            (data) => {
                dispatch(setLowInventoryItems(data));
            },
            (err) => {
                console.log(err);
            }
        );
};

export const fetchAgingInventoryItems = () => async (dispatch: any) => {
    commonFetchAllAuth('aging-inventory-items', dispatch)
        .then((res: any) => {
            if (!res || res.status != 200) {
                throw new Error("Server responds with error!");
            }
            return res.json();
        })
        .then(
            (data) => {
                dispatch(setAgingInventoryItems(data));
            },
            (err) => {
                console.log(err);
            }
        );
};

export const fetchExpirationApproachingItems = () => async (dispatch: any) => {
    commonFetchAllAuth('expiration-approaching-items', dispatch)
        .then((res: any) => {
            if (!res || res.status != 200) {
                throw new Error("Server responds with error!");
            }
            return res.json();
        })
        .then(
            (data) => {
                dispatch(setExpirationApproachingItems(data));
            },
            (err) => {
                console.log(err);
            }
        );
};

export const fetchTopPricedLocations = () => async (dispatch: any) => {
    commonFetchAllAuth('top-priced-locations', dispatch)
        .then((res: any) => {
            if (!res || res.status != 200) {
                throw new Error("Server responds with error!");
            }
            return res.json();
        })
        .then(
            (data) => {
                dispatch(setTopPricedLocations(data));
            },
            (err) => {
                console.log(err);
            }
        );
};

export const fetchLowestPricedLocations = () => async (dispatch: any) => {
    commonFetchAllAuth('lowest-priced-locations', dispatch)
        .then((res: any) => {
            if (!res || res.status != 200) {
                throw new Error("Server responds with error!");
            }
            return res.json();
        })
        .then(
            (data) => {
                dispatch(setLowestPricedLocations(data));
            },
            (err) => {
                console.log(err);
            }
        );
};

export const { setLowInventoryItems, setAgingInventoryItems, setExpirationApproachingItems, setTopPricedLocations, setLowestPricedLocations } = coalMineSlice.actions;

export const lowInventoryItems = (state: { coalmine: { data: { lowInventoryItems: any; }; }; }) => state.coalmine.data.lowInventoryItems;
export const lowInventoryItemsStatus = (state: { coalmine: { loaded: { lowInventoryItems: any; }; }; }) => state.coalmine.loaded.lowInventoryItems;

export const agingInventoryItems = (state: { coalmine: { data: { agingInventoryItems: any; }; }; }) => state.coalmine.data.agingInventoryItems;
export const agingInventoryItemsStatus = (state: { coalmine: { loaded: { agingInventoryItems: any; }; }; }) => state.coalmine.loaded.agingInventoryItems;

export const expirationApproachingItems = (state: { coalmine: { data: { expirationApproachingItems: any; }; }; }) => state.coalmine.data.expirationApproachingItems;
export const expirationApproachingItemsStatus = (state: { coalmine: { loaded: { expirationApproachingItems: any; }; }; }) => state.coalmine.loaded.expirationApproachingItems;

export const topPricedLocationsItems = (state: { coalmine: { data: { topPricedLocations: any; }; }; }) => state.coalmine.data.topPricedLocations;
export const topPricedLocationsItemsStatus = (state: { coalmine: { loaded: { topPricedLocations: any; }; }; }) => state.coalmine.loaded.topPricedLocations;

export const lowestPricedLocationsItems = (state: { coalmine: { data: { lowestPricedLocations: any; }; }; }) => state.coalmine.data.lowestPricedLocations;
export const lowestPricedLocationsItemsStatus = (state: { coalmine: { loaded: { lowestPricedLocations: any; }; }; }) => state.coalmine.loaded.lowestPricedLocations;

//merge all categories & get unique come from above payloads
export const mergeCategories = (state: { coalmine: { categories: { lowInventoryItems: any; agingInventoryItems: any; expirationApproachingItems: any; topPricedLocations: any; lowestPricedLocations: any; }; }; }) => [...state.coalmine.categories.lowInventoryItems, ...state.coalmine.categories.agingInventoryItems, ...state.coalmine.categories.expirationApproachingItems, ...state.coalmine.categories.topPricedLocations, ...state.coalmine.categories.lowestPricedLocations].filter((value: { CATEGORY: any; }, index: any, self: any[]) => self.map(x => x.CATEGORY).indexOf(value.CATEGORY) == index).sort((a, b) => a.CATEGORY.toLowerCase().localeCompare(b.CATEGORY.toLowerCase()));

//merge all locations & get unique come from above payloads
export const mergeLocations = (state: { coalmine: { location: { lowInventoryItems: any; agingInventoryItems: any; expirationApproachingItems: any; topPricedLocations: any; lowestPricedLocations: any; }; }; }) => [...state.coalmine.location.lowInventoryItems, ...state.coalmine.location.agingInventoryItems, ...state.coalmine.location.expirationApproachingItems, ...state.coalmine.location.topPricedLocations, ...state.coalmine.location.lowestPricedLocations].filter((value: { LOCATION: any; }, index: any, self: any[]) => self.map(x => x.LOCATION).indexOf(value.LOCATION) == index).sort((a, b) => a.LOCATION.toLowerCase().localeCompare(b.LOCATION.toLowerCase()));

//merge all products & get unique come from above payloads
export const mergeProducts = (state: { coalmine: { items: { lowInventoryItems: any; agingInventoryItems: any; expirationApproachingItems: any; topPricedLocations: any; lowestPricedLocations: any; }; }; }) => [...state.coalmine.items.lowInventoryItems, ...state.coalmine.items.agingInventoryItems, ...state.coalmine.items.expirationApproachingItems, ...state.coalmine.items.topPricedLocations, ...state.coalmine.items.lowestPricedLocations].filter((value: { ITEM_ID: any; }, index: any, self: any[]) => self.map(x => x.ITEM_ID).indexOf(value.ITEM_ID) == index).sort((a, b) => a.ITEM_NAME.toLowerCase().localeCompare(b.ITEM_NAME.toLowerCase()));

export default coalMineSlice.reducer;