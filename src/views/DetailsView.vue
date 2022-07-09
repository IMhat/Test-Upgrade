<template>
    <detailCard v-if="myData.thumbnail" :charactere="myData" />
    <button v-on:click="router.go(-1)">
        <ion-icon name="arrow-back-outline" size="large" style="" />
    </button>
</template>



<script setup>
import axios from 'axios'
import MD5 from 'md5'
import { onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'
import detailCard from '../components/detailCard.vue'
import router from '../router'
const route = useRoute()
const { VUE_APP_PUBLIC_KEY, VUE_APP_PRIVATE_KEY, VUE_APP_API_BACKEND } = process.env
const ts = new Date().getTime()
const stringToHash = ts + VUE_APP_PRIVATE_KEY + VUE_APP_PUBLIC_KEY
const hash = MD5(stringToHash).toString()
const url =
    VUE_APP_API_BACKEND +
    '/' +
    route.params.id +
    '?' +
    'ts=' +
    ts +
    '&apikey=' +
    VUE_APP_PUBLIC_KEY +
    '&hash=' +
    hash

let myData = ref({})

const callApi = async () => {
    await axios.get(url).then(response => (myData.value = response.data.data.results[0]))
}

onBeforeMount(callApi())
</script>



<style lang="scss" scoped>
body {
    width: 100%;
    height: 100%;
}

button {
    width: 100px;
    height: 100px;
    border-radius: 50px;
    border: none;
    transition: 0.5s;
    background-color: #9ba3eb;
    cursor: pointer;
    margin-bottom: 80px;
    color: white;
    &:hover {
        background-color: #242f9b;
        width: 120px;
        height: 120px;
        border-radius: 60px;
        color: red;
    }
}
</style>
