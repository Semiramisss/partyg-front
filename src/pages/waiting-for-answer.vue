<template>
	  <div>
		<div class="row" style="padding-right: 30px;">
			<div style="padding-top: 20px !important;" class="col s9 center-align">
				<span class="step">مرحله {{currentRound}} / {{numOfRounds}}</span>
			</div>
			<div tyle="padding-top: 30px !important;" class="col s3">
				<a  class="waves-effect waves-light modal-trigger" href="#inner-profile" v-on:click="showInnerProfile">
					<img class="menu" src="./../assets/menu_1.png">
				</a>
			</div>
		</div>
		<div style="min-height: 130px;">
			<div class="row" >
				<div class="col s8 right-align" style="margin-top: 25px;">
					<span class="question_waiting">{{getCurrentQuestion}}</span>
				</div>
				<div class="col s4" style="height:120px">
					<div class="Group_question">
						<img class="profile_off" src="./../assets/profile_off.png">	
						<img class="photo_question"  :src="require('./../assets/images/profile/'+getCurrentQuestionOwner%10+'.png')" >	
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col s12">
				<svg viewBox="0 0 375 5">
					<path class="Line" d="M 0 0 L 375 0">
					</path>
			    </svg>
			</div>
		</div>
		<div class="row">
			<div class="col s12 right-align" style="margin-top:10px;">
			 	<span class="subtitle_question">.یکم منتظر باش تا همه جواب بدن</span>
			</div>
		</div>
	
		<!-- <template v-for="answer in answersList" :key="answer.id"> -->
			<div class="row" style="direction: rtl;" v-for="answer in answersList" :key="answer.id">
				<div class="col s3 right-align" v-bind:id="`buzz${answer.id}`" >
					<img v-if="!answer.has_answer" class="buzz" src="./../assets/buzz.png" >
				</div>
				<div class="col s5 center-align">
					<div class="gamer_name">{{answer.name}}</div>
				</div>
				<div class="col s4" style="height:120px">
					<div class="Group">
						<img class="profile" src="./../assets/profile.png" >    
						<img class="photo" :src="selectGamerProfile(answer.id)" >      
					</div>
				</div>
			</div>
		<!-- </template> -->
    </div>    
</template>

<script>
import axios from 'axios'
export default {
	data(){
		return {
			openProfile:false,
			modalStyle:{
				'z-index':1003,
				'width':'100%',
				'height':'100%',
				'display':'block',
				'opacity':1,
				'transform':'scaleX(1) scaleY(1)',
				'top':'0',
				'overflow-y': 'hidden !important',
				'background':'transparent',
				'background-color': 'rgba(0, 0, 0, 0.5)',
				'position':'absolute',
			},
			getCurrentQuestion: localStorage.getItem('currentQuestion'),
			getCurrentQuestionOwner: localStorage.getItem('currentQuestionOwner'),
			currentRound: localStorage.getItem("current_round"),
			numOfRounds: localStorage.getItem("num_of_rounds"),
			answers:[],
			answersList:[],
		}
	},
	created(){
		if(localStorage.getItem('game-token')){
			this.answerInterval=setInterval(()=>this.getAnswersStatus(),10000);
		}
	},
	watch:{
		answers: function(){
			this.answersList=this.answers;
		}
	},
	methods:{
		showInnerProfile:function(){
			this.openProfile=true;
		},
		selectGamerProfile(gamerId){
			return require('./../assets/images/profile/'+gamerId%10+'.png')
		},
		getAnswersStatus(){
			// get answers
			let answeredByAll= true;
			axios({
					method: 'GET',
					url: `http://localhost:8000/api/waiting/`,
					params: {
						"GTKN": localStorage.getItem('game-token'),
						'Access-Control-Allow-Origin': '*',
					}
				}).then((response)=>{
					if(this.answers !=response.data){
						this.answers=response.data;
						this.answers.forEach(answer => {
							if(!answer.has_answer){
								answeredByAll=false;
							}
						});
						if(answeredByAll){
							this.$router.push('/approbate-question');
						}
					}	
				}).catch(function(error){
					console.log(error);
				});
		}
	},
	beforeDestroy(){
		clearInterval(this.answerInterval)
	}
    
}
</script>
<style scoped>
</style>