export const state = () => ({
    userInfo: {
        username: '', email: '', avatar: ''
    }
})

export const mutations = {
    SET_USER(state, val) {
        const { username, email, avatar } = val;
        state.userInfo = {
            username, email, avatar
        }
    }
}

export const actions = {
    nuxtServerInit({ commit }, { req }) {
        if (req.ctx.session.passport == undefined) {
            return false;
        }
        else if (req.ctx.session.passport.user == undefined) {
            return false
        } else if (req.ctx.session.passport.user.username == '') {
            return false
        } else {
            commit('SET_USER', req.ctx.session.passport.user)
        }
    },
    loginUser({ commit }, val) {
        commit('SET_USER', val)
    },
    exitUser({ commit }) {
        let userInfo = {
            username: '', email: '', avatar: ''
        }
        commit('SET_USER', userInfo)
    },
}
