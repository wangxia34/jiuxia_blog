import {Avatar, Divider} from 'antd'
import '../static/style/components/author.css'
import servicePath from "../../admin/src/config/apiUrl";

const Author =()=>{
    
    return (
        <div className="author-div comm-box">
            <div> <Avatar size={100} src={servicePath.userImg} /></div>
            <div className="author-introduction">
                这只是个假的简介。。。
                <Divider>社交账号</Divider>
                <Avatar size={28} icon="github" className="account"  />
                <Avatar size={28} icon="qq"  className="account" />
                <Avatar size={28} icon="wechat"  className="account"  />
            </div>
        </div>
    )
};

export default Author