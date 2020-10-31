<template>
    <div class="ingredient">
        <i class="dot" :class="checkIngredient(ingredient)"/>
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
            percentage: 0,
            ingrStorage: {}
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
            
            if(ingredientAmmountAll >= ingredientInRecipe.ammount) return 1;
            if(ingredientAmmountAll < ingredientInRecipe.ammount && ingredientAmmountAll > 0){
                return ingredientAmmountAll/ingredientInRecipe.ammount;
            }
            if(ingredientAmmountAll <= 0) return 0;
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
        padding: 5px 15px;
    }
    .recipieItems > div:nth-of-type(odd){
    background-color: var(--section-dark-gray-2);
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

</style>
