<template>

    <div class="recipes Container" >
        
        <transition-group name="animateItemList" tag="div" v-bind:css="false"
            v-on:enter="enter"
            v-on:leave="leave">

            <recipeCard  v-for="recipe in recipes" v-bind:key="recipe.id" v-bind:recipe="recipe"/>

            <recipeCreator v-bind:key="recipeCreatorKey"/>
        
        </transition-group>
    </div>

</template>

<script>
    import { uuid } from 'vue-uuid';
    import anime from 'animejs/lib/anime.es.js';
    import recipeCard from './recipeCard'
    import recipeCreator from './recipeCreator.vue';

    export default {
        name:"Recipes",
        components: {
            recipeCard,
            recipeCreator
        },
        props:["recipes"],
        data(){
            return{
                recipeCreatorKey: uuid.v4()
            }
        },
        methods:{
            enter(el,done){
                anime({
                    targets: el,
                    duration: 350,
                    translateY: [50, 0],
                    scale: [0.5, 1],
                    opacity: [0, 1],
                    easing: 'easeInOutSine',
                    complete: done,
                })
            },
            leave(el,done){
                anime({
                    targets: el,
                    duration: 350,
                    translateX: [0, 50],
                    scale: {
                        delay: 100,
                        value:[1, 0.5]
                    },
                    opacity: [1, 0],
                    easing: 'easeInOutSine',
                    complete: done,
                })
            }
        }
    }
</script>
