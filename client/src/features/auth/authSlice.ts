import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import authService from '../../services/authService'

interface loginInformation {email:string, password:string}

// First, create the thunk
const loginToApi = createAsyncThunk(
  'login',
  async (loginInformation:loginInformation, thunkAPI) => {
    const {email, password} = loginInformation;
    try {const response = await authService.login(email, password)
    //do validations and stuff here
    return {data : response.data }}
    catch {
      err
    }
  }
)

// Define a type for the slice state
interface userState {
  loading : boolean,
  isLoggedIn: boolean,
  data: [],
  error:string
}

// Define the initial state using that type
const initialState: userState = {
  loading: true,
  isLoggedIn: false,
  data: [],
  error:""
}

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    login:{},
    logout:{},
    register:{},
    // Use the PayloadAction type to declare the contents of `action.payload`
    checkLoginStatus: (state, action: PayloadAction<number>) => {
    //
    }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(loginToApi.fulfilled, (state, action) => {
      // Add user to the state array
    })
  },
})

export const { login, logout, checkLoginStatus } = authSlice.actions

// Other code such as selectors can use the imported `RootState` type
//I do not understand this one.
export const selectCount = (state: userState) => state

export default authSlice.reducer