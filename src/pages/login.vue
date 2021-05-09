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
			<div class="col s12">
				<img class="partyG-logo" src="./../assets/partyG-logo.png" >
			</div>
		</div>
		<div class="row">
			<div class="col s12">
				<div class="header">
					<span>!سلام، به پارتی‌گ خوش اومدی</span>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col s12">
				<div style="display: inline-grid;">
					<input class="inputBox" style="width: 300px;height: 77px;" placeholder="آدرس جیمیل خودت رو وارد کن  ">
					<img style="position: relative; top: -105px; z-index: 15;" src="./../assets/Gmail-logo.png">      
					<img style="position: relative;top: -170px; z-index: 10;" src="./../assets/small_buttun.png" >
				</div>	
			</div>
		</div>
		<div class="row">	
			<div class="col s12 center-align no-padding">
				<div class="row no-padding center-align">
						<button class="login center-align" @click="fakeLogin">ورود</button>
				</div>	
			</div>		
		</div>	
	</div>
</template>

<script>
export default {
    data(){
		return{}
	},
	methods:{
		fakeLogin(){
			// create game
			// localStorage.setItem("game-token","10")
			// this.$router.push('/joined-list')
			window.location = `http://127.0.0.1:8000/glogin`;
		},
		back(){
			this.$router.back()
		}
	}
}
</script>

<style scoped>
	
</style>