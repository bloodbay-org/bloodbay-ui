import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {uploadFileAction} from "../services/fileService";

interface UploadedFile {
    uploadedById: string
    name: string
    linkedToId: string
}

interface FileState {
    inProgress: boolean
    uploadedFiles: UploadedFile[]
    error: string
}

const initialState: FileState = {
    inProgress: false,
    uploadedFiles: [],
    error: ''
}

interface UploadFileActionParams {
    files: File[],
    linkedToId: string,
    token: string
}

export const uploadFile = createAsyncThunk(
    'files/upload',
    async (params: UploadFileActionParams) => {
        const {files, linkedToId, token} = params
        try {
            return (await uploadFileAction(files, linkedToId, token)).data
        } catch (error: any) {
            throw new Error(error.response.data.error ? error.response.data.error : error)
        }
    })

const createCaseCases = (builder: any) => {
    builder.addCase(uploadFile.pending, (state: FileState) => {
        state.error = ''
        state.inProgress = true
        state.uploadedFiles = []
    })
    builder.addCase(uploadFile.fulfilled, (state: FileState, action: any) => {
        state.error = ''
        state.inProgress = false
        state.uploadedFiles = action.payload
    })
    builder.addCase(uploadFile.rejected, (state: FileState, action: any) => {
        state.error = action.error.message
        state.inProgress = false
    })
}

export const fileSlice = createSlice({
    name: 'file',
    initialState,
    reducers: {
        resetCreatedFileState: (state) => {
            state.error = ''
            state.inProgress = false
            state.uploadedFiles = []
        },
    },
    extraReducers: (builder) => {
        createCaseCases(builder)
    },
})

export const {resetCreatedFileState} = fileSlice.actions

export default fileSlice.reducer
