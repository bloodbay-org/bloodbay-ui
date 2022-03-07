import {setLoginState, info} from '../reducers/loginReducer'
import {useDispatch, useSelector} from 'react-redux'
import Cookies from "js-cookie";
import {useEffect} from "react";
import {Alert} from "antd";
import {RootState} from "../store/store";

export function AppSetup() {
    const dispatch = useDispatch()
    const auth = useSelector((state: RootState) => state.loginReducer)
    const cases = useSelector((state: RootState) => state.caseReducer)
    const files = useSelector((state: RootState) => state.fileReducer)

    useEffect(() => {
        dispatch(setLoginState(!!Cookies.get('token')))
        if (Cookies.get('token')) {
            dispatch(info({token: `${Cookies.get('token')}`}))
        }
    }, [])

    return (<>
        {
            <>
                {
                    auth.error &&  <Alert closable message={auth.error} type="error" />
                }
                {
                    cases.error &&  <Alert closable message={cases.error} type="error" />
                }
                {
                    files.error &&  <Alert closable message={cases.error} type="error" />
                }
            </>
        }
    </>)
}
