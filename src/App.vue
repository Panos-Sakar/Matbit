<template>
  <div class="titleBar">
    <h1>Matbit App</h1>
  </div>
  <transition>
    <itemsContainer v-bind:items="this.$store.getters.getAllItems"/>
  </transition>
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
    created(){ 
      this.$store.commit('initialise'); 
    }
  }
</script>

<style>
  * {
    box-sizing: border-box;
    margin:0;
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
    padding-bottom: 10vh;
  }

  .titleBar{
    position: fixed;
    z-index:100;
    width: 100%;
    float: center;
    
    padding: 1vh;
    border-bottom: 5px solid #12112b;

    color: #fff;
    background-image: linear-gradient(20deg,#12112b, #342f75, #12112b);
  }

</style>
