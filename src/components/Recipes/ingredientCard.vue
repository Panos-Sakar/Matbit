<template>
    <div class="ingredient">
        
        <i class="dot" :class="checkIngredient(ingredient)"/>
        
        <div class="ingredientStats">
            {{ingredient.name}} | {{ingredient.ammount}} {{ingredient.type}}
        </div>
        <div class="progress">
            <div class="percentageBar">
                <div class="fillPercent" :style="calculateProgresPercentStyle()"/>
            </div>
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
        display: grid;
        
        width: 100%;
        
        padding: 4px 0px;
        padding-left: 5px;

        grid-template-columns: 2pc auto;
        grid-template-rows: 1.5pc 1pc;


        grid-template-areas: 
                            "dot stats"
                            "dot progress"
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
        
        width: 90%;

        margin-right: 1pc;
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
