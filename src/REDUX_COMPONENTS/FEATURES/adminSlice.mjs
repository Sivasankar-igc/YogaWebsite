import { createSlice } from "@reduxjs/toolkit";
import { statusCode } from "../../utils/statusFile.mjs";

const initialState = {
    data: {},
    status: statusCode.EMPTY
}

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        addAdmin(state, action) {
            state.status = statusCode.IDLE
        }
    }
})

export default adminSlice.reducer;
export const { addAdmin} = adminSlice.actions;