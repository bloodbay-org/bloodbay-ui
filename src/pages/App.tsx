import React, {useEffect} from 'react';
import {Alert, Spin, Table} from 'antd';
import {CaseType, getAllCases} from "../reducers/caseReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store";
import {CasesTable} from "../components/CasesTable";

function App() {
    const cases = useSelector((state: RootState) => state.caseReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllCases())
    }, [])

    return (
        <div>
            <CasesTable cases={cases.cases} inProgress={cases.inProgress} error={cases.error}/>
        </div>
    );
}

export default App;
