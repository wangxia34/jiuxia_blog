import React,{useState,useEffect} from 'react'
import Head from 'next/head'
import axios from 'axios'
import Link from 'next/link'
import {Row, Col, List , Icon, Breadcrumb} from 'antd'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Author from '../components/Author'
import Advert from '../components/Advert'
import servicePath  from '../config/apiUrl'
import '../static/style/pages/index.css'


const ArticleList = (list) => {
    console.log(list);
    const [ mylist , setMylist ] = useState(list.data);
    useEffect(()=>{
        setMylist(list.data)
    });
    return(
        <>
            <Head>
                <title>List</title>
            </Head>
            <Header/>
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
                    <div>
                        <div className="bread-div">
                            <Breadcrumb>
                                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                                <Breadcrumb.Item>列表</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <List
                            header={<div>最新日志</div>}
                            itemLayout="vertical"
                            dataSource={mylist}
                            renderItem={item => (
                                <List.Item>
                                    <div className="list-title">
                                        <Link href={{pathname:'/detailed', query:{id:item.id}}}>
                                            <a>{item.title}</a>
                                        </Link>
                                    </div>
                                    <div className="list-icon">
                                        <span><Icon type="calendar" /> {item.addTime}</span>
                                        <span><Icon type="folder" /> {item.typeName}</span>
                                        <span><Icon type="fire" /> {item.view_count}人</span>
                                    </div>
                                    <div className="list-context">{item.introduce}</div>
                                </List.Item>
                            )}
                        />
                    </div>
                </Col>
                <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
                    <div className="comm-box">
                        <Author/>
                        <Advert/>
                    </div>
                </Col>
            </Row>
            <Footer/>
        </>
    )
};

ArticleList.getInitialProps = async (context)=>{
    
    let id =context.query.id;
    const promise = new Promise((resolve)=>{
        axios.get(servicePath.getListById,{
            params:{id: id},
        }).then(
            (res)=>resolve(res.data)
        )
    });
    return await promise
};

export default ArticleList
