<template>
    <div class="itemsContainer">
        <h1>Items</h1>
        <div v-bind:key="item.id" v-for="item in items" class="allItems">
            <item v-bind:item="item"/>
        </div>
    </div>
</template>

<script>
import item from './item.vue'

export default {
    name:"Items",
    components: {
        item
    },
    props:["items"]
}
</script>

<style scoped>
    .itemsContainer{
        color: #42b983;
        font-size: large;
    }
    .allItems{

        text-align: left;
    }
</style>