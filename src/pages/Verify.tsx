import React, {useEffect, useState} from "react";
import {Button, Card, Spin} from "antd";
import {useNavigate, useParams} from "react-router-dom";
import {getCaseById} from "../reducers/caseReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store";
import {logOut, verifyEmail} from "../reducers/loginReducer";
import {ResultComponent} from "../components/ResultComponent";


export function Verify() {
    let {verificationToken} = useParams();
    const auth = useSelector((state: RootState) => state.loginReducer)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [emailVerified, setEmailVerified] = useState(false)


    useEffect(() => {
        if (auth.emailVerified) {
            setEmailVerified(true)
        }
    }, [auth])

    useEffect(() => {
        if (!verificationToken) {
            navigate("/");
        }
        dispatch(verifyEmail({verificationToken: `${verificationToken}`}))
    }, [])

    const SuccessfulVerificationActions = () => {
        return (
            <Button type="primary" key="goToLogin" onClick={() => {
                navigate(`/login`)
            }}>
                Click to login!
            </Button>
        )
    }

    return (
        <div>
            <Spin spinning={auth.inProgress}>
                {
                    emailVerified ?
                        <Card>

                            <ResultComponent
                                title={"Your email has been verified!"}
                                subTitle={"Now you can login and use the platform!"}
                                actions={[SuccessfulVerificationActions()]}
                                status={'success'}/>
                        </Card>
                        : <></>
                }
            </Spin>
        </div>
    );
}
