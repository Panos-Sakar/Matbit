<template>

    <div class="recipeCard">
        
        <div class="recipeName cardSection">
			<h6>Recipe</h6>
			<h2>{{recipe.name}}</h2>
        </div>
        
        <div class="recipeStatus cardSection">
            <h2>Ready</h2>
        </div>
        
        <div class="show cardSection greySection" v-on:click="toggleItems(this.style)">
            <i class="arrow" :class="[this.showItems? 'up' : 'down']"/>
            <div v-if="this.showItems" class="recipieItems cardSection">
                <ul>
                    <li>Coffee</li>
                    <li>Tea</li>
                    <li>Milk</li>
                </ul> 
            </div>
        </div>
        
        <div class="buttonContainer cardSection blueSection">
            <button class="btn red" @click="aletMsg('Deleted ' + this.recipe.name)">Delete</button>
            <button class="btn grey" @click="aletMsg('Made ' + this.recipe.name)">Make</button>
        </div>
    
    </div>

</template>

<script>
    export default {
        name: 'Recipe',
        props:["recipe"],
        data(){
            return{
                showItems: false
            }
        },
        methods:{
            toggleItems(ctx){
                this.showItems = !this.showItems;
                console.log(ctx);
            },
            aletMsg(msg){
                console.log(msg);
            }
        }
    }
</script>
