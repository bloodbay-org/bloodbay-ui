import React, {useEffect} from 'react';
import {getAllCases, searchCases} from "../reducers/caseReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store";
import {CasesTable} from "../components/CasesTable";
import {Input, Comment, Avatar, Card} from 'antd';

const {Search} = Input;

function App() {
    const cases = useSelector((state: RootState) => state.caseReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllCases())
    }, [])

    return (
        <div>
            <Card>
                <Comment
                    author={<a>Nick</a>}
                    avatar={<Avatar src="https://www.gravatar.com/avatar/23e01f03b74e0277b6166832f36df3ec?s=250&d=mm&r=x" alt="Nick"/>}
                    content={
                        <p>
                            Hey everyone and welcome to the BloodBay.org - a safe place to report your vaccine-related side effects supported by evidences. Think about it as a VAERS but open to people with all medical records + doesn't lie.
                            There is absolutely no censorship and you can freely create your case and then share it to other people. I'm trying to add as many features as I can. This whole project is open-sourced which means I made all platform code public, please read more in About section. Enjoy!
                        </p>
                    }
                />
            </Card>
            <Search placeholder="Search cases by tag" loading={cases.inProgress} style={{paddingBottom: 5, paddingTop: 5}} enterButton
                    onSearch={(value: string) => dispatch(searchCases({tag: value}))}/>
            <CasesTable cases={cases.cases} inProgress={cases.inProgress} />
        </div>
    );
}

export default App;
