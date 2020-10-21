<template>
  <div class="titleBar">
    <h1>Matbit App</h1>
  </div>
  <div class = "mainApp">
    <div id="items" class="tab" v-on:click="this.showItems=!this.showItems">
      <h1>Items</h1>
    </div>
    <itemsContainer v-if="this.showItems" v-bind:items="this.$store.getters.getAllItems"/>
  </div>
  <div class="footer">
    <pre>|     Designed by Panagiotis Sakaridis     |</pre>
  </div>

</template>

<script>
  import itemsContainer from './components/itemsContainer.vue'
  
  import globalMixin from "./Mixins/globalMixin";

  export default {
    name: 'App',
    components: {
      itemsContainer
    },
    data(){
      return{
        showItems: true
      }
    },
    mixins:[globalMixin],
    created(){ 
      this.$store.commit('initialise'); 
    }
  }
</script>

<style>
  @import './styles/itemCard.css';
  
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
    position: relative;
  }

  .tab {
    margin-top: 5vh;
    cursor: pointer;
  }

  .footer {
    white-space: pre;
    color: transparent;
    padding-top: 1vh;
    padding-bottom: 10vh;
  }

</style>
