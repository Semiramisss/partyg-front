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
			<div class="col s12 center-align">
				 <span class="score">:جدول امتیازها</span>
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
		<div class="row" v-for="score in scoreList" :key="score.id">
			<div class="col s2 right-align" >
				<span class="score_point">{{score.points}}</span>
			</div>
			<div class="col s6 right-align">
				<div class="gamer_name">{{score.name}}</div>
			</div>
			<div class="col s4" style="height:120px">
				<div class="Group" style=" position: relative;">
					<img class="profile" src="./../assets/profile.png" >    
					<img class="photo_question" :src="selectGamerProfile(score.id)" >      
				</div>
			</div>
		</div>
	
        <div class="row">
			<div class="col s12 right-align" >
            	<span class="caption_score">برای ادامه بازی آماده‌ای؟</span>
			</div>
        </div>
      
		<div class="row">
			<div class="col s12 center-align" >
				<button class="btnGame" @click="nextRound">
					<span>!بازی کن</span>
				</button>
			</div>
		</div>
        
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
			currentRound: localStorage.getItem("current_round"),
			numOfRounds: localStorage.getItem("num_of_rounds"),
			scoreList:[],
		}
	},
	created(){
		axios({
			method: 'GET',
			url: `http://localhost:8000/api/gamers/`,
			params: {
				"GTKN": localStorage.getItem('game-token'),
				'Access-Control-Allow-Origin': '*',
			}
		}).then((response)=>{
			console.log('response score', response.data)
			if(response.data){
				this.scoreList=response.data
			}
		})
	},
	methods:{
		showInnerProfile:function(){
			this.openProfile=true;
		},
		selectGamerProfile(gamerId){
			return require('./../assets/images/profile/'+gamerId%10+'.png')
		},
		nextRound(){
			this.$router.push('/question');
		}
	}
}
</script>

<style scoped>
	

</style>