$(document).ready(function(e){  

/* DEFININDO AS MÁSCARAS PARA OS CAMPOS DO FORMULÁRIO */
	$("#login").mask("L?LLLLLLLLLLLLLLLLLLL",{placeholder: ""});

/* EVENTO CLICK DOS BOTÕES DAS JANELAS DE AVISO */

	$("#fechaAvisoErroLogin1").click(function(e) {
        $('#fundoTransparente').css('display','none');
		$("#avisoErroLogin1").css('display','none');
    });
	
	$("#fechaAvisoErroLogin2").click(function(e) {
        $('#fundoTransparente').css('display','none');
		$("#avisoErroLogin2").css('display','none');
    });
	
	$("#fechaAvisoAlterarSenha").click(function(e) {
        $('#fundoTransparente').css('display','none');
		$("#avisoAlterarSenha").css('display','none');
		window.location='mvc/view/configuracoes.php?alterarSenha=1';
    });
	
	$(document).keyup(function(e) {
        if(e.which == 13){
			validaLogin();
		}
		else if (e.which == 27){
			$("#fechaAvisoErroLogin1").click();
			$("#fechaAvisoErroLogin2").click();
			if ($("#avisoAlterarSenha").css('display') == 'block'){
				$("#fechaAvisoAlterarSenha").click();
			}
		}
    });
});

/* FUNÇÃO QUE VALIDA O LOGIN */

function validaLogin(){ 
	jQuery.ajax({
	  type: 'POST',
	  url: 'http://www.excelservices.com.br/sistema/mvc/controler-mobile/login.php',
	  data: {login: $('#login').val(), senha: $("#senha").val() },
	  dataType: 'jsonp',
	  crossDomain: true,
	  jsonp: false,
	  jsonpCallback: 'callback',
	  success: function(d) {
		  window.location = 'principal.html';
	  },
	  error: function(d) {
		alert(-1);
	  }
	});
}