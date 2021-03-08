module.exports = async (ctx, next)=>{
    try{
        await next();   // 执行后代的代码
        if(!ctx.body){  // 没有资源
            ctx.status = 404;
            await ctx.render('error')
        }
    }catch(e){
        // 如果后面的代码报错 返回500
        ctx.status = 500;
        await ctx.render('500')
    }
}