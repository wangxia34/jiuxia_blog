import React, {useState, useEffect} from 'react'
import {Breadcrumb, Table, Divider, Icon, Modal, message, Form, Input, Button} from 'antd'
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
    
    const addTypeOk = (e) => {
        e.preventDefault();
        props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                if (!values.id) {
                    common.postRequest(servicePath.addType, values, (res)=>{
                        if(res.data.isScuccess){
                            message.success('文章类型保存成功');
                            getTypeList();
                            addTypeCancel()
                        }else{
                            message.error('文章类型保存失败');
                        }
                    });
                } else {
                    common.postRequest(servicePath.updateType, values, (res)=>{
                        if(res.data.isScuccess){
                            message.success('文章类型保存成功');
                            getTypeList();
                            addTypeCancel()
                        }else{
                            message.error('文章类型保存失败');
                        }
                    })
                }
                
                
            }
        });
        
        
    };
    
    const addTypeCancel = () => {
        props.form.resetFields();
        setVisible(false)
    };
    
    const editType = (item) => {
        // console.log(item);
        props.form.setFieldsValue({
            icon: item.icon,
            id: item.id,
            orderNum: item.orderNum,
            typeName: item.typeName
        });
        setVisible(true)
    };
    
    const addType = () => {
        setVisible(true)
    };
    
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 6 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 18 },
        },
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
                <div>
                    <Button onClick={addType}>添加文章类型</Button>
                </div>
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
                    <Form style={{"marginRight": "10%"}} {...formItemLayout}>
                        <Form.Item label="排序">
                            {getFieldDecorator('orderNum', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请确认文章类型排序！',
                                    },{
                                        message:'只能输入数字！',
                                        pattern: /^[0-9]+$/
                                    }
                                ],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="文章类型">
                            {getFieldDecorator('typeName', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入文章类型！',
                                    }, {
                                        pattern: /^[-_.a-zA-Z0-9\u4e00-\u9fa5]+$/,
                                        message: '包含特殊字符！',
                                    }, {
                                        max: 20,
                                        message: '不能大于20个字符！',
                                    }
                                ],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="图标">
                            {getFieldDecorator('icon', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入图标名称！',
                                    }, {
                                        pattern: /^[-_a-zA-Z0-9]+$/,
                                        message: '包含特殊字符！',
                                    }, {
                                        max: 20,
                                        message: '不能大于20个字符！',
                                    }
                                ],
                            })(<Input />)}
                        </Form.Item>
                        {getFieldDecorator('id')(<Input type="hidden" />)}
                    </Form>
                </Modal>
            </div>
        </div>
    )
}

const WrappedTypeList = Form.create({ name: 'register' })(TypeList);


export default WrappedTypeList;
