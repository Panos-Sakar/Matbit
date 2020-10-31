<template>
    
    <div  class="card">
        
        <div class="itemCard">
            
            <div class="itemName">
                <h6 v-show="!editName" class="noselect"> {{item.type}} </h6>
                <h6 v-show="editName" class="noselect"> Rename </h6>
                
                <!-- Normal -->
                <h2 v-show="!editName" @dblclick="toggleEditName()" class="noselect">{{item.name}}</h2>
                
                <!-- Edit -->
                <h2 v-show="editName" class="editContainer">
                    <input type="text" class="form__field whiteText" ref="newNameIn" v-model="newName" onfocus="this.select();" @keyup.enter="submitNewName()" @keyup.esc="submitNewName(false)">
                    <div class="editNameButtons">
                        <button class="btn red smallB" @click="submitNewName(false)">X</button>
                        <button class="btn grey smallB" @click="submitNewName()">Ok</button>
                    </div>
                </h2>
            </div>
            
            <div class="itemInfo">

                <!-- Normal -->
                <div v-show="!editDate" class="progressContainer noselect" @dblclick="toggleEditDate()">
                    <div class="progress" v-bind:style="calculateProgresPercent(item)"></div>
                    <span class="progress-text">
                        Exp: {{getDateString(item.date.expiring)}}
                    </span>
                </div>

                <!-- Edit -->
                <div v-show="editDate" class="expDate">
                    <input type="date" class = "form__field dateFild" ref="newDateIn" v-model="newDate" onfocus="this.select();" @keyup.enter="submitNewDate()" @keyup.esc="submitNewDate(false)">
                </div>

                <h6 class="noselect"> Amount </h6>
                
                <!-- Normal -->

                <h2 v-show="!editAmmount" class="noselect" @dblclick="toggleEditAmmount()">
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

                </div>
                
                <div v-show="!editAmmount && !editDate" class="buttonContainer">
                    <button class="btn red" @click="Delete(item)">Delete</button>
                    <button class="btn blue" @click="togleConsumeCard(item)">Consume</button>
                </div>

                <div v-show="editDate" class="buttonContainer">
                    <span class="editNote"> Confirm Date: </span>
                    <button class="btn red smallB" @click="submitNewDate(false)">X</button>
                    <button class="btn blue smallB" @click="submitNewDate()">Ok</button>
                </div>

                <div v-show="editAmmount" class="buttonContainer">
                    <span class="editNote"> Confirm Quantity: </span>
                    <button class="btn red smallB" @click="submitNewAmmount(false)">X</button>
                    <button class="btn blue smallB" @click="submitNewAmmount()">Ok</button>
                </div>
            
            </div>
        
        </div>
        
        <transition name="fade">
            
            <div v-show="!consumeHidden" class="consumeCard">
                <input type="text" class="form__field xtrSmallField consumeInput" ref="consumeIn" onfocus="this.select();" v-model="consumeValue" placeholder= 0  @keyup.enter="Consume(item)">
                <h2> {{item.quantity.type}} </h2>
                <div class="buttonContainer floatBRight">
                    <button class="btn red" id="btn-cancelConsume" @click="togleConsumeCard()">Cancel</button>
                    <button class="btn blue" id="btn-confirmConsume" @click="Consume(item)">Ok</button>
                </div>
            
            </div>

        </transition>

    </div>

</template>

<script>
    import itemTypes from '../helpers/itemTypes';
    import GM from "../../Mixins/globalMixin";

    export default {
        name: 'Item',
        components:{
            itemTypes
        },
        props:["item"],
        data(){
            return{
                consumeValue: 1,
                consumeHidden: true,
                editName: false,
                editAmmount: false,
                editDate: false,
                newName: "",
                newAmmount: 0,
                newType: "",
                newDate: "" //GM.getFormatedDate(Date.now(),2).toISOString().slice(0,10)
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

                this.$refs.consumeIn.focus();
            },
            togleConsumeCard(){
                this.consumeHidden = !this.consumeHidden;
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

                this.editAmmount = false;
                this.editDate = false;

                this.$refs.newNameIn.focus();
            },
            toggleEditAmmount(){
                this.newAmmount = this.item.quantity.ammount;
                if(this.item.quantity.type == "Item" || this.item.quantity.type == "Items") this.newType = "";
                else this.newType = this.item.quantity.type;
                this.editAmmount = !this.editAmmount;

                this.editName = false;
                this.editDate = false;
            },
            toggleEditDate(){
                this.newDate = GM.getFormatedDate(this.item.date.expiring,1).toISOString().slice(0,10);
                this.editDate = !this.editDate;
                
                this.editName = false;
                this.editAmmount = false;
            },
            submitNewName(confirmSubmit = true){
                if(confirmSubmit) this.$store.commit('renameItem', {itemId: this.item.id, newName:this.newName});
                this.editName = !this.editName;
            },
            submitNewAmmount(confirmSubmit = true){
                if(confirmSubmit) this.$store.commit('repopulateItem', {itemId: this.item.id, newAmmount:this.newAmmount, newType:this.newType});
                this.editAmmount = !this.editAmmount;
            },
            submitNewDate(confirmSubmit = true){
                if(confirmSubmit) this.$store.commit('updateDateItem', {itemId: this.item.id, newDate:this.newDate});
                this.editDate = !this.editDate;
            }
        },
        updated: function () {
            if(this.editName) this.$refs.newNameIn.focus();
            else if(this.newAmmount) this.$refs.newAmmountIn.focus();
            else if(this.newDate) this.$refs.newDateIn.focus();
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
</style>
