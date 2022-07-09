<template>
    <div class="charactere">
        <img :src="path + '.' + extension" v-on:click="detail" />
        <h1>{{ name }}</h1>
        <button v-if="isFav.length !== 0" v-on:click="click">
            <ion-icon name="heart" size="large" style="color: red" />
        </button>
        <button v-else v-on:click="click">
            <ion-icon name="heart-outline" size="large" style="color: red" />
        </button>
    </div>
</template>



<script setup>
import { defineProps, ref, toRef, computed } from 'vue'
import { useStore } from 'vuex'
import router from '../router'
const store = useStore()
const charactere2 = defineProps({ charactere: Object })

let charactere = toRef(charactere2, 'charactere')

let {
    id,
    name,
    thumbnail: { path, extension },
} = charactere.value

let isFav = computed(() => store.getters.isfav.filter(favItem => favItem.item.id === id))

const detail = async () => {
    router.push({ name: 'detail', params: { id: id } })
}

const click = async () => {
    await store.commit('AddorRemove', {
        item: charactere.value,
    })
}
</script>



<style scoped lang="scss">
.charactere {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    background-color: #dbdffd;
    width: 100%;
    height: 460px;
    border-radius: 20px;
    padding: 20px;
    transition: 2s;
    &:hover {
        background-color: #242f9b;
        position: relative;
    }
}
h1 {
    color: black;
}
img {
    width: 100%;
    border-radius: 5%;
    cursor: pointer;
}
button {
    background: none;
    border: none;
    cursor: pointer;
    border-radius: 100%;
}
</style>
