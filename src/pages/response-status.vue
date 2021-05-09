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
        <div class="row">
			<div class="col s12 right-align">
				<span class="question">{{getCurrentQuestion}}</span>
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
			<div class="col s12 center-align">
				<span class="subtitle_question">هر پاسخ چند بار انتخاب شد؟</span>
			</div>
		</div>
		<div class="row" v-for="vote in votesList" :key="vote.id" >
			<div class="col s3 center-align" style="direction: rtl;">
				<span class="count">{{vote.points}}</span><span class="unit">بار </span>
			</div>
			<div class="col s9" style="display: inline-flex;">
				<div class="responseBox" >
					<p style="margin-top:15px;">{{vote.text}}</p>
				</div>
				<div class="small_profile">
					<img class="small_profile_frame" src="./../assets/profile_b.png">
					<img class="small_profile_image" src="./../assets/profile_free.png" :src="selectGamerProfile(vote.id)">  
				</div>
			</div>
		</div>
    </div>
</template>

<script>
import axios from 'axios';
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
			currentRound: localStorage.getItem("current_round"),
			numOfRounds: localStorage.getItem("num_of_rounds"),
			votes:[],
			votesList:[],
		}
	},
	created(){
		this.getVoterStatus();
		if(localStorage.getItem('game-token')){
			this.voteInterval=setInterval(()=>this.getVoterStatus(),10000)
		}
	},
	watch:{
		votes:function(){
			this.votesList=this.votes;
		}
	},
	methods:{
		showInnerProfile:function(){
			this.openProfile=true;
		},
		selectGamerProfile(gamerId){
			return require('./../assets/images/profile/'+gamerId%10+'.png')
		},
		getVoterStatus(){
			// let votedByAll= false;
			axios({
				method:'GET',
				url: `http://localhost:8000/api/answers/`,
				params: {
					'GTKN': localStorage.getItem('game-token'),
					'Access-Control-Allow-Origin': '*',
				}
			}).then((response)=>{
				console.log('vote list is =', response.data)
				this.votesList=response.data;
				setTimeout(this.votedByAll, 3000);
			})
		},
		votedByAll(){
			axios({
				method:'GET',
				url: `http://localhost:8000/api/question/`,
				params: {
					'GTKN': localStorage.getItem('game-token'),
					'Access-Control-Allow-Origin': '*',
				}
			}).then((response)=>{
				console.log('vote by all list is =', response.data)
				if(response.data[0]["voted_by_all"] == true){
					this.$router.push('/score-table')
				}
			})
		}
	},
		beforeDestroy(){
		clearInterval(this.voteInterval)
	}
}
</script>

<style scoped>	
</style>