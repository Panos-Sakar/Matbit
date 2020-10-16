import { createStore } from 'vuex'
import globalMixin from "../Mixins/globalMixin";


const store = createStore({
  state: {
    items : []
    
  },
  getters:{
    getAllItems(state){
      return state.items;
    }
  },
  mutations: {
    initialise(state){
      state.items =  loadFromJson() || [];
    },
    addItem(store, newItem){
      store.items.push(newItem);
      
      saveItemsToJson(store);
    },
    removeItem(store, itemToRemove){
      var indexToRemove = store.items.findIndex(item => item.id == itemToRemove.id);
      store.items.splice(indexToRemove,1)
      
      saveItemsToJson(store);
    },
    consumeItem(store, {consumeItem, ammount}){

      store.items.forEach(
        function(item, index, object){
          
          if(item.id == consumeItem.id) {
             
            item.quantity.ammount -= ammount;
            if(item.quantity.ammount <= 0) object.splice(index, 1);  
          }
        }
      );

      saveItemsToJson(store);
    }
  }

});
export default store;

/*localStorage Functions*/

function saveItemsToJson(store){
  localStorage.setItem(globalMixin.getItemsStorageKey(), JSON.stringify(store.items));
}

function loadFromJson(){
  let stored = localStorage.getItem(globalMixin.getItemsStorageKey());
  return JSON.parse(stored, globalMixin.JsonDateParser);
}