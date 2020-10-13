<template>
    <div class="itemsContainer">
        <h1>Items</h1>
        <div v-bind:key="item.id" v-for="item in items" class="item">
            <itemCard v-bind:item="item" 
                      v-on:consume-item="this.$emit('consume-item', item)"
                      v-on:remove-item="this.$emit('remove-item', item)"/>
        </div>
    </div>
</template>

<script>
    import itemCard from './itemCard.vue'

    export default {
        name:"Items",
        components: {
            itemCard
        },
        props:["items"]
    }
</script>

<style scoped>
    .item{
        text-align: left;
    }
</style>