document.addEventListener("deviceready", exibirInfo, false);  
function exibirInfo() {  /*
	$("#saida").append( 'Device Name: '     + device.name     + 
						'Device PhoneGap: ' + device.phonegap + 
						'Device Platform: ' + device.platform + 
						'Device UUID: '     + device.uuid     + 
						'Device Version: '  + device.version); */
}


function voltar(){
	if ($('#resultado2').css('display') == 'block'){
		$('#resultado2').css('display','none');
		$('#resultado').css('display','block');
	}
	else if ($('#resultado').css('display') == 'block'){
		$('#resultado').css('display','none');
		$('#filtro').css('display','block');
	}
	else {
		navigator.app.backHistory();
	}
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

$(document).ready(function(e){
	/* OUTRAS FUNÇÕES */
	$("#tipo").change(function(e) {
		
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
			carregarColaboradores();
		}
		else if ($("#tipo").val() == "funcao"){
			$("#tabelaFuncao").css('display','block');
			$("#tabelaInicio").css('display','block');
			$("#tabelaFim").css('display','block');
			carregarFuncoes();
		}
		else if ($("#tipo").val() == "set"){ 
			$("#tabelaSetor").css('display','block');
			$("#tabelaInicio").css('display','block');
			$("#tabelaFim").css('display','block');
			carregarSetores();
		}
		else if ($("#tipo").val() == "geral"){
			$("#tabelaInicio").css('display','block');
			$("#tabelaFim").css('display','block');
		}
	});
});

function gerar() { 
	//se for relatório de confirmação de escala
	if ($("#tipo").val() == "confirm"){
		//se os campos estiverem preenchidos
		if ($("#inicio").val() != "Data inicial..." && $("#fim").val() != "Data final..."){
			gerarRelatorioConfirmacao($("#inicio").val(), $("#fim").val());
		}
		else{
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
			$("#erroFiltroRelatorio").css('display','block');
		}
	}
	//se for relatório geral
	else if ($("#tipo").val() == "geral"){ 
		//se os campos estiverem preenchidos
		if ($("#inicio").val() != "" && $("#fim").val() != ""){
			gerarRelatorioGeral($("#inicio").val(), $("#fim").val());
		}
		else{
			navigator.notification.alert("Informe a data inicial e a data final.", '',  "Erro", "OK");
		}
	}
	//se não for informado um tipo
	else{
		$("#funcao").css('display','none');
		$("#nome").css('display','none');
		$("#inicio").css('display','none');
		$("#fim").css('display','none');
		$("#erroFiltroRelatorio").css('display','block');
	}
}

//função que gera o relatório por colaborador
function gerarRelatorioColaborador(id, dataInicial, dataFinal){
	$('#filtro').css('display','none');
	$('#resultado').empty();
	$('#resultado').css('display','block');

	jQuery.ajax({
	  type: 'POST',
	  url: 'http://www.excelservices.com.br/sistema/mvc/controler-mobile/carregarDadosRelatorioColaborador.php',
	  data: {id: id, dataInicial: dataInicial, dataFinal: dataFinal },
	  dataType: 'jsonp',
	  crossDomain: true,
	  jsonp: false,
	  jsonpCallback: 'callback',
	  success: function(d) {
	  	if (d == null){
			navigator.notification.alert("Nenhum colaborador escalado neste período.", '',  "Erro", "OK");
		}
		else {
			if (d[0].resposta == 'sessaoExpirada'){
				navigator.notification.alert("Sessão expirada. Por favor, reinicie o aplicativo.", '',  "Erro", "OK");
			}
			else if (d[0].resposta == "erroConexao") {
				navigator.notification.alert("A conexão não pode ser estabelecida.", '',  "Erro", "OK");
			}
			else if (d[0].resposta == "erroSelecao") {
				navigator.notification.alert("Erro desconhecido ao selecionar o banco de dados.", '',  "Erro", "OK");
			}
			else if (d[0].resposta == "erroData"){
				navigator.notification.alert("Formato de data inválido.", '',  "Erro", "OK");
			}
			else {
				//inserção do resultado em uma tabela html
				html = '<div id="tituloRelatorio2">RELATÓRIO POR COLABORADOR</div>' +
					   '<div id="nomeRelatorio">Nome: '+d[0].nome.toUpperCase()+'</div>' +
					   '<div id="cpfRelatorio">CPF: '+d[0].cpf+'</div>' +
					   '<table id="tabelaRelatorio" class="relatorios">' +
						 '<tr style="background-color:#0490DC">' +
						   '<td width="110" align="center"><strong>Data</strong></td>' +
						   '<td width="70" align="center"><strong>Entrada</strong></td>' +
						   '<td width="70" align="center"><strong>Saida</strong></td>' +
						   '<td width="180" align="center"><strong>Função</strong></td>' +
						   '<td width="130" align="center"><strong>Valor da extra</strong></td>' +
						 '</tr>';
				
				//variável que acumula o total a receber pelo período
				var total = 0;
					
				for(i=0 ; i<d.length ; i++){
					//calcula o valor da hora
					valorReceber = parseFloat(d[i].valorReceber);
					//soma o valor a receber ao total
					total += valorReceber;
					
					if (d[i].funcao == 'Auxiliar de servicos gerais'){
						funcao = 'Auxiliar de serviços gerais';
					}
					else if(d[i].funcao == 'Garcom'){
						funcao = 'Garçom';
					}
					else{
						funcao = d[i].funcao;
					}
					
					html += '<tr>' +
							  '<td align="center">'+d[i].data+'</td>' +
							  '<td align="center">'+d[i].entrada.substr(0,5)+'</td>' +
							  '<td align="center">'+d[i].saida.substr(0,5)+'</td>' +
							  '<td align="center">'+funcao+'</td>' +
							  '<td align="right">'+FloatParaTexto(valorReceber.toString())+'</td>' +
							'</tr>';
				}
				html += '<tr style="background-color:#979797">' +
						  '<td align="center"><strong>Total</strong></td>' +
						  '<td align="center">&nbsp;</td>' +
						  '<td align="center">&nbsp;</td>' +
						  '<td align="center">&nbsp;</td>' +
						  '<td align="right"><strong>'+FloatParaTexto(total.toString())+'</strong></td>' +
						'</tr>' + 
						'</table>';

				$('#resultado').append(html);
			}
		}
	  }
	});
}

//função que gera o relatório por função
function gerarRelatorioFuncao(funcao, dataInicial, dataFinal){
	$('#filtro').css('display','none');
	$('#resultado').empty();
	$('#resultado').css('display','block');

	jQuery.ajax({
	  type: 'POST',
	  url: 'http://www.excelservices.com.br/sistema/mvc/controler-mobile/carregarDadosRelatorioFuncao.php',
	  data: {funcao: funcao, dataInicial: dataInicial, dataFinal: dataFinal },
	  dataType: 'jsonp',
	  crossDomain: true,
	  jsonp: false,
	  jsonpCallback: 'callback',
	  success: function(d) {
	  	if (d == null){
			navigator.notification.alert("Nenhum colaborador escalado neste período.", '',  "Erro", "OK");
		}
		else {
			if (d[0].resposta == 'sessaoExpirada'){
				navigator.notification.alert("Sessão expirada. Por favor, reinicie o aplicativo.", '',  "Erro", "OK");
			}
			else if (d[0].resposta == "erroConexao") {
				navigator.notification.alert("A conexão não pode ser estabelecida.", '',  "Erro", "OK");
			}
			else if (d[0].resposta == "erroSelecao") {
				navigator.notification.alert("Erro desconhecido ao selecionar o banco de dados.", '',  "Erro", "OK");
			}
			else if (d[0].resposta == "erroData"){
				navigator.notification.alert("Formato de data inválido.", '',  "Erro", "OK");
			}
			else {
				if (funcao == 'Auxiliar de servicos gerais'){
					funcao = 'Auxiliar de serviços gerais';
				}
				else if(funcao == 'Garcom'){
					funcao = 'Garçom';
				}
				else if(funcao == 'Garcom exclusivo'){
					funcao = 'Garçom exclusivo';
				}

				//inserção do resultado em uma tabela html
				html = '<div id="tituloRelatorio2">RELATÓRIO POR FUNÇÃO</div>' +
					   '<div id="nomeRelatorio">Função: '+funcao+'</div>' +
					   '<div id="cpfRelatorio">Período: '+dataInicial+' a '+dataFinal+'</div>' +
					   '<table id="tabelaRelatorio" class="relatorios">';

				//variável que acumula o total a receber pelo período
				var totalReceber = 0;
				//variável que acumula o total a pagar pelo período
				var totalPagar = 0;
				
				dataAnterior = ''; //usada para guardar a data utilizada no laço anterior
				horaEntradaAnterior = ''; //usada para guardar o horário utilizado no laço anterior
				horaSaidaAnterior = '';
				contColab = 0; //contador dos colaboradores

				for(i=0 ; i<d.length ; i++){
					//calcula o valor da hora a receber
					valorReceber = parseFloat(d[i].valorReceber);
					//calcula o valor da hora a pagar
					valorPagar = parseFloat(d[i].valorPagar);
					//os totais são acumulados
					totalReceber += valorReceber;
					totalPagar += valorPagar;
					
					if (dataAnterior == '' && horaEntradaAnterior == '' && horaSaidaAnterior == ''){
						contColab++;
						dataAnterior = d[i].data;
						horaEntradaAnterior = d[i].entrada;
						horaSaidaAnterior = d[i].saida;
						html += '<tr>' +
									'<td colspan="4" align="center" style="background-color:#FF0; font-style:italic"><strong>Dia '+d[i].data+' - das '+d[i].entrada.substr(0,5)+'hs às '+d[i].saida.substr(0,5)+'hs</strong></td>' +
								'</tr>' +
								'<tr style="background-color:#CCC">' +
									'<td width="50" align="center"><strong>Qtd</strong></td>' +
									'<td width="400" align="center"><strong>Colaborador</strong></td>' +
									'<td width="150" align="center"><strong>Valor da extra a receber</strong></td> ' +
									'<td width="150" align="center"><strong>Valor da extra a pagar</strong></td> ' +
								'</tr>' +
								'<tr>' +
									'<td align="center">'+contColab+'</td>' +
									'<td align="left">'+d[i].nome.toUpperCase()+'</td>' +
									'<td align="right">'+FloatParaTexto(valorReceber.toString())+'</td>' +
									'<td align="right">'+FloatParaTexto(valorPagar.toString())+'</td>' +
								'</tr>'; 
					}
					else if (dataAnterior == d[i].data){ 
						if (horaEntradaAnterior == d[i].entrada && horaSaidaAnterior == d[i].saida){
							contColab++;
							html += '<tr>' +
										'<td align="center">'+contColab+'</td>' +
										'<td align="left">'+d[i].nome.toUpperCase()+'</td>' +
										'<td align="right">'+FloatParaTexto(valorReceber.toString())+'</td>' +
										'<td align="right">'+FloatParaTexto(valorPagar.toString())+'</td>' +
									'</tr>';
						}
						else{
							contColab = 1;
							horaEntradaAnterior = d[i].entrada;
							horaSaidaAnterior = d[i].saida;
							html += '<tr>' +
										'<td colspan="4" align="center" style="background-color:#FF0; font-style:italic"><strong>Dia '+d[i].data+' - das '+d[i].entrada.substr(0,5)+'hs às '+d[i].saida.substr(0,5)+'hs</strong></td>' +
									'</tr>' +
									'<tr style="background-color:#CCC">' +
										'<td width="50" align="center"><strong>Qtd</strong></td>' +
										'<td width="400" align="center"><strong>Colaborador</strong></td>' +
										'<td width="150" align="center"><strong>Valor da extra a receber</strong></td> ' +
										'<td width="150" align="center"><strong>Valor da extra a pagar</strong></td> ' +
									'</tr>' +
									'<tr>' +
										'<td align="center">'+contColab+'</td>' +
										'<td align="left">'+d[i].nome.toUpperCase()+'</td>' +
										'<td align="right">'+FloatParaTexto(valorReceber.toString())+'</td>' +
										'<td align="right">'+FloatParaTexto(valorPagar.toString())+'</td>' +
									'</tr>';
						}
					}
					else{
						contColab = 1;
						dataAnterior = d[i].data;
						horaEntradaAnterior = d[i].entrada;
						horaSaidaAnterior = d[i].saida;
						html += '<tr>' +
									'<td colspan="4" align="center" style="background-color:#FF0; font-style:italic"><strong>Dia '+d[i].data+' - das '+d[i].entrada.substr(0,5)+'hs às '+d[i].saida.substr(0,5)+'hs</strong></td>' +
								'</tr>' +
								'<tr style="background-color:#CCC">' +
									'<td width="50" align="center"><strong>Qtd</strong></td>' +
									'<td width="400" align="center"><strong>Colaborador</strong></td>' +
									'<td width="150" align="center"><strong>Valor da extra a receber</strong></td> ' +
									'<td width="150" align="center"><strong>Valor da extra a pagar</strong></td> ' +
								'</tr>' +
								'<tr>' +
									'<td align="center">'+contColab+'</td>' +
									'<td align="left">'+d[i].nome.toUpperCase()+'</td>' +
									'<td align="right">'+FloatParaTexto(valorReceber.toString())+'</td>' +
									'<td align="right">'+FloatParaTexto(valorPagar.toString())+'</td>' +
								'</tr>';
					}
				}
				html += '<tr style="background-color:#979797">' +
						  '<td align="center"><strong>Total</strong></td>' +
						  '<td align="left">&nbsp;</td>' +
						  '<td align="right"><strong>'+FloatParaTexto(totalReceber.toString())+'</strong></td>' +
						  '<td align="right"><strong>'+FloatParaTexto(totalPagar.toString())+'</strong></td>' +
						'</tr>' + 
						'</table>';
				
				$('#resultado').append(html);

			}
		}
	  }
	});
}

//função que gera o relatório por setor
function gerarRelatorioSetor(setor, dataInicial, dataFinal){
	$('#filtro').css('display','none');
	$('#resultado').empty();
	$('#resultado').css('display','block');

	jQuery.ajax({
	  type: 'POST',
	  url: 'http://www.excelservices.com.br/sistema/mvc/controler-mobile/carregarDadosRelatorioSetor.php',
	  data: {setor: setor, dataInicial: dataInicial, dataFinal: dataFinal },
	  dataType: 'jsonp',
	  crossDomain: true,
	  jsonp: false,
	  jsonpCallback: 'callback',
	  success: function(d) {
	  	if (d == null){
			navigator.notification.alert("Nenhum colaborador escalado neste período.", '',  "Erro", "OK");
		}
		else {
			if (d[0].resposta == 'sessaoExpirada'){
				navigator.notification.alert("Sessão expirada. Por favor, reinicie o aplicativo.", '',  "Erro", "OK");
			}
			else if (d[0].resposta == "erroConexao") {
				navigator.notification.alert("A conexão não pode ser estabelecida.", '',  "Erro", "OK");
			}
			else if (d[0].resposta == "erroSelecao") {
				navigator.notification.alert("Erro desconhecido ao selecionar o banco de dados.", '',  "Erro", "OK");
			}
			else if (d[0].resposta == "erroData"){
				navigator.notification.alert("Formato de data inválido.", '',  "Erro", "OK");
			}
			else {
				//inserção do resultado em uma tabela html
				html = '<div id="tituloRelatorio2">RELATÓRIO POR SETOR</div>' +
					   '<div id="nomeRelatorio">Setor: '+setor+'</div>' +
					   '<div id="cpfRelatorio">Período: '+dataInicial+' a '+dataFinal+'</div>' +
					   '<table id="tabelaRelatorio" class="relatorios">';

				//variável que acumula o total a receber pelo período
				var totalReceber = 0;
				//variável que acumula o total a pagar pelo período
				var totalPagar = 0;
				
				funcaoAnterior = ''; //usada para guardar a função utilizada no laço anterior
				dataAnterior = ''; //usada para guardar a data utilizada no laço anterior
				horaEntradaAnterior = ''; //usada para guardar o horário utilizado no laço anterior
				horaSaidaAnterior = '';
				contColab = 0; //contador dos colaboradores
				
				for(i=0 ; i<d.length ; i++){
					//calcula o valor da hora a receber
					valorReceber = parseFloat(d[i].valorReceber);
					//calcula o valor da hora a pagar
					valorPagar = parseFloat(d[i].valorPagar);
					//os totais são acumulados
					totalReceber += valorReceber;
					totalPagar += valorPagar;
					
					if (funcaoAnterior == '' && dataAnterior == '' && horaEntradaAnterior == '' && horaSaidaAnterior == ''){
						contColab++; 
						funcaoAnterior = d[i].funcao;
						dataAnterior = d[i].data;
						horaEntradaAnterior = d[i].entrada;
						horaSaidaAnterior = d[i].saida;
						html += '<tr>' +
									'<td colspan="4" align="center" style="background-color:#FF0; font-style:italic"><strong>'+d[i].funcao.toUpperCase()+' - '+d[i].data+' - das '+d[i].entrada.substr(0,5)+'hs às '+d[i].saida.substr(0,5)+'hs</strong></td>' +
								'</tr>' +
								'<tr style="background-color:#CCC">' +
									'<td width="50" align="center"><strong>Qtd</strong></td>' +
									'<td width="400" align="center"><strong>Colaborador</strong></td>' +
									'<td width="150" align="center"><strong>Valor da extra a receber</strong></td> ' +
									'<td width="150" align="center"><strong>Valor da extra a pagar</strong></td> ' +
								'</tr>' +
								'<tr>' +
									'<td align="center">'+contColab+'</td>' +
									'<td align="left">'+d[i].nome.toUpperCase()+'</td>' +
									'<td align="right">'+FloatParaTexto(valorReceber.toString())+'</td>' +
									'<td align="right">'+FloatParaTexto(valorPagar.toString())+'</td>' +
								'</tr>'; 
					}
					else if (funcaoAnterior == d[i].funcao && dataAnterior == d[i].data && horaEntradaAnterior == d[i].entrada && horaSaidaAnterior == d[i].saida){

								contColab++; 
								html += '<tr>' +
											'<td align="center">'+contColab+'</td>' +
											'<td align="left">'+d[i].nome.toUpperCase()+'</td>' +
											'<td align="right">'+FloatParaTexto(valorReceber.toString())+'</td>' +
											'<td align="right">'+FloatParaTexto(valorPagar.toString())+'</td>' +
										'</tr>';



					}
					else{
						contColab = 1;
						funcaoAnterior = d[i].funcao;
						dataAnterior = d[i].data;
						horaEntradaAnterior = d[i].entrada;
						horaSaidaAnterior = d[i].saida;
						html += '<tr>' +
									'<td colspan="4" align="center" style="background-color:#FF0; font-style:italic"><strong>'+d[i].funcao.toUpperCase()+' - '+d[i].data+' - das '+d[i].entrada.substr(0,5)+'hs às '+d[i].saida.substr(0,5)+'hs</strong></td>' +
								'</tr>' +
								'<tr style="background-color:#CCC">' +
									'<td width="50" align="center"><strong>Qtd</strong></td>' +
									'<td width="400" align="center"><strong>Colaborador</strong></td>' +
									'<td width="150" align="center"><strong>Valor da extra a receber</strong></td> ' +
									'<td width="150" align="center"><strong>Valor da extra a pagar</strong></td> ' +
								'</tr>' +
								'<tr>' +
									'<td align="center">'+contColab+'</td>' +
									'<td align="left">'+d[i].nome.toUpperCase()+'</td>' +
									'<td align="right">'+FloatParaTexto(valorReceber.toString())+'</td>' +
									'<td align="right">'+FloatParaTexto(valorPagar.toString())+'</td>' +
								'</tr>';
					}
				}
				html += '<tr style="background-color:#979797">' +
						  '<td align="center"><strong>Total</strong></td>' +
						  '<td align="left">&nbsp;</td>' +
						  '<td align="right"><strong>'+FloatParaTexto(totalReceber.toString())+'</strong></td>' +
						  '<td align="right"><strong>'+FloatParaTexto(totalPagar.toString())+'</strong></td>' +
						'</tr>' + 
						'</table>';
				
				$('#resultado').append(html);

			}
		}
	  }
	});
}




//função que gera o relatório geral
function gerarRelatorioGeral(dataIni, dataFim){
	$('#filtro').css('display','none');
	$('#resultado').empty();
	$('#resultado').css('display','block');

	jQuery.ajax({
	  type: 'POST',
	  url: 'http://www.excelservices.com.br/sistema/mvc/controler-mobile/carregarDadosRelatorioGeral.php',
	  data: {dataInicial: dataIni, dataFinal: dataFim },
	  dataType: 'jsonp',
	  crossDomain: true,
	  jsonp: false,
	  jsonpCallback: 'callback',
	  success: function(d) {
	  	if (d == null){
			navigator.notification.alert("Nenhum colaborador escalado neste período.", '',  "Erro", "OK");
		}
		else {
			if (d[0].resposta == 'sessaoExpirada'){
				navigator.notification.alert("Sessão expirada. Por favor, reinicie o aplicativo.", '',  "Erro", "OK");
			}
			else if (d[0].resposta == "erroConexao") {
				navigator.notification.alert("A conexão não pode ser estabelecida.", '',  "Erro", "OK");
			}
			else if (d[0].resposta == "erroSelecao") {
				navigator.notification.alert("Erro desconhecido ao selecionar o banco de dados.", '',  "Erro", "OK");
			}
			else if (d[0].resposta == "erroData"){
				navigator.notification.alert("Formato de data inválido.", '',  "Erro", "OK");
			}
			else {
				//armazena a funcao
				var funcao = d[0].funcao;
				//armazena a data
				var dia = d[0].data;
				//número de colaboradores
				var qtdExtras = parseFloat(d[0].qtdExtras);
				//armazena o valor da diária a receber
				var valorDiariaReceber = parseFloat(d[0].diariaReceb);
				//armazena o valor da diária a pagar
				var valorDiariaPagar = parseFloat(d[0].diariaPag);
				//valor a receber
				var valorReceber = parseFloat(d[0].valorReceber);
				//valor a pagar
				var valorPagar = parseFloat(d[0].valorPagar);
				//variável que acumula o subtotal da quantidade de extras
				var subTotalQtdExtras = parseFloat(d[0].qtdExtras);
				//variável que acumula o subtotal a receber pelo período
				var subTotalReceber = parseFloat(d[0].valorReceber);
				//variável que acumula o subtotal a pagar pelo período
				var subTotalPagar = parseFloat(d[0].valorPagar);
				//variável que acumula o total da quantidade de extras
				var totalQtdExtras = parseFloat(d[0].qtdExtras);
				//variável que acumula o total a receber pelo período
				var totalReceber = parseFloat(d[0].valorReceber);
				//variável que acumula o total a pagar pelo período
				var totalPagar = parseFloat(d[0].valorPagar);
				
				if (funcao == 'Auxiliar de servicos gerais'){
					funcao = 'Auxiliar de serviços gerais';
				}
				else if(funcao == 'Garcom'){
					funcao = 'Garçom';
				}
				else if(funcao == 'Garcom exclusivo'){
					funcao = 'Garçom exclusivo';
				}
				
				//inserção do resultado em uma tabela html
				html = '<div id="tituloRelatorio2">RELATÓRIO GERAL</div>' +
					   //'<div id="nomeRelatorio">Função: '+funcao+'</div>' +
					   '<div id="cpfRelatorio">Período: '+dataIni+' a '+dataFim+'</div>' +
					   '<table id="tabelaRelatorio" class="relatorios">' +
					   '<tr>' +
						  '<td colspan="7" align="center" style="background-color:#FF0 ;text-transform:uppercase;"><strong>'+funcao+'</strong></td>' +
					   '</tr>' +
					   '<tr style="background-color:#CCC">' +
							'<td width="110" align="center"><strong>Data</strong></td>' +
							'<td width="130" align="center"><strong>Número de extras</strong></td>' +
							'<td width="150" align="center"><strong>Extra unitária a receber</strong></td>' +
							'<td width="150" align="center"><strong>Total de extras a receber</strong></td> ' +
							'<td width="150" align="center"><strong>Extra unitária a pagar</strong></td>' +
							'<td width="150" align="center"><strong>Total de extras a pagar</strong></td>'+
						'</tr>';
						
				funcao = funcao.replace('ç','c');

				//se houver apenas um resultado
				if (d.length == 1){
					html += '<tr>' +
							  '<td align="center">'+dia+'</td>' +
							  '<td align="center">' +
								'<a title="Clique para ver os colaboradores" href="" onclick="return discriminarColaboradores(\''+funcao+'\',\''+dia+'\',\''+dia+'\')">'+qtdExtras.toString().replace('.',',')+'</a></td>' +
							  '<td align="right">'+FloatParaTexto(valorDiariaReceber.toString())+'</td>' +
							  '<td align="right">'+FloatParaTexto(valorReceber.toString())+'</td>' +
							  '<td align="right">'+FloatParaTexto(valorDiariaPagar.toString())+'</td>' +
							  '<td align="right">'+FloatParaTexto(valorPagar.toString())+'</td>' +
							'</tr>';
				}
				
				//se houver mais de um resultado
				else{	
					for(i=1 ; i<d.length ; i++){
						if (d[i].funcao == funcao){ 
							if (d[i].data == dia){
								qtdExtras += parseFloat(d[i].qtdExtras); 
								valorDiariaReceber = parseFloat(d[i].diariaReceb);
								valorDiariaPagar = parseFloat(d[i].diariaPag);
								valorReceber += parseFloat(d[i].valorReceber);
								valorPagar += parseFloat(d[i].valorPagar);
								subTotalQtdExtras += parseFloat(d[i].qtdExtras);
								subTotalReceber += parseFloat(d[i].valorReceber);
								subTotalPagar += parseFloat(d[i].valorPagar);
								totalQtdExtras += parseFloat(d[i].qtdExtras);
								totalReceber += parseFloat(d[i].valorReceber);
								totalPagar += parseFloat(d[i].valorPagar); 
								
								//se for o último resultado
								if (d.length-1 == i){
									html += '<tr>' +
												'<td align="center">'+dia+'</td>' +
												'<td align="center">' +
													'<a title="Clique para ver os colaboradores" href="" onclick="return discriminarColaboradores(\''+funcao+'\',\''+dia+'\',\''+dia+'\')">'+qtdExtras.toString().replace('.',',')+'</a></td>' +
												'<td align="right">'+FloatParaTexto(valorDiariaReceber.toString())+'</td>'+
												'<td align="right">'+FloatParaTexto(valorReceber.toString())+'</td>' +
												'<td align="right">'+FloatParaTexto(valorDiariaPagar.toString())+'</td>' +
												'<td align="right">'+FloatParaTexto(valorPagar.toString())+'</td>' +
											'</tr>' +
											'<tr style="background-color:#CCC">' +
												'<td align="center"><strong>Subtotal</strong></td>' +
												'<td align="center"><strong>'+subTotalQtdExtras+'</strong></td>' +
												'<td align="right">&nbsp;</td>' +
												'<td align="right"><strong>'+FloatParaTexto(subTotalReceber.toString())+'</strong></td>' +
												'<td align="right">&nbsp;</td>' +
												'<td align="right"><strong>'+FloatParaTexto(subTotalPagar.toString())+'</strong></td>' +
											'</tr>';
								}
							}
							//se a data for diferente da anterior
							else{
								html += '<tr>' +
											'<td align="center">'+dia+'</td>' +
											'<td align="center">' +
												'<a title="Clique para ver os colaboradores" href="" onclick="return discriminarColaboradores(\''+funcao+'\',\''+dia+'\',\''+dia+'\')">'+qtdExtras.toString().replace('.',',')+'</a></td>' +
											'<td align="right">'+FloatParaTexto(valorDiariaReceber.toString())+'</td>' +
											'<td align="right">'+FloatParaTexto(valorReceber.toString())+'</td>' +
											'<td align="right">'+FloatParaTexto(valorDiariaPagar.toString())+'</td>' +
											'<td align="right">'+FloatParaTexto(valorPagar.toString())+'</td>' +
										'</tr>';
							
								//reinicia todas as variáveis
								dia = d[i].data;
								qtdExtras = parseFloat(d[i].qtdExtras);
								valorDiariaReceber = parseFloat(d[i].diariaReceb);
								valorDiariaPagar = parseFloat(d[i].diariaPag);
								valorReceber = parseFloat(d[i].valorReceber);
								valorPagar = parseFloat(d[i].valorPagar);
								subTotalQtdExtras += parseFloat(d[i].qtdExtras);
								subTotalReceber += parseFloat(d[i].valorReceber);
								subTotalPagar += parseFloat(d[i].valorPagar);
								//os totais são acumulados
								totalQtdExtras += parseFloat(d[i].qtdExtras);
								totalReceber += parseFloat(d[i].valorReceber);
								totalPagar += parseFloat(d[i].valorPagar);
							
								//se for o último resultado
								if (d.length-1 == i){
									html += '<tr>' +
												'<td align="center">'+dia+'</td>' +
												'<td align="center">' +
													'<a title="Clique para ver os colaboradores" href="" onclick="return discriminarColaboradores(\''+funcao+'\',\''+dia+'\',\''+dia+'\')">'+qtdExtras.toString().replace('.',',')+'</a></td>' +
												'<td align="right">'+FloatParaTexto(valorDiariaReceber.toString())+'</td>'+
												'<td align="right">'+FloatParaTexto(valorReceber.toString())+'</td>' +
												'<td align="right">'+FloatParaTexto(valorDiariaPagar.toString())+'</td>' +
												'<td align="right">'+FloatParaTexto(valorPagar.toString())+'</td>' +
											'</tr>' +
											'<tr style="background-color:#CCC">' +
												'<td align="center"><strong>Subtotal</strong></td>' +
												'<td align="center"><strong>'+subTotalQtdExtras+'</strong></td>' +
												'<td align="right">&nbsp;</td>' +
												'<td align="right"><strong>'+FloatParaTexto(subTotalReceber.toString())+'</strong></td>' +
												'<td align="right">&nbsp;</td>' +
												'<td align="right"><strong>'+FloatParaTexto(subTotalPagar.toString())+'</strong></td>' +
											'</tr>';
								}
							}
						}
						//se a função for diferente da anterior
						else{
							html += '<tr>' +
										'<td align="center">'+dia+'</td>' +
										'<td align="center">' +
											'<a title="Clique para ver os colaboradores" href="" onclick="return discriminarColaboradores(\''+funcao+'\',\''+dia+'\',\''+dia+'\')">'+qtdExtras.toString().replace('.',',')+'</a></td>' +
										'<td align="right">'+FloatParaTexto(valorDiariaReceber.toString())+'</td>' +
										'<td align="right">'+FloatParaTexto(valorReceber.toString())+'</td>' +
										'<td align="right">'+FloatParaTexto(valorDiariaPagar.toString())+'</td>' +
										'<td align="right">'+FloatParaTexto(valorPagar.toString())+'</td>' +
									'</tr>' +
									'<tr style="background-color:#CCC">' +
										'<td align="center"><strong>Subtotal</strong></td>' +
										'<td align="center"><strong>'+subTotalQtdExtras+'</strong></td>' +
										'<td align="right">&nbsp;</td>' +
										'<td align="right"><strong>'+FloatParaTexto(subTotalReceber.toString())+'</strong></td>' +
										'<td align="right">&nbsp;</td>' +
										'<td align="right"><strong>'+FloatParaTexto(subTotalPagar.toString())+'</strong></td>' +
									'</tr>';
											
							funcao = d[i].funcao;
							if (funcao == 'Auxiliar de servicos gerais'){
								funcao = 'Auxiliar de serviços gerais';
							}
							else if(funcao == 'Garcom'){
								funcao = 'Garçom';
							}
							else if(funcao == 'Garcom exclusivo'){
								funcao = 'Garçom exclusivo';
							}
							
							dia = d[i].data;
							qtdExtras = parseFloat(d[i].qtdExtras);
							valorDiariaReceber = parseFloat(d[i].diariaReceb);
							valorDiariaPagar = parseFloat(d[i].diariaPag);
							valorReceber = parseFloat(d[i].valorReceber); 
							valorPagar = parseFloat(d[i].valorPagar);
							subTotalQtdExtras = parseFloat(d[i].qtdExtras);
							subTotalReceber = parseFloat(d[i].valorReceber); 
							subTotalPagar = parseFloat(d[i].valorPagar);
							totalQtdExtras += parseFloat(d[i].qtdExtras);
							totalReceber += parseFloat(d[i].valorReceber);
							totalPagar += parseFloat(d[i].valorPagar);
				
							html += '<tr>' +
										'<td colspan="7" align="center" style="background-color:#FF0 ;text-transform:uppercase;"><strong>'+funcao+'</strong></td>' +
									'</tr>' +
									'<tr style="background-color:#CCC">' +
										'<td width="110" align="center"><strong>Data</strong></td>' +
										'<td width="130" align="center"><strong>Número de extras</strong></td>' +
										'<td width="150" align="center"><strong>Extra unitária a receber</strong></td>' +
										'<td width="150" align="center"><strong>Total de extras a receber</strong></td> ' +
										'<td width="150" align="center"><strong>Extra unitária a pagar</strong></td>' +
										'<td width="150" align="center"><strong>Total de extras a pagar</strong></td>'+
									'</tr>';
							
							funcao = funcao.replace('ç','c');
									
							//se for o último resultado
							if (d.length == i+1){
								html += '<tr>' +
											'<td align="center">'+dia+'</td>' +
											'<td align="center">' +
												'<a title="Clique para ver os colaboradores" href="" onclick="return discriminarColaboradores(\''+funcao+'\',\''+dia+'\',\''+dia+'\')">'+qtdExtras.toString().replace('.',',')+'</a></td>' +
											'<td align="right">'+FloatParaTexto(valorDiariaReceber.toString())+'</td>' +
											'<td align="right">'+FloatParaTexto(valorReceber.toString())+'</td>' +
											'<td align="right">'+FloatParaTexto(valorDiariaPagar.toString())+'</td>' +
											'<td align="right">'+FloatParaTexto(valorPagar.toString())+'</td>' +
										'</tr>' +
										'<tr style="background-color:#CCC">' +
											'<td align="center"><strong>Subtotal</strong></td>' +
											'<td align="center"><strong>'+subTotalQtdExtras+'</strong></td>' +
											'<td align="right">&nbsp;</td>' +
											'<td align="right"><strong>'+FloatParaTexto(subTotalReceber.toString())+'</strong></td>' +
											'<td align="right">&nbsp;</td>' +
											'<td align="right"><strong>'+FloatParaTexto(subTotalPagar.toString())+'</strong></td>' +
										'</tr>';
							}
						}
					}
				}
				html += '<tr style="background-color:#979797 ;text-transform:uppercase;">' +
						  '<td align="center"><strong>Total</strong></td>' +
						  '<td align="center"><strong>'+totalQtdExtras+'</strong></td>' +
						  '<td align="right">&nbsp;</td>' +
						  '<td align="right"><strong>'+FloatParaTexto(totalReceber.toString())+'</strong></td>' +
						  '<td align="right">&nbsp;</td>' +
						  '<td align="right"><strong>'+FloatParaTexto(totalPagar.toString())+'</strong></td>' +
						'</tr>' + 
						'</table>';
				
				$('#resultado').append(html);
				
			}
		}
	  }
	});
}

function carregarFuncoes(){ 
	$('#funcao').empty(); //limpa o select
	var html = '<option value="" selected="selected"></option>';
	jQuery.ajax({
	  type: 'POST',
	  url: 'http://www.excelservices.com.br/sistema/mvc/controler-mobile/carregarFuncoes.php',
	  dataType: 'jsonp',
	  crossDomain: true,
	  jsonp: false,
	  jsonpCallback: 'callback',
	  success: function(d) {
	  	if (d[0].resposta == 'sessaoExpirada'){
			navigator.notification.alert("Sessão expirada. Por favor, reinicie o aplicativo.", '',  "Erro", "OK");
		}
		else if (d[0].resposta == "erroConexao") {
			navigator.notification.alert("A conexão não pode ser estabelecida.", '',  "Erro", "OK");
		}
		else if (d[0].resposta == "erroSelecao") {
			navigator.notification.alert("Erro desconhecido ao selecionar o banco de dados.", '',  "Erro", "OK");
		}
		else {
			for(i=0 ; i<d.length ; i++){
				html += '<option value="'+d[i]+'">'+d[i]+'</option>';	
			}
			$('#funcao').append(html); //adiciona as opções ao select
		}
	  }
	});
}

function carregarSetores(){ 
	$('#setor').empty(); //limpa o select
	var html = '<option value="" selected="selected"></option>';
	jQuery.ajax({
	  type: 'POST',
	  url: 'http://www.excelservices.com.br/sistema/mvc/controler-mobile/carregarSetores.php',
	  dataType: 'jsonp',
	  crossDomain: true,
	  jsonp: false,
	  jsonpCallback: 'callback',
	  success: function(d) {
	  	if (d[0].resposta == 'sessaoExpirada'){
			navigator.notification.alert("Sessão expirada. Por favor, reinicie o aplicativo.", '',  "Erro", "OK");
		}
		else if (d[0].resposta == "erroConexao") {
			navigator.notification.alert("A conexão não pode ser estabelecida.", '',  "Erro", "OK");
		}
		else if (d[0].resposta == "erroSelecao") {
			navigator.notification.alert("Erro desconhecido ao selecionar o banco de dados.", '',  "Erro", "OK");
		}
		else {
			for(i=0 ; i<d.length ; i++){
				html += '<option value="'+d[i]+'">'+d[i]+'</option>';	
			}
			$('#setor').append(html); //adiciona as opções ao select
		}
	  }
	});
}

function carregarColaboradores(){ 
	$('#nome').empty(); //limpa o select
	var html = '<option value="" selected="selected"></option>';
	jQuery.ajax({
	  type: 'POST',
	  url: 'http://www.excelservices.com.br/sistema/mvc/controler-mobile/carregarColaboradores.php',
	  dataType: 'jsonp',
	  crossDomain: true,
	  jsonp: false,
	  jsonpCallback: 'callback',
	  success: function(d) {
	  	if (d[0].resposta == 'sessaoExpirada'){
			navigator.notification.alert("Sessão expirada. Por favor, reinicie o aplicativo.", '',  "Erro", "OK");
		}
		else if (d[0].resposta == "erroConexao") {
			navigator.notification.alert("A conexão não pode ser estabelecida.", '',  "Erro", "OK");
		}
		else if (d[0].resposta == "erroSelecao") {
			navigator.notification.alert("Erro desconhecido ao selecionar o banco de dados.", '',  "Erro", "OK");
		}
		else {
			for(i=0 ; i<d.length ; i++){
				html += '<option value="'+d[i].id+'">'+d[i].nome+'</option>';	
			}
			$('#nome').append(html); //adiciona as opções ao select
		}
	  }
	});
}

function discriminarColaboradores(funcao, data){
	$('#resultado').css('display','none');
	$('#resultado2').empty();
	$('#resultado2').css('display','block');

	jQuery.ajax({
	  type: 'POST',
	  url: 'http://www.excelservices.com.br/sistema/mvc/controler-mobile/carregarDadosRelatorioFuncao.php',
	  data: {funcao: funcao, dataInicial: data, dataFinal: data },
	  dataType: 'jsonp',
	  crossDomain: true,
	  jsonp: false,
	  jsonpCallback: 'callback',
	  success: function(d) {
	  	if (d == null){
			navigator.notification.alert("Nenhum colaborador escalado neste período.", '',  "Erro", "OK");
		}
		else {
			if (d[0].resposta == 'sessaoExpirada'){
				navigator.notification.alert("Sessão expirada. Por favor, reinicie o aplicativo.", '',  "Erro", "OK");
			}
			else if (d[0].resposta == "erroConexao") {
				navigator.notification.alert("A conexão não pode ser estabelecida.", '',  "Erro", "OK");
			}
			else if (d[0].resposta == "erroSelecao") {
				navigator.notification.alert("Erro desconhecido ao selecionar o banco de dados.", '',  "Erro", "OK");
			}
			else if (d[0].resposta == "erroData"){
				navigator.notification.alert("Formato de data inválido.", '',  "Erro", "OK");
			}
			else {
				if (funcao == 'Auxiliar de servicos gerais'){
					funcao = 'Auxiliar de serviços gerais';
				}
				else if(funcao == 'Garcom'){
					funcao = 'Garçom';
				}
				else if(funcao == 'Garcom exclusivo'){
					funcao = 'Garçom exclusivo';
				}

				//inserção do resultado em uma tabela html
				html = '<div id="tituloRelatorio2">RELATÓRIO POR FUNÇÃO</div>' +
					   '<div id="nomeRelatorio">Função: '+funcao+'</div>' +
					   '<div id="cpfRelatorio">Período: '+data+' a '+data+'</div>' +
					   '<table id="tabelaRelatorio" class="relatorios">';

				//variável que acumula o total a receber pelo período
				var totalReceber = 0;
				//variável que acumula o total a pagar pelo período
				var totalPagar = 0;
				
				dataAnterior = ''; //usada para guardar a data utilizada no laço anterior
				horaEntradaAnterior = ''; //usada para guardar o horário utilizado no laço anterior
				horaSaidaAnterior = '';
				contColab = 0; //contador dos colaboradores

				for(i=0 ; i<d.length ; i++){
					//calcula o valor da hora a receber
					valorReceber = parseFloat(d[i].valorReceber);
					//calcula o valor da hora a pagar
					valorPagar = parseFloat(d[i].valorPagar);
					//os totais são acumulados
					totalReceber += valorReceber;
					totalPagar += valorPagar;
					
					if (dataAnterior == '' && horaEntradaAnterior == '' && horaSaidaAnterior == ''){
						contColab++;
						dataAnterior = d[i].data;
						horaEntradaAnterior = d[i].entrada;
						horaSaidaAnterior = d[i].saida;
						html += '<tr>' +
									'<td colspan="4" align="center" style="background-color:#FF0; font-style:italic"><strong>Dia '+d[i].data+' - das '+d[i].entrada.substr(0,5)+'hs às '+d[i].saida.substr(0,5)+'hs</strong></td>' +
								'</tr>' +
								'<tr style="background-color:#CCC">' +
									'<td width="50" align="center"><strong>Qtd</strong></td>' +
									'<td width="400" align="center"><strong>Colaborador</strong></td>' +
									'<td width="150" align="center"><strong>Valor da extra a receber</strong></td> ' +
									'<td width="150" align="center"><strong>Valor da extra a pagar</strong></td> ' +
								'</tr>' +
								'<tr>' +
									'<td align="center">'+contColab+'</td>' +
									'<td align="left">'+d[i].nome.toUpperCase()+'</td>' +
									'<td align="right">'+FloatParaTexto(valorReceber.toString())+'</td>' +
									'<td align="right">'+FloatParaTexto(valorPagar.toString())+'</td>' +
								'</tr>'; 
					}
					else if (dataAnterior == d[i].data){ 
						if (horaEntradaAnterior == d[i].entrada && horaSaidaAnterior == d[i].saida){
							contColab++;
							html += '<tr>' +
										'<td align="center">'+contColab+'</td>' +
										'<td align="left">'+d[i].nome.toUpperCase()+'</td>' +
										'<td align="right">'+FloatParaTexto(valorReceber.toString())+'</td>' +
										'<td align="right">'+FloatParaTexto(valorPagar.toString())+'</td>' +
									'</tr>';
						}
						else{
							contColab = 1;
							horaEntradaAnterior = d[i].entrada;
							horaSaidaAnterior = d[i].saida;
							html += '<tr>' +
										'<td colspan="4" align="center" style="background-color:#FF0; font-style:italic"><strong>Dia '+d[i].data+' - das '+d[i].entrada.substr(0,5)+'hs às '+d[i].saida.substr(0,5)+'hs</strong></td>' +
									'</tr>' +
									'<tr style="background-color:#CCC">' +
										'<td width="50" align="center"><strong>Qtd</strong></td>' +
										'<td width="400" align="center"><strong>Colaborador</strong></td>' +
										'<td width="150" align="center"><strong>Valor da extra a receber</strong></td> ' +
										'<td width="150" align="center"><strong>Valor da extra a pagar</strong></td> ' +
									'</tr>' +
									'<tr>' +
										'<td align="center">'+contColab+'</td>' +
										'<td align="left">'+d[i].nome.toUpperCase()+'</td>' +
										'<td align="right">'+FloatParaTexto(valorReceber.toString())+'</td>' +
										'<td align="right">'+FloatParaTexto(valorPagar.toString())+'</td>' +
									'</tr>';
						}
					}
					else{
						contColab = 1;
						dataAnterior = d[i].data;
						horaEntradaAnterior = d[i].entrada;
						horaSaidaAnterior = d[i].saida;
						html += '<tr>' +
									'<td colspan="4" align="center" style="background-color:#FF0; font-style:italic"><strong>Dia '+d[i].data+' - das '+d[i].entrada.substr(0,5)+'hs às '+d[i].saida.substr(0,5)+'hs</strong></td>' +
								'</tr>' +
								'<tr style="background-color:#CCC">' +
									'<td width="50" align="center"><strong>Qtd</strong></td>' +
									'<td width="400" align="center"><strong>Colaborador</strong></td>' +
									'<td width="150" align="center"><strong>Valor da extra a receber</strong></td> ' +
									'<td width="150" align="center"><strong>Valor da extra a pagar</strong></td> ' +
								'</tr>' +
								'<tr>' +
									'<td align="center">'+contColab+'</td>' +
									'<td align="left">'+d[i].nome.toUpperCase()+'</td>' +
									'<td align="right">'+FloatParaTexto(valorReceber.toString())+'</td>' +
									'<td align="right">'+FloatParaTexto(valorPagar.toString())+'</td>' +
								'</tr>';
					}
				}
				html += '<tr style="background-color:#979797">' +
						  '<td align="center"><strong>Total</strong></td>' +
						  '<td align="left">&nbsp;</td>' +
						  '<td align="right"><strong>'+FloatParaTexto(totalReceber.toString())+'</strong></td>' +
						  '<td align="right"><strong>'+FloatParaTexto(totalPagar.toString())+'</strong></td>' +
						'</tr>' + 
						'</table>';
				
				$('#resultado2').append(html);

			}
		}
	  }
	});
}

//função que recebe os valores de compra que serão colocados na lista
//e os transforma para reais (Obs: neste caso o priceFormat não funciona)
function FloatParaTexto(texto){ 
	texto = texto.replace('.',','); 
	posVirgula = texto.indexOf(',');
	
	//deixando o valor com duas casas decimais no caso de haverem mais de
	if (posVirgula > -1){
		while((texto.length-(posVirgula+1)) > 2){
			texto = texto.substr(0, texto.length-1);
		}
	}

	if (texto.charAt(texto.length-2) == ',')
		texto = texto+'0';
	else if (texto.charAt(texto.length-3) != ',')
		texto = texto+',00';

	if (texto.length > 6){
		textoInvertido = "";
		textoSaida = "";
		aptFim = texto.length-1;
		count = 3;
		for (x = 1 ; x <= 6 ; x++){
			textoInvertido +=  texto.charAt(aptFim--);
		}
		for (x = aptFim ; x >= 0 ; x--){
			if (count == 3){
				textoInvertido += ".";
				count = 0; 
			} 
			textoInvertido +=  texto.charAt(aptFim--);
			count++;
		} 
		for (x = textoInvertido.length-1 ; x >= 0 ; x--){
			textoSaida += textoInvertido.charAt(x);
		}
		return 'R$ '+textoSaida;
	}
	return 'R$ '+texto;
}