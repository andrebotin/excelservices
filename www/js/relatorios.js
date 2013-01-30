document.addEventListener("deviceready", exibirInfo, false);  
function exibirInfo() {  /*
	$("#saida").append( 'Device Name: '     + device.name     + 
						'Device PhoneGap: ' + device.phonegap + 
						'Device Platform: ' + device.platform + 
						'Device UUID: '     + device.uuid     + 
						'Device Version: '  + device.version); */
}


function voltar(){
	navigator.app.backHistory();
}

function gerar() {
	//altera o evento onclick do botão voltar
	voltar = '$(\'#voltar\').attr(\'onclick\',"window.location=\'../../principal.php\'");';
	$('#voltar').attr('onclick', voltar);
	$('#voltar').click();
	
	$('#fundoTransparente').css('display','block');
	$('#imgEspera').css('display','block');
	
	//se for relatório de confirmação de escala
	if ($("#tipo").val() == "confirm"){
		//se os campos estiverem preenchidos
		if ($("#inicio").val() != "Data inicial..." && $("#fim").val() != "Data final..."){
			gerarRelatorioConfirmacao($("#inicio").val(), $("#fim").val());
		}
		else{
			$('#imgEspera').css('display','none');
			$('#fundoTransparente').css('display','block');
			$("#erroFiltroRelatorio").css('display','block');
		}
	}
	//se for folha de ponto
	else if ($("#tipo").val() == "ponto"){
		//se a função e a data foram informadas
		if ($("#tipoFolhaPonto").val() == "geral" && $("#data").val() != "Data..."){
			gerarFolhaPontoGeral($("#data").val());
		}
		else if($("#tipoFolhaPonto").val() == "funcao" &&  $("#funcao").val() != "" && $("#data").val() != "Data..."){
			gerarFolhaPonto($("#funcao").val(), $("#data").val());
		}
	}
	//se for recibo
	else if ($("#tipo").val() == "recibo"){
		//se todos os campos estiverem preenchidos
		if ($("#nome").val() != "" && $("#inicio").val() != "Data inicial..." && $("#fim").val() != "Data final..."){
			gerarReciboNome($("#nome").val(), $("#inicio").val(), $("#fim").val(), false);
		}
		/*
		if ($("#inicio").val() != "Data inicial..." && $("#fim").val() != "Data final..."){
			if ($("#nome").val() != ""){
				gerarReciboNome($("#nome").val(), $("#inicio").val(), $("#fim").val());
			}
			else{
				gerarReciboSemNome($("#inicio").val(), $("#fim").val());
			}
		} */
		else{
			$('#imgEspera').css('display','none');
			$('#fundoTransparente').css('display','block');
			$("#erroFiltroRelatorio2").css('display','block');
		}
	}
	//se for relatório por colaborador
	else if ($("#tipo").val() == "colab"){
		//se todos os campos estiverem preenchidos
		if ($("#nome").val() != "" && $("#inicio").val() != "Data inicial..." && $("#fim").val() != "Data final..."){
			gerarRelatorioColaborador($("#nome").val(), $("#inicio").val(), $("#fim").val());
		}
		else{
			$('#imgEspera').css('display','none');
			$('#fundoTransparente').css('display','block');
			$("#erroFiltroRelatorio").css('display','block');
		}
	}
	//se for relatório por função
	else if ($("#tipo").val() == "funcao"){
		//se os campos estiverem preenchidos
		if ($("#funcao").val() != "" && $("#inicio").val() != "Data inicial..." && $("#fim").val() != "Data final..."){
			gerarRelatorioFuncao($("#funcao").val(), $("#inicio").val(), $("#fim").val());
		}
		else{
			$('#imgEspera').css('display','none');
			$('#fundoTransparente').css('display','block');
			$("#erroFiltroRelatorio").css('display','block');
		}
	}
	//se for relatório por setor
	else if ($("#tipo").val() == "set"){
		//se os campos estiverem preenchidos
		if ($("#setor").val() != "" && $("#inicio").val() != "Data inicial..." && $("#fim").val() != "Data final..."){
			gerarRelatorioSetor($("#setor").val(), $("#inicio").val(), $("#fim").val());
		}
		else{
			$('#imgEspera').css('display','none');
			$('#fundoTransparente').css('display','block');
			$("#erroFiltroRelatorio").css('display','block');
		}
	}
	//se for relatório geral
	else if ($("#tipo").val() == "geral"){
		//se os campos estiverem preenchidos
		if ($("#inicio").val() != "Data inicial..." && $("#fim").val() != "Data final..."){
			gerarRelatorioGeral($("#inicio").val(), $("#fim").val());
		}
		else{
			$('#imgEspera').css('display','none');
			$('#fundoTransparente').css('display','block');
			$("#erroFiltroRelatorio").css('display','block');
		}
	}
	//se não for informado um tipo
	else{
		$("#funcao").css('display','none');
		$("#nome").css('display','none');
		$("#inicio").css('display','none');
		$("#fim").css('display','none');
		$('#imgEspera').css('display','none');
		$('#fundoTransparente').css('display','block');
		$("#erroFiltroRelatorio").css('display','block');
	}
}

function sair(){
	navigator.app.exitApp();
}

$(document).ready(function(e){
	/* OUTRAS FUNÇÕES */
	$("#tipo").change(function(e) {
		//altera o evento onclick do botão voltar
		voltar = '$(\'#voltar\').attr(\'onclick\',"window.location=\'../../principal.php\'");';
		$('#voltar').attr('onclick', voltar);
		$('#voltar').click();
		
		$('#resultado').empty();
		
		$("#tabelaFuncao").css('display','none');
		$("#funcao").val('');
		$("#tabelaSetor").css('display','none');
		$("#setor").val('');
		$("#tabelaNome").css('display','none');
		$("#nome").val('');
		$("#tabelaInicio").css('display','none');
		$("#inicio").val("");
		$("#tabelaFim").css('display','none');
		$("#fim").val("");
		$("#tabelaData").css('display','none');
		$("#data").val("");
	
		if ($("#tipo").val() == "confirm"){
			$("#tabelaInicio").css('display','block');
			$("#tabelaFim").css('display','block');
		}
		else if ($("#tipo").val() == "colab"){
			$("#tabelaNome").css('display','block');
			$("#tabelaInicio").css('display','block');
			$("#tabelaFim").css('display','block');
		}
		else if ($("#tipo").val() == "funcao"){
			$("#tabelaFuncao").css('display','block');
			$("#tabelaInicio").css('display','block');
			$("#tabelaFim").css('display','block');
		}
		else if ($("#tipo").val() == "set"){ 
			$("#tabelaSetor").css('display','block');
			$("#tabelaInicio").css('display','block');
			$("#tabelaFim").css('display','block');
		}
		else if ($("#tipo").val() == "geral"){
			$("#tabelaInicio").css('display','block');
			$("#tabelaFim").css('display','block');
		}
	});
});