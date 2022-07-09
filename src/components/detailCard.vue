<template>
    <img :src="thumbnail.path + '.' + thumbnail.extension" />
    <h1>{{ name }}</h1>
    <p>{{ description }}</p>
</template>
<script setup>
import { defineProps, toRef } from 'vue'

const charactere = defineProps({ charactere: Object })

let { id, name, description, thumbnail } = toRef(charactere, 'charactere').value
</script>
<style scoped>
img {
    border-radius: 50%;
    border: solid 5px black;
}
h1 {
    color: black;
}
p {
    color: grey;
    font-style: italic;
}
</style>
