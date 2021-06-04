<template>
	<div>
		<div class="row">
			<div class="col s3">
				<a v-on:click="back">
					<img style="padding-top: 30px !important;" src="./../assets/back_b.png" >
				</a>
			</div>
			<div style="padding-top:30px" class="col s9 right-align">
				<span class="title">بازی شما</span>
			</div>
		</div>
		<div class="row">
			<div class="col s12 center-align" style="position: relative;height: 200px;">
				<input  style="position: absolute;top: 50px;left:35px;width: 250px;height: 70px;" class="textfield"  v-model="gameToken" >            				
				<button style="width: 90px;height: 54px;" class="small_buttun">
					<span>کد مخفی</span>
				</button>
				<a class="share waves-effect waves-light modal-trigger" href="#inner-profile" v-on:click="showSocialSharing">
					<p class="center-align">ارسال به دوستان</p>
				</a>
				<svg class="Line_4" viewBox="0 0 375 5">
					<path class="Line" d="M 0 0 L 375 0">
					</path>
				</svg>
			</div>
		</div>
        <div class="row">
			<div class="col s12 center-align">
				<span class="caption">...  در انتظار پیوستن بازیکنان جدید </span>
			</div>
	    </div>
       <div class="row">
			<div class="col s12 right-align">
				<span class="subtitle">:بازیکنان</span>
			</div>
	    </div>
		<template v-for="gamer in gamersList" style="height: 360px;">
			<div class="row" style=" direction:rtl;">
				<div class="col s8 right-align">
					<div class="gamer_name">{{gamer.name}}</div>
				</div>
				<div class="col s4" style="height:100px">
					<div class="Group">
						<img class="profile" src="./../assets/profile.png">	
						<img class="photo" :src="selectGamerProfile(gamer.id)" >	
					</div>
				</div>
			</div>
		</template>
        <div class="row">
			<div class="col s12">
				<svg  viewBox="0 0 375 1">
					<path id="Line_5" d="M 0 0 L 375 0">
					</path>
				</svg>
			</div>
		</div>
		<!-- <div class="row">
			<div class="col s12 right-align">
				<span class="subtitle">:طول بازی</span>
			</div>
		</div> -->
		<!-- <div class="row">
			<div class="col s3 center-align">
				<label>
					<input name="group1" type="radio" value="5" v-model="rounds" checked/>
					<span></span>	
				</label>
			</div>
			<div class="col s3 center-align" >
				<label>
					<input name="group1" type="radio" value="7" v-model="rounds"  />
					<span></span>
				</label>
			</div>
			<div class="col s3 center-align" >
				<label>
					<input name="group1" type="radio" value="10" v-model="rounds"  />
					<span></span>
				</label>
			</div>
			<div class="col s3 center-align">
				<label>
					<input name="group1" type="radio" value="unlimited" v-model="rounds" />
					<span></span>
				</label>
			</div>
		</div>
		<div class="row">
			<div class="col s3 center-align" >
				<span>پنج مرحله</span>
			</div>
			<div class="col s3 center-align">
				<span>هفت مرحله</span>
			</div>
			<div class="col s3 center-align">
				<span>ده مرحله</span>
			</div>
			<div class="col s3 center-align">
				<span>بی نهایت</span>
			</div>
		</div> -->
		<div class="row">
		    <div class="col s12 center-align">
				<button @click="startGame" style="width: 200px;height: 100px;margin:30px;" class="login" >شروع بازی </button>
			</div>
		</div>
		 <div id="profile" :class="['modal-overlay bottom-sheet',openProfile?' open':'']" :style="[openProfile ? modalStyle: '']">
			  <a  @click="closeSocialSharing"><i class="Small material-icons">close</i></a>
			   <div style="background-color: #fafafa; padding: 135px;position:fixed; left:0px;bottom:0px;height:30px;width:100%;" class="modal-content center-align">
				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" integrity="sha256-h20CPZ0QyXlBuAw7A+KluUYx/3pK+c7lYEpqLTlxjYQ=" crossorigin="anonymous" />
				<div class="share-network-list">
				<ShareNetwork
					v-for="network in networks"
					:network="network.network"
					:key="network.network"
					:style="{backgroundColor: network.color}"
					:url="sharing.url"
					:title="sharing.title"
					:description="sharing.description"
					:quote="sharing.quote"
					:hashtags="sharing.hashtags"
				>
					<i :class="network.icon"></i>
					<!-- <span>{{ network.name }}</span> -->
				</ShareNetwork>
				</div>
			</div>
		</div>
    </div>
</template>
<script>
	import axios from 'axios';
	export default{
		data(){
			return {
				gameToken:'',
				start:false,
				gamers:[],
				rounds: '5',
				gamersList:[],
				sharing: {
					url: 'https://news.vuejs.org/issues/180',
					title: 'Say hi to Vite! A brand new, extremely fast development setup for Vue.',
					description: 'This week, I’d like to introduce you to "Vite", which means "Fast". It’s a brand new development setup created by Evan You.',
					quote: 'The hot reload is so fast it\'s near instant. - Evan You',
					hashtags: 'Partyg,Family-Game,Happy-Monsters',
					twitterUser: 'youyuxi'
				},
				networks: [
					{ network: 'email', name: 'Email', icon: 'far fah fa-lg fa-envelope', color: '#333333' },
					{ network: 'facebook', name: 'Facebook', icon: 'fab fah fa-lg fa-facebook-f', color: '#1877f2' },
					{ network: 'line', name: 'Line', icon: 'fab fah fa-lg fa-line', color: '#00c300' },
					{ network: 'linkedin', name: 'LinkedIn', icon: 'fab fah fa-lg fa-linkedin', color: '#007bb5' },
					{ network: 'skype', name: 'Skype', icon: 'fab fah fa-lg fa-skype', color: '#00aff0' },
					{ network: 'sms', name: 'SMS', icon: 'far fah fa-lg fa-comment-dots', color: '#333333' },
					{ network: 'telegram', name: 'Telegram', icon: 'fab fah fa-lg fa-telegram-plane', color: '#0088cc' },
					{ network: 'viber', name: 'Viber', icon: 'fab fah fa-lg fa-viber', color: '#59267c' },
					{ network: 'whatsapp', name: 'Whatsapp', icon: 'fab fah fa-lg fa-whatsapp', color: '#25d366' },
					{ network: 'fakeblock', name: 'Custom Network', icon: 'fab fah fa-lg fa-vuejs', color: '#41b883' }
				],
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
					'position':'fixed',
					'left': 0,
					'right': 0,
					'overflow-y': 'auto',
					// 'background-color': '#fafafa',
					'padding': 0,
				},
			}
		},
		created(){
			if(!this.start){
				this.interval=setInterval(()=>this.getGamers(),10000);
			}
		},
		mounted(){
			if (localStorage.getItem('game-token')) {
				try {
					this.gameToken = localStorage.getItem('game-token'); /*JSON.parse(localStorage.getItem('game-token'));*/
					console.log('game token is', this.gameToken)
				} catch(e) {
					//alert and redirect to first page
					console.log("you haven't token")
				}
			}
		},
		beforeDestroy () {
			// clear the timeout before the component is destroyed
			 clearInterval(this.interval)
		},
		watch:{
			gamers: function(){
				this.gamersList=this.gamers;
			}
		},
		methods:{
			back(){
				this.$router.back()
			},
			showSocialSharing:function(){
				this.openProfile=true;
			},
			closeSocialSharing:function(){
			this.openProfile=false;
		},
			getGamers(){
				// get Gamers
				axios({
					method: 'GET',
					url: `http://localhost:8000/api/gamers/`,
					params: {
						"GTKN": localStorage.getItem('game-token'),
						'Access-Control-Allow-Origin': '*',
						'Access-Control-Allow-Credentials': true,
						'Access-Control-Allow-Headers': 'Content-Type',
						'Access-Control-Allow-Methods' : 'GET, POST, PUT, DELETE, OPTIONS',},
				}).then((response)=>{
					this.gamers=response.data;
				}).catch(function(error){
					console.log(error);
				});
			},
			startGame(){
				this.start=true;
				console.log('rounds is', this.rounds)
				// cal update game api's steps
				//************* */ backend update dont work 
				axios({
					method: 'POST',
					url: `http://localhost:8000/api/games/`,
					params: {  
						"GTKN": localStorage.getItem('game-token'),
						'Access-Control-Allow-Origin': '*',
						'Access-Control-Allow-Credentials': true,
						'Content-Type': 'application/json',
						'Access-Control-Allow-Headers': 'Content-Type',
						'Access-Control-Allow-Methods' : 'GET, POST, PUT, DELETE, OPTIONS',},
					data: {'num_of_rounds': this.rounds, 'owner_id':2}
				}).then((response)=>{
					console.log(response);
					localStorage.setItem("game-rounds",this.rounds)
				}).catch(function(error){
					console.log(error);
				});
				//redirect to question page
				this.$router.push('/question');
			},
			selectGamerProfile(gamerId){
				return require('./../assets/images/profile/'+gamerId%10+'.png')
			}
		}
	}
</script>
<style scoped>
body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }
  h1 {
    text-align: center;
    margin: 50px 0 80px;
  }
  .share-network-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 1000px;
    margin: auto;
  }
  a[class^="share-network-"] {
    flex: none;
    color: #FFFFFF;
    background-color: #333;
    border-radius: 3px;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    align-content: center;
    align-items: center;
    cursor: pointer;
    margin: 0 10px 10px 0;
  }
  a[class^="share-network-"] .fah {
    background-color: rgba(0, 0, 0, 0.2);
    padding: 10px;
    flex: 0 1 auto;
  }
  a[class^="share-network-"] span {
    padding: 0 10px;
    flex: 1 1 0%;
    font-weight: 500;
  }

	.Line_4 {
		overflow: visible;
		position: absolute;
		width: 375px;
		height: 5px;
		/* left: 0.5px; */
		top: 150px;
		transform: matrix(1,0,0,1,0,0);
	}

	.radio,
	.checkbox {
	position: absolute;
	margin: 0 !important;
	padding: 0 !important;
	opacity: 0;
	height: 0;
	width: 0;
	pointer-events: none;
	}

	#Line_5 {
		fill: transparent;
		stroke: rgba(33,33,33,0.498);
		stroke-width: 1px;
		stroke-linejoin: miter;
		stroke-linecap: butt;
		stroke-miterlimit: 4;
		shape-rendering: auto;
		width: 375px;
		height: 1px;
		left: 0px;
	}
	.Line_5 {
		overflow: visible;
		position: absolute;
		width: 375px;
		height: 1px;
		left: 0px;
		top: 662px;
		transform: matrix(1,0,0,1,0,0);
	}

</style>