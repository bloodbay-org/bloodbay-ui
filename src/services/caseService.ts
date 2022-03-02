import axios from 'axios'
import {getAPIUrl} from "../utils/apiUtils";

export const createCaseAction = (title: string, description: string, token: string): Promise<any> => {
    return axios.post(`${getAPIUrl()}/cases/`, {title, description}, {
        headers: {
            token
        }
    })
}

export const getAllCasesForUserIdAction = (userId: string): Promise<any> => {
    return axios.get(`${getAPIUrl()}/cases`, {
        params: {
            userId
        }
    })
}

export const getAllCasesAction = (): Promise<any> => {
    return axios.get(`${getAPIUrl()}/cases/`)
}

export const getCaseByIdAction = (caseId: string): Promise<any> => {
    return axios.get(`${getAPIUrl()}/cases/${caseId}`)
}

export const deleteCaseAction = (token: string, caseId: string): Promise<any> => {
    return axios.post(`${getAPIUrl()}/cases/${caseId}`, null, {
        headers: {
            token
        }
    })
}
