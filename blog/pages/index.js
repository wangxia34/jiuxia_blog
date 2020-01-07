import React,{useState} from 'react'
import Head from 'next/head'
import {Row, Col, List ,Icon} from 'antd'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Author from '../components/Author'
import Advert from '../components/Advert'


const Home = () => {
    const [mylist , setMylist] = useState(
        [
            {title:'跨站脚本攻击',context:'跨站脚本攻击（XSS）是最普通的web应用安全漏洞，当应用程序在发送给浏览器的页面中包含用户提供的数据，没有经过严格验证或转义，那么攻击者就有可能利用网站程序对用户输入过滤不严格，输入可以显示在页面上对其他用户造成影响的HTML代码，从而盗取用户资料、利用用户身份进行某种动作或者对访问者进行病毒侵害的一种攻击方式。'},
            {title:'注入',context:'简单来说，注入往往是应用程序缺少对输入进行安全性检查所引起的，攻击者把一些包含指令的数据发送给解释器，解释器会把收到的数据转换成指令执行，注入漏洞十分普通，通常能在SQL查询、程序参数等中出现。'},
            {title:'失效的认证和会话管理',context:'用户身份认证和会话管理是一个应用程序中最关键的过程，有缺陷的设计会严重破坏这个过程。在开发Web应用程序时，开发人员往往只关注Web应用程序所需的功能。由于这个原因，开发人员通常会建立自定义的认证和会话管理方案。但要正确实现这些方案却很难，结果这些自定义的方案往往在如下方面存在漏洞：退出、密码管理、超时、记住我、秘密问题、帐户更新等等。因为每一个实现都不同，要找出这些漏洞有时会很困难。'},
            {title:'XML外部实体注入',context:'XML外部实体注入（XXE）发生在应用程序解析XML输入时，没有禁止外部实体的加载。在默认情况下，许多较旧的XML处理器允许指定外部实体，即在XML处理期间取消引用和评估的URL。'},
        ]
    );
    
    return(
      <>
          <Head>
              <title>Home</title>
          </Head>
          <Header/>
          <Row className="comm-main" type="flex" justify="center">
              <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
                  <div>
                      <List
                          header={<div>最新日志</div>}
                          itemLayout="vertical"
                          dataSource={mylist}
                          renderItem={item => (
                              <List.Item>
                                  <div className="list-title">{item.title}</div>
                                  <div className="list-icon">
                                      <span><Icon type="calendar" /> 2019-06-28</span>
                                      <span><Icon type="folder" /> 视频教程</span>
                                      <span><Icon type="fire" /> 5498人</span>
                                  </div>
                                  <div className="list-context">{item.context}</div>
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
}

export default Home
