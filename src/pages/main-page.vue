<template>
<div>
	 <div class="row bg">
		<div class="col s12">
			<div class="row">
				<div class="col s8">
				</div>
				<div class="col s3">
					<a style=" margin-right:20px;" class="waves-effect waves-light modal-trigger" href="#profile" v-on:click="showProfile">
						<img class="menu" src="./../assets/menu_1.png">
					</a>
				</div>
				<div class="col s1">
				</div>
			</div>
			<div class="row">
				<div class="col s12 center-align">
					<img class="partyG-logo" src="./../assets/partyG-logo.png" >
				</div>
			</div>
			<div class="row">
				<div class="col s12">
					<div style="height:100px !important;"></div>
				</div>
			</div>
			<div class="row">	
				<div class="col s12 center-align no-padding">
					<button @click="redirectJoinGame" class="join_game_btn" >پیوستن به بازی</button>
				</div>		
			</div>
			<div class="row">
				<div class="col s12  center-align no-padding">
					<button @click="redirectCreateGame" class="create_game_btn" >شروع بازی جدید</button>
				</div>
			</div>  
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
					<button  @click="closeProfile" class="cancel" >هیچی</button>
				</div>
			</div>
		</div>
	</div>
</div>
   
</template>

<script>
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
			}
		}
	},
    methods:{
		showProfile:function(){
			this.openProfile=true;
		},
		closeProfile:function(){
			this.openProfile=false;
		},
		redirectJoinGame(){
			this.$router.push('/join');
		},
		redirectCreateGame(){
			window.location = `http://127.0.0.1:8000/glogin`;
			// this.$router.push('/make-game');
		}
	}
}
</script>

<style scoped>
	.profile-bg{
		width: 300px;
		height: 275px;
		background: url('./../assets/card.png') no-repeat;
		background-size: auto;
	}

	.modal-container{
		position: fixed;
		z-index: 1003;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: table;
		transition: opacity 0.3s ease;
	}
	.profile-edit{
		width: 214px;
		height: 95px;
		margin:10px;
		--web-animation: fadein 0.3s ease-out;
		--web-action-type: page;
		--web-action-target: Meimoni_joined_gamers___2.html;
		cursor: pointer;
		background: url('./../assets/buttun_2.png');
		background-size: cover;
		white-space: nowrap;
		text-align: center;
		font-family: Javan;
		font-style: normal;
		font-weight: normal;
		font-size: 31px;
		color: rgba(255,255,255,1);
		letter-spacing: 0.16px;
	}
	.cancel{
		width: 90px;
		height: 50px;
		margin:2px;
		--web-animation: fadein 0.3s ease-out;
		--web-action-type: page;
		--web-action-target: Meimoni_joined_gamers___2.html;
		cursor: pointer;
		background: url('./../assets/small_buttun.png') no-repeat;
		/* left: 105.375px;
		top: 241.022px;
		position: absolute;
		overflow: visible; */
		width: 89px;
		white-space: nowrap;
		text-align: center;
		font-family: Javan;
		font-style: normal;
		font-weight: normal;
		font-size: 36px;
		color: rgba(255,82,0,1);
		letter-spacing: 0.16px;
	}


</style>