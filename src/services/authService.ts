import axios from 'axios'
import {getAPIUrl} from "../utils/apiUtils";

export const loginAction = (email: string, password: string): Promise<any> => {
    return axios.post(`${getAPIUrl()}/auth/login`, {
        email,
        password
    })
}

export const registerAction = (email: string, password: string, username: string): Promise<any> => {
    return axios.post(`${getAPIUrl()}/auth/register`, {
        email,
        password,
        username
    })
}

export const infoAction = (token: string): Promise<any> => {
    return axios.post(`${getAPIUrl()}/auth/info`, null, {
        headers: {
            token
        }
    })
}

export const verifyEmailAction = (verificationToken: string): Promise<any> => {
    return axios.post(`${getAPIUrl()}/verify`, null,{
        params: {
            token: verificationToken
        }
    })
}
