import React, {useState, useEffect} from 'react'
import {Breadcrumb, Table, Divider, Icon, Modal, message, Form, Input} from 'antd'
import common from '../common/common'
import servicePath from "../config/apiUrl";

const {confirm} = Modal;


function TypeList(props) {
    
    // 文章类型列表
    const [typeList, setTypeList] = useState([]);
    // 文章修改面板是否显示
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    
    const { form } = props;
    const { getFieldDecorator } = form;
    
    const getTypeList = () => {
        common.getRequest(servicePath.getTypeInfo, (res) => {
            let data = res.data.data.map(value => {
                value.key = value.id;
                return value
            });
            setTypeList(data)
        })
    };
    
    //删除文章类型的方法
    const delType = (id)=>{
        confirm({
            title: '确定要删除该文章分类吗?',
            content: '如果你点击OK按钮，该类型将会永远被删除，无法恢复。',
            onOk() {
                common.getRequest(servicePath.delType+id, (res) => {
                    message.success('文章类型删除成功');
                    getTypeList()
                })
            },
            onCancel() {
                message.success('没有任何改变')
            },
        });
    };
    
    const addTypeOk = () => {
    
        addTypeCancel()
    };
    
    const addTypeCancel = () => {
        setVisible(false)
    };
    
    const editType = (item) => {
        setVisible(true)
    };
    
    const addTypeSubmit = () => {
    
    };
    
    useEffect(()=> {
        getTypeList()
    }, []);
    
    return (
        <div>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>后台管理</Breadcrumb.Item>
                <Breadcrumb.Item>文章类型管理</Breadcrumb.Item>
            </Breadcrumb>
            <div>
                <Table dataSource={typeList} columns={[
                    {
                        title: '编号',
                        dataIndex: 'id',
                        key: 'id',
                    },
                    {
                        title: '排序',
                        dataIndex: 'orderNum',
                        key: 'orderNum',
                    },
                    {
                        title: '文章类型名称',
                        dataIndex: 'typeName',
                        key: 'typeName',
                    },
                    {
                        title: '图标',
                        dataIndex: 'icon',
                        key: 'icon',
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        render: (text, record) => (
                            <span>
                                <a onClick={() => {editType(record)}}><Icon type="edit" /> 编辑</a>
                                <Divider type="vertical" />
                                <a onClick={() => {delType(record.id)}} className="a-delete"><Icon type="delete" /> 删除</a>
                            </span>
                        ),
                    },
                ]} />
                <Modal
                    title="编辑文章类型"
                    visible={visible}
                    onOk={addTypeOk}
                    confirmLoading={confirmLoading}
                    onCancel={addTypeCancel}
                >
                    <Form onSubmit={addTypeSubmit}>
                        <Form.Item label="orderNum">
                            {getFieldDecorator('email', {
                                rules: [
                                    {
                                        type: 'email',
                                        message: 'The input is not valid E-mail!',
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your E-mail!',
                                    },
                                ],
                            })(<Input />)}
                        </Form.Item>
                    </Form>
                    
                </Modal>
            </div>
        </div>
    )
}

const WrappedTypeList = Form.create({ name: 'register' })(TypeList);


export default WrappedTypeList;
