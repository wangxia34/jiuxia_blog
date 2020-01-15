import React,{useState} from 'react';
import { Layout, Menu, Icon, Popover } from 'antd';
import {Route} from 'react-router-dom'
import { Avatar } from 'antd';
import AddArticle from './AddArticle'
import ArticleList from './ArticleList'
import TypeList from './TypeList'
import servicePath from '../config/apiUrl'
import '../static/css/AdminIndex.css'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


function AdminIndex(props){
    
    const [collapsed,setCollapsed] = useState(false);
    
    const onCollapse = collapsed => {
        setCollapsed(collapsed)
    };
    
    const handleClickArticle = (e) => {
        if (e.key === 'addArticle') {
            props.history.push('/index/add')
        } else if (e.key === 'articleList') {
            props.history.push('/index/list')
        } else if (e.key === 'typeList') {
            props.history.push('/index/type')
        }
    };
    
    
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div className="logo">
                    <Avatar size="large" src={servicePath.userImg} />
                    <div className={collapsed ? 'userName hidden': 'userName show'}><span>jiuxia</span></div>
                </div>
                <Menu
                    theme="dark"
                    defaultSelectedKeys={['articleList']}
                    defaultOpenKeys={['sub1']}
                    mode="inline">
                    <SubMenu
                        key="sub1"
                        onClick={handleClickArticle}
                        title={
                            <span>
                                <Icon type="desktop" />
                                <span>文章管理</span>
                            </span>
                        }
                    >
                        <Menu.Item key="articleList">文章列表</Menu.Item>
                        <Menu.Item key="addArticle">添加文章</Menu.Item>
                        <Menu.Item key="typeList">文章类型</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="9">
                        <Icon type="file" />
                        <span>留言管理</span>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ background: 'rgb(228, 234, 243)', padding: 0 }}>
                    
                    <div className="user-setup">
                        <Popover placement="bottomRight" content={
                            <div>
                                <p>修改信息</p>
                                <p>退出登录</p>
                            </div>
                        } trigger="click">
                            <span><Avatar src={servicePath.userImg} /> jiuxia</span>
                        </Popover>
                    </div>
                </Header>
                <Content style={{ margin: '0 16px' }}>
                    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                        <Route path="/index/" exact component={ArticleList}/>
                        <Route path="/index/add/" exact component={AddArticle} />
                        <Route path="/index/add/:id" exact component={AddArticle} />
                        <Route path="/index/list/" component={ArticleList} />
                        <Route path="/index/type/" component={TypeList} />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>九夏的学习笔记</Footer>
            </Layout>
        </Layout>
    )
    
}

export default AdminIndex