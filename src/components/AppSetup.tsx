import {setLoginState, info} from '../reducers/loginReducer'
import {useDispatch, useSelector} from 'react-redux'
import Cookies from "js-cookie";
import {useEffect} from "react";
import {Alert} from "antd";
import {RootState} from "../store/store";

export function AppSetup() {
    const dispatch = useDispatch()
    const auth = useSelector((state: RootState) => state.loginReducer)

    useEffect(() => {
        dispatch(setLoginState(!!Cookies.get('token')))
        if (Cookies.get('token')) {
            dispatch(info({token: `${Cookies.get('token')}`}))
        }
    }, [])

    return (<>
        {
            auth.error &&  <Alert closable message={auth.error} type="error" />
        }
    </>)
}
