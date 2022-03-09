import React from 'react';
import {Spin, Table, Tag} from 'antd';
import {CaseType} from "../reducers/caseReducer";
import {countryMap, getCountryByCode} from "../utils/localityUtils";

export interface CasesTableProps {
    cases: CaseType[],
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
            render: (tags: string[]) => tags ? tags.map((tag, index) => <Tag key={index}>{tag}</Tag>) : <div/>,
        },
        {
            title: 'Country',
            dataIndex: 'country',
            key: 'country',
            render: (countryCode: string) => <span>{getCountryByCode(countryCode)}</span>,
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
            <Spin spinning={props.inProgress}>
                <Table columns={columns} dataSource={props.cases}/>
            </Spin>
        </div>
    );
}
