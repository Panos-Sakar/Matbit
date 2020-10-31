<template>

    <div class="recipeCard">
        


        <div class="recipeName cardSection">
			<h6 v-show="!editName" class="noselect"> Recipe </h6>
            <h6 v-show="editName" class="noselect"> Rename </h6>

			<h2 v-show="!editName" @dblclick="toggleEditName()" class="noselect"> {{recipe.name}} </h2>
            <h2 v-show="editName" class="editContainer">
                <input type="text" class="form__field whiteText" ref="newNameIn" v-model="newName" onfocus="this.select();" @keyup.enter="submitNewName()" @keyup.esc="submitNewName(false)">
                
                <div class="buttonContainer">    
                    <button class="btn red smallB" @click="submitNewName(false)">X</button>
                    <button class="btn grey smallB" @click="submitNewName()">Ok</button>
                </div>
            </h2>
            
        </div>
        
        <div class="recipeStatus cardSection noselect">
            <h2 v-if="isReady()" class="greenText">Sufficient ingrediens</h2>
            <h2 v-else-if="isReadyWithExp()" class="orangeText">Sufficient ingrediens <br> (with expired items)</h2>
            <h2 v-else class="redText">Insufficient ingrediens</h2>
        </div>
        
        <div class="show cardSection greySection noselect">
            <h6 class="noselect">Ingredients</h6>
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
                editName: false,
                expItems: [],
                newName: ""
                
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
            },
            editRecipe(recipe){
                console.log("Editing " + recipe.name)
            },
            toggleEditName(){
                this.newName = this.recipe.name
                this.editName = !this.editName;
                
            },
            submitNewName(confirmSubmit = true){
                if(confirmSubmit) this.$store.commit('renameRecipe', {recipeId: this.recipe.id, newName:this.newName});
                this.editName = !this.editName;
            }
        },
        updated: function () {
            if(this.editName) this.$refs.newNameIn.focus();
        }
    }
</script>

<style scoped>
    .editContainer{
        flex-flow: row;
    }
    .recipieItems > div:nth-of-type(odd){
        background-color: var(--section-dark-gray-2);
    }
</style>
