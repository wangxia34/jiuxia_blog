import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import axios from 'axios'
import Link from 'next/link'
import {Row, Col, List, Icon, Breadcrumb} from 'antd'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Author from '../components/Author'
import Advert from '../components/Advert'
import NoteType from '../components/NoteType'
import servicePath from '../config/apiUrl'
import '../static/style/pages/list.css'
import marked from "marked";
import hljs from "highlight.js";

const ArticleList = (props) => {
    const mylist = props.list.data;
    const renderer = new marked.Renderer();
    marked.setOptions({
        renderer: renderer,
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
        xhtml: false,
        highlight: function (code) {
            return hljs.highlightAuto(code).value
        }
    });
    
    
    return (
        <>
            <Head>
                <title>List</title>
            </Head>
            <Header/>
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={0} sm={0} md={6} lg={4} xl={3}>
                    <NoteType defaultSelectedKeys={[props.keyNum]}/>
                </Col>
                <Col className="comm-content" xs={24} sm={24} md={13} lg={16} xl={11}>
                    <div>
                        {/*<div className="bread-div">
                            <Breadcrumb>
                                <Breadcrumb.Item><a href="/index">首页</a></Breadcrumb.Item>
                                <Breadcrumb.Item>列表</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>*/}
                        <List
                            header={<Breadcrumb>
                                <Breadcrumb.Item><a href="/list?id=home">学习笔记</a></Breadcrumb.Item>
                                <Breadcrumb.Item>列表</Breadcrumb.Item>
                            </Breadcrumb>}
                            itemLayout="vertical"
                            dataSource={mylist}
                            renderItem={item => (
                                <List.Item>
                                    <div className="list-title">
                                        <Link href={{pathname: '/detailed', query: {id: item.id}}}>
                                            <a>{item.title}</a>
                                        </Link>
                                    </div>
                                    <div className="list-icon">
                                        <span><Icon type="calendar"/> {item.addTime}</span>
                                        <span><Icon type="folder"/> {item.typeName}</span>
                                        <span><Icon type="fire"/> {item.view_count}人</span>
                                    </div>
                                    <div className="list-context"
                                         dangerouslySetInnerHTML={{__html: marked(item.introduce)}}/>
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

ArticleList.getInitialProps = async (context) => {
    let id = context.query.id;
    let promise;
    if (id === "home") {
        promise = new Promise((resolve) => {
            axios(servicePath.getArticleList).then(
                (res) => {
                    resolve({list: res.data, keyNum: id})
                }
            )
        });
    } else {
        promise = new Promise((resolve) => {
            axios.get(servicePath.getListById, {
                params: {id: id},
            }).then(
                (res) => resolve({list: res.data, keyNum: id})
            )
        });
    }
    
    return await promise
};

export default ArticleList
