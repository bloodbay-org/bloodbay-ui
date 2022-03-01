import {Button, Descriptions, Card} from "antd";
import React from "react";
import {logOut} from "../reducers/loginReducer";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {RootState} from "../store/store";

export function Account() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const auth = useSelector((state: RootState) => state.loginReducer)


    function logout() {
        dispatch(logOut())
        navigate("/");
    }

    return (
        <Card>
            <Descriptions column={2} title="User Info">
                <Descriptions.Item label="Username">{auth.username}</Descriptions.Item>
                <Descriptions.Item label="Email">{auth.email}</Descriptions.Item>
                <Descriptions.Item label=""><Button type="primary" key="1" onClick={logout}>Logout</Button></Descriptions.Item>
            </Descriptions>
        </Card>
    );
}
