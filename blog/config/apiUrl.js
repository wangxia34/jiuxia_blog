let ipUrl = 'http://192.168.160.43:7001/default/';
let ipStatic = 'http://192.168.160.43:7001/';

let servicePath = {
    getArticleList:ipUrl + 'getArticleList' ,  //  首页文章列表接口
    getArticleById:ipUrl + 'getArticleById',  // 文章详细页内容接口 ,需要接收参数
    getTypeInfo:ipUrl + 'getTypeInfo',  // 文章类型接口
    getListById:ipUrl + 'getListById',  // 根据类别ID获得文章列表
    userImg:ipStatic + 'images/user.jpeg'
};
export default servicePath;
