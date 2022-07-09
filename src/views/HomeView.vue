<template>
    <div class="wrap">

        <div class="home">

                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.4/css/bulma.min.css">

            <div class="hero is-white is-centered is-gradient is-bold">

                <div class="hero-boody">

                    <h1 class="title">

                        <span class="has-text">Marvel</span>
                        <span class="subtitle">Characters</span>

                    </h1>

                    
                    <div class="field has-addons is-pulled-right">

                        <div class="control">
                            <input v-model="search" type="text" class="input is-rounded" v-on:keyup.enter="searchData">
                        </div>
                        <div class="control">
                            <button class="button is-rounded" v-on:click="searchData">Buscar</button>
                        </div>
                    </div>
                </div> 
            </div>

            <div v-for="a in myData" class="panel" :key="a.index">
                <div class="characteres" v-for="items in a" :key="items.id">
                    <CharacteresCard :charactere="items" />
                </div>
            </div>
        </div>   
    </div>
</template>

<script setup>

// @ is an alias to /src
import axios from 'axios'
import { ref, onBeforeMount, onMounted } from 'vue'
import MD5 from 'md5'
import CharacteresCard from '../components/characteresCard.vue'

const { VUE_APP_PUBLIC_KEY, VUE_APP_PRIVATE_KEY, VUE_APP_API_BACKEND } = process.env
const ts = new Date().getTime()
const stringToHash = ts + VUE_APP_PRIVATE_KEY + VUE_APP_PUBLIC_KEY
const hash = MD5(stringToHash).toString()



let myData = ref([])

let page = ref(0)
const url = ref(

    
    VUE_APP_API_BACKEND +
        '?' +
        'ts=' +
        ts +
        '&apikey=' +
        VUE_APP_PUBLIC_KEY +
        '&hash=' +
        hash +
        '&limit=15&offset=',
)
const callApi = async (url, page) => {
    await axios
        .get(url + page)
        .then(response => (myData.value = [...myData.value, response.data.data.results]))
}
const incremete = async () => {
    page.value = page.value + 15
}

const getNextUser = async () => {
    window.onscroll = async () => {
        let bottomOfWindow =
            document.documentElement.offsetHeight -
                (document.documentElement.scrollTop + window.innerHeight) <
            10

        if (bottomOfWindow) {
            await incremete()
            await callApi(url.value, page.value)
        }
    }
}




onBeforeMount(callApi(url.value, page.value))
onMounted(getNextUser())
</script>
<style scoped lang="scss">
.panel {
    padding: 5%;
    display: grid;
    grid-template-columns: repeat(auto-fill, 300px);
    gap: 110px;

}

.home{
    background-color: gray;
}



</style>
