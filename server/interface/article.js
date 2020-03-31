import Router from 'koa-router'
import Article from '../dbs/models/article'
import sillyDatetime from 'silly-datetime'
import multer from 'koa-multer'


let router = new Router({
    prefix: '/article'
})
let storage = multer.diskStorage({
    //文件保存路径
    destination: function (req, file, cb) {
        cb(null, 'static/uploads/')
    },
    //修改文件名称
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");  //以点分割成数组，数组的最后一项就是后缀名
        cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
})
const upload = multer({ storage }); // note you can pass `multer` options here

router.post('/image', upload.single('file'), async ctx => {
    ctx.body = {
        code: 0,
        msg: '上传成功',
        data: {
            // url: 'http://' + ctx.req.headers.host + '/uploads/' + ctx.req.file.filename
            url: '/uploads/' + ctx.req.file.filename
        }

    }
})

router.post('/uploadarticle', async ctx => {
    if (!ctx.isAuthenticated()) {
        ctx.body = {
            code: -1,
            msg: '请先登录'
        }
        return false;
    }
    const { title, content, bg } = ctx.request.body;
    // let time = Date();
    let time = sillyDatetime.format(new Date(), 'YYYY-MM-DD HH:mm');
    let user = ctx.session.passport.user.username;
    let article = new Article({
        time, user, title, content, bg
    })
    let result = await article.save();
    if (result) {
        ctx.body = {
            code: 0,
            msg: '上传成功'
        }
    }
})
router.post('/editArticle', async ctx => {
    if (!ctx.isAuthenticated()) {
        ctx.body = {
            code: -1,
            msg: '请先登录'
        }
        return false;
    }
    const { title, content, bg, id } = ctx.request.body;
    let result = await Article.findOneAndUpdate({ _id: id }, { title, content, bg }, { new: true });

    if (result) {
        ctx.body = {
            code: 0,
            msg: '上传成功'
        }
    }
})
router.get('/getarticle', async ctx => {
    let { page } = ctx.request.query;
    let start = (page - 1) * 10;
    let result = await Article.find({}, ({ content: 0 })).sort({ _id: -1 }).skip(start).limit(10);
    let count = await Article.count();
    if (result.length) {
        ctx.body = {
            code: 0,
            msg: '请求成功',
            data: {
                count,
                result
            }
        }
    }
})
router.get('/myArticle', async ctx => {
    const { username } = ctx.session.passport.user;
    let result = await Article.find({ user: username }, ({ content: 0 })).sort({ _id: -1 }).limit(10);
    ctx.body = {
        code: 0,
        msg: '请求成功',
        data: result
    }

})
router.get('/getCarousel', async ctx => {
    let result = await Article.find({}, ({ content: 0 })).sort({ _id: -1 }).limit(4);
    if (result) {
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
router.get('/getSingleArticle', async ctx => {
    let { id } = ctx.request.query;
    let result = await Article.findOne({ _id: id });
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

router.get('/recommend', async ctx => {
    let count = await Article.countDocuments();
    let arr = [];
    let req = [];
    let addRandom = function () {
        if (arr.length < 5) {
            let ramdonCount = random(0, count - 1);
            if (!arr.includes(ramdonCount)) {
                arr.push(ramdonCount);
            }
            addRandom();
        }
    }
    addRandom();
    for (let i of arr) {
        let result = await Article.findOne({}, { content: 0, bg: 0 }).skip(i);
        req.push(result);
    }
    ctx.body = {
        code: 0,
        msg: '请求成功',
        data: req
    }
})

function random(n, m) {
    return Math.round(Math.random() * (m - n) + n);
}


export default router;