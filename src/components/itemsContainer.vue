<template>
    
    <div class="itemsContainer">
        <h1 id="separator">Items</h1>
        <div  v-for="item in items" v-bind:key="item.id" class="item">
            <itemCard v-bind:item="item"/>
        </div>
        <itemCreator/>
    </div>

</template>

<script>
    import itemCard from './itemCard.vue'
    import itemCreator from "./itemCreateor"

    export default {
        name:"Items",
        components: {
            itemCreator,
            itemCard
        },
        props:["items"],
    }
</script>

<style scoped>
    .itemsContainer{
        position: center;
        padding: 0vw 1.5vw;
    }
    #separator{
        margin-top: 10vh;
    }
</style>