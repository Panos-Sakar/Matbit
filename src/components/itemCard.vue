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
            <div class="buttonContainer">
                <button class="btn blue" @click=togleConsumeCard(item)>Consume</button>
                <button class="btn red" @click=Delete(item)>Delete</button>
            </div>
		</div>
    </div>
    <transition name="fade">
        <div v-if = "!this.hidden" class="consumeCard">
            <input type="text" class="form__field xtrSmallField consumeInput" v-model="consumeValue" placeholder= 0>
            <h2> {{item.quantity.type}} </h2>
            <div class="buttonContainer">
                <button class="btn blue" id="btn-cancelConsume" @click=togleConsumeCard()>Cancel</button>
                <button class="btn blue" id="btn-confirmConsume" @click=Consume(item)>Ok</button>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'item',
        props:["item"],
        data(){
            return{
                consumeValue: 1,
                hidden: true
            }
        },
        methods:{

            /*Button functions*/
            
            Delete(item){
                this.$store.commit('removeItem', item);
            },
            Consume(item){
                this.$store.commit('consumeItem', { 
                        consumeItem:item,  ammount: this.consumeValue
                    });

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
                let startDif = Date.now() - startDate;
                let endDif = Date.now() - endDate;
                let percentDate = Math.round((startDif/endDif)*100);
                
                if(percentDate>100)
                    percentDate = 100;

                return percentDate;
            }
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
