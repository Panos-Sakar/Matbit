<template>

  <div class="titleBar">
    <h1 class="noselect">Matbit App</h1>
  </div>

  <div class = "mainApp">

    <div class="RecipesBox">
      <div class="tab recipes" v-on:click="showRecipes=!showRecipes">
        <h1 class="noselect">Recipes</h1>
      </div>
      <recipesContainer v-if="showRecipes" v-bind:recipes="$store.getters.getAllRecipes"/>
    </div>
    
    <div class="ItemsBox">
      <div class="tab items" v-on:click="showItems=!showItems">
        <h1 class="noselect">Ingredients</h1>
      </div>
      <itemsContainer v-if="showItems" v-bind:items="$store.getters.getAllItems"/>
    </div>


  </div>
  
  <div class="footer">
    <pre>|     Designed by Panagiotis Sakaridis     |</pre>
  </div>

</template>

<script>
  import itemsContainer from './components/Items/itemsContainer.vue'
  import recipesContainer from './components/Recipes/recipesContainer.vue'
  
  import globalMixin from "./Mixins/globalMixin";

  export default {
    name: 'App',
    components: {
      itemsContainer,
      recipesContainer
    },
    data(){
      return{
        showItems: true,
        showRecipes: true
      }
    },
    mixins:[globalMixin],
    created(){ 
      this.$store.commit('initialise'); 
    }
  }
</script>

<style>
  @import './styles/variables.css';
  @import './styles/container.css';
  @import './styles/itemCard.css';
  @import './styles/recipeCard.css';
  
  * {
    box-sizing: border-box;
    margin:0;
  }
  
  html { 
    overflow-y: scroll;
    overflow-x: hidden;
    scrollbar-width: thin;
    scrollbar-color: #19181b  #7175da;
  }

  body {
    background-image: linear-gradient(45deg, #7175da, #9790F2);
  }

  #app {
    font-family: 'Muli', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    
    display: flex;
    align-items: center;
    justify-content: top center;
    flex-direction: column;
    min-height: 100vh;

  }

  .titleBar{
    position: sticky;
    top: -3vh;
    z-index:100;
    width: 100%;
    float: center;
    
    padding:1vh;
    padding-top: 4vh;
    border-bottom: 5px solid #12112b;

    color: #fff;
    background-image: linear-gradient(20deg,#12112b, #342f75, #12112b);
  }

  .mainApp{
    display: flex;
    flex-flow: row wrap;

    justify-content: center;
    align-items: flex-start;

  }

  .tab {
    margin-top: 5vh;
    width: auto;
    cursor: pointer;
    max-width: 715px;
    min-width: 360px;

  }

  .footer {
    position: relative;
    white-space: pre;
    color: transparent;
    padding-top: 1vh;
    padding-bottom: 10vh;
  }
  .noselect {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .circle
  {
    border-radius: 50%;
    width: 50pt;
    height: 50pt; 
    background-color: var(--gray);
    text-align:center;
  }
</style>
