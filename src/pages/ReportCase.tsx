import {Form, Button, Input, Spin} from 'antd';
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store";
import {createCase} from "../reducers/caseReducer";
import Cookies from "js-cookie";

const {TextArea} = Input;

export function ReportCase() {
    const cases = useSelector((state: RootState) => state.caseReducer)
    const dispatch = useDispatch()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const onFinish = () => {
        dispatch(createCase({title, description, token: `${Cookies.get('token')}`}))
    }

    return (
        <div>
            <Spin spinning={cases.inProgress}>
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
                    <Form.Item wrapperCol={{span: 14, offset: 6}}>
                        <Button htmlType="submit" type="primary">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Spin>
        </div>
    );
}
