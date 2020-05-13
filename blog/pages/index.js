import React from 'react'
import Head from 'next/head'
import {Avatar, Button} from 'antd'
import '../static/style/pages/index.css'
import Header from '../components/Header'
import servicePath from "../config/apiUrl";
import Router from "next/router";

const Home = () => {
    
    //跳转到列表页
    const handleClick = (e)=>{
        Router.push('/list?id=home');
    };
    
    const clickChat = () => {
        Router.push('/list?id=home');
    };
    
    
    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <Header/>
            <div className="home-main">
                <div className="home-user">
                    <Avatar size={100} src={servicePath.userImg}/>
                </div>
                <div className="home-nav">
                    <span>
                       <Button shape="round" size="large" onClick={handleClick}>学习笔记</Button>
                    </span>
                    <span>
                       <a href="https://www.jianshu.com/u/855ef9791596" target="_blank"><Button shape="round" size="large">简书连接</Button></a>
                    </span>
                    {/*<span>*/}
                        {/*<Button shape="round" size="large" onClick={clickChat}>临时聊天室</Button>*/}
                    {/*</span>*/}
                </div>
            </div>
        </>
    )
};

export default Home
