<template>

    <div class="items Container" >
        
        <transition-group name="animateItemList" tag="div" v-bind:css="false"
            v-on:enter="enter"
            v-on:leave="leave">

            <div  v-for="item in items" v-bind:key="item.id" class="card">
                <itemCard v-bind:item="item" class="card"/>
            </div>
            <div v-bind:key="itemCreatorKey" class="card">
                <itemCreator/>
            </div>
        
        </transition-group>
    </div>

</template>

<script>
    import itemCard from './itemCard.vue';
    import itemCreator from "./itemCreateor";
    import { uuid } from 'vue-uuid';
    import anime from 'animejs/lib/anime.es.js';

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
