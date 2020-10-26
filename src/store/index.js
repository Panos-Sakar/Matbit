import { createStore } from 'vuex'
import globalMixin from "../Mixins/globalMixin";


const store = createStore({
  state: {
    items : [],
    recipes: [],
    devSettings : {}
  },
  getters:{
    getAllItems: (state) => {
      return state.items;
    },
    getAllRecipes: (state) => {
      return state.recipes;
    },
    getItemByName: (state) => (itemName) =>{
      var matchingItems = state.items.filter(item => item.name == itemName);

      if(matchingItems.length == 0) return { "ammount": 0 , "type": "items" }

      let ammountSum = 0;
      matchingItems.forEach(item => {ammountSum += item.quantity.ammount});

      return { "ammount": ammountSum , "type": matchingItems[0].quantity.type};
    }
  },
  mutations: {
    initialise(state){
      state.devSettings = loadFromJson(globalMixin.getDevSettingsKey()) || globalMixin.getDefaultDevSettings();

      if(state.devSettings.appVersion < globalMixin.getCurrentAppVersion()){
        console.log("Reseting storage");

        state.items = [];
        saveItemsToJson(state);
        
        state.recipes = [];
        saveRecipesToJson(state);

        state.devSettings.appVersion = globalMixin.getCurrentAppVersion();
      }

      state.items =  loadFromJson(globalMixin.getItemsStorageKey()) || [];
      state.recipes = loadFromJson(globalMixin.getRecipesStorageKey()) || [];

      saveDevSettingsToJson(state);
    },

    /*Item Functins*/
    
    addItem(state, newItem){
      var findItemIndex = state.items.findIndex(item => ((item.name === newItem.name) && (globalMixin.sameDay(item.date.expiring,newItem.date.expiring))));
      
      if(findItemIndex<0) state.items.push(newItem);
      else{
        state.items[findItemIndex].quantity.ammount += newItem.quantity.ammount;
      }
      
      saveItemsToJson(state);
    },
    removeItem(state, itemToRemove){
      var indexToRemove = state.items.findIndex(item => item.id == itemToRemove.id);
      
      state.items.splice(indexToRemove,1);
      
      saveItemsToJson(state);
    },
    consumeItem(state, {consumeItem, ammount}){

      state.items.forEach(
        function(item, index, object){
          
          if(item.id == consumeItem.id) {
            var ammountInt = parseInt(ammount);
            if(isNaN(ammountInt)) ammountInt = 0;
            
            item.quantity.ammount -= ammountInt;
            if(item.quantity.ammount <= 0) object.splice(index, 1);  
          }
        }
      );

      saveItemsToJson(state);
    },

    /*Recipe Functins*/

    addRecipe(state, newRecipe){
      state.recipes.push(newRecipe);
      
      saveRecipesToJson(state);
    },
    removeRecipe(state, recipeToRemove){
      var indexToRemove = state.recipes.findIndex(recipe => recipe.id == recipeToRemove.id);
      state.recipes.splice(indexToRemove,1);
      
      saveRecipesToJson(state);
    },
    checkRecipeStatus(state, recipeIdToCheck){
      state.recipes.forEach(recipe => {
        if(recipe.id == recipeIdToCheck){
          let allIngredientsOk = true;
          recipe.items.forEach(item => {
            if(item.ammount > this.getters.getItemByName(item.name).ammount){
              allIngredientsOk = false;
            }
          });
          
          if(allIngredientsOk) recipe.isReady = true;
          else recipe.isReady = false;
        }
        
      });
    }
  }

});
export default store;

/*localStorage Functions*/

function saveItemsToJson(store){
  localStorage.setItem(globalMixin.getItemsStorageKey(), JSON.stringify(store.items));
}

function saveRecipesToJson(store){
  localStorage.setItem(globalMixin.getRecipesStorageKey(), JSON.stringify(store.recipes));
}

function saveDevSettingsToJson(state){
  localStorage.setItem(globalMixin.getDevSettingsKey(), JSON.stringify(state.devSettings));
}

function loadFromJson(StorageKey){
  let stored = localStorage.getItem(StorageKey);
  return JSON.parse(stored, globalMixin.JsonDateParser);
}