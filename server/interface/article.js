import Router from 'koa-router'
import Article from '../dbs/models/article'
import sillyDatetime from 'silly-datetime'

let router = new Router({
    prefix: '/article'
})

router.post('/uploadarticle', async ctx => {
    if (!ctx.isAuthenticated()) {
        ctx.body = {
            code: -1,
            msg: '请先登录'
        }
        return false;
    }
    const { title, content } = ctx.request.body;
    // let time = Date();
    let time = sillyDatetime.format(new Date(), 'YYYY-MM-DD');
    let user = ctx.session.passport.user.username;
    let article = new Article({
        time, user, title, content
    })
    let result = await article.save();
    if (result) {
        ctx.body = {
            code: 0,
            msg: '上传成功'
        }
    }
})

router.get('/getarticle', async ctx => {
    let result = await Article.find({}, ({ content: 0 })).sort({ _id: -1 });
    if (result.length) {
        ctx.body = {
            code: 0,
            msg: '请求成功',
            data: result
        }
    }
})
router.get('/getarticleDetail', async ctx => {
    let req = ctx.request.query;
    let result = await Article.findOne({ _id: req._id }, { _id: 0 });
    if (result) {
        ctx.body = {
            code: 0,
            msg: '请求成功',
            data: result
        }
    } else {
        ctx.body = {
            code: -1,
            msg: '不存在的文章',
            data: ''
        }
    }
})
export default router;