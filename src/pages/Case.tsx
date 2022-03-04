import {Spin, Card, Descriptions, Alert, Tag} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store";
import {useEffect} from "react";
import {getCaseById} from "../reducers/caseReducer";
import {useNavigate, useParams} from "react-router-dom";


export function Case() {
    const cases = useSelector((state: RootState) => state.caseReducer)
    const dispatch = useDispatch()
    let { caseId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!caseId) {
            navigate("/");
        }
        dispatch(getCaseById({caseId: `${caseId}`}))
    }, [])

    return (
        <div>
            {
                cases.error &&  <Alert closable message={cases.error} type="error" />
            }
            <Spin spinning={cases.inProgress}>
                <Card>
                    <Descriptions column={1} title="Case info">
                        <Descriptions.Item label="Title">{cases.viewingCase.title}</Descriptions.Item>
                        <Descriptions.Item label="Description">{cases.viewingCase.description}</Descriptions.Item>
                        <Descriptions.Item label="Reported by">
                            <Tag color="#87d068">{cases.viewingCase.reportedByName}</Tag>
                            </Descriptions.Item>
                        <Descriptions.Item label="Tags">{cases.viewingCase.tags ? cases.viewingCase.tags.map((tag, index) => <Tag key={index}>{tag}</Tag>) : <div/>}</Descriptions.Item>
                    </Descriptions>
                </Card>
            </Spin>
        </div>
    );
}
