let ipUrl = 'http://127.0.0.1:7001/admin/';
let ipStatic = 'http://127.0.0.1:7001/';

let servicePath = {
    ipStatic: ipStatic,
    checkLogin:ipUrl + 'checkLogin' ,  //  检查用户名密码是否正确
    getTypeInfo:ipUrl + 'getTypeInfo' ,  //  获得文章类别信息
    addArticle:ipUrl + 'addArticle' ,  //  添加文章
    updateArticle:ipUrl + 'updateArticle' ,  //  修改文章第api地址
    getArticleList:ipUrl + 'getArticleList' ,  //  文章列表
    delArticle:ipUrl + 'delArticle/' ,  //  删除文章
    getArticleById:ipUrl + 'getArticleById/' ,  //  根据ID获得文章详情
    delType:ipUrl + 'delType/' ,  //  删除文章类型
    userImg:ipStatic + 'images/user.jpeg'
};

export default servicePath;
