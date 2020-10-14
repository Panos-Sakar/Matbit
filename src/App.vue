<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <itemCreator v-on:new-item-created="addNewItem"/>
  <itemsContainer v-bind:items="items" 
                  v-on:consume-item="consumeItem"
                  v-on:remove-item="removeItem"/>
</template>

<script>
  import itemsContainer from './components/itemsContainer.vue'
  import itemCreator from "./components/itemCreateor"
  import globalMixin from "./Mixins/globalMixin";

  export default {
    name: 'App',
    components: {
      itemCreator,
      itemsContainer
    },
    mixins:[globalMixin],
    data(){
      return{
        items:[]
      }
    },
    created(){
      let stored = localStorage.getItem(globalMixin.getItemsStorageKey());
      this.items = JSON.parse(stored, globalMixin.JsonDateParser);
    },
    methods:{
      removeItem(inItem){
          let items = this.items.filter(item => item !== inItem);
          localStorage.setItem(globalMixin.getItemsStorageKey(), JSON.stringify(items));
          this.items = items;
      },
      consumeItem(item){
          console.log("consume: " + item.name);
      },
      addNewItem(item){
        let newItems = this.items || [];
        newItems.push(item);
        localStorage.setItem(globalMixin.getItemsStorageKey(), JSON.stringify(newItems));
        this.items = newItems;
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Muli', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    min-height: 100vh;
    margin: 0;
  }

  body {
    background-image: linear-gradient(45deg, #7175da, #9790F2);
  }

  * {
    box-sizing: border-box;
  }
</style>
