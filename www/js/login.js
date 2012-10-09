document.addEventListener("deviceready", exibirInfo, false);  
function exibirInfo() {  /*
	$("#saida").append( 'Device Name: '     + device.name     + 
						'Device PhoneGap: ' + device.phonegap + 
						'Device Platform: ' + device.platform + 
						'Device UUID: '     + device.uuid     + 
						'Device Version: '  + device.version); */
}


function vibrar() {   
	navigator.notification.alert("Vibrando",
		exibirInfo,  
		"Funcionou?",  
		"OK");  
  
	 navigator.notification.vibrate(2000);  
} 

$(document).ready(function(e){  

/* DEFININDO AS MÁSCARAS PARA OS CAMPOS DO FORMULÁRIO */
	$("#login").mask("L?LLLLLLLLLLLLLLLLLLL",{placeholder: ""});
	
});

/* FUNÇÃO QUE VALIDA O LOGIN */

function validaLogin(){ 
	if($('#login').val() != '' && $("#senha").val() != ''){
		$.mobile.showPageLoadingMsg();
		jQuery.ajax({
		  type: 'POST',
		  url: 'http://www.excelservices.com.br/sistema/mvc/controler-mobile/login.php',
		  data: {login: $('#login').val(), senha: $("#senha").val() },
		  dataType: 'jsonp',
		  crossDomain: true,
		  jsonp: false,
		  jsonpCallback: 'callback',
		  success: function(d) { alert(d[0].resposta);
			  $.mobile.hidePageLoadingMsg();
			  if(d[0].resposta == 'administrador'){ alert('Administrador.');
				  window.location = 'principal.html';
			  }
			  else if(d[0].resposta == 'usuario_excel'){ alert('Usuario.');
				  window.location = 'principal2.html';
			  }
			  else if(d[0].resposta == 'erroConexao'){
				  navigator.notification.alert("Erro ao conectar-se ao banco de dados.", '',  "Erro", "OK");
			  }
			  else if(d[0].resposta == 'erroSelecao'){
				  navigator.notification.alert("Erro ao selecionar o banco de dados.", '',  "Erro", "OK");
			  }
			  else{ alert('Login ou senha incorreta.');
				  navigator.notification.alert("Login ou senha incorreta.", '',  "Erro", "OK");
			  }
		  }
		});
	}
	else{
		navigator.notification.alert("Informe o login e a senha.", '',  "Erro", "OK");
	}
}