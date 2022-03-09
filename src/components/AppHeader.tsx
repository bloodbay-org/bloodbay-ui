import {Badge, Button} from "antd";
import {useNavigate} from "react-router-dom";
import {useSelector} from 'react-redux'
import {RootState} from "../store/store";
import {Header} from "antd/es/layout/layout";
import React, {useEffect, useState} from "react";
import io, {Socket} from 'socket.io-client';
import {getAPIUrl} from "../utils/apiUtils";


export function AppHeader() {
    const navigate = useNavigate();
    const auth = useSelector((state: RootState) => state.loginReducer)
    const [userCountOnline, setUserCountOnline] = useState(0)
    const [socket, setSocket] = useState<Socket>()

    useEffect((): any => {
        const socket = io(getAPIUrl());
        setSocket(socket)
        return () => socket.close();
    }, []);

    useEffect((): any => {
        if (socket) {
            socket.on('userCount', (userCount: number) => {
                console.log('set user count!')
                setUserCountOnline(userCount)
            });
            socket.on('disconnect', () => {
                console.log('disconnected :(')
            });
        }
    }, [socket]);


    function goToLogin() {
        navigate("/login");
    }

    function goToAccount() {
        navigate("/account");
    }

    return (

        <Header style={{padding: 0, display: 'flex', justifyContent: 'flex-end'}}>
            <div style={{paddingRight: 30}}>
                <Badge color="green" style={{ color: 'white', paddingRight: 30}} text={`Users online: ${userCountOnline}`} />
                {
                    !auth.isLoggedIn ? <Button type="primary" key="3" onClick={goToLogin}>Login</Button> :
                        <Button type="primary" key="1" onClick={goToAccount}>Hey, {auth.username}!</Button>
                }
            </div>
        </Header>
    )
}
