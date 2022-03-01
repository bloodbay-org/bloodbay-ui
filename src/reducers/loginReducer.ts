import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

import {infoAction, loginAction, registerAction} from '../services/authService'

export interface AuthState {
    inProgress: boolean
    isLoggedIn: boolean
    username: string
    email: string
    error: any
}

export interface LoginActionParams {
    email: string,
    password: string
}

export interface RegisterActionParams {
    email: string,
    username: string,
    password: string
}

export interface InfoActionParams {
    token: string,
}

const initialState: AuthState = {
    inProgress: false,
    isLoggedIn: false,
    username: '',
    email: '',
    error: ''
}

export const login = createAsyncThunk(
    'auth/login',
    async (params: LoginActionParams) => {
        const {email, password} = params
        return (await loginAction(email, password)).data
    })

export const register = createAsyncThunk(
    'auth/register',
    async (params: RegisterActionParams) => {
        const {email, password, username} = params
        return (await registerAction(email, password, username)).data
    })

export const info = createAsyncThunk(
    'auth/info',
    async (params: InfoActionParams) => {
        return (await infoAction(params.token)).data
    })

const infoCases = (builder: any) => {
    builder.addCase(info.pending, (state: AuthState) => {
        state.inProgress = true
    })
    builder.addCase(info.fulfilled, (state: AuthState, action: any) => {
        state.inProgress = false
        state.email = action.payload.email
        state.username = action.payload.username
    })
    builder.addCase(info.rejected, (state: AuthState, action: any) => {
        state.error = action.error.message
        state.inProgress = false
    })
}

const registerCases = (builder: any) => {
    builder.addCase(register.pending, (state: AuthState) => {
        state.inProgress = true
        state.isLoggedIn = false
    })
    builder.addCase(register.fulfilled, (state: AuthState, action: any) => {
        state.inProgress = false
        state.isLoggedIn = true
        Cookies.set('token', action.payload)
    })
    builder.addCase(register.rejected, (state: AuthState, action: any) => {
        state.error = action.error.message
        state.inProgress = false
        state.isLoggedIn = false
        Cookies.remove('token')
    })
}

const loginCases = (builder: any) => {
    builder.addCase(login.pending, (state: AuthState) => {
        state.inProgress = true
        state.isLoggedIn = false
    })
    builder.addCase(login.fulfilled, (state: AuthState, action: any) => {
        state.inProgress = false
        Cookies.set('token', action.payload)
        state.isLoggedIn = true
    })
    builder.addCase(login.rejected, (state: AuthState, action: any) => {
        state.error = action.error.message
        state.inProgress = false
        state.isLoggedIn = false
        Cookies.remove('token')
    })
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOut: (state) => {
            state.inProgress = false
            state.isLoggedIn = false
            state.error = ''
            Cookies.remove('token')
        },
        setLoginState: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload
        },
    },
    extraReducers: (builder) => {
        loginCases(builder)
        registerCases(builder)
        infoCases(builder)
    },
})

export const {logOut, setLoginState} = authSlice.actions

export default authSlice.reducer