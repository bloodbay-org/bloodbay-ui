import {setLoginState, info} from '../reducers/loginReducer'
import {useDispatch} from 'react-redux'
import Cookies from "js-cookie";
import {useEffect} from "react";

export function AppSetup() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setLoginState(!!Cookies.get('token')))
        if (Cookies.get('token')) {
            dispatch(info({token: `${Cookies.get('token')}`}))
        }
    }, [])

    return (<></>)
}
