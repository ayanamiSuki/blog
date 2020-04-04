import Router from 'koa-router'
import Redis from 'koa-redis'
import nodeMailer from 'nodemailer'
import User from '../dbs/models/users'
import Passport from './utils/passport'
import Email from '../dbs/config'
import axios from './utils/axios'
let router = new Router({
    prefix: '/users'
})

let Store = new Redis().client


router.post('/signup', async ctx => {
    const { username, password, email, code } = ctx.request.body;
    if (code) {
        const saveCode = await Store.hget(`nodemail:${username}`, `code`);

        const saveExpire = await Store.hget(`nodemail:${username}`, 'expire');
        if (code === saveCode) {
            if (new Date().getTime - saveExpire > 0) {
                ctx.body = {
                    code: -1,
                    msg: '验证码已经过期，请重试'
                }
                return false;
            }
        } else {
            ctx.body = {
                code: -1,
                msg: '请填写正确的验证码'
            }
            return false;
        }
    } else {
        ctx.body = {
            code: -1,
            msg: "请填写验证码"
        };
        return false;
    }
    let user = await User.find({ username });
    if (user.length) {
        ctx.body = {
            code: -1,
            msg: "用户名已经被注册"
        };
        return false;
    }
    // let e_mail = await User.find({ email });
    // if (e_mail.length) {
    //     ctx.body = {
    //         code: -1,
    //         msg: "邮箱已经被注册"
    //     };
    //     return false;
    // }
    let newUser = await User.create({
        username, password, email
    });
    if (newUser) {
        let res = await axios.post('/users/signin', { username, password })
        if (res.data.code === 0) {
            ctx.body = {
                code: 0,
                msg: "注册成功",
                user: res.data.user
            };
        } else {
            ctx.body = {
                code: -1,
                msg: "error"
            };
        }
    } else {
        ctx.body = {
            code: -1,
            msg: "注册失败"
        };
    }

})

router.post('/signin', async (ctx, next) => {

    return Passport.authenticate('local', function (err, user, info, status) {
        if (err) {
            ctx.body = {
                code: -1,
                msg: err
            };
        } else {
            if (user) {
                ctx.body = {
                    code: 0,
                    msg: "登陆成功",
                    user
                };
                return ctx.login(user);
            } else {
                ctx.body = {
                    code: 1,
                    msg: info
                };
            }
        }
    })(ctx, next)

})


router.post("/changePass", async ctx => {
    let { username, email, password, code } = ctx.request.body;
    if (code) {
        const saveCode = await Store.hget(`nodemail:${username}`, "code");
        if (code == saveCode) {
            let result = await User.findOneAndUpdate({ username }, { password }, { 'new': true });
            if (result) {
                ctx.body = {
                    code: 0,
                    msg: '修改成功',
                    data: ''
                }
            }

        } else {
            ctx.body = {
                code: -1,
                msg: '验证码错误'
            }
            return false;
        }
    } else {
        ctx.body = {
            code: -1,
            msg: '验证码不存在'
        }
        return false;
    }
})

router.post("/verify", async (ctx, next) => {
    let username = ctx.request.body.username;
    let userEmail = ctx.request.body.email;
    let ifUser = await User.find({ username });
    if (ifUser.length) {
        ctx.body = {
            code: -1,
            msg: "用户名已经被注册"
        };
        return false;
    }
    const saveExpire = await Store.hget(`nodemail:${username}`, "expire");
    if (saveExpire && new Date().getTime - saveExpire < 0) {
        ctx.body = {
            code: -1,
            msg: "验证请求过于频繁，一分钟一次"
        };
        return false;
    }
    let transporter = nodeMailer.createTransport({
        service: 'qq',
        auth: {
            user: Email.smtp.user,
            pass: Email.smtp.pass
        }
    });
    let ko = {
        code: Email.smtp.code(),
        expire: Email.smtp.expire(),
        email: userEmail,
        user: username
    };

    let mailOption = {
        from: `"认证邮件"<${Email.smtp.user}>`,
        to: ko.email,
        subject: "<朔月十六夜的狗窝>",
        html: `欢迎您的注册，可以再窝里面畅所欲言，验证码是${ko.code}，有效期5分钟，请及时填写`
    };
    await transporter.sendMail(mailOption, (err, info) => {
        if (err) {
            ctx.body = {
                code: 0,
                msg: err
            };
            return console.log("发送注册邮件失败,原因:" + err);
        } else {
            Store.hmset(
                `nodemail:${ko.user}`,
                "code",
                ko.code,
                "expire",
                ko.expire,
                "email",
                ko.email
            );
        }
    });
    ctx.body = {
        code: 0,
        msg: "验证码已发送，有效期5分钟"
    };
});

router.get("/exit", async (ctx, next) => {
    await ctx.logout();
    if (!ctx.isAuthenticated()) {
        ctx.body = {
            code: 0,
            msg: '您已退出登录'
        };
    } else {
        ctx.body = {
            code: -1,
            msg: '操作失败！'
        };
    }
});

router.get("/getUser", async (ctx, next) => {
    if (ctx.isAuthenticated()) {
        const { username, email, avatar } = ctx.session.passport.user;
        ctx.body = {
            username,
            email,
            avatar
        };
    } else {
        ctx.body = {
            username: "",
            email: "",
            avatar: ""
        };
    }
});

export default router;