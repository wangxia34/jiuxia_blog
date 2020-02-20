import React from 'react'
import Head from 'next/head'
import {Avatar, Button} from 'antd'
import '../static/style/pages/index.css'
import Header from '../components/Header'
import servicePath from "../config/apiUrl";
import Router from "next/router";

const Home = () => {
    //跳转到列表页
    const handleClick = (e) => {
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
                    <Button shape="round" size="large" onClick={handleClick}>
                        学习笔记
                    </Button>
                </div>
            </div>
        </>
    )
};

export default Home
