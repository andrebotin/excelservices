document.addEventListener("deviceready", exibirInfo, false);  
function exibirInfo() {  /*
	$("#saida").append( 'Device Name: '     + device.name     + 
						'Device PhoneGap: ' + device.phonegap + 
						'Device Platform: ' + device.platform + 
						'Device UUID: '     + device.uuid     + 
						'Device Version: '  + device.version); */
}

/* FUNÇÃO QUE FECHA  */

function sair(){
	navigator.app.exitApp();
}