import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../reducers/loginReducer'
import caseReducer from '../reducers/caseReducer'
import fileReducer from '../reducers/fileReducer'

export const store = configureStore({
    reducer: {
        loginReducer,
        caseReducer,
        fileReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch