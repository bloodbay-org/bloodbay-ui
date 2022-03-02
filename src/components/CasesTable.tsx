import React from 'react';
import {Alert, Spin, Table} from 'antd';
import {CaseType} from "../reducers/caseReducer";

export interface CasesTableProps {
    cases: CaseType[],
    error: string,
    inProgress: boolean,
}

export function CasesTable(props: CasesTableProps) {

    const columns = [
        {
            title: 'Case',
            dataIndex: 'title',
            key: 'title',
            render: (text: string, record: CaseType) => <a href={`/case/${record._id}`}>{text}</a>,
        }
    ]

    return (
        <div>
            {
                props.error && <Alert closable message={props.error} type="error"/>
            }
            <Spin spinning={props.inProgress}>
                <Table columns={columns} dataSource={props.cases}/>
            </Spin>
        </div>
    );
}
