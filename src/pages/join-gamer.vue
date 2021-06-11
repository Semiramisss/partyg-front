<template>
    <div>       
		<div class='row'>	
			<div class="col s3">
				<a v-on:click="back">
					<img style="padding-top: 30px !important;" src="./../assets/back_b.png" >
				</a>
			</div>
			<div class="col s9">
			</div>			
		</div>
		<div class="row">
			<div class="col s12 center-align">
				<span class="join-header">پیوستن به بازی</span>
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
			<div class="col s12 right-align">
           		<span class="join-description">اگر در صفحه اصلی پارتی‌گ! روی دکمه "شروع بازی جدید" بزنید. کد مخفی هشت حرفی برای شما نمایش داده می‌شود. دوستانتان برای پیوستن به بازی جدید شما، باید این کد هشت .حرفی را اینجا وارد کنند</span>
			</div>
		</div>
    	<div class="row">
			<div class="col s12 center-align">
      			<input v-model="gamerName" style="width: 250px;height: 70px;" class="inputBox" placeholder="نام خود را وارد کنید">
			</div>
		</div>	
		<div class="row">
			<div class="col s12 center-align">
        		<input v-model="gameToken" style="width: 250px;height: 70px;" class="inputBox" placeholder="وارد کردن کد هشت کاراکتری مخفی">
			</div>
		</div>
        <div class="row">
			<div class="col s12 center-align">
				 <button class="login" @click="joinToGame">
					<span>پیوستن به بازی</span>
				</button>
			</div>
		</div>
    </div>
</template>
<script>
import axios from "axios";
import {v4 as uuidv4} from 'uuid';
const v4options = {
  random: [
    0x10,
    0x91,
    0x56,
    0xbe,
    0xc4,
    0xfb,
    0xc1,
    0xea,
    0x71,
    0xb4,
    0xef,
    0xe1,
    0x67,
    0x1c,
    0x58,
    0x36,
  ],
};
export default {
    data(){
		return{
			gamerName:'',
			gameToken:''
		}
	},
	created(){
		//{GTKN: "37144246", OWID: "1"}
		localStorage.setItem("game-token",this.$route.query.GTKN)
		this.gameToken=this.$route.query.GTKN;
	},
	methods:{
		back(){
			this.$router.back()
		},
		joinToGame(){
			// generate unified id = uuid
			let gamerUuid= uuidv4([Math.floor(Math.random()*100),Date.now()]);

			axios({
				method:'POST',
				url:`http://localhost:8000/api/gamers/`,
				params:{
					'Access-Control-Allow-Origin': '*',
				},
				data:{'game_token':this.gameToken,'name':this.gamerName}
			}).then((response)=>{
				localStorage.setItem("game-token",response.data.game_token)
				localStorage.setItem("gamer-id",response.data.id)
				this.$router.push('/joined-list');
			}).catch(function(error){
				console.log(error)
			});
		}
	}
}
</script>
<style scoped>
	
</style>