import {Button, PageHeader} from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import {useSelector} from 'react-redux'
import {RootState} from "../store/store";

export function AppHeader() {
    const navigate = useNavigate();
    const auth = useSelector((state: RootState) => state.loginReducer)

    function goToLogin() {
        navigate("/login");
    }

    function goToAccount() {
        navigate("/account");
    }


    function goToHome() {
        navigate("/");
    }

    return (<PageHeader
        title = "BloodBay"
        subTitle = "Beta"
        extra = {
            [
                <Button key = "2" onClick={goToHome}>Home</Button>,
                !auth.isLoggedIn ? <Button type="primary" key = "1" onClick={goToLogin}>Login</Button> : <Button type="primary" key = "1" onClick={goToAccount}>Hey, {auth.username}!</Button>,
            ]
        }
    />)
}
