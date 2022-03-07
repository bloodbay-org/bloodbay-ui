import {Form, Button, Input, Spin, Tag, Upload} from 'antd';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store";
import {createCase, resetCreatedStateCase} from "../reducers/caseReducer";
import {resetCreatedFileState, uploadFile} from "../reducers/fileReducer";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import {ResultComponent} from "../components/ResultComponent";
import {UploadOutlined} from '@ant-design/icons';

const {TextArea} = Input;

export function ReportCase() {
    const cases = useSelector((state: RootState) => state.caseReducer)
    const files = useSelector((state: RootState) => state.fileReducer)
    const dispatch = useDispatch()
    let navigate = useNavigate();

    const [tags, setTags] = useState<string[]>([])
    const [title, setTitle] = useState('')
    const [reportedByName, setReportedByName] = useState('')
    const [description, setDescription] = useState('')
    const [showSuccess, setShowSuccess] = useState(false)
    const [fileList, setFileList] = useState<any>([])

    useEffect(() => {
        dispatch(resetCreatedStateCase())
        dispatch(resetCreatedFileState())
    }, [])

    const processTags = (value: string) => {
        setTags(value.split(',').filter(tag => tag && tag !== ' ').map(tag => tag.trim()))
    }

    const onFinish = () => {
        dispatch(createCase({title, description, tags, reportedByName, token: `${Cookies.get('token')}`}))
    }

    useEffect(() => {
        if (cases.createdCase._id && files.uploadedFiles.length > 0) {
            setShowSuccess(true)
            setFileList([])
        }
    }, [files.uploadedFiles])

    useEffect(() => {
        if (cases.createdCase._id) {
            if (fileList.length > 0) {
                // @ts-ignore
                dispatch(uploadFile({files: fileList, linkedToId: cases.createdCase._id, token: `${Cookies.get('token')}`}))
            } else {
                setShowSuccess(true)
                setFileList([])
            }
        }
    }, [cases.createdCase])

    const ReportCreatedSuccessActions = () => {
        return (
            <Button type="primary" key="goToCase" onClick={() => {
                navigate(`/case/${cases.createdCase._id}`)
                dispatch(resetCreatedStateCase())
            }}>
                View my case
            </Button>
        )
    }

    const props = {
        name: 'file',
        multiple: true,
        accept: '.pdf',
        beforeUpload: (file: File) => {
            setFileList([...fileList.filter((fileFromList: File) => fileFromList.name !== file.name), file])
            return false;
        },
        fileList
    };

    const ReportCaseForm = () => {
        return (
            <Form layout="horizontal" onFinish={onFinish}>
                <Form.Item
                    rules={[{required: true}]}
                    name="title"
                    label="Title"
                    labelCol={{span: 6}}
                    wrapperCol={{span: 16}}
                >
                    <Input
                        onChange={(event) => setTitle(event.target.value)}
                    />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Description"
                    labelCol={{span: 6}}
                    wrapperCol={{span: 16}}
                    rules={[{required: true}]}
                >
                    <TextArea rows={10}
                              onChange={(event) => setDescription(event.target.value)}
                    />
                </Form.Item>
                <Form.Item
                    rules={[{required: true}]}
                    name="reportedByName"
                    label="Reported by (name):"
                    labelCol={{span: 6}}
                    wrapperCol={{span: 16}}
                >
                    <Input
                        onChange={(event) => setReportedByName(event.target.value)}
                    />
                </Form.Item>
                <Form.Item
                    rules={[{required: true}]}
                    name="tags"
                    label="Tags (coma separated)"
                    labelCol={{span: 6}}
                    wrapperCol={{span: 16}}
                >
                    <div>
                        <Input
                            onChange={(event) => {
                                processTags(event.target.value)
                            }}
                        />
                        <div style={{marginTop: 15}}>
                            {
                                tags.map((tag, index) => <Tag key={index}>{tag}</Tag>)
                            }
                        </div>
                    </div>
                </Form.Item>

                <Form.Item wrapperCol={{span: 14, offset: 6}}>
                    <Upload {...props}>
                        <Button icon={<UploadOutlined/>}>Attach evidences (PDF files supported only currently)</Button>
                    </Upload>
                </Form.Item>
                <Form.Item wrapperCol={{span: 14, offset: 6}}>
                    <Button htmlType="submit" type="primary">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        )
    }

    return (
        <div>
            <Spin spinning={cases.inProgress || files.inProgress}>
                {
                    showSuccess ? <ResultComponent
                        title={"Your case has been reported!"}
                        subTitle={"Click the button below to view it."}
                        actions={[ReportCreatedSuccessActions()]}
                        status={'success'}/> : ReportCaseForm()
                }
            </Spin>
        </div>
    );
}
