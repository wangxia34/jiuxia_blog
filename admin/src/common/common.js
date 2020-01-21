import axios from 'axios'
import { createHashHistory  } from 'history';
// import {message} from "antd/lib/index";
// import servicePath from "../config/apiUrl"; // hash路由

const history = createHashHistory({
    queryKey: false
});

const common =  {
    getRequest: (url, callback)=>{
        axios({
            method:'get',
            url: url,
            withCredentials: true,
            header:{ 'Access-Control-Allow-Origin':'*' }
        }).then(
            res => {
                if (res.data.status === -1 && res.data.msg === "没有登录") {
                    localStorage.removeItem('openId');
                    history.push('/login');
                } else {
                    callback(res)
                }
            }
        ).catch(
            (err) => {
                // history.push('/login');
                console.error(err)
            }
        )
    },
    postRequest: (url, data, callback) => {
        axios({
            method:'post',
            url:url,
            header:{ 'Access-Control-Allow-Origin':'*' },
            data:data,
            withCredentials: true
        }).then(
            res=>{
                if (res.status === -1 && res.msg === "没有登录") {
                    localStorage.removeItem('openId');
                    history.push('/login');
                } else {
                    callback(res)
                }
            }
        ).catch(
            (err) => {
                // history.push('/login');
                console.error(err)
            }
        )
    }
};



export default common;