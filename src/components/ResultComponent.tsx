import {Result} from "antd";

interface ResultComponentParams {
    status: 'success' | 'error' | 'info' | 'warning' | 404 | 403 | 500;
    title?: string;
    subTitle?: string;
    actions?: any[];
}

export const ResultComponent = (params: ResultComponentParams) => {
    return (
        <Result
            status={params.status}
            title={params.title}
            subTitle={params.subTitle}
            extra={params.actions}
        />
    )
}