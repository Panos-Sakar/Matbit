<template>
  <itemsContainer v-bind:items="items" 
                  v-on:consume-item="consumeItem"
                  v-on:remove-item="removeItem"
                  v-on:new-item-created="addNewItem"/>
</template>

<script>
  import itemsContainer from './components/itemsContainer.vue'
  
  import globalMixin from "./Mixins/globalMixin";

  export default {
    name: 'App',
    components: {
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
      consumeItem(itemID, ammount){

        this.items.forEach(function(item, index, object){
          
          if(item.id == itemID) {
            
            item.quantity.ammount -= ammount;
            if(item.quantity.ammount <= 0) object.splice(index, 1);
            
          }
        });

        localStorage.setItem(globalMixin.getItemsStorageKey(), JSON.stringify(this.items));
        
      },
      addNewItem(newItem){
        let newItems = this.items || [];
        newItems.push(newItem);
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
    
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    min-height: 100vh;
  }

  body {
    background-image: linear-gradient(45deg, #7175da, #9790F2);
  }

  * {
    box-sizing: border-box;
  }
</style>
