<template>

    <div class="recipeCard">
        
        <div class="recipeName cardSection">
			<h6>Recipe</h6>
			<h2>{{recipe.name}}</h2>
        </div>
        
        <div class="recipeStatus cardSection">
            <h2 v-if="isReady()" class="greenText">Sufficient ingrediens</h2>
            <h2 v-else-if="isReadyWithExp()" class="orangeText">Sufficient ingrediens <br> (with expired items)</h2>
            <h2 v-else class="redText">Insufficient ingrediens</h2>
        </div>
        
        <div class="show cardSection greySection">
            <div v-if="this.showItems" class="recipieItems cardSection">
                <ingredient v-for="ingr in recipe.items" v-bind:key="ingr.id" v-bind:ingredient="ingr"/>
            </div>
            <div class="showButton" v-on:click="toggleItems()">
                <i class="arrow" :class="[showItems? 'up' : 'down']"/>
            </div>
        </div>
        
        <div class="buttonContainer cardSection blueSection">
            <button class="btn red" @click="Delete(recipe)">Delete</button>
            <button class="btn grey" @click="makeRecipe(recipe)">Make</button>
        </div>
    
    </div>

</template>

<script>
    import ingredient from './ingredientCard';

    export default {
        name: 'Recipe',
        props:["recipe"],
        components: {
            ingredient
        },
        data: () => {
            return{
                showItems: false,
                expItems: []
            }
        },
        methods:{
            toggleItems(){
                this.showItems = !this.showItems;
                this.$forceUpdate();
            },
            isReady(){
                this.checkIngridientStatus(this.recipe)
                return this.recipe.isReady;
            },
            isReadyWithExp(){
                this.checkIngridientStatus(this.recipe)
                return this.recipe.isReadyWithExp;
            },
            checkIngridientStatus(recipe){
                this.$store.commit('checkRecipeStatus', recipe.id);
            },
            Delete(recipe){
                this.$store.commit('removeRecipe', recipe);
            },
            makeRecipe(recipe){
                if(recipe.isReady) this.$store.commit('executeRecipe', recipe);
            }
        }
    }
</script>

<style scoped>
    .recipieItems{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        flex-wrap: nowrap;
        overflow: hidden;

    }
</style>
