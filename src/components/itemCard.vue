<template>
	<div class="itemCard">
		<div class="itemName">
			<h6>{{item.type}}</h6>
			<h2>{{item.name}}</h2>
		</div>
		<div class="itemInfo">
			<div class="progressContainer">
				<div class="progress" v-bind:style="calculateProgresPercent(item)"></div>
				<span class="progress-text">
					Exp: {{getDateString(item.date.expiring)}}
				</span>
			</div>
			<h6>Amount</h6>
			<h2>{{item.quantity.ammount}} {{item.quantity.type}}</h2>
			<button class="btn" id="btn-consume" v-on:click=consumeClicked(item)>Consume</button>
            <button class="btn" id="btn-del" v-on:click=deleteClicked(item)>Delete</button>
		</div>
    </div>
    <div v-if = "!this.hidden" class="consumeCard">
        <input type="text" class="consumeInput" v-model="consumeValue" placeholder= 0>
        <button class="btn" id="btn-confirmConsume" v-on:click=confirmConsumeClicked()>Ok</button>
    </div>
</template>

<script>
    export default {
        name: 'item',
        props:["item"],
        emits:['consume-item','remove-item'],
        methods:{
            getDateString(inDate){
                return inDate.getDate() + "/" + (inDate.getMonth() + 1) + "/" + inDate.getFullYear();
            },
            getDatePercentage(startDate, endDate){
                let startDif = Date.now() - startDate;
                let endDif = Date.now() - endDate;
                let percentDate = Math.round((startDif/endDif)*100);
                
                if(percentDate>100)
                    percentDate = 100;

                return percentDate;
            },
            deleteClicked(item){this.$emit('remove-item', item)},
            consumeClicked(){
                this.hidden = false;
            },
            confirmConsumeClicked(){
                this.hidden = true;
                this.$emit('consume-item', this.item.id, this.consumeValue)
                this.consumeValue = 1;
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
            }
        },
        data(){
            return{
                consumeValue: 1,
                hidden: true
            }
        }
    }
</script>

<style scoped>
    @import '../styles/itemCard.css';
    .consumeCard{
        text-align: left;
        background-color: var(--white); 
        border-radius: 10px;
        box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
        display: flex;
        max-width: 100%;
        overflow: hidden;
        margin-top: 1vh;
        width: 100%;
        padding: 30px;
        position: relative;
        width: 100%;
        transition-duration: 0.4s;
    }
    #btn-del{
        background-color: #882323;
        right: 30px;
    }
    #btn-del:hover{
        background-color: #b42e2e;
        box-shadow: 0 13px 13px rgba(0, 0, 0, 0.4);
        transform:scale(1.1,1.1);
        cursor: pointer;
    }
    #btn-del:active{
        background-color: #5f1919;
        box-shadow: 0 6px 6px rgba(0, 0, 0, 0.4);
        transform:scale(0.9,0.9);
        cursor: pointer;
    }
    #btn-consume{
        background-color: #2A265F;
        right: 140px;
    }
    #btn-consume:hover{
        background-color: #3c368a;
        box-shadow: 0 13px 13px rgba(0, 0, 0, 0.4);
        transform:scale(1.1,1.1);
        cursor: pointer;
    }
    #btn-consume:active{
        background-color: #1e1b44;
        box-shadow: 0 6px 6px rgba(0, 0, 0, 0.4);
        transform:scale(0.9,0.9);
        cursor: pointer;
    }
    #btn-confirmConsume{
        background-color: #2A265F;
        right: 30px;
        bottom: 25%;
    }
    #btn-confirmConsume:hover{
        background-color: #3c368a;
        box-shadow: 0 13px 13px rgba(0, 0, 0, 0.4);
        transform:scale(1.1,1.1);
        cursor: pointer;
    }
    #btn-confirmConsume:active{
        background-color: #1e1b44;
        box-shadow: 0 6px 6px rgba(0, 0, 0, 0.4);
        transform:scale(0.9,0.9);
        cursor: pointer;
    }
</style>
