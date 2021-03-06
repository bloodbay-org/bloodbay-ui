import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {
    createCaseAction,
    deleteCaseAction,
    getAllCasesAction,
    getAllCasesForUserIdAction,
    getCaseByIdAction, searchCasesAction
} from "../services/caseService";

export interface CaseType {
    reportedByName: string;
    title: string;
    description: string;
    reportedBy: string;
    country: string;
    tags: string[];
    _id: string;
}

export interface CaseState {
    inProgress: boolean
    cases: CaseType[]
    casesOfUser: CaseType[]
    viewingCase: CaseType
    createdCase: CaseType
    error: any
}

export interface CreateCaseActionParams {
    title: string;
    description: string;
    token: string;
    reportedByName: string;
    country: string;
    tags: string[];
}

export interface GetCaseByIdActionParams {
    caseId: string;
}

export interface SearchCasesActionParams {
    tag: string;
}

export interface GetCasesForUserIdActionParams {
    userId: string;
}

export interface DeleteCaseByIdActionParams {
    caseId: string;
    token: string;
}

const defaultCaseTemplate = {
    title: '',
    description: '',
    reportedBy: '',
    reportedByName: '',
    country: '',
    tags: [],
    _id: '',
}

const initialState: CaseState = {
    inProgress: false,
    cases: [],
    casesOfUser: [],
    viewingCase: defaultCaseTemplate,
    createdCase: defaultCaseTemplate,
    error: ''
}

export const createCase = createAsyncThunk(
    'cases/create',
    async (params: CreateCaseActionParams) => {
        const {title, description, token, reportedByName, tags, country} = params
        try {
            return (await createCaseAction(title, description, tags, reportedByName, country, token)).data
        } catch (error: any) {
            throw new Error(error.response.data.error ? error.response.data.error : error)
        }
    })

export const searchCases = createAsyncThunk(
    'cases/search?tag=',
    async (params: SearchCasesActionParams) => {
        const {tag} = params
        try {
            return (await searchCasesAction(tag)).data
        } catch (error: any) {
            throw new Error(error.response.data.error ? error.response.data.error : error)
        }
    })

export const getAllCasesForUserId = createAsyncThunk(
    'cases/get?userId=',
    async (params: GetCasesForUserIdActionParams) => {
        const {userId} = params
        try {
            return (await getAllCasesForUserIdAction(userId)).data
        } catch (error: any) {
            throw new Error(error.response.data.error ? error.response.data.error : error)
        }
    })

export const getAllCases = createAsyncThunk(
    'cases/get',
    async () => {
        try {
            return (await getAllCasesAction()).data
        } catch (error: any) {
            throw new Error(error.response.data.error ? error.response.data.error : error)
        }
    })

export const getCaseById = createAsyncThunk(
    'cases/get/:caseId',
    async (params: GetCaseByIdActionParams) => {
        const {caseId} = params
        try {
            return (await getCaseByIdAction(caseId)).data
        } catch (error: any) {
            throw new Error(error.response.data.error ? error.response.data.error : error)
        }
    })

export const deleteCaseById = createAsyncThunk(
    'cases/delete/:caseId',
    async (params: DeleteCaseByIdActionParams) => {
        const {caseId, token} = params
        try {
            return (await deleteCaseAction(token, caseId)).data
        } catch (error: any) {
            throw new Error(error.response.data.error ? error.response.data.error : error)
        }
    })

const deleteCaseCases = (builder: any) => {
    builder.addCase(deleteCaseById.pending, (state: CaseState) => {
        state.error = ''
        state.inProgress = true
    })
    builder.addCase(deleteCaseById.fulfilled, (state: CaseState) => {
        state.error = ''
        state.inProgress = false
    })
    builder.addCase(deleteCaseById.rejected, (state: CaseState, action: any) => {
        state.error = action.error.message
        state.inProgress = false
    })
}

const createCaseCases = (builder: any) => {
    builder.addCase(createCase.pending, (state: CaseState) => {
        state.error = ''
        state.inProgress = true
        state.createdCase = defaultCaseTemplate
    })
    builder.addCase(createCase.fulfilled, (state: CaseState, action: any) => {
        state.error = ''
        state.inProgress = false
        state.createdCase = action.payload
    })
    builder.addCase(createCase.rejected, (state: CaseState, action: any) => {
        state.error = action.error.message
        state.inProgress = false
    })
}

const searchCasesCases = (builder: any) => {
    builder.addCase(searchCases.pending, (state: CaseState) => {
        state.error = ''
        state.inProgress = true
    })
    builder.addCase(searchCases.fulfilled, (state: CaseState, action: any) => {
        state.error = ''
        state.inProgress = false
        state.cases = action.payload
    })
    builder.addCase(searchCases.rejected, (state: CaseState, action: any) => {
        state.error = action.error.message
        state.inProgress = false
    })
}

const getAllCasesCases = (builder: any) => {
    builder.addCase(getAllCases.pending, (state: CaseState) => {
        state.error = ''
        state.inProgress = true
    })
    builder.addCase(getAllCases.fulfilled, (state: CaseState, action: any) => {
        state.error = ''
        state.inProgress = false
        state.cases = action.payload
    })
    builder.addCase(getAllCases.rejected, (state: CaseState, action: any) => {
        state.error = action.error.message
        state.inProgress = false
    })
}

const getAllCasesForUserIdCases = (builder: any) => {
    builder.addCase(getAllCasesForUserId.pending, (state: CaseState) => {
        state.error = ''
        state.inProgress = true
    })
    builder.addCase(getAllCasesForUserId.fulfilled, (state: CaseState, action: any) => {
        state.error = ''
        state.inProgress = false
        state.casesOfUser = action.payload
    })
    builder.addCase(getAllCasesForUserId.rejected, (state: CaseState, action: any) => {
        state.error = action.error.message
        state.inProgress = false
    })
}

const getCaseByIdCases = (builder: any) => {
    builder.addCase(getCaseById.pending, (state: CaseState) => {
        state.error = ''
        state.inProgress = true
        state.viewingCase = defaultCaseTemplate
    })
    builder.addCase(getCaseById.fulfilled, (state: CaseState, action: any) => {
        state.error = ''
        state.inProgress = false
        state.viewingCase = action.payload
    })
    builder.addCase(getCaseById.rejected, (state: CaseState, action: any) => {
        state.error = action.error.message
        state.inProgress = false
    })
}

export const caseSlice = createSlice({
    name: 'case',
    initialState,
    reducers: {
        resetCreatedStateCase: (state) => {
            state.error = ''
            state.inProgress = false
            state.createdCase = defaultCaseTemplate
        },
    },
    extraReducers: (builder) => {
        deleteCaseCases(builder)
        createCaseCases(builder)
        getCaseByIdCases(builder)
        getAllCasesCases(builder)
        getAllCasesForUserIdCases(builder)
        searchCasesCases(builder)
    },
})

export const {resetCreatedStateCase} = caseSlice.actions
export default caseSlice.reducer
