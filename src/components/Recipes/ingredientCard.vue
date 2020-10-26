<template>
    <div class="ingredient">
        <div class="dot" :class="checkIngredient(ingredient)"/>
        <div class="ingredientStats">
            {{ingredient.name}} | {{ingredient.ammount}} {{ingredient.type}}
        </div>
        <div class="percentageBar">
            <div class="fillPercent" :style="calculateProgresPercentStyle()"/>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Ingredient',
    props:["ingredient"],
    data: () =>{
        return{
            percentage: 0
        }
    },
    methods:{
        checkIngredient(ingredient){
            var perc = this.getIngredientPercentage(ingredient);
            this.percentage = perc*100;
            
            if(perc>=1) return "green";
            else return "red";
        },
        getIngredientPercentage(ingredientInRecipe){
            var ingredientFtomStorage = this.$store.getters.getItemByName(ingredientInRecipe.name);
            
            if(ingredientFtomStorage.ammount >= ingredientInRecipe.ammount) return 1;
            if(ingredientFtomStorage.ammount < ingredientInRecipe.ammount && ingredientFtomStorage.ammount > 0){
                return ingredientFtomStorage.ammount/ingredientInRecipe.ammount;
            }
            if(ingredientFtomStorage.ammount <= 0) return 0;
        },
        calculateProgresPercentStyle(){
            let progPercent = this.percentage;
            let percentStr = progPercent.toString() + "%";
            
            let percentColor = "#5f1919"; 
            if(progPercent >= 100) percentColor = "#2A265F";
            
            return{'width': percentStr, '--fill-color': percentColor }
        }
    }
}
</script>

<style scoped>
    .ingredient{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        overflow: hidden;
        width: 100%;
        margin-top: 0.5pc;
    }
    .ingredientStats{
        float: left;
        margin-right: 1pc;
        width: fit-content;
        flex-grow: 1;
    }
    .percentageBar{
        position: relative;
        background-color: #ddd;
        border-radius: 3px;
        height: 5px;
        
        width: 10pc;
        overflow: hidden;
        flex-grow: 2;
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
    .dot {
        height: 15px;
        width: 15px;
        background-color: #bbb;
        border-radius: 50%;
        display: inline-block;
        margin-right: 0.5pc;
    }
    .red{
        background-color: #791919;
    }
    .green{
        background-color: #0e4444;
    }
</style>