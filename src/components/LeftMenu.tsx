import React from 'react';
import {Menu} from "antd";
import {HomeOutlined, PaperClipOutlined, GithubOutlined, InfoCircleOutlined} from '@ant-design/icons';
import {useNavigate} from "react-router-dom";

export const LeftMenu = () => {
    const navigate = useNavigate();

    const goToExternalLink = (url: string) => {
        if (typeof window !== 'undefined') {
            window.location.href = url
        }
    }
    return (
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" onClick={() => navigate("/")} icon={<HomeOutlined/>}>
                Home
            </Menu.Item>
            <Menu.Item key="2" onClick={() => navigate("/report_case")} icon={<PaperClipOutlined />}>
                Report case
            </Menu.Item>
            <Menu.Item key="3" onClick={() => navigate("/about")} icon={<InfoCircleOutlined />}>
                About the project
            </Menu.Item>
            <Menu.Item key="4" onClick={() => goToExternalLink('https://github.com/bloodbay-org')} icon={<GithubOutlined />}>
                Source Code
            </Menu.Item>
            <Menu.Item key="5" onClick={() => goToExternalLink('https://github.com/orgs/bloodbay-org/projects/1')} icon={<GithubOutlined />}>
                Project progress
            </Menu.Item>
        </Menu>
    )
}