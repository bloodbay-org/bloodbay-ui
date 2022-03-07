import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {getLinkedFilesToCaseAction, uploadFileAction} from "../services/fileService";

interface UploadedFile {
    uploadedById: string
    name: string
    linkedToId: string
}

interface FileState {
    inProgress: boolean
    uploadedFiles: UploadedFile[]
    linkedToCaseFiles: FileMetadata[]
    error: string
}

export interface FileMetadata {
    mediaLink: string
    name: string
    timeCreated: string
    size: string
}

const initialState: FileState = {
    inProgress: false,
    uploadedFiles: [],
    linkedToCaseFiles: [],
    error: ''
}

interface UploadFileActionParams {
    files: File[],
    linkedToId: string,
    token: string
}

interface GetLinkedToCaseFilesActionParams {
    caseId: string
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

export const getLinkedToCaseFiles = createAsyncThunk(
    'files/get',
    async (params: GetLinkedToCaseFilesActionParams) => {
        const {caseId} = params
        try {
            return (await getLinkedFilesToCaseAction(caseId)).data
        } catch (error: any) {
            throw new Error(error.response.data.error ? error.response.data.error : error)
        }
    })

const getLinkedToCaseFilesCases = (builder: any) => {
    builder.addCase(getLinkedToCaseFiles.pending, (state: FileState) => {
        state.error = ''
        state.inProgress = true
        state.uploadedFiles = []
        state.linkedToCaseFiles = []
    })
    builder.addCase(getLinkedToCaseFiles.fulfilled, (state: FileState, action: any) => {
        state.error = ''
        state.inProgress = false
        state.linkedToCaseFiles = action.payload
    })
    builder.addCase(getLinkedToCaseFiles.rejected, (state: FileState, action: any) => {
        state.error = action.error.message
        state.inProgress = false
    })
}

const uploadFileCases = (builder: any) => {
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
        uploadFileCases(builder)
        getLinkedToCaseFilesCases(builder)
    },
})

export const {resetCreatedFileState} = fileSlice.actions

export default fileSlice.reducer
