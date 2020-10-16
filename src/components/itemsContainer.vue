<template>
    <div class="itemsContainer">

        <h1 id="separator">Items</h1>
        
        <transition-group name="animateItemList" tag="div" mode="out-in"    
            v-on:before-enter="beforeEnter"
            v-on:enter="enter"
            v-on:leave="leave">

            <div  v-for="item in items" v-bind:key="item.id" class="item">
                <itemCard v-bind:item="item"/>
            </div>
            <div v-bind:key="itemCreatorKey">
                <itemCreator/>
            </div>
        
        </transition-group>
    </div>

</template>

<script>
    import itemCard from './itemCard.vue';
    import itemCreator from "./itemCreateor";
    import { uuid } from 'vue-uuid';

    export default {
        name:"Items",
        components: {
            itemCreator,
            itemCard
        },
        props:["items"],
        data(){
            return{
                itemCreatorKey: uuid.v4()
            }
        },
        methods:{
            beforeEnter: function (element) {
                element.style.opacity = 0.1;
            },
            enter: function (element) {
                var op = 0.1;  // initial opacity
                var timer = setInterval(
                    function () {
                        if (op >= 1){
                            element.style.opacity = 1;
                            clearInterval(timer);
                        }
                        element.style.opacity = op;
                        op += op * 0.08;
                    }, 10
                );
            },
            leave:function (element) {
                var op = 1;
                var scale = 1;  // initial opacity
                var timer = setInterval(
                    function () {
                        if (op <= 0.1){
                            clearInterval(timer);
                        }
                        element.style.opacity = op;
                        element.style.scale = scale;
                        op -= op * 0.3;
                        scale -= scale * 0.1;
                    }, 10
                );
            }
        }
    }
</script>

<style scoped>
    .itemsContainer{
        position: center;
        padding: 0vw 1.5vw;
    }
    #separator{
        margin-top: 10vh;
    }

    /*itemList Animations*/

    .animateItemList-move{
        transition: transform 0.5s ease-in-out;
    }
    .animateItemList-leave-active{
        transition: all 0.5s ease-in-out;
    }


</style>