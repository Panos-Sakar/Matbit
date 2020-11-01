import { createStore } from 'vuex';
import GM from "../Mixins/globalMixin";


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
    getItemByName: (state) => (itemName, itemType) =>{
      var matchingItems = state.items.filter(item => item.name == itemName && GM.compareTypes(item.quantity.type, itemType));
      
      if(matchingItems.length == 0) return { "ammount": 0 , expAmmount: 0, "type": "items"};
      
      let ammountSum = 0;
      let expAmmountSum = 0;
      matchingItems.forEach(item => { 
        if(itemHasExpired(item.date.expiring)) expAmmountSum += item.quantity.ammount;
        else ammountSum += item.quantity.ammount;
      });
      return { "ammount": ammountSum ,  expAmmount: expAmmountSum, "type": matchingItems[0].quantity.type};
    },
    getItemExpDate: (state) => (itemName) =>{
      var matchingItems = state.items.filter(item => item.name == itemName);
      if(matchingItems.length == 0) return null;
      
      let expDates = [];

      matchingItems.forEach(item => {
        expDates.push(item.date.expiring);
      });
      
      var minDate = GM.getFormatedDate(expDates.reduce(function (a, b) { return a < b ? a : b; })); 
      //var minDate =new Date(Math.min.apply(null,expDates));

      return minDate;
    }
  },
  mutations: {
    initialise(state){
      state.devSettings = loadFromJson(GM.getDevSettingsKey()) || GM.getDefaultDevSettings();

      if(state.devSettings.appVersion < GM.getCurrentAppVersion()){
        console.log("Reseting storage");

        state.items = [];
        saveItemsToJson(state);
        
        state.recipes = [];
        saveRecipesToJson(state);

        state.devSettings.appVersion = GM.getCurrentAppVersion();
      }

      state.items =  loadFromJson(GM.getItemsStorageKey()) || [];
      state.recipes = loadFromJson(GM.getRecipesStorageKey()) || [];

      checkItemExpDates(state.items);

      saveDevSettingsToJson(state);
    },

    /*Item Functins*/
    
    addItem(state, newItem){
      if(newItem.quantity.ammount <=0 ) return;
      var findItemIndex = state.items.findIndex(item => ((item.name === newItem.name) && 
                                                        (GM.sameDay(item.date.expiring, newItem.date.expiring)) && 
                                                        GM.compareTypes(item.quantity.type, newItem.quantity.type))
      );
      
      if(findItemIndex<0) state.items.push(newItem);
      else{
        state.items[findItemIndex].quantity.ammount += newItem.quantity.ammount;
        GM.fixItemType(state.items[findItemIndex].quantity);
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
            var ammountFloat = parseFloat(ammount);
            if(isNaN(ammountFloat)) ammountFloat = 0;
            
            item.quantity.ammount -= ammountFloat;
            GM.fixItemType(item.quantity);
            
            if(item.quantity.ammount <= 0) object.splice(index, 1);
          }
        }
      );

      saveItemsToJson(state);
    },
    renameItem(state,{itemId, newName}){
      var index = state.items.findIndex(item => item.id == itemId);
      state.items[index].name = newName;
      saveItemsToJson(state);
    },
    repopulateItem(state,{itemId, newAmmount, newType}){
      var index = state.items.findIndex(item => item.id == itemId);

      var ammountFloat = parseFloat(newAmmount);
      if(!isNaN(ammountFloat) && ammountFloat>0){

        state.items[index].quantity.ammount = ammountFloat;
        if(newType == "") newType = "Item" + (( ammountFloat == 1)? "":"s");
        state.items[index].quantity.type = newType;
      } 

      saveItemsToJson(state);
    },
    updateDateItem(state,{itemId, newDate}){
      var index = state.items.findIndex(item => item.id == itemId);

      let tempExpiring = new Date(newDate);
      let dateExpiring = new Date(tempExpiring.getFullYear(), tempExpiring.getMonth(), tempExpiring.getDate());
      
      state.items[index].date.expiring = dateExpiring;
      
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
          
          var recipeStatus = checkRecipeItemsAvailability(this,recipe);
          recipe.isReady = recipeStatus.isReady;
          recipe.isReadyWithExp = recipeStatus.isReadyWithExp;
          recipe.expItems = checkRecipeItemsExpiration(this,recipe);

        }
        
      });
    },
    executeRecipe(state, recipe){
      recipe.items.forEach(itemInRecipe => {
        drainItem(state, itemInRecipe);
      });
    },
    renameRecipe(state,{recipeId, newName}){
      var index = state.recipes.findIndex(recipe => recipe.id == recipeId);
      state.recipes[index].name = newName;
      saveRecipesToJson(state);
    },
    updateRecipeItem(state,ctx){
      var recipeIndex = state.recipes.findIndex(recipe => recipe.id == ctx.recipeId);
      var itemIndex = state.recipes[recipeIndex].items.findIndex(item => item.id == ctx.itemId);
      
      state.recipes[recipeIndex].items[itemIndex].name = ctx.newName;

      var ammountFloat = parseFloat(ctx.newAmmount);
      if(!isNaN(ammountFloat) && ammountFloat>0){

        state.recipes[recipeIndex].items[itemIndex].ammount = ammountFloat;

        if(ctx.newType == "") ctx.newType = "Item" + (( ammountFloat == 1)? "":"s");
        state.recipes[recipeIndex].items[itemIndex].type = ctx.newType;
      } 

      saveRecipesToJson(state);
    }
  }

});
export default store;

/*localStorage Functions*/

function saveItemsToJson(store){
  localStorage.setItem(GM.getItemsStorageKey(), JSON.stringify(store.items));
}

function saveRecipesToJson(store){
  localStorage.setItem(GM.getRecipesStorageKey(), JSON.stringify(store.recipes));
}

function saveDevSettingsToJson(state){
  localStorage.setItem(GM.getDevSettingsKey(), JSON.stringify(state.devSettings));
}

function loadFromJson(StorageKey){
  let stored = localStorage.getItem(StorageKey);
  return JSON.parse(stored, GM.JsonDateParser);
}

function checkItemExpDates(items){
  items.forEach(item => {
    item.date.hasExpired = (item.date.expiring > GM.getFormatedDate(Date.now()))? false: true;
  });
}

function checkRecipeItemsAvailability(store,recipe) {
  let allIngredientsOk = true;
  let allIngredientsWithExp = true;
  let ammountSum = 0;
  
  recipe.items.forEach(item => {
    let itemInStorage = store.getters.getItemByName(item.name, item.type);
    ammountSum = itemInStorage.ammount + itemInStorage.expAmmount;
    
    if(item.ammount > itemInStorage.ammount) allIngredientsOk = false;
    if(item.ammount > ammountSum) allIngredientsWithExp = false;
  }); 

  return {isReady: allIngredientsOk, isReadyWithExp: allIngredientsWithExp };
}

function checkRecipeItemsExpiration(store,recipe){
  let expItems = [];
  let today = GM.getFormatedDate(Date.now());

  recipe.items.forEach(item => {
    let itemDate = store.getters.getItemExpDate(item.name);

    if(itemDate != null && itemDate<=today) expItems.push(item);
  });

  return expItems;
}

function itemHasExpired(expDate){
  let today = GM.getFormatedDate(Date.now());
  return (today>=expDate);
}

function drainItem(state, itemToDrain){

  var drainQuantity = itemToDrain.ammount;
  let ammountInItem = 0;
  
  var matchingItems = state.items.filter(item => item.name == itemToDrain.name && 
                                        GM.compareTypes(item.quantity.type, itemToDrain.type) &&
                                        !itemHasExpired(item.date.expiring)
  );
  
  matchingItems.sort((a,b) => { return a.quantity.ammount - b.quantity.ammount; });

  matchingItems.every(item => {
    
    ammountInItem = item.quantity.ammount;
    
    item.quantity.ammount -= drainQuantity;
    GM.fixItemType(item.quantity);
    
    drainQuantity -= ammountInItem;

    if(item.quantity.ammount >  0) { return false; }
    
    if(item.quantity.ammount == 0) { removeItemFromState(state, item); return false; }
    
    if(item.quantity.ammount <  0) { removeItemFromState(state, item); return true; }
  });

  saveItemsToJson(state);
}

function removeItemFromState(state, itemToRemove){
  var indexToRemove = 0;
  indexToRemove = state.items.findIndex(item => (item.id === itemToRemove.id));
  state.items.splice(indexToRemove, 1);
}
