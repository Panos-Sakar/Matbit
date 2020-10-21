import { createStore } from 'vuex'
import globalMixin from "../Mixins/globalMixin";


const store = createStore({
  state: {
    items : [],
    recipes: []
    
  },
  getters:{
    getAllItems(state){
      return state.items;
    },
    getAllRecipes(state){
      return state.recipes;
    }
  },
  mutations: {
    initialise(state){
      state.items =  loadFromJson(globalMixin.getItemsStorageKey()) || [];
      state.recipes = loadFromJson(globalMixin.getRecipesStorageKey()) || [];
    },

    /*Item Functins*/
    
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
            var ammountInt = parseInt(ammount);
            if(isNaN(ammountInt)) ammountInt = 0;
            
            item.quantity.ammount -= ammountInt;
            if(item.quantity.ammount <= 0) object.splice(index, 1);  
          }
        }
      );

      saveItemsToJson(store);
    }

    /*Recipe Functins*/


  }

});
export default store;

/*localStorage Functions*/

function saveItemsToJson(store){
  localStorage.setItem(globalMixin.getItemsStorageKey(), JSON.stringify(store.items));
}

// eslint-disable-next-line no-unused-vars
function saveRecipesToJson(store){
  localStorage.setItem(globalMixin.getRecipesStorageKey(), JSON.stringify(store.recipes));
}

function loadFromJson(StorageKey){
  let stored = localStorage.getItem(StorageKey);
  return JSON.parse(stored, globalMixin.JsonDateParser);
}