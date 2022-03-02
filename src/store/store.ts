import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../reducers/loginReducer'
import caseReducer from '../reducers/caseReducer'

export const store = configureStore({
    reducer: {
        loginReducer,
        caseReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch