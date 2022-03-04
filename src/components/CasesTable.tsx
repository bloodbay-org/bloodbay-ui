import React from 'react';
import {Alert, Spin, Table, Tag} from 'antd';
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
        },
        {
            title: 'Tags',
            dataIndex: 'tags',
            key: 'tags',
            render: (tags: string[]) => tags.map((tag, index) => <Tag key={index}>{tag}</Tag>),
        },
        {
            title: 'Reported by',
            dataIndex: 'reportedByName',
            key: 'reportedByName',
            render: (text: string) => <span>{text}</span>,
        },
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
