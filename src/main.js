import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import router from './router'

const store = createStore({

    
    state() {
        return {
            isfav: [],
        }
    },
    getters: {
        isfav(state) {
            return state.isfav
        },
    },
    mutations: {
        verfyFav: async state => {

            const params = {

              name: this.search
        
            }


            const fav = await localStorage.getItem('store')
            if (fav) {
                state.isfav = JSON.parse(fav)
            }
            /* fav && state.isfav = (JSON.parse(fav))  */
        },
        AddorRemove(state, item) {
            const existe = state.isfav.findIndex(element => element.item.id === item.item.id)
            if (existe !== -1) {
                state.isfav = state.isfav.filter(element => element.item.id !== item.item.id)
                localStorage.setItem('store', JSON.stringify(state.isfav))
            } else {
                state.isfav = [...state.isfav, item]
                localStorage.setItem('store', JSON.stringify(state.isfav))
            }
        },

        searchData (){
            this.page = 1
            this.fetch();
      
          },
    },
})

store.commit('verfyFav')
createApp(App).use(router).use(store).mount('#app')
