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

</template>

<script>
    export default {
        name: 'item',
        props:["item"],
        methods:{
            getDateString(inDate){
                return inDate.getDate() + "/" + inDate.getMonth() + "/" + inDate.getFullYear();
            },
            getDatePercentage(startDate, endDate){
                let startDif = Date.now() - startDate;
                let endDif = Date.now() - endDate;
                let percentDate = Math.round((startDif/endDif)*100);
                
                if(percentDate>100)
                    percentDate = 100;

                console.log("Percent is: " + percentDate + " Valies are: S " + startDif + " E " + endDif)
                return percentDate;
            },
            consumeClicked(item){
                this.$emit('consume-item', item)
            },
            deleteClicked(item){
                this.$emit('remove-item', item)
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
        }
    }
</script>

<style scoped>

    .itemCard {
        background-color: #fff;
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
        color: #fff;
        padding: 30px;
        max-width: 250px;
        min-width: 250px;
    }

    .itemName a {
        color: #fff;
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

    .progressContainer {
        position: absolute;
        top: 30px;
        right: 30px;
        text-align: right;
        width: 150px;
    }

    .progress {
        background-color: #ddd;
        border-radius: 3px;
        height: 5px;
        width: 100%;
    }

    .progress::after {
        border-radius: 3px;
        background-color: var(--fill-color);
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 5px;
        width: var(--fill-percent);
    }

    .progress-text {
        font-size: 12px;
        opacity: 0.6;
        letter-spacing: 1px;
    }

    .btn{
        border: 0;
        border-radius: 50px;
        box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
        color: #fff;
        font-size: 16px;
        padding: 12px 25px;
        letter-spacing: 1px;
        transition-duration: 0.4s;
        position: absolute;
        bottom: 10px;
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
</style>
