import axios from 'axios'
import {getAPIUrl} from "../utils/apiUtils";

export const createCaseAction = (title: string, description: string, tags: string[], reportedByName: string,  token: string): Promise<any> => {
    return axios.post(`${getAPIUrl()}/cases/`, {title, description, tags, reportedByName}, {
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

export const searchCasesAction = (tag: string): Promise<any> => {
    return axios.get(`${getAPIUrl()}/cases/search`, {
        params: {
            tag
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
