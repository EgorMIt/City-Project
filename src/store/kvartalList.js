export default {
    state: {
        KvartalsList: [],
        token: '',
        refreshToken: '',
    },
    mutations: {
        changeElement(state, index, newName) {
            state.KvartalsList[index] = newName
        },
        pushElement(state, newName) {
            state.KvartalsList.push(newName)
        },
        updateKvartalsList(state, KvartalsList) {
            state.KvartalsList = KvartalsList
        },
        clearAll(state) {
            state.KvartalsList = []
        },
        setToken(state, newToken) {
            state.token = newToken
        },
        setRefreshToken(state, newRefreshToken) {
            state.refreshToken = newRefreshToken
        },
        clearToken(state) {
            state.token = ''
        },
        clearRefreshToken(state) {
            state.refreshToken = ''
        },
    },
    getters: {
        allKvartals(state) {
            return state.KvartalsList
        },
        getToken(state) {
            return state.token
        },
        getRefreshToken(state) {
            return state.refreshToken
        }
    }
}