import {Spin, Card, Descriptions} from 'antd';
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
            <Spin spinning={cases.inProgress}>
                <Card>
                    <Descriptions column={1} title="Case info">
                        <Descriptions.Item label="Title">{cases.viewingCase.title}</Descriptions.Item>
                        <Descriptions.Item label="Description">{cases.viewingCase.description}</Descriptions.Item>
                    </Descriptions>
                </Card>
            </Spin>
        </div>
    );
}
