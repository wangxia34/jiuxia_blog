import React, {useState, useEffect} from 'react'
import '../static/css/ArticleList.css'
import {List, Row, Col, Modal, message, Divider, Icon, Breadcrumb} from 'antd'
import common from '../common/common'
import servicePath from '../config/apiUrl'

const {confirm} = Modal;

function ArticleList(props) {
    
    const [list,setList]=useState([]);

    //得到文章列表
    const getList = ()=>{
        common.getRequest(servicePath.getArticleList, (res) => {
            setList(res.data.list)
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
    
    //修改文章
    const updateArticle = (id, checked)=>{
        
        props.history.push('/index/add/'+id)
        
    };
    
    useEffect(()=>{
        getList()
    },[]);
    
    return (
        <div>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>后台管理</Breadcrumb.Item>
                <Breadcrumb.Item>文章管理</Breadcrumb.Item>
            </Breadcrumb>
            <div>
                <List
                    header={
                        <Row className="list-div">
                            <Col span={8}>
                                <b>标题</b>
                            </Col>
                            <Col span={3}>
                                <b>类别</b>
                            </Col>
                            <Col span={3}>
                                <b>发布时间</b>
                            </Col>
                            <Col span={3}>
                                <b>集数</b>
                            </Col>
                            <Col span={3}>
                                <b>浏览量</b>
                            </Col>
                
                            <Col span={4}>
                                <b>操作</b>
                            </Col>
                        </Row>
            
                    }
                    bordered
                    dataSource={list}
                    renderItem={item => (
                        <List.Item>
                            <Row className="list-div">
                                <Col span={8}>
                                    {item.title}
                                </Col>
                                <Col span={3}>
                                    {item.typeName}
                                </Col>
                                <Col span={3}>
                                    {item.addTime}
                                </Col>
                                <Col span={3}>
                                    共<span>{item.part_count}</span>集
                                </Col>
                                <Col span={3}>
                                    {item.view_count}
                                </Col>
                    
                                <Col span={4}>
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