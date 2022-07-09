<template>
    <div class="wrap">
        <div class="panel" :key="listfav.length">
            <div class="characteres" v-for="items in listfav" :key="items.id">
                <CharacteresCard :charactere="items.item" />
            </div>
        </div>
    </div>
</template>

<script setup>
import CharacteresCard from '../components/characteresCard.vue'
import { Store, useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()
let listfav = computed(() => store.getters.isfav)
</script>
<style scoped>
.wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}
.panel {
    display: flex;
    flex-direction: row;
    width: 80%;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
}
.characteres {
    width: 20%;
    height: auto;
}
</style>
