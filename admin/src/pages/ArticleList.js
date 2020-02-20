import React, {useState, useEffect} from 'react'
import '../static/css/ArticleList.css'
import {List, Row, Col, Modal, message, Divider, Icon, Breadcrumb, Select} from 'antd'
import common from '../common/common'
import servicePath from '../config/apiUrl'

const {confirm} = Modal;
const {Option} = Select;

function ArticleList(props) {
    
    const [list, setList]=useState([]);
    const [filterList, setFilterList]=useState([]);

    //得到文章列表
    const getList = ()=>{
        common.getRequest(servicePath.getArticleList, (res) => {
            setList(res.data.list);
            setFilterList(res.data.list)
        })
    };

    //删除文章的方法
    const delArticle = (id)=>{
        confirm({
            title: '确定要删除这篇博客文章吗?',
            content: '如果你点击OK按钮，文章将会永远被删除，无法恢复。',
            onOk() {
                common.getRequest(servicePath.delArticle+id, (res) => {
                    message.success('文章删除成功');
                    getList()
                })
            },
            onCancel() {
                message.success('没有任何改变')
            },
        });
    };
    
    
    // 文章类别信息
    const [typeInfo ,setTypeInfo] = useState([]);
    
    //从中台得到文章类别信息
    const getTypeInfo =()=>{
        common.getRequest(servicePath.getTypeInfo, (res) => {
            setTypeInfo(res.data.data)
        })
    };
    
    //修改文章
    const updateArticle = (id, checked)=>{
        
        props.history.push('/index/add/'+id)
        
    };
    
    useEffect(()=>{
        getList();
        getTypeInfo();
    },[]);
    
    const selectTypeHandler = (value) => {
        if (value === "all") {
            setFilterList(list)
        } else {
            let lis = list.filter(item => item.typeName === value);
    
            setFilterList(lis)
        }
    };
    
    return (
        <div>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>后台管理</Breadcrumb.Item>
                <Breadcrumb.Item>文章管理</Breadcrumb.Item>
            </Breadcrumb>
            <div>
                <div>
                    <Select size="large"
                            defaultValue="all"
                            style={{width: 240, margin: '20px 0'}}
                            onChange={selectTypeHandler}
                    >
                        <Option key="all" value="all">全部文章</Option>
                        {
                            typeInfo.map((item, index)=>{
                                return (<Option key={index} value={item.typeName}>{item.typeName}</Option>)
                            })
                        }
                    </Select>
                </div>
                <List
                    header={
                        <Row className="list-div">
                            <Col span={8}>
                                <b>标题</b>
                            </Col>
                            <Col span={4}>
                                <b>类别</b>
                            </Col>
                            <Col span={4}>
                                <b>发布时间</b>
                            </Col>
                            <Col span={8}>
                                <b>操作</b>
                            </Col>
                        </Row>
            
                    }
                    bordered
                    dataSource={filterList}
                    renderItem={item => (
                        <List.Item>
                            <Row className="list-div">
                                <Col span={8}>
                                    {item.title}
                                </Col>
                                <Col span={4}>
                                    {item.typeName}
                                </Col>
                                <Col span={4}>
                                    {item.addTime}
                                </Col>
                                <Col span={8}>
                                    <a onClick={()=>{updateArticle(item.id)}}><Icon type="edit" /> 修改</a>
                                    <Divider type="vertical" />
                                    <a onClick={()=>{delArticle(item.id)}} className="a-delete"><Icon type="delete" /> 删除</a>
                                </Col>
                            </Row>
            
                        </List.Item>
                    )}
                />
            </div>
        
        </div>
    )
}

export default ArticleList