export const state = () => ({
    userInfo: {
        username: '', email: ''
    }
})

export const mutations = {
    SET_USER(state, val) {
        const { username, email } = val;
        state.userInfo = {
            username, email
        }
    }
}

export const actions = {
    nuxtServerInit({ commit }, { req }) {
        if (req.ctx.session.passport != undefined) {
            commit('SET_USER', req.ctx.session.passport.user)
        }
    }
}
