<template>

    <div class="recipeCard creator">
        
        <div class="recipeName cardSection">
			<h6>New Recipe</h6>
			<h2><input type="text" class="form__field whiteText" v-model="newRecipeValues.name" placeholder="Recipe Name"></h2>
        </div>
        
        <div class="cardSection addNewItem">
            <h6>Add new item</h6>
            <div class="inputContainer">
                <input type="text" class="form__field smallField" v-model="addItemValues.name" placeholder="Name">
                <input type="text" class="form__field xtrSmallField" v-model="addItemValues.quantity.ammount" placeholder="1"/>
                <select v-model="addItemValues.quantity.type" class="form__field xtrSmallField selectdiv">
                    <itemTypes/>
                </select>
                <button class="btn blue resetFloat" @click="addItem()">+</button>
            </div>
        </div>
        
        <div class="show cardSection greySection">
            <!-- <i class="arrow" :class="['down']"/> -->
            <h6>Added Items</h6>
            <ul class="recipieItems cardSection">
                <li v-for="item in addedItems" v-bind:key="item.id">
                    {{item.name}} : {{item.ammount}} {{item.type}}
                </li>
            </ul> 
        </div>
        
        <div class="buttonContainer cardSection blueSection">
            <button class="btn grey" @click="submitForm()">Add Recipe</button>
        </div>
    
    </div>

</template>

<script>
    import { uuid } from 'vue-uuid';
    import itemTypes from '../helpers/itemTypes';

    function newRecipeTemplate(){
        return{
            name:'',
            items:[]
        }
    }

    function addItemTemplate(){
        return{
            name:'',
            quantity: {
                ammount: '',
                type: ''
            },
        }
    }

    export default{
        name: 'New Recipe',
        components:{
            itemTypes
        },
        data(){
            return{
                newRecipeValues: newRecipeTemplate(),
                addItemValues: addItemTemplate(),
                addedItems:[]
            }
        },
        methods:{
            submitForm(){
                let newRecipe = {};
                
                newRecipe.id = uuid.v4();

                newRecipe.name = this.newRecipeValues.name;
                if(newRecipe.name == "") newRecipe.name = "New Recipe";

                newRecipe.items = this.addedItems;

                this.newRecipeValues = newRecipeTemplate();
                this.addItemValues = addItemTemplate();
                this.addedItems = [];

                /*Vuex*/
                console.log(newRecipe);
                this.$store.commit('addRecipe', newRecipe);

            },
            addItem(){
                let newItem = {};

                newItem.id = uuid.v4();

                newItem.name = this.addItemValues.name;
                if(newItem.name == "") newItem.name = "New Item";

                newItem.ammount = parseInt(this.addItemValues.quantity.ammount);
                if(isNaN(newItem.ammount)) newItem.ammount = 1;

                let itemType = this.addItemValues.quantity.type;

                if(itemType == "") newItem.type = "Item" + (( newItem.ammount == 1)? "":"s");
                else newItem.type = itemType;
                
                this.addedItems.push(newItem)

                this.addItemValues = addItemTemplate();

                //this.$forceUpdate();
            }
        }
    }
</script>

<style scoped>
    .creator{
        margin-top: 10vh;
        z-index:90;
    }

    .inputContainer{
        display:inline-flex;
        justify-content:flex-start;
        align-items: center;
        
    }
    .resetFloat{
        float:initial;

        margin-left: 1vw;
        padding: 0.5pc 1pc;
    }
</style>