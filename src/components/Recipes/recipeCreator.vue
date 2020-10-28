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
                <button class="btn blue resetFloat circularButton" @click="addItem()">+</button>
            </div>
        </div>
        
        <div class="show cardSection greySection">
            <!-- <i class="arrow" :class="['down']"/> -->
            <h6>Added Items</h6>
            <ul class="recipieItems cardSection">
                <li class="newItem" v-for="item in addedItems" v-bind:key="item.id">
                    <i class="dot"/>
                    <div class="newItemInfo">
                        {{item.name}} | {{item.ammount}} {{item.type}}
                    </div>
                    <button class="btn red resetFloat smallButton" @click="removeItem(item)">-</button>
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
    // eslint-disable-next-line no-unused-vars
    import GM from "../../Mixins/globalMixin";

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
                //newRecipe.isReady = false;

                this.newRecipeValues = newRecipeTemplate();
                this.addItemValues = addItemTemplate();
                this.addedItems = [];



                /*Vuex*/
                this.$store.commit('addRecipe', newRecipe);

            },
            addItem(){
                let newItem = {};

                newItem.id = uuid.v4();

                newItem.name = this.addItemValues.name;
                if(newItem.name == "") newItem.name = "New Item";

                newItem.ammount = parseInt(this.addItemValues.quantity.ammount);
                if(isNaN(newItem.ammount) || newItem.ammount<=0) newItem.ammount = 1;

                let itemType = this.addItemValues.quantity.type;

                if(itemType == "") newItem.type = "Item" + (( newItem.ammount == 1)? "":"s");
                else newItem.type = itemType;
                
                var index = this.addedItems.findIndex(item => (item.name == newItem.name) && (GM.compareTypes(item.type, newItem.type)));

                if(index < 0) this.addedItems.push(newItem);
                else this.addedItems[index].ammount += newItem.ammount;

                this.addItemValues = addItemTemplate();

                //this.$forceUpdate();
            },
            removeItem(itemToRemove){
                var index = this.addedItems.findIndex(item => (item.id === itemToRemove.id));
                this.addedItems.splice(index,1);
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
    .show{
        padding: 0pc;
    }
    .show h6{
        padding: 0.5pc 0pc;
    }
    .recipieItems{
        padding: 0pc;
    }
    .recipieItems li{
        padding: 5px;
    }
    .recipieItems > li:nth-of-type(odd){
        background-color: var(--section-dark-gray-2);
    }

    .resetFloat{
        float:initial;

        margin-left: 1vw;
    }
    .circularButton{
        padding: 0.5pc 0.8pc;
        border-radius: 100%;
    }
    .newItem{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        overflow: hidden;
        width: 100%;

    }
    .newItemInfo{
        float: left;
        margin-right: 1pc;
        width: fit-content;
        flex-grow: 1;
    }
    .smallButton{
        padding: 0.3pc 0.6pc;
        box-shadow: 0 4px 4px rgba(0, 0, 0, 0.4);
        transform:scale(0.9,0.9);
        border-radius: 100%;
        float: right;
    }
    .smallButton:hover{
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.4);
        transform:scale(1.1,1.1);
    }
    .smallButton:active{
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.4);
        transform:scale(0.95,0.95);
    }
    .dot{
        margin-top: 2.5mm;
        margin-bottom: 2.5mm;
        background-color: var(--bg-blue);
    }
</style>
