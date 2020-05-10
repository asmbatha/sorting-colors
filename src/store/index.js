import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        colors: ["#ddbbfb","#327e43","#e7b4bc","#fa2c28","#22fbda","#61c85f","#304d2d","#fe406e","#a12e36","#f1c451","#4b206a","#ea5c99","#2485dd","#673545","#fc5886","#e013aa","#863e0d","#a6d9e7","#417fcc","#c2e2a1","#f89729"]
    },
    getters: {
        colors (state) {
            return state.colors
        }
    },
    mutations: {
        SET_COLOR (state, { index, value }) {
            Vue.set(state.colors, index, value)
        },
        SET_COLORS (state, colors) {
            Vue.set(state, 'colors', colors)
        },
    },
    actions: {
        updateColors ({ commit, dispatch, state }) {
            commit('SET_COLORS', state.colors.map(() => {
                let color = Math.floor(Math.random()*16777215).toString(16)
                while (color.length !== 6) color = '0' + color

                return '#' + color
            }))
        },
        startWithColor ({ commit, state }, color) {
            state.colors.unshift(state.colors.splice(state.colors.indexOf(color), 1)[0])
            commit('SET_COLORS', state.colors)
        }
    },
    modules: {
    }
})
