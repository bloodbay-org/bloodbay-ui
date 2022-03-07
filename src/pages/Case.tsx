import {Spin, Card, Descriptions, Tag, Carousel, Button} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store";
import React, {useEffect} from "react";
import {getCaseById} from "../reducers/caseReducer";
import {FileMetadata, getLinkedToCaseFiles} from "../reducers/fileReducer";
import {useNavigate, useParams} from "react-router-dom";
import {Document, Page} from 'react-pdf';
import {pdfjs} from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

export function Case() {
    const cases = useSelector((state: RootState) => state.caseReducer)
    const files = useSelector((state: RootState) => state.fileReducer)
    const dispatch = useDispatch()
    let {caseId} = useParams();
    const navigate = useNavigate();

    const openAttachment = (url: string) => {
        if (typeof window !== 'undefined') {
            window.location.href = url
        }
    }

    useEffect(() => {
        if (!caseId) {
            navigate("/");
        }
        dispatch(getCaseById({caseId: `${caseId}`}))
        dispatch(getLinkedToCaseFiles({caseId: `${caseId}`}))
    }, [])


    return (
        <div>
            <Spin spinning={cases.inProgress || files.inProgress}>
                <Card>
                    <Descriptions column={1} title="Case info">
                        <Descriptions.Item label="Title">{cases.viewingCase.title}</Descriptions.Item>
                        <Descriptions.Item label="Description">{cases.viewingCase.description}</Descriptions.Item>
                        <Descriptions.Item label="Reported by">
                            <Tag color="#87d068">{cases.viewingCase.reportedByName}</Tag>
                        </Descriptions.Item>
                        <Descriptions.Item
                            label="Tags">{cases.viewingCase.tags ? cases.viewingCase.tags.map((tag, index) => <Tag
                            key={index}>{tag}</Tag>) : <div/>}</Descriptions.Item>
                    </Descriptions>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        backgroundColor: 'grey',
                        flexDirection: 'row',
                        overflowX: 'scroll'
                    }}>
                        {
                            files.linkedToCaseFiles.map((fileMetadata: FileMetadata) =>
                                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: 10}}>
                                    <Button type="primary" key="3" onClick={() => openAttachment(fileMetadata.mediaLink)}>View attachment</Button>
                                    <Document file={fileMetadata.mediaLink}>
                                        <Page height={800} pageNumber={1} renderAnnotationLayer={false}/>
                                    </Document>
                                </div>
                            )
                        }
                    </div>
                </Card>
            </Spin>
        </div>
    );
}
