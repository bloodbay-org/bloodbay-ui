import React from 'react';
import {Menu} from "antd";
import {HomeOutlined, PaperClipOutlined} from '@ant-design/icons';
import {useNavigate} from "react-router-dom";

export const LeftMenu = () => {
    const navigate = useNavigate();

    return (
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" onClick={() => navigate("/")} icon={<HomeOutlined/>}>
                Home
            </Menu.Item>
            <Menu.Item key="2" onClick={() => navigate("/report_case")} icon={<PaperClipOutlined />}>
                Report case
            </Menu.Item>
        </Menu>
    )
}