import {Avatar, Divider} from 'antd'
import '../static/style/components/author.css'
import servicePath from "../config/apiUrl";

const Author =()=>{
    
    return (
        <div className="author-div comm-box">
            {/*<div> <Avatar size={100} src={servicePath.userImg} /></div>*/}
            <div className="author-introduction">
                <div className="vertical-text site-title">
                    <h3 className="site-title-small">
                        <a href="/" className="a-title">云对雨，雪对风，晚照对晴空</a>
                    </h3>
                    <h1 className="site-title-large">
                        <a href="/" className="a-title">九夏对三冬</a>
                    </h1>
                </div>
            </div>
        </div>
    )
};

export default Author