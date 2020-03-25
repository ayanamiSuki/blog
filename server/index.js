// const Koa = require('koa')
import Koa from 'koa'
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
//引入必要的模块
import mongoose from 'mongoose'
import bodyParser from 'koa-bodyparser'
import session from 'koa-generic-session'
import Redis from 'koa-redis'
import json from 'koa-json'
import dbConfig from './dbs/config'
import passport from './interface/utils/passport'
import users from './interface/users'
import article from './interface/article'
const app = new Koa()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = app.env !== 'production'

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  //设定
  app.keys = ["aya", "keys"];
  app.proxy = true;
  app.use(
    session({
      key: 'aya',
      prefix: 'aya:uid',
      store: new Redis(),
      cookie: {
        maxAge: 24 * 60 * 60 * 1000 //one day in ms,
      }
    })
  )
  app.use(
    bodyParser({
      extendTypes: ['json', 'form', 'text']
    })
  )
  app.use(json())

  //连接数据库
  //DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead
  mongoose.set('useCreateIndex', true)
  mongoose.connect(dbConfig.dbs, { useNewUrlParser: true, useUnifiedTopology: true })
  //身份验证  
  app.use(passport.initialize())
  app.use(passport.session())


  await nuxt.ready()
  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }
  //路由
  app.use(users.routes()).use(users.allowedMethods());
  app.use(article.routes()).use(article.allowedMethods());
  //=============
  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
