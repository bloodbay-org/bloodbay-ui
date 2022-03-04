import {Button, Descriptions, Card} from "antd";
import React, {useEffect} from "react";
import {logOut} from "../reducers/loginReducer";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {RootState} from "../store/store";
import {getAllCasesForUserId} from "../reducers/caseReducer";
import {CasesTable} from "../components/CasesTable";

export function Account() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const auth = useSelector((state: RootState) => state.loginReducer)
    const cases = useSelector((state: RootState) => state.caseReducer)

    useEffect(() => {
        if (auth.id) {
            dispatch(getAllCasesForUserId({userId: `${auth.id}`}))
        }
    }, [auth.id])

    function logout() {
        dispatch(logOut())
        navigate("/");
    }

    return (
        <div>
            <Card>
                <Descriptions column={2} title="User Info">
                    <Descriptions.Item label="Username">{auth.username}</Descriptions.Item>
                    <Descriptions.Item label="Email">{auth.email}</Descriptions.Item>
                    <Descriptions.Item label="Cases reported">{cases.casesOfUser.length}</Descriptions.Item>
                    <Descriptions.Item>{}</Descriptions.Item>
                    <Descriptions.Item label=""><Button type="primary" key="1" onClick={logout}>Logout</Button></Descriptions.Item>
                </Descriptions>
            </Card>
            <div style={{ marginTop: 10}}>
                <CasesTable cases={cases.casesOfUser} inProgress={cases.inProgress} error={cases.error}/>
            </div>
        </div>
    );
}
