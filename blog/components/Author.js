import {Avatar, Divider} from 'antd'
import '../static/style/components/author.css'

const Author =()=>{
    
    return (
        <div className="author-div comm-box">
            <div> <Avatar size={100} src="http://b-ssl.duitang.com/uploads/item/201806/16/20180616134529_ktsdi.thumb.1000_0.jpeg"  /></div>
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