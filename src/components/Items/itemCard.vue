<template>
    
    <div  class="card">
        
        <div class="itemCard">
            
            <div class="itemName">
                <h6 class="noselect">{{item.type}}</h6>
                <!-- Normal -->
                <h2 v-show="!editName" @dblclick="toggleEditName()" class="noselect">{{item.name}}</h2>
                <!-- Edit -->
                <h2 v-show="editName" class="editContainer">
                    <input type="text" class="form__field whiteText" ref="newNameIn" v-model="newName" onfocus="this.select();" @keyup.enter="submitNewName()" @keyup.esc="submitNewName(false)">
                    <div class="editNameButtons">
                        <button class="btn grey smallB" @click="submitNewName()">Ok</button>
                        <button class="btn red smallB" @click="submitNewName(false)">X</button>
                    </div>
                </h2>
            </div>
            
            <div class="itemInfo">
                
                <div class="progressContainer noselect">
                    <div class="progress" v-bind:style="calculateProgresPercent(item)"></div>
                    <span class="progress-text">
                        Exp: {{getDateString(item.date.expiring)}}
                    </span>
                </div>

                <h6 class="noselect">Amount</h6>
                
                <!-- Normal -->

                <h2 class="noselect" v-show="!editAmmount" @dblclick="toggleEditAmmount()">
                    {{item.quantity.ammount}} {{item.quantity.type}}
                </h2>

                <!-- Edit -->
                <div v-show="editAmmount">
                    <h2>
                        <input type="text" class="form__field smallField" ref="newAmmountIn" v-model="newAmmount" onfocus="this.select();" @keyup.enter="submitNewAmmount()" @keyup.esc="submitNewAmmount(false)"/>
                        <select class="form__field smallField selectdiv" v-model="newType" @keyup.enter="submitNewAmmount()" @keyup.esc="submitNewAmmount(false)">
                            <itemTypes/>
                        </select>
                    </h2>
                    <button class="btn red smallB" @click="submitNewAmmount(false)">X</button>
                    <button class="btn blue smallB" @click="submitNewAmmount()">Ok</button>
                </div>
                
                <div v-show="!editAmmount" class="buttonContainer">
                    <button class="btn red" @click="Delete(item)">Delete</button>
                    <button class="btn blue" @click="togleConsumeCard(item)">Consume</button>
                </div>
            
            </div>
        
        </div>
        
        <transition name="fade">
            
            <div v-if = "!this.hidden" class="consumeCard">
                <input type="text" class="form__field xtrSmallField consumeInput" v-model="consumeValue" placeholder= 0>
                <h2> {{item.quantity.type}} </h2>
                <div class="buttonContainer">
                    <button class="btn blue" id="btn-confirmConsume" @click="Consume(item)">Ok</button>
                    <button class="btn blue" id="btn-cancelConsume" @click="togleConsumeCard()">Cancel</button>
                </div>
            
            </div>
        </transition>

    </div>

</template>

<script>
    import itemTypes from '../helpers/itemTypes';

    export default {
        name: 'Item',
        components:{
            itemTypes
        },
        props:["item"],
        data(){
            return{
                consumeValue: 1,
                hidden: true,
                editName: false,
                editAmmount: false,
                newName: "",
                newAmmount: 0,
                newType: ""
            }
        },
        methods:{

            /*Button functions*/
            
            Delete(item){
                this.$store.commit('removeItem', item);
            },
            Consume(item){
                this.$store.commit('consumeItem', { consumeItem:item,  ammount: this.consumeValue });

                this.togleConsumeCard()
            },
            togleConsumeCard(){
                this.hidden = !this.hidden;
                this.consumeValue = 1;
            },

            /*Date functions*/
            
            getDateString(inDate){
                return inDate.getDate() + "/" + (inDate.getMonth() + 1) + "/" + inDate.getFullYear();
            },
            calculateProgresPercent(item){
                let progPercent = this.getDatePercentage(item.date.entered,item.date.expiring);
                let percentStr = progPercent.toString() + "%";
                let percentColor = "#2A265F";
                if(progPercent > 90)
                    percentColor = "#5f1919"
                
                return{
                    '--fill-percent': percentStr,
                    '--fill-color': percentColor
                }
            },
            getDatePercentage(startDate, endDate){
                let percentDate = 0;

                let tempToday = new Date(Date.now());

                let today = new Date(tempToday.getFullYear(), tempToday.getMonth(), tempToday.getDate());

                if(today>=endDate) percentDate = 100;
                else if(today < endDate && today > startDate) percentDate = ((today - startDate)/(endDate - startDate))*100;
                
                if(percentDate>=100) percentDate = 100;
                if(percentDate<0) percentDate = 0;

                return percentDate;
            },
            toggleEditName(){
                this.newName = this.item.name
                this.editName = !this.editName;
                this.$refs.newNameIn.focus();
            },
            toggleEditAmmount(){
                this.newAmmount = this.item.quantity.ammount;
                if(this.item.quantity.type == "Item" || this.item.quantity.type == "Items") this.newType = "";
                else this.newType = this.item.quantity.type;
                this.editAmmount = !this.editAmmount;
            },
            submitNewName(confirmSubmit = true){
                if(confirmSubmit) this.$store.commit('renameItem', {itemId: this.item.id, newName:this.newName});
                this.editName = !this.editName;
            },
            submitNewAmmount(confirmSubmit = true){
                if(confirmSubmit) this.$store.commit('repopulateItem', {itemId: this.item.id, newAmmount:this.newAmmount, newType:this.newType});
                this.editAmmount = !this.editAmmount;
            }
        },
        updated: function () {
            if(this.editName) this.$refs.newNameIn.focus();
            else if(this.newAmmount) this.$refs.newAmmountIn.focus();
        }
    }
</script>

<style scoped>

    .consumeCard h2{
        margin: 0vw 1vw;
    }

    /*consume card animation*/

    .fade-enter-active {
        animation: bounce-in 0.4s;
    }
    
    .fade-leave-active {
        animation: bounce-out 0.2s;
    }
      
    @keyframes bounce-in {
        0%{
            transform: translateX(10vw) scale(0.8);
            opacity: 0;
        }
        100%{
            transform: translateX(0vw) scale(1);
            opacity: 1;
        }
    }
    @keyframes bounce-out {
        0%{
            transform: translateX(0vw) scale(1);
            opacity: 1;
        }
        100%{
            transform: translateX(-10vw) scale(0.8);
            opacity: 0;
        }
    }
    .editContainer{
        display: flex;
        flex-flow: column;
        justify-content: flex-start;
        align-content: flex-start;
    }
    .editNameButtons{
        padding-top: 1pc;
        display: flex;
        justify-content: flex-end;
        align-content: center;
    }
    .smallB{
        display: flex;
        width: 3pc;
        justify-content: center;
    }
</style>
