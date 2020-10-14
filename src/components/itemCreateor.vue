<template>
    <div class="itemCard">
        <div class="itemName">
            <h6>ITEM</h6>
            <h2><input type="text" class="form__field whightText" v-model="newItemValues.name" placeholder="New Item"></h2>
        </div>
            <div class="itemInfo">
                <div class="expDate">
                    <input type="date" v-model="newItemValues.date">
                </div>
            <h6>Amount</h6>
            <h2>
                <input type="text" class="form__field" v-model="newItemValues.quantity.ammount" placeholder="1">
                    <select v-model="newItemValues.quantity.type" class="form__field smallField selectdiv">
                        <option selected value="">Empty</option>
                        <option value="ml">ml</option>
                        <option value="Kg">Kg</option>
                    </select>
            </h2>
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

    .form__field {
        appearance: none;
        font-family: inherit;
        width: 100%;
        border: 0;
        border-bottom: 2px solid var(--gray);
        outline: 0;
        font-size: 1.3rem;
        padding: 7px 0;
        background: transparent;
        transition: border-color 0.2s;
    }
    .form__field:focus{
        padding-bottom: 6px;  
        font-weight: 700;
        border-width: 3px;
        border-image: linear-gradient(to right, var(--primary),var(--secondary));
        border-image-slice: 1;
    }
    .whightText{
        color:  var(--white);
    }
    .smallField{
        width: 40%;
    }

    #btn-add{
        background-color: #2A265F;
        right: 30px;
    }
    #btn-add:hover{
        background-color: #3c368a;
        box-shadow: 0 13px 13px rgba(0, 0, 0, 0.4);
        transform:scale(1.1,1.1);
        cursor: pointer;
    }
    #btn-add:active{
        background-color: #1e1b44;
        box-shadow: 0 6px 6px rgba(0, 0, 0, 0.4);
        transform:scale(0.9,0.9);
        cursor: pointer;
    }
</style>
