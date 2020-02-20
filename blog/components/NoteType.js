import React,{useState,useEffect} from 'react'
import Router from 'next/router'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import {Menu, Icon} from 'antd'

function NoteType(props) {
    const [navArray , setNavArray] = useState([]);
    
    useEffect(()=>{
        
        console.log("useEffect");
        const fetchData = async ()=>{
            const result= await axios(servicePath.getTypeInfo).then(
                (res)=>{
                    setNavArray(res.data.data);
                    return res.data.data
                }
            );
            setNavArray(result)
        };
        fetchData()
    },[]);
    
    //跳转到列表页
    const handleClick = (e) => {
        
        console.log(e)
        if (e.key === "home") {
            Router.push('/list?id=home');
        }
        else{
            Router.push('/list?id='+e.key);
        }
    };
    
    return (
        <>
            <Menu
                mode="inline"
                defaultSelectedKeys={props.defaultSelectedKeys}
                onClick={handleClick}
            >
                <Menu.Item key="home">
                    <Icon type="home" />
                    展示全部
                </Menu.Item>
                {
                    navArray.map((item)=>{
                        return(
                            <Menu.Item key={item.id}>
                                <Icon type={item.icon} />
                                {item.typeName}
                            </Menu.Item>
                        )
                    })
                }
            </Menu>
        </>
    )
}


export default NoteType