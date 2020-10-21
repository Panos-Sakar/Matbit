<template>
    <div class="itemCard creator">
        <div class="itemName">
            <h6>NEW ITEM</h6>
            <h2><input type="text" class="form__field whightText" v-model="newItemValues.name" placeholder="Item Name"></h2>
        </div>
        <div class="itemInfo">
            <h6>Amount</h6>
            <h2>
                <input type="text" class="form__field mediumField" v-model="newItemValues.quantity.ammount" placeholder="1"/>
                <select v-model="newItemValues.quantity.type" class="form__field smallField selectdiv">
                    <option selected value="">Item</option>
                    <option value="ml">ml</option>
                    <option value="Kg">Kg</option>
                    <option value="Kg">g</option>
                </select>
            </h2>
            <div class="expDate">
                <input type="date" class = "form__field dateFild" v-model="newItemValues.date">
            </div>
            <div class="buttonContainer">
                <button class="btn blue" id="btn-add" v-on:click=submitForm()>Add Item</button>
            </div>
        </div>
    </div>
</template>

<script>
    import { uuid } from 'vue-uuid';

    function newItemTemplate(){
        return{
            name:'',
            quantity: {
                ammount: '',
                type: ''
            },
            date: new Date().toISOString().slice(0,10)
        }
    }

    export default{
        name: 'New Item',
        data(){
            return{
                newItemValues: newItemTemplate()
            }
        },
        methods:{
            submitForm(){
                let newItem = {};
                
                newItem.id = uuid.v4();
                newItem.name = this.newItemValues.name;
                if(newItem.name == "") newItem.name = "New Item";

                newItem.type = "Item";
                
                newItem.quantity = {};
                newItem.quantity.ammount = parseInt(this.newItemValues.quantity.ammount);
                if(isNaN(newItem.quantity.ammount)) newItem.quantity.ammount = 1;
                
                let itemType = this.newItemValues.quantity.type;
                
                if(itemType == "") newItem.quantity.type = "Item" + (( newItem.quantity.ammount == 1)? "":"s");
                else newItem.quantity.type = itemType;

                newItem.date = {};
                newItem.date.entered = new Date(Date.now());
                newItem.date.expiring = new Date(this.newItemValues.date);
                if(isNaN(newItem.date.expiring)) newItem.date.expiring = new Date(Date.now());

                this.newItemValues = newItemTemplate();

                /*Vuex*/
                this.$store.commit('addItem', newItem);
            }
        }
    }
</script>

<style scoped>
    
    .expDate {
        position: absolute;
        top: 1.5vh;
        right: 2.5vw;
        text-align: right;
    }
    .dateFild{
        font-size: 1rem;
        padding: 0;
        margin: 0;
        width: 100%;
    }
    .itemCard{
        margin-top: 10vh;
        z-index:90;
    }
</style>
