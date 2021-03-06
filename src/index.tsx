import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    useLocation
} from "react-router-dom";
import {store} from './store/store'
import {Provider} from 'react-redux'
import {Layout} from 'antd';


import './index.css';
import App from './pages/App';
import reportWebVitals from './reportWebVitals';
import Login from "./pages/Login";
import 'antd/dist/antd.css';
import {AppHeader} from "./components/AppHeader";
import {AppSetup} from "./components/AppSetup";
import Cookies from "js-cookie";
import {Account} from "./pages/Account";
import {ReportCase} from "./pages/ReportCase";
import {Case} from "./pages/Case";
import {LeftMenu} from "./components/LeftMenu";
import Sider from "antd/es/layout/Sider";
import Title from "antd/es/typography/Title";
import {About} from "./pages/About";
import {Verify} from "./pages/Verify";

const {Content, Footer} = Layout;

ReactDOM.render(
    <Layout>
        <Provider store={store}>
            <BrowserRouter>
                <Sider
                    theme="dark"
                    breakpoint="lg"
                    collapsedWidth="0"
                    style={{
                        left: 0,
                        top: 0,
                        bottom: 0,
                    }}
                >
                    <div style={{width: 32, height: 64, display: 'flex', padding: 5}}>
                        <Title level={3} style={{color: 'white', paddingTop: 10}}>BloodBay.org</Title>
                        <img style={{width: 50, height: 50}} src='/syringe_white.png'/>
                    </div>
                    <LeftMenu/>
                </Sider>
                <Layout>
                    <AppHeader/>
                    <AppSetup/>
                    <Content style={{padding: '50px 50px', height: 800, overflowY: 'auto'}}>
                        <Routes>
                            <Route path="/" element={<App/>}/>
                            <Route path="/verify/:verificationToken" element={<Verify/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/about" element={<About/>}/>
                            <Route path="/case/:caseId" element={<Case/>}/>
                            <Route
                                path="/account"
                                element={
                                    <RequireAuth>
                                        <Account/>
                                    </RequireAuth>
                                }
                            />
                            <Route
                                path="/report_case"
                                element={
                                    <RequireAuth>
                                        <ReportCase/>
                                    </RequireAuth>
                                }
                            />
                            <Route path="*" element={<App/>}/>
                        </Routes>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>Nick Shulhin</Footer>
                </Layout>
            </BrowserRouter>
        </Provider>
    </Layout>,
    document.getElementById('root')
);

function RequireAuth({children}: { children: JSX.Element }) {
    let location = useLocation();

    if (!Cookies.get('token')) {
        return <Navigate to="/login" state={{from: location}} replace/>;
    }

    return children;
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
