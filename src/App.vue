<template>
  <div id="registerPartyG">
	<img id="partyG_main" src="./assets/partyG_main.png">
		
	<img id="partyG-logo" src="./assets/partyG-logo.png" >
		
	<img onclick="application.goToTargetView(event)" id="buttun_2" src="./assets/buttun_2.png" >
		
	<img id="buttun_3" src="./assets/buttun_3.png">
		
	<div onclick="application.goToTargetView(event)" id="__">
		<span>پیوستن به بازی</span>
	</div>
	<div id="___bc">
		<span>شروع بازی جدید</span>
	</div>
	<img onclick="application.goToTargetView(event)" id="menu_1" src="./assets/menu_1.png" >
		
</div>
</template>

<script>

export default {
  name: 'App',
  components: {
    
  }
}
</script>

<style>
@import "./assets/styles/partyg.css";
</style>
