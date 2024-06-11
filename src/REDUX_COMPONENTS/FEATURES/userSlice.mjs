import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit"
import { statusCode } from "../../utils/statusFile.mjs"
import axios from "axios"

const initialState = {
    userData: null,
    status: statusCode.IDLE,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser(state, action) { //AFTER SUCCESSFUL REGISTRATION OR LOGIN
            state.userData = action.payload
        },
        modifyUser(state, action) { // TO MODIFY THE USER ACCOUNT i.e. CHANGING FIRSTNAME AND LASTNAME
            let { firstName, lastName } = action.payload;
            state.userData.firstName = firstName;
            state.userData.lastName = lastName;
        },
        removeUser(state, action) { // LOGOUT
            state.userData = null;
        },
        updateFeedback(state, action) { // TO UPDATE THE FEEDBACK SECTION
            state.userData.feedback = action.payload;
        },
        updatePassword(state, action) { // TO UPDATE THE PASSWORD
            state.userData.password = action.payload;
        },
        watchVideo(state, action) {
            state.userData.videoList.push(action.payload) // WHEN THE USER WATCHES A VIDEO, THE VIDEO ID WILL PUSHED TO HIS/HER VIDEOLISTf
        },
        addPremium(state, action) {
            state.userData.premiumUser = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserData.fulfilled, (state, action) => {
                state.userData = action.payload;
            })
    }
})

export const { addUser, modifyUser, removeUser, updateFeedback, udpatePassword } = userSlice.actions;
export default userSlice.reducer;

export const getUserData = createAsyncThunk(
    "getUserData/get",
    async () => {
        try {
            const response = await axios.get("getUser");
            return response.data.userData;
        } catch (error) {
            console.error(`Clientside error : couldn't fetch user details --> ${error}`)
        }
    }
)