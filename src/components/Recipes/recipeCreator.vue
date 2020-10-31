<template>

    <div class="recipeCard creator">
        
        <div class="recipeName cardSection">
			<h6 class="noselect">New Recipe</h6>
			<h2><input type="text" class="form__field whiteText" v-model="newRecipeValues.name" placeholder="Recipe Name"></h2>
        </div>
        
        <div class="cardSection addNewItem">
            <h6 class="noselect">Add new ingredient</h6>
            <div class="inputContainer">
                <input type="text" class="form__field smallField" v-model="addItemValues.name" placeholder="Name">
                <input type="text" class="form__field xtrSmallField" v-model="addItemValues.quantity.ammount" placeholder="1"/>
                <select v-model="addItemValues.quantity.type" class="form__field xtrSmallField selectdiv">
                    <itemTypes/>
                </select>
                <button class="btn blue FloatBRight circularButton" @click="addItem()">+</button>
            </div>
        </div>
        
        <div class="show cardSection greySection">
            <!-- <i class="arrow" :class="['down']"/> -->
            <h6 class="noselect">Added ingredients</h6>
            <ul class="recipieItems cardSection">
                <li class="newItem" v-for="item in addedItems" v-bind:key="item.id" @mouseover="hoverOver(item)" @mouseleave="leaveOver(item)">
                    <i class="dot"/>
                    <div class="newItemInfo noselect">
                        {{item.name}} | {{item.ammount}} {{item.type}}
                    </div>
                    <button v-show="removeBs[item.index]" class="btn red FloatBRight smallButton" @click="removeItem(item)">-</button>
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
                addedItems:[],
                removeBs: []
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
                this.removeBs = [];

                if(newRecipe.items.length > 0) this.$store.commit('addRecipe', newRecipe);

            },
            addItem(){
                let newItem = {};

                newItem.id = uuid.v4();
                newItem.index = this.addedItems.length;

                newItem.name = this.addItemValues.name;
                if(newItem.name == "") newItem.name = "New Item";

                newItem.ammount = parseInt(this.addItemValues.quantity.ammount);
                if(isNaN(newItem.ammount) || newItem.ammount<=0) newItem.ammount = 1;

                let itemType = this.addItemValues.quantity.type;

                if(itemType == "") newItem.type = "Item" + (( newItem.ammount == 1)? "":"s");
                else newItem.type = itemType;
                
                var index = this.addedItems.findIndex(item => (item.name == newItem.name) && (GM.compareTypes(item.type, newItem.type)));

                if(index < 0){
                    this.removeBs.push(false)
                    this.addedItems.push(newItem);
                } 
                else this.addedItems[index].ammount += newItem.ammount;

                this.addItemValues = addItemTemplate();

                //this.$forceUpdate();
            },
            removeItem(itemToRemove){
                var index = this.addedItems.findIndex(item => (item.id === itemToRemove.id));
                this.addedItems.splice(index,1);

                for (let i = index; i < this.addedItems.length; i++) this.addedItems[i].index--;
                for (let i = 0; i < this.removeBs.length; i++) this.removeBs[i] = false;

            },
            hoverOver(item){
                this.removeBs[item.index] = true;
            },
            leaveOver(item){
                this.removeBs[item.index] = false;
            }
        }
    }
</script>

<style scoped>
    .dot{
        background-color: var(--bg-blue);
    }
</style>
