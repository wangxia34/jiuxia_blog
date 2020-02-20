import React,{useState,useEffect} from 'react'
import Router from 'next/router'
import Link from 'next/link'
import '../static/style/components/Header.css'

import {Row, Col, Menu, Icon} from 'antd'
const Header = () => {
    
    //跳转到列表页
    const handleClick = (e)=>{
        // console.log(e)
        switch (e.key) {
            case "home":
                Router.push('/index');
                break;
            case "book":
                Router.push('/list?id=home');
                break;
        }
    };
    
    return (
        <div className="header">
            <Row type="flex" justify="center">
                <Col xs={24} sm={24} md={10} lg={15} xl={12}>
                    <span className="header-logo">
                        <Link href={{pathname:'/index'}}>
                            <a>jiuxia</a>
                        </Link>
                    </span>
                    <span className="header-txt">前端开发。</span>
                </Col>
                
                <Col className="memu-div" xs={0} sm={0} md={14} lg={8} xl={6}>
                    <Menu
                        mode="horizontal"
                        onClick={handleClick}
                    >
                        <Menu.Item key="home">
                            <Icon type="home" />
                            首页
                        </Menu.Item>
                        <Menu.Item key="book">
                            <Icon type="book" />
                            学习笔记
                        </Menu.Item>
                    </Menu>
                </Col>
            </Row>
        </div>
    )
};

export default Header