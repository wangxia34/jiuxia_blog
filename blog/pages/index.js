import React from 'react'
import Head from 'next/head'
import {Avatar, Button, Spin} from 'antd'
import '../static/style/pages/index.css'
import Header from '../components/Header'
import servicePath from "../../admin/src/config/apiUrl";
import Router from "next/router";

const Home = () => {
    //跳转到列表页
    const handleClick = (e) => {
        // setLoading(true);
        Router.push('/list?id=home');
    };
    
    // const [loading, setLoading] = useState(false);
    
    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            {/*<Spin tip="Loading..." spinning={loading}>*/}
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
            {/*</Spin>*/}
        </>
    )
};

export default Home
