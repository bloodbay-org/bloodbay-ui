import axios from 'axios'
import {getAPIUrl} from "../utils/apiUtils";

export const uploadFileAction = (files: File[], linkedToId: string, token: string): Promise<any> => {
    const bodyFormData: FormData = new FormData();

    files.forEach((file: File) => {
        bodyFormData.append('files', file);
    })
    return axios.post(`${getAPIUrl()}/files/`, bodyFormData, {
        headers: {
            token,
            "Content-Type": `multipart/form-data`
        },
        params: {
            linkedToId
        }
    })
}

