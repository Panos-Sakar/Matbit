<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <itemsContainer v-bind:items="items" />
</template>

<script>
import itemsContainer from './components/itemsContainer.vue'

export default {
  name: 'App',
  components: {
    itemsContainer
  },
  data(){
    return{
      items:[{
        id: 1,
        title: "Milk",
        quantity: 300,
        quantityType: "ml",
        isCompleted: false
      },
      {
        id: 2,
        title: "Eggs",
        quantity: 3,
        quantityType: "",
        isCompleted: false
      },
      {
        id: 3,
        title: "Bread",
        quantity: 1,
        quantityType: "",
        isCompleted: false
      }]
    }
  }

}
</script>

<style>

body {background-color: #1a1947;}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
