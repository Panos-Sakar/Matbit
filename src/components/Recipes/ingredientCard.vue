<template>
    <div class="IngredientContainer" @dblclick="toggleEdit()">

        <div v-show="!editItem" class="ingredient">
            
            <i class="dot" :class="checkIngredient(ingredient)"/>
            
            <div class="ingredientStats">
                <h3>{{ingredient.name}} : &nbsp; {{ingredient.ammount}} {{ingredient.type}}</h3>
            </div>
            
            <div class="progress">
                <div class="percentageBar">
                    <div class="fillPercent" :style="calculateProgresPercentStyle()"/>
                </div>
            </div>
        
        </div>

        <div v-show="editItem" class="inputContainer">
            <input type="text" class="form__field xtrSmallField" v-model="newName" onfocus="this.select();">
            <input type="text" class="form__field xxtrSmallField" v-model="newAmmount" onfocus="this.select();"/>
            <select v-model="newType" class="form__field xtrSmallField selectdiv">
                <itemTypes/>
            </select>
            <button class="btn red FloatBRight smallB" @click="toggleEdit()">X</button>
            <button class="btn blue FloatBRight smallB" @click="submitEdit()">ok</button>
        </div>
    </div>

</template>

<script>
import itemTypes from '../helpers/itemTypes';

export default {
    name: 'Ingredient',
    props:["ingredient"],
    components:{
        itemTypes
    },
    data: () =>{
        return{
            percentage: 0,
            ingrStorage: {},
            editItem: false,
            newName: "",
            newAmmount: "",
            newType: ""
        }
    },
    methods:{
        checkIngredient(ingredient){
            this.ingrStorage = this.$store.getters.getItemByName(ingredient.name, ingredient.type);
            this.percentage = this.getIngredientPercentage(ingredient)*100;

            if(this.ingrStorage.ammount>=ingredient.ammount) return "greenDot";
            else if((this.ingrStorage.ammount + this.ingrStorage.expAmmount)>=ingredient.ammount) return "orangeDot";
            else return "redDot";
        },
        getIngredientPercentage(ingredientInRecipe){
            
            var ingredientAmmountAll = this.ingrStorage.ammount + this.ingrStorage.expAmmount;
            
            if(ingredientAmmountAll >= ingredientInRecipe.ammount) 
                { return 1; }
            if(ingredientAmmountAll < ingredientInRecipe.ammount && ingredientAmmountAll > 0) 
                { return ingredientAmmountAll/ingredientInRecipe.ammount; }
            if(ingredientAmmountAll <= 0) 
                { return 0;}
        },
        calculateProgresPercentStyle(){
            let progPercent = this.percentage;
            let percentStr = progPercent.toString() + "%";
            
            let percentColor = "#5f1919"; 
            if(progPercent >= 100) percentColor = "#2A265F";
            
            return{'width': percentStr, '--fill-color': percentColor };
        },
        toggleEdit(){
            this.newName = this.ingredient.name;
            this.newAmmount = this.ingredient.ammount;
            if(this.ingredient.type == "Item" || this.ingredient.type == "Items") this.newType = "";
            else this.newType = this.ingredient.type;

            this.editItem = !this.editItem;
        },
        submitEdit(confirmSubmit = true){
            if(/^ *$/.test(this.newName) || this.newName=="") this.newName = this.ingredient.name;
            
            if(confirmSubmit) this.$store.commit('updateRecipeItem', {
                                                                    recipeId: this.ingredient.recipeId, 
                                                                    itemId:this.ingredient.id,
                                                                    newName: this.newName,
                                                                    newAmmount:this.newAmmount,
                                                                    newType: this.newType
            });

            this.editItem = !this.editItem;
        }
    }
}
</script>

<style scoped>
    .IngredientContainer{
        width: 100%;
    }
    .inputContainer{
        padding: 5px;
        height: calc(2.5pc + 10px);
        width: 100%;
    }
    .smallB{
        margin: 0.3pc;
    }
    .ingredient{
        display: grid;
        
        width: 100%;
        
        padding: 5px;

        grid-template-columns: 2pc auto 5pc;
        grid-template-rows: 1.5pc 1pc;


        grid-template-areas: 
                            "dot stats bts"
                            "dot progress bts"
        ;
    }

    .dot{
        grid-area: dot;
        
        align-self: center;
        justify-self: center;
    
    }

    .ingredientStats{
        grid-area: stats;
        
        justify-self: start;
        align-self: end;
        
        width: auto;
        
    }
    .progress{
        grid-area: progress;
        
        justify-self: start;
        align-self: center;
        
        width: 100%;

    }
    
    .percentageBar{
        position: relative;
        background-color: #ddd;
        border-radius: 3px;
        height: 5px;
        
        width: 100%;

    }
    .fillPercent{
        position: absolute;
        border-radius: 3px;
        background-color: var(--fill-color);
        content: '';
        top: 0;
        left: 0;
        height: 5px;
    }

</style>
