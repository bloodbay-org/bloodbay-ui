import {Button} from "antd";
import {useNavigate} from "react-router-dom";
import {useSelector} from 'react-redux'
import {RootState} from "../store/store";
import {Header} from "antd/es/layout/layout";
import React from "react";


export function AppHeader() {
    const navigate = useNavigate();
    const auth = useSelector((state: RootState) => state.loginReducer)

    function goToLogin() {
        navigate("/login");
    }

    function goToAccount() {
        navigate("/account");
    }

    return (

        <Header style={{padding: 0, display: 'flex', justifyContent: 'flex-end'}}>
            <div style={{ paddingRight: 30}}>
                {
                    !auth.isLoggedIn ? <Button type="primary" key="3" onClick={goToLogin}>Login</Button> :
                        <Button type="primary" key="1" onClick={goToAccount}>Hey, {auth.username}!</Button>
                }
            </div>
        </Header>
    )
}
