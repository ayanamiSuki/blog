import Router from 'koa-router'
import Comment from '../dbs/models/comment'
import Users from '../dbs/models/users'
import sillyDatetime from 'silly-datetime'

let router = new Router({
    prefix: '/comment'
})

router.get('/getComment', async ctx => {
    const { articleId } = ctx.request.query;
    const result = await Comment.find({ articleId }).populate({
        path: 'userId',
        select: 'username avatar -_id',
        model: Users
    });

    ctx.body = {
        code: 0,
        msg: '获取成功',
        data: result
    }
})

router.post('/sendComment', async ctx => {
    const { content, articleId } = ctx.request.body;
    const time = sillyDatetime.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
    const userId = ctx.session.passport.user._id;
    let newComment = new Comment({
        content, time, userId, articleId
    })
    let result = await newComment.save();
    if (result) {
        ctx.body = {
            code: 0,
            msg: '评论成功'
        }
    } else {
        ctx.body = {
            code: -1,
            msg: '评论失败'
        }
    }
})

export default router;