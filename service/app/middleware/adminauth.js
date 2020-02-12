
module.exports = options =>{
    return async function adminauth(ctx, next){
        // console.log(ctx.session.openId);
        if(ctx.session.openId){
            let cha = (new Date().getTime() - ctx.session.openId.openId)/3600000;
            // console.log(cha);
            if (cha > 1) {
                ctx.session.openId = undefined;
                ctx.body = {status: -1, msg: '没有登录'}
            } else {
                await next();
                let openId = new Date().getTime();
                ctx.session.openId = {'openId': openId};
            }
        }else{
            ctx.body = {status: -1, msg: '没有登录'}
        }
    }
};