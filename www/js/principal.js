document.addEventListener("deviceready", exibirInfo, false);  
function exibirInfo() {  /*
	$("#saida").append( 'Device Name: '     + device.name     + 
						'Device PhoneGap: ' + device.phonegap + 
						'Device Platform: ' + device.platform + 
						'Device UUID: '     + device.uuid     + 
						'Device Version: '  + device.version); */
}

/* FUNÇÕES DE NAVEGAÇÃO DO MENU  */

function colaboradores2(){
	window.location = 'colaboradores2.html';
}

function colaboradores(){
	window.location = 'colaboradores.html';
}

function relatorios(){
	window.location = 'relatorios.html';
}

function pontuacao(){
	window.location = 'pontuacao.html';
}

function configuracoes(){
	window.location = 'configuracoes.html';
}

function sair(){
	navigator.app.exitApp();
}