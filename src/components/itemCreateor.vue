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
        methods:{
            submitForm(){
                let item = {};
                
                item.id = uuid.v4();
                item.name = this.newItemValues.name;
                if(item.name == "") item.name = "New Item";

                item.type = "Item";
                
                item.quantity = {};
                item.quantity.ammount = parseInt(this.newItemValues.quantity.ammount);
                item.quantity.type = this.newItemValues.quantity.type;
                if(isNaN(item.quantity.ammount)) item.quantity.ammount = 1;

                item.date = {};
                item.date.entered = new Date(Date.now());
                item.date.expiring = new Date(this.newItemValues.date);
                if(isNaN(item.date.expiring)) item.date.expiring = new Date(Date.now());

                this.newItemValues = newItemTemplate();

                this.$emit('new-item-created', item);          
            }
        }
    }
</script>

<style scoped>
    * {
        --primary: #11998e;
        --secondary: #38ef7d;
        --white: #fff;
        --gray: #9b9b9b;
    }

    .itemCard {
        text-align: left;
        background-color: var(--white);
        border-radius: 10px;
        box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
        display: flex;
        max-width: 100%;
        margin: 20px;
        overflow: hidden;
        width: 700px;
    }

    .itemCard h6 {
        opacity: 0.6;
        margin: 0;
        letter-spacing: 1px;
        text-transform: uppercase;
    }

    .itemCard h2 {
        letter-spacing: 1px;
        margin: 10px 0;
    }

    .itemName {
        background-color: #2A265F;
        color:var(--white);
        padding: 30px;
        max-width: 200px;
        min-width: 200px;
    }

    .itemName a {
        color: var(--white);
        display: inline-block;
        font-size: 12px;
        opacity: 0.6;
        margin-top: 30px;
        text-decoration: none;
    }

    .itemInfo {
        padding: 30px;
        position: relative;
        width: 100%;
    }

    .expDate {
        position: absolute;
        top: 12px;
        right: 30px;
        text-align: right;
        width: 150px;
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
    .btn{
        border: 0;
        border-radius: 50px;
        box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
        color: var(--white);
        font-size: 16px;
        padding: 12px 25px;
        letter-spacing: 1px;
        transition-duration: 0.4s;
        position: absolute;
        bottom: 10px;
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
