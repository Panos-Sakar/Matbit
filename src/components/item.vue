<template>
  <div class="item" v-bind:class="{'is-complete':item.isCompleted}">
      <p><input type="checkbox" v-on:change="markComplete">{{item.title}} | {{item.quantity}} {{item.quantityType}}</p>
  </div>
</template>

<script>
export default {
  name: 'item',
  props:["item"],
  methods:{
      markComplete(){
          // eslint-disable-next-line vue/no-mutating-props
          this.item.isCompleted = !this.item.isCompleted;
      }
  }
}
</script>

<style scoped>
    .item {
        background: #131338;
        padding: 10px;
        border-bottom: 5px #1a1947 dotted;
        color: #b9a342;
    }
    .is-complete {
        text-decoration: line-through;
    }
</style>
