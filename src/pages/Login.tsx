import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {info, login, register} from '../reducers/loginReducer'
import {Card, Input, Space, Button, Spin} from 'antd';
import {
    useNavigate
} from "react-router-dom";
import {RootState} from "../store/store";
import Cookies from "js-cookie";

const {Meta} = Card;

function Login() {
    const auth = useSelector((state: RootState) => state.loginReducer)
    const dispatch = useDispatch()
    const [registerMode, setRegisterMode] = useState(false)
    let navigate = useNavigate();

    useEffect(() => {
        if (auth.isLoggedIn) {
            dispatch(info({token: `${Cookies.get('token')}`}))
            navigate("/");
        }
    }, [auth])


    const LoginComponent = () => {
        return (
            <Card
                style={{width: 340, alignSelf: 'center', display: 'flex', justifyContent: 'center'}}
            >
                <Meta title="Login"/>
                <Space direction="vertical">
                    <Input
                        style={{width: 300, marginTop: 20}}
                        placeholder="email"
                    />
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}>
                        <Input.Group compact>
                            <Input.Password
                                style={{width: 230}}
                                placeholder="password"/>
                            <Button
                                aria-label="Increment value"
                                onClick={() => dispatch(login({email: 'mshulhin@gmail.com', password: 'testing123'}))}
                            >Login
                            </Button>
                        </Input.Group>
                    </div>
                </Space>
                <Button
                    type="primary"
                    style={{width: '100%', marginTop: 10}}
                    onClick={() => setRegisterMode(true)}
                >No account? Register
                </Button>
            </Card>
        )
    }

    const RegisterComponent = () => {
        return (
            <Card style={{width: 340, alignSelf: 'center', display: 'flex', justifyContent: 'center'}}>
                <Meta title="Register"/>
                <Space direction="vertical">
                    <Input
                        style={{width: 300, marginTop: 20}}
                        placeholder="email"
                    />
                    <Input
                        style={{width: 300}}
                        placeholder="username"
                    />
                    <Input.Password
                        style={{width: 300}}
                        placeholder="password"/>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}>
                        <Button
                            type="primary"
                            style={{width: '100%', marginTop: 10}}
                            onClick={() => dispatch(register({
                                email: 'mshulhin@gmail.com',
                                password: 'testing123',
                                username: 'nickshulhin'
                            }))}
                        >Register
                        </Button>
                    </div>
                </Space>
            </Card>
        )
    }

    return (
        <Spin spinning={auth.inProgress}>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                {
                    !registerMode ? LoginComponent() : RegisterComponent()
                }
            </div>
        </Spin>
    );
}

export default Login;
