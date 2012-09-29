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
	$("#fundoTransparente").css('display','block'); //exibe o fundo transparente
	$("#imgEspera").css('display','block'); 	//exibe a imagem de espera
	if ($("#login").val() == "" || $("#senha").val() == ""){
		$("#imgEspera").css('display','none'); 	//esconde a imagem de espera
		$('#avisoErroLogin1').css("display", 'block'); 	//exibe o aviso
	}
	else { 
		xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() { 
			if (xhr.readyState==4 && xhr.status==200){alert(xhr.responseText);
				if (xhr.responseText == "ok") {
					$("#imgEspera").css('display','none'); 	//esconde a imagem de espera
					$("#fundoTransparente").css('display','none'); //esconde o fundo transparente
					window.location='principal.html';
				}
				else if (xhr.responseText == "alterarSenha") {
					$("#imgEspera").css('display','none'); 	//esconde a imagem de espera
					$('#avisoAlterarSenha').css("display", 'block'); 	//exibe o aviso
				}
				else if (xhr.responseText == "erroConexao") {
					$("#imgEspera").css('display','none'); 	//esconde a imagem de espera
					$('#fundoTransparente').css('display','none');
					window.location="mvc/view/erros/erro1.html";
				}
				else if (xhr.responseText == "erroSelecao") {
					$("#imgEspera").css('display','none'); 	//esconde a imagem de espera
					$('#fundoTransparente').css('display','none');
					window.location="mvc/view/erros/erro2.html";
				}
				else {
					$("#imgEspera").css('display','none'); 	//esconde a imagem de espera
					$('#avisoErroLogin2').css("display", 'block'); 	//exibe o aviso
				}
			}
		}
		xhr.open('POST', 'http://localhost/sistema/mvc/controler/login.php', true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  		xhr.send('login=' + $('#login').val() + '&senha=' + $("#senha").val()); //envia o FormData ao servidor 
	} 
}