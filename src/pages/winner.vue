<template>
    <div class="bg">
        <div class="row">
			<div class="col s12">
				<div class="row">
					<div class="col s12">
						<div style="height:40px !important;"></div>
					</div>
				</div>
				<div class="row">
					<div class="col s12">
						<img class="partyG-logo" src="./../assets/partyG-logo.png" >
					</div>
				</div>
				<div class="row">
					<div class="col s12">
						<div style="height:20px !important;"></div>
					</div>
				</div>
			</div>
		</div>
		<div class="row winner_card" >
			<div class="col s12">
				<div class="row">
					<div class="col s12 center-align" style="height:310px;padding-top: 30px;">
						<div class="Group_question">
							<img class="profile_winner" src="./../assets/profile.png">	
							<img class="photo_winner" :src="currentGamerProfile()" >	
						</div>
					</div>
				</div>
				<div class="row">
					<div style="padding-top: 10px;" class="col s12 center-align">
						<span class="winner_text">!!!!برنده‌ه‌ه‌ه</span>
					</div>
				</div>
			</div>
		</div>
       
		<div class="row">
			<div class="col s12 center-align">
				<button @click="playGame" class="login" >!بازی کن</button>
			</div>
		</div>
    </div>
</template>

<script>
import axios from 'axios'
	export default {
		data(){
			return{
				winner:null,
			}
		},
		created(){
			var max;
			if(localStorage.getItem('game-token')){
				axios({
					method:'GET',
					url:`http://127.0.0.1:8000/api/gamers/`,
					params:{
						"GTKN": localStorage.getItem('game-token'),
						'Access-Control-Allow-Origin': '*',
					}
				}).then((response)=>{
					if(response.data){
						console.log('response',response.data)
						response.data.forEach(gamer => {
							if(max == null || gamer.points > max){
								max= gamer.points;
								this.winner= gamer.id;
							}
						});
					}
				}).catch(function(error){
					console.log(error);
				});
			}
		},
		methods:{
			playGame:function(){
				this.$router.push('/')
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