<template>
     <div>
        <div class="row">
			<div class="col s9">
				<span class="step">مرحله {{currentRound}} / {{numOfRounds}}</span>
			</div>
			<div class="col s3">
				<a  class="waves-effect waves-light modal-trigger" href="#inner-profile" v-on:click="showInnerProfile">
					<img class="menu" src="./../assets/menu_1.png">
				</a>
			</div>
		</div>
       <div style="min-height: 200px;">
			<div class="row" >
				<div class="col s8 right-align">
					<span class="question">{{getCurrentQuestion}} </span>
				</div>
				<div class="col s4" style="height:120px">
					<div class="Group_question">
						<img class="profile_off" src="./../assets/profile_off.png">	
						<img class="photo_question" src="./../assets/photo_2020-09-29_17-35-11.png" >	
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
			<div class="col s12">
				<span class="subtitle_question">.پاسخی که خودت بیشتر  پسندیدی رو انتخاب کن</span>
			</div>
		</div>
		<div class="row" v-for="answer in gamersAnswerList" :key="answer.id">
			<div class="col s12 center-align" v-if="!currentGamer(answer.publisher_id)">
				<button @click="sendVote(answer.id)" class="textfield_question" >{{answer.text}}</button>
			</div>
		</div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data(){
		return {
			getCurrentQuestion: localStorage.getItem('currentQuestion'),
			currentRound: localStorage.getItem("current_round"),
			numOfRounds: localStorage.getItem("num_of_rounds"),
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
			gamersAnswerList:[],
			voted: false
		}
	},
	created(){
		if(localStorage.getItem('game-token')){
			axios({
				method: 'GET',
				url:`http://localhost:8000/api/answers/`,
				params: {
					"GTKN": localStorage.getItem('game-token'),
					'Access-Control-Allow-Origin': '*',
				}
			}).then((response)=>{
				if(response.data){
					console.log('question version 2',response.data)
					this.gamersAnswerList= response.data;
				}
			})
		}
	},
	methods:{
		showInnerProfile:function(){
			this.openProfile=true;
		},
		sendVote: function(selection){
			if(!this.voted){
				axios({
					method: 'POST',
					url:`http://localhost:8000/api/votes/`,
					params: {
						"GTKN": localStorage.getItem('game-token'),
						'Access-Control-Allow-Origin': '*',
					},
					data:{'voter_id': localStorage.getItem('gamer-id'),'selection_id':selection,}
				}).then((response)=>{
					if(response){
						this.$router.push('/response-status')	
					}
				})
			}else{
				this.$router.push('/response-status')	
			}
			
		},
		currentGamer:function(id){
			if(localStorage.getItem('gamer-id') == id) return true;
			return false;
		}
	}
}
</script>
<style scoped>
	
	#Group_101 {
		position: relative; 
		/* flex: 100%; */
		width: 138px;
		height: 138px;
		overflow: visible; 
	}
	#Line_4 {
		fill: transparent;
		stroke: rgba(6,0,0,0.059);
		stroke-width: 5px;
		stroke-linejoin: miter;
		stroke-linecap: butt;
		stroke-miterlimit: 4;
		shape-rendering: auto;
	}
	#Group_102 {
		position: absolute;
		width: 92px;
		height: 92px;
		left: 259px;
		top: 40px;
		overflow: visible;
	}
	#profile {
		position: absolute;
		width: 92px;
		height: 92px;
		left: 0px;
		top: 0px;
		overflow: visible;
	}
	#photo_2020-09-29_17-35-11_bl {
		position: relative;
		width: 72px;
		height: 72px;
		left: 9px;
		top: 8px;
		overflow: visible;
	}
	
	

	#photo_2020-09-29_17-35-11 {
		position: absolute;
		width: 72px;
		height: 72px;
		left: 9px;
		top: 8px;
		overflow: visible;
	}
	
</style>