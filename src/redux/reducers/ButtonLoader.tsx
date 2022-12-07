import { createSlice } from '@reduxjs/toolkit'

export const buttonLoaderSlice = createSlice({
    name: 'buttonloader',
    initialState: {
        value: false,
    },
    reducers: {
        buttonLoaderStatus: (state) => {
            state.value = !state.value
        },
    },
})

// Action creators are generated for each case reducer function
export const { buttonLoaderStatus } = buttonLoaderSlice.actions

export default buttonLoaderSlice.reducer