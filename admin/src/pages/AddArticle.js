import React, {useState, useEffect} from 'react'
import marked from 'marked'
import '../static/css/AddArticle.css'
import {Row, Col, Input, Select, Button, DatePicker, message, Breadcrumb} from 'antd'
import common from '../common/common'
import servicePath from '../config/apiUrl'

const {Option} = Select;
const {TextArea} = Input;

function AddArticle(props) {
    
    const [articleId,setArticleId] = useState(0);
    // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle,setArticleTitle] = useState('');
    //文章标题
    const [articleContent , setArticleContent] = useState('');
    //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容');
    //html内容
    const [introducemd,setIntroducemd] = useState();
    //简介的markdown内容
    const [introducehtml,setIntroducehtml] = useState('等待编辑');
    //简介的html内容
    const [showDate,setShowDate] = useState();
    //发布日期
    const [updateDate,setUpdateDate] = useState();
    //修改日志的日期
    const [typeInfo ,setTypeInfo] = useState([]);
    // 文章类别信息
    const [selectedType,setSelectType] = useState(1);
    //选择的文章类别
    
    // 设置marked
    const renderer = new marked.Renderer();
    marked.setOptions({
        renderer: renderer,
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
    });
    
    // 实时预览方法
    const changeContent = (e)=>{
        setArticleContent(e.target.value);
        let html = marked(e.target.value);
        setMarkdownContent(html)
    };
    
    const changeIntroduce = (e)=>{
        setIntroducemd(e.target.value);
        let html=marked(e.target.value);
        setIntroducehtml(html)
    };
    
    //从中台得到文章类别信息
    const getTypeInfo =()=>{
        common.getRequest(servicePath.getTypeInfo, (res) => {
            setTypeInfo(res.data.data)
        })
    };
    
    const selectTypeHandler=(value)=>{
        setSelectType(value)
    };
    
    const getArticleById = (id)=>{
        common.getRequest(servicePath.getArticleById+id, (res) => {
            //let articleInfo= res.data.data[0]
            setArticleTitle(res.data.data[0].title);
            setArticleContent(res.data.data[0].article_content);
            let html=marked(res.data.data[0].article_content);
            setMarkdownContent(html);
            setIntroducemd(res.data.data[0].introduce);
            let tmpInt = marked(res.data.data[0].introduce);
            setIntroducehtml(tmpInt);
            setShowDate(res.data.data[0].addTime);
            setSelectType(res.data.data[0].typeId)
        })
    };
    
    const saveArticle = ()=>{
        
        // markedContent();  // 先进行转换
        
        if(!selectedType){
            message.error('必须选择文章类别');
            return false
        }else if(!articleTitle){
            message.error('文章名称不能为空');
            return false
        }else if(!articleContent){
            message.error('文章内容不能为空');
            return false
        }else if(!introducemd){
            message.error('简介不能为空');
            return false
        }else if(!showDate){
            message.error('发布日期不能为空');
            return false
        }
    
    
        let dataProps={};   //传递到接口的参数
        dataProps.type_id = selectedType;
        dataProps.title = articleTitle;
        dataProps.article_content =articleContent;
        dataProps.introduce =introducemd;
        let datetext= showDate.replace('-','/'); //把字符串转换成时间戳
        dataProps.addTime = (new Date(datetext).getTime())/1000;
        // dataProps.part_count = partCount;
        // dataProps.article_content_html = markdownContent;
        // dataProps.introduce_html = introducehtml;
    
    
        if (articleId === 0) {
            dataProps.view_count =Math.ceil(Math.random()*100)+1000;
            
            common.postRequest(servicePath.addArticle, dataProps, (res)=>{
                setArticleId(res.data.insertId);
                if(res.data.isScuccess){
                    message.success('文章保存成功')
                }else{
                    message.error('文章保存失败');
                }
            })
        } else {
            dataProps.id = articleId;
            common.postRequest(servicePath.updateArticle, dataProps, (res)=>{
                if(res.data.isScuccess){
                    message.success('文章保存成功')
                }else{
                    message.error('保存失败');
                }
            })
        }
    };
    
    useEffect(()=>{
        getTypeInfo();
        //获得文章ID
        let tmpId = props.match.params.id;
        if (tmpId) {
            setArticleId(tmpId);
            getArticleById(tmpId)
        }
    },[]);
    
    return (
        <div>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>后台管理</Breadcrumb.Item>
                <Breadcrumb.Item>添加文章</Breadcrumb.Item>
            </Breadcrumb>
            <div>
                <Row gutter={5}>
                    <Col span={18}>
                        <Row gutter={10}>
                            <Col span={20}>
                                <Input
                                    value={articleTitle}
                                    onChange={e=>{setArticleTitle(e.target.value)}}
                                    placeholder="博客标题"
                                    size="large"
                                />
                            </Col>
                            <Col span={4}>
                                <Select defaultValue={selectedType}
                                        size="large"
                                        onChange={selectTypeHandler}
                                >
                                    {
                                        typeInfo.map((item, index)=>{
                                            return (<Option key={index} value={item.id}>{item.typeName}</Option>)
                                        })
                                    }
                                </Select>
                            </Col>
                        </Row>
                        <br/>
                        <Row gutter={10}>
                            <Col span={12}>
                                <div className="date-select">
                                    <DatePicker
                                        onChange={(date, dateString)=>setShowDate(dateString)}
                                        placeholder="发布日期"
                                        size="large"
                                    />
                                </div>
                            </Col>
                        </Row>
                        <br/>
                        <Row gutter={10}>
                            <Col span={12}>
                            <TextArea
                                value={articleContent}
                                className="markdown-content"
                                rows={35}
                                onChange={changeContent}
                                onPressEnter={changeContent}
                                placeholder="文章内容"
                            />
                            </Col>
                            <Col span={12}>
                                <div className="show-html"
                                     dangerouslySetInnerHTML={{__html:markdownContent}}>
                    
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={10}>
                            <Col span={24}>
                                <br/>
                                <TextArea
                                    rows={4}
                                    value={introducemd}
                                    onChange={changeIntroduce}
                                    onPressEnter={changeIntroduce}
                                    placeholder="文章简介"
                                />
                                <br/><br/>
                                <div className="introduce-html"
                                     dangerouslySetInnerHTML={{__html: '文章简介：'+introducehtml}}>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={6}>
                        <Row>
                            <Col span={24}>
                                <Button size="large">暂存文章</Button>&nbsp;
                                <Button
                                    onClick={saveArticle}
                                    type="primary"
                                    size="large"
                                >
                                    发布文章
                                </Button>
                                <br/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default AddArticle