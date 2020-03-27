const dbConfig = {
    dbs: 'mongodb://127.0.0.1:27017/ayablog',
    redis: {
        get host() {
            return "127.0.0.1"
        },
        get port() {
            return "6379"
        }
    },
    smtp: {
        get host() {
            return "smtp.qq.com"
        },
        get user() {
            return "244802956@qq.com"
        },
        //smtp识别码(用户唯一)
        get pass() {
            return "mjxndkcfsqllbhjd"
        },
        //验证码
        get code() {
            return () => {
                return Math.random()
                    .toString(16)
                    .slice(2, 6)
                    .toUpperCase()
            }
        },
        get expire() {
            return () => {
                return new Date().getTime() + 60 * 60 * 1000 * 5
            }
        }
    },

}
export default dbConfig