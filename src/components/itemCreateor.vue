<template>
    <div class="itemCard">
        <div class="itemName">
            <h6>ITEM</h6>
            <h2><input type="text" class="form__field whightText" v-model="newItemValues.name" placeholder="New Item"></h2>
        </div>
        <div class="itemInfo">
            <h6>Amount</h6>
            <h2>
                <input type="text" class="form__field" v-model="newItemValues.quantity.ammount" placeholder="1">
                    <select v-model="newItemValues.quantity.type" class="form__field smallField selectdiv">
                        <option selected value="">Empty</option>
                        <option value="ml">ml</option>
                        <option value="Kg">Kg</option>
                    </select>
            </h2>
            <div class="expDate">
                <input type="date" class = "form__field dateFild" v-model="newItemValues.date">
            </div>
            <button class="btn" id="btn-add" v-on:click=submitForm()>Add Item</button>
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
            date: ''
        }
    }

    export default{
        name: 'New Item',
        data(){
            return{
                newItemValues: newItemTemplate()
            }
        },
        emits:['new-item-created'],
        methods:{
            submitForm(){
                let newItem = {};
                
                newItem.id = uuid.v4();
                newItem.name = this.newItemValues.name;
                if(newItem.name == "") newItem.name = "New Item";

                newItem.type = "Item";
                
                newItem.quantity = {};
                newItem.quantity.ammount = parseInt(this.newItemValues.quantity.ammount);
                newItem.quantity.type = this.newItemValues.quantity.type;
                if(isNaN(newItem.quantity.ammount)) newItem.quantity.ammount = 1;

                newItem.date = {};
                newItem.date.entered = new Date(Date.now());
                newItem.date.expiring = new Date(this.newItemValues.date);
                if(isNaN(newItem.date.expiring)) newItem.date.expiring = new Date(Date.now());

                this.newItemValues = newItemTemplate();

                this.$emit('new-item-created', newItem);          
            }
        }
    }
</script>

<style scoped>
    @import '../styles/itemCard.css';
    
    .expDate {
        position: absolute;
        top: 1.5vh;
        right: 2.5vw;
        text-align: right;
        width: 30vw;
    }

    .whightText{
        color:  var(--white);
    }
    .smallField{
        width: 40%;
    }
    .dateFild{
        width: 35%;
        font-size: 1rem;
        border-width: 2px;
        text-align: right;
    }
    .dateFild:active{
        text-align: center;
        border-width: 3px;
    }
    #btn-add{
        background-color: #2A265F;
        right: 0.8pc;
    }
    #btn-add:hover{
        background-color: #3c368a;
        box-shadow: 0 13px 13px rgba(0, 0, 0, 0.4);
        transform:scale(1.1,1.1);
    }
    #btn-add:active{
        background-color: #1e1b44;
        box-shadow: 0 6px 6px rgba(0, 0, 0, 0.4);
        transform:scale(0.9,0.9);
    }
</style>
