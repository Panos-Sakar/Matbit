<template>
    
    <div class="itemsContainer">
        <itemCreator v-on:new-item-created="newItemCreated"/>
        <h1>Items</h1>
        <div v-bind:key="item.id" v-for="item in items" class="item">
            <itemCard v-bind:item="item" 
                    v-on:consume-item="itemConsumed"
                    v-on:remove-item="itemRemoved"/>
        </div>
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
        emits:['new-item-created','consume-item','remove-item'],
        methods:{
            newItemCreated(newItem){this.$emit('new-item-created', newItem);},
            itemConsumed(itemID, ammount){this.$emit('consume-item', itemID, ammount);},
            itemRemoved(item){this.$emit('remove-item', item);}
        }
    }
</script>

<style scoped>
    .itemsContainer{
        position: center;
        padding: 0vw 1.5vw;
    }
</style>