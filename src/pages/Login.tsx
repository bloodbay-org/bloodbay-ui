import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {info, login, register} from '../reducers/loginReducer'
import {Card, Input, Space, Button, Spin, Tooltip, Alert} from 'antd';
import {
    useNavigate
} from "react-router-dom";
import {RootState} from "../store/store";
import Cookies from "js-cookie";
import {generatePassword} from "../utils/passwordUtils";
import {CopyOutlined} from '@ant-design/icons';

const {Meta} = Card;

function Login() {
    const auth = useSelector((state: RootState) => state.loginReducer)
    const dispatch = useDispatch()

    const [registerMode, setRegisterMode] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordSuggestion, setPasswordSuggestion] = useState('')
    const [username, setUsername] = useState('')

    let navigate = useNavigate();

    useEffect(() => {
        if (auth.isLoggedIn) {
            dispatch(info({token: `${Cookies.get('token')}`}))
            navigate("/");
        }
    }, [auth])

    const eraseFields = () => {
        setEmail('')
        setPassword('')
        setUsername('')
    }

    const LoginComponent = () => {
        return (
            <Card
                style={{width: 340, alignSelf: 'center', display: 'flex', justifyContent: 'center'}}
            >
                <Meta title="Login"/>
                <Space direction="vertical">
                    <Input
                        type="email"
                        onChange={(event) => setEmail(event.target.value)}
                        style={{width: 300, marginTop: 20}}
                        placeholder="email"
                    />
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}>
                        <Input.Group compact>
                            <Input.Password
                                onChange={(event) => setPassword(event.target.value)}
                                style={{width: 230}}
                                placeholder="password"/>
                            <Button
                                aria-label="Increment value"
                                onClick={() => dispatch(login({email, password}))}
                            >Login
                            </Button>
                        </Input.Group>
                    </div>
                </Space>
                <Button
                    type="primary"
                    style={{width: '100%', marginTop: 10}}
                    onClick={() => {
                        eraseFields()
                        setRegisterMode(true)
                    }}
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
                        type="email"
                        onChange={(event) => setEmail(event.target.value)}
                        style={{width: 300, marginTop: 20}}
                        placeholder="email"
                    />
                    <Input
                        onChange={(event) => setUsername(event.target.value)}
                        style={{width: 300}}
                        placeholder="username"
                    />
                    <Input.Password
                        onChange={(event) => setPassword(event.target.value)}
                        style={{width: 300}}
                        placeholder="password"/>
                    {
                        passwordSuggestion && <Input.Group compact>
                            <Input
                                value={passwordSuggestion}
                                style={{width: 265}}
                                placeholder="suggested password"/>
                            <Tooltip title="Copy to clickboard">
                                <Button icon={<CopyOutlined/>}
                                        onClick={() => navigator.clipboard.writeText(passwordSuggestion)}/>
                            </Tooltip>
                        </Input.Group>
                    }
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'end'}}>
                        <Button
                            type="primary"
                            style={{width: '100%', marginTop: 10}}
                            onClick={() => setPasswordSuggestion(generatePassword())}
                        >Generate password
                        </Button>
                        <Button
                            type="primary"
                            style={{width: '100%', marginTop: 10}}
                            onClick={() => dispatch(register({
                                email,
                                password,
                                username
                            }))}
                        >Register
                        </Button>
                        <Button
                            style={{width: '100%', marginTop: 10}}
                            onClick={() => {
                                eraseFields()
                                setRegisterMode(false)
                            }}
                        >Back to login
                        </Button>
                    </div>
                    <Alert
                        message="Please do not use any of your existing passwords. Strongly recommended to use password generator above to avoid any consequences of potential data breach."
                        type="warning"/>
                </Space>
            </Card>
        )
    }

    return (
        <div style={{height: '100vh'}}>
            <Spin spinning={auth.inProgress}>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                    {
                        !registerMode ? LoginComponent() : RegisterComponent()
                    }
                </div>
            </Spin>
        </div>
    );
}

export default Login;
