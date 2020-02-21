'use strict';

const Controller = require('egg').Controller

class HomeController extends Controller{
    async getArticleList(){
    
        let sql = 'SELECT article.id as id,'+
            'article.title as title,'+
            'article.introduce as introduce,'+
            // 将时间戳换成时间
            "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime,"+
            'article.view_count as view_count ,'+
            '.article_type.typeName as typeName '+
            'FROM article LEFT JOIN article_type ON article.type_id = article_type.id ' +
            'ORDER BY addTime DESC';
        
        const results = await this.app.mysql.query(sql);
        
        this.ctx.body={
            data:results
        }
    }
    
    async getArticleById(){
        //先配置路由的动态传值，然后再接收值
        const query = this.ctx.query;
        
        let sql = 'SELECT article.id as id,'+
            'article.title as title,'+
            'article.introduce as introduce,'+
            'article.article_content as article_content,'+
            "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime,"+
            'article.view_count as view_count ,'+
            'article_type.typeName as typeName ,'+
            'article_type.id as typeId '+
            'FROM article LEFT JOIN article_type ON article.type_id = article_type.id '+
            'WHERE article.id='+query.id;
        

        const result = await this.app.mysql.query(sql);

        
        this.ctx.body={data:result}
    }
    
    //得到类别名称和编号
    async getTypeInfo(){
        const result = await this.app.mysql.select('article_type', {
            orders: [['orderNum','asc'], ['id','asc']]
        });
        this.ctx.body = {data:result}
    }
    
    //根据类别ID获得文章列表
    async getListById(){
        let id = this.ctx.query.id;
        let sql = 'SELECT article.id as id,'+
            'article.title as title,'+
            'article.introduce as introduce,'+
            "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime,"+
            'article.view_count as view_count ,'+
            'article_type.typeName as typeName '+
            'FROM article LEFT JOIN article_type ON article.type_id = article_type.id '+
            'WHERE type_id='+id + ' ' +
            'ORDER BY addTime DESC';
        const result = await this.app.mysql.query(sql);
        this.ctx.body={data:result}
    }
    
    async setViewCount() {
        let id = this.ctx.query.id;
        let item = await this.app.mysql.get("article",{id: id});
        // console.log(item.view_count);
        
        const result = await this.app.mysql.update('article', {id: id, view_count: item.view_count + 1});
        const updateSuccess = result.affectedRows === 1;
        this.ctx.body={
            isScuccess:updateSuccess
        }
    }
}

module.exports = HomeController;