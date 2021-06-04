<template>
    <div>
		<div class="row" style="padding-right: 30px;">
			<div style="padding-top: 20px !important;" class="col s9 center-align">
				<span class="step">مرحله {{currentRound}} / {{numOfRounds}}</span>
			</div>
			<div style="padding-top: 30px !important;" class="col s3">
				<a  class="waves-effect waves-light modal-trigger" href="#inner-profile" v-on:click="showInnerProfile">
					<img class="menu" src="./../assets/menu_1.png">
				</a>
			</div>
		</div>
		<div style="min-height: 130px;">
			<div class="row" >
				<div class="col s8 right-align" style="padding-top: 10px;" >
					<span class="question">{{currentQuestion}}</span>
				</div>
				<div class="col s4" style="height:100px">
					<div class="Group_question">
						<img class="profile_off" src="./../assets/profile_off.png">	
						<img class="photo_question" :src="require('./../assets/images/profile/'+currentQuestionOwner%10+'.png')" >	
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
			<div class="col s3"></div>
			<div class="col s6 center-align">
				<div class="Group_question">
					<img class="profile_question" src="./../assets/profile.png" >    
					<img class="profile-image" :src="currentGamerProfile()" >      
				</div>
			</div>
			<div class="col s3"></div>
		</div>

		<div class="row">
			<div class="col s12 center-align">
				<input style="width: 250px;height: 70px;" class="inputBox_question" v-model="answer" placeholder="پاسخ چند کلمه‌ای تو اینجا بنویس">
			</div>
		</div>
		<div class="row">
			<div class="col s12 center-align">
				<button @click="sendAnswer" class="login" >ارسال پاسخ</button>
			</div>
		</div>

		<!-- Modal Structure -->
		<div id="profile" :class="['center-align modal',openProfile?' open':'']" :style="[openProfile ? modalStyle: '']">
			<div style="width:300px; display: inline-flex; margin-top: 200px;">
				<div class=" modal-content  profile-bg" >
					<div class="row no-padding center-align">
						<button onclick="" class="profile-edit center-align" >ویرایش پروفایل</button>
					</div>	
					
					<div style="position:relative;top:80px;">
						<button  @click="closeInnerProfile" class="cancel" >هیچی</button>
					</div>
				</div>
			</div>
		</div>
    </div>
</template>
<script>
import axios from "axios";
export default {
    data(){
		return{
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
			rounds:localStorage.getItem('game-rounds'),
			currentQuestion:'',
			currentQuestionOwner:'',
			responsed:false,
			answer:'',
			currentRound:'',
			numOfRounds:'',
		}
	},
	created(){
		// get question from server
		if (localStorage.getItem('game-token')) {
			axios({
			method: 'GET',
			url: `http://localhost:8000/api/question/`,
			params: {
				"GTKN": localStorage.getItem('game-token'),
				'Access-Control-Allow-Origin': '*',
			}
			}).then((response)=>{
				if(response.data){
					//how check finishing game
					if(response.data[0]["answered_by_all"] && response.data[0]["voted_by_all"]){
						// the latest question redirect to winner page
						this.$router.push('/score-table');
					}else if(!response.data[0]["answered_by_all"] && this.responsed ){
						this.$router.push('/waiting-for-answer');
					}else{
						this.currentQuestion=response.data[0]["text"];
						this.currentQuestionOwner=response.data[0]["subject_id"];
						localStorage.setItem("currentQuestion",this.currentQuestion);
						localStorage.setItem("currentQuestionOwner",this.currentQuestionOwner);
					}
				}
			}).catch(function(error){
				console.log(error)
			});

			// get step of game
			axios ({
				method: 'GET',
				url: `http://localhost:8000/api/games/`,
				params: {
					"GTKN":localStorage.getItem('game-token'),
					'Access-Control-Allow-Origin':'*',
				}}).then((response)=>{
					if(response.data){
						this.currentRound = (response.data[0]["current_round"]+1).toString();
						this.numOfRounds= response.data[0]["num_of_rounds"].toString();
						localStorage.setItem("current_round",(response.data[0]["current_round"]+1).toString())
						localStorage.setItem("num_of_rounds",response.data[0]["num_of_rounds"])
					}
					console.log('response question for step',response)
				}).catch(function(error){
					console.log(error)
				});
		}
	},
	methods:{
		showInnerProfile:function(){
			this.openProfile=true;
		},
		closeInnerProfile:function(){
			this.openProfile=false;
		},
		sendAnswer(){
			// post answer to server
			axios({
			method: 'POST',
			url: `http://localhost:8000/api/answers/`,
			params: {
				"GTKN": localStorage.getItem('game-token'),
				'Access-Control-Allow-Origin': '*',
			},
			data:{'game_token':localStorage.getItem('game-token'),'publisher_id':localStorage.getItem('gamer-id'),'text':this.answer}
			}).then((response)=>{
				this.responsed=true;
				//redirect to waiting for answers
				this.$router.push('/waiting-for-answer');
			}).catch(function(error){
				console.log(error)
			});
		},
		currentGamerProfile(){
			let gamerId=localStorage.getItem('gamer-id')
			return require('./../assets/images/profile/'+gamerId%10+'.png')
		}
	}
}
</script>
<style scoped>
</style>