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

function filtrar(){ 
	$('#filtro').css('display','none'); 
	if ($('#tipo').val() == ''){
		navigator.notification.alert("Informe o que deseja fazer.", '',  "Erro", "OK");
	}
	else if ($('#data').val() == ''){
		navigator.notification.alert("Informe a data.", '',  "Erro", "OK");
	}
	else{
	  $.mobile.showPageLoadingMsg();
	  jQuery.ajax({
		type: 'POST',
		url: 'http://localhost/sistema/mvc/controler-mobile/filtroColaboradores.php',
		data: {tipo: $('#tipo').val(), nome: $('#nome').val(), funcao: $('#funcao').val(), data: $('#data').val(), horario: $('#horario').val(), carro: $('#carro').val(), sexo: $('#sexo').val(), pontuacao: $('#pont').val() },
		dataType: 'jsonp',
		crossDomain: true,
		jsonp: false,
		jsonpCallback: 'callback',
		success: function(d) {
			if(d[0].id > 0){ 
			  var html = '';
			  var infoExtra = '';
			  var colaborador = d;
			  for(i=0 ; i<colaborador.length ; i++){
				  html += '<tr><td style="padding:5px">';
				  
				  if ($('#tipo').val() == 'Escalado'){
					  infoExtra = colaborador[i].funcao.toUpperCase()+' ('+colaborador[i].setor.toUpperCase()+')<br/>';
					  infoExtra += 'Das '+colaborador[i].entrada.substr(0,5)+'hs às '+colaborador[i].saida.substr(0,5)+'hs';
				  }
				  else{ 
					  if (colaborador[i].disponibilidade != null){
						  for (j=0 ; j<colaborador[i].disponibilidade.length ; j++){
							  infoExtra += colaborador[i].disponibilidade[j]+' - ';
						  }
						  infoExtra = infoExtra.substr(0,infoExtra.length-2);
						  infoExtra += '<br/>';
					  }
					  else{
						  infoExtra = '<span style="font-style:italic">Disponibilidade não informada</span><br/>';
					  }
				  
					  if (colaborador[i].telefones != null){
						  for (j=0 ; j<colaborador[i].telefones.length ; j++){
							  infoExtra += colaborador[i].telefones[j]+'  /  ';
						  }
						  infoExtra = infoExtra.substr(0,infoExtra.length-3);
					  }
					  else{
						  infoExtra += '<span style="font-style:italic">Nenhum telefone informado</span>';
					  }
				  }
				  //variável usada para evitar que o browser pegue a imagem em sua cache
				  d = 'timestamp=' + new Date().getTime(); 
				  //define a função que será chamada quando o link do colaborador for clicado
				  if ($('#tipo').val() == 'Todos'){
					  var funcao = 'exibeInformacoes';
				  }
				  else if ($('#tipo').val() == 'Escalado'){
					  var funcao = 'exibeCampos';
				  }
				  else{
					  var funcao = 'exibeCampos';
				  }
				 
				  //desabilita o link do colaborador com pontuacao igual a 1
				  if (colaborador[i].pontuacao == 1){
					  html += '<div id="'+colaborador[i].id+'" class="linha_resultado">' +
								  '<div style="float:left">' +
									  '<img src="http://localhost/sistema/img/colaboradores/'+colaborador[i].foto+'?'+d+'" ' +
									  'class="linha_resultado_foto" />' +
								  '</div>' +
								  '<div style="float:left; position:relative; left:35px; top:15px">' +
									  '<span class="linha_resultado_nome_desab">' + colaborador[i].nome + '</span><br/>' +
									  '<span class="linha_resultado_infoExtra">' + infoExtra + '</span>' +
								  '</div>' +
							  '</div>';
				  }
				  else{
					  html += '<div id="'+colaborador[i].id+'" class="linha_resultado">' +
								  '<div style="float:left">' +
									  '<a href="" onclick="return '+funcao+'('+colaborador[i].id+')">' +
									  '<img src="http://localhost/sistema/img/colaboradores/'+colaborador[i].foto+'?'+d+'" ' +
									  'class="linha_resultado_foto" /></a>' +
								  '</div>' +
								  '<div id="colab'+colaborador[i].id+'" style="float:left; position:relative;'+
								  'left:15px; top:7px; display:none;">' +
									  '<input id="idEscala'+colaborador[i].id+'" type="hidden" value="'+colaborador[i].idEscala+'" />'+
									  '<select id="func'+colaborador[i].id+'" class="linha_resultado_select" '+
									  'onchange="validaFuncao('+colaborador[i].id+')"></select><br/>' +
									  '<select id="set'+colaborador[i].id+'" class="linha_resultado_select" '+
									  'onchange="validaSetor('+colaborador[i].id+')"></select><br/>' +
									  '<select id="hor'+colaborador[i].id+'" class="linha_resultado_select" '+
									  'onchange="validaHorario('+colaborador[i].id+')"></select><br/>' +
									  '<input id="btn'+colaborador[i].id+'" type="button" value="Escalar" class="linha_resultado_button_disabled" onclick="escalaColaborador('+colaborador[i].id+')" disabled/>' +
									  '<a href="" id="addExtra'+colaborador[i].id+'" onclick="return adicionarMeiaExtra('+colaborador[i].id+','+colaborador[i].idEscala+',\''+colaborador[i].nome+'\')" style="display:none">' +
									  '<img src="../../img/outras/addExtra.png" title="Adicionar meia extra" ' +
									  'class="linha_resultado_addExtra" /></a>' +
									  '<a href="" id="subs'+colaborador[i].id+'" onclick="return substituirColaborador('+colaborador[i].id+','+colaborador[i].idEscala+')" style="display:none">' +
									  '<img src="../../img/outras/substituicao.png" title="Substituir colaborador" ' +
									  'class="linha_resultado_substituir" /></a>' +
									  '<a href="" id="rem'+colaborador[i].id+'" onclick="return removerEscala('+colaborador[i].id+','+colaborador[i].idEscala+',\''+colaborador[i].nome+'\')" style="display:none">' +
									  '<img src="../../img/validacao/cancel48.png" title="Remover escala deste colaborador" ' +
									  'class="linha_resultado_desescalar" /></a>' +
								  '</div>' +
								  '<div id="colab2'+colaborador[i].id+'" style="float:left; position:relative;'+
								  'left:15px; top:7px; display:none;">' +
									  '<select id="func2'+colaborador[i].id+'" class="linha_resultado_select" '+
									  'onchange="validaFuncao2('+colaborador[i].id+')" disabled></select><br/>' +
									  '<select id="set2'+colaborador[i].id+'" class="linha_resultado_select" '+
									  'onchange="validaSetor2('+colaborador[i].id+')" disabled></select><br/>' +
									  '<select id="hor2'+colaborador[i].id+'" class="linha_resultado_select" '+
									  'onchange="validaHorario2('+colaborador[i].id+')" disabled></select><br/>' +
									  '<input id="btn2'+colaborador[i].id+'" type="button" value="Dobrar escala" class="linha_resultado_button_disabled" onclick="dobrarEscalaColaborador('+colaborador[i].id+')" disabled/>' +
								  '</div>' +
								  '<div style="float:left; position:relative; left:35px; top:15px">' +
									  '<a href="" onclick="return '+funcao+'('+colaborador[i].id+')">' +
									  '<span class="linha_resultado_nome">' + colaborador[i].nome + '</span><br/>' +
									  '<span class="linha_resultado_infoExtra">' + infoExtra + '</span></a>' +
								  '</div>' +
							  '</div>';
				  }
				  
				  html += '</td></tr>';
				  
				  $('#resultado table').append(html);
				  html = '';
				  infoExtra = '';
				  $('#func'+colaborador[i].id+'').css('color','#979797');
				  $('#set'+colaborador[i].id+'').css('color','#979797');
				  $('#hor'+colaborador[i].id+'').append(preencherHorariosEntrada());
				  $('#hor'+colaborador[i].id+'').css('color','#979797');
				  
				  $('#func2'+colaborador[i].id+'').css('color','#979797');
				  $('#set2'+colaborador[i].id+'').css('color','#979797');
				  $('#hor2'+colaborador[i].id+'').append(preencherHorariosEntrada());
				  $('#hor2'+colaborador[i].id+'').css('color','#979797');
				  
				  
				  //guarda os valores nas variáveis globais utilizadas no filtro por nome na substituição
				  idColabGlobal = colaborador[i].id;
				  idEscalaGlobal = colaborador[i].idEscala;
	  
				  //exibe os valores já selecionados quando for um colaborador escalado
				  if ($('#tipo').val() == 'Escalado'){
					  $('#hor'+colaborador[i].id+'').val(colaborador[i].entrada.substr(0,5));
					  //preencherFuncoes(colaborador[i].id, colaborador[i].funcao);
					  $('#func'+colaborador[i].id+'').css('color','#000');
					  //preencherSetores(colaborador[i].id, colaborador[i].setor);
					  $('#set'+colaborador[i].id+'').css('color','#000');
				  }
				  else{
					  //se a função for informada no filtro
					  if ($('#funcao').val() != ''){
						  //preencherFuncoes(colaborador[i].id, $('#funcao').val());
						  //preencherSetores(colaborador[i].id, colaborador[i].setor);
					  }
					  else{
						 // preencherFuncoes(colaborador[i].id, '');
						  //preencherSetores(colaborador[i].id, '');
					  }
					  
					  //se o horário foi informado
					  if ($('#horario').val() != ''){
						  $('#hor'+colaborador[i].id+'').val($('#horario').val().substr(0,5));
					  }
					  //se a função e o horário foi informado
					  if ($('#funcao').val() != '' && $('#horario').val() != ''){
						  $('#btn'+colaborador[i].id+'').removeAttr('disabled');
						  $('#btn'+colaborador[i].id+'').attr('class','linha_resultado_button');
					  }
				  }
			  }
			  $('#resultado').css('display','block');
			  $.mobile.hidePageLoadingMsg();
			}
			else if (d[0].resposta == "erroConexao") {
				$.mobile.hidePageLoadingMsg();
				navigator.notification.alert("Erro ao conectar-se ao banco de dados.", '',  "Erro", "OK");
			}
			else if (d[0].resposta == "erroSelecao") {
				$.mobile.hidePageLoadingMsg();
				navigator.notification.alert("Erro ao selecionar o banco de dados.", '',  "Erro", "OK");
			}
			else if (d[0].resposta == 'erroNome'){
				$.mobile.hidePageLoadingMsg();
				navigator.notification.alert("Nome inválido.", '',  "Erro", "OK");
			}
			else if (d[0].resposta == 'erroData'){
				$.mobile.hidePageLoadingMsg();
				navigator.notification.alert("Data inválida.", '',  "Erro", "OK");
			}
			else if (d[0].resposta == null){
				$.mobile.hidePageLoadingMsg();
				navigator.notification.alert("Nenhum colaborador encontrado.", '',  "Aviso", "OK");
			}
		}
	  });
	}
}

function sair(){
	navigator.app.exitApp();
}


/* funções gerais */
//preenche os selects de horário
function preencherHorariosEntrada(){
	var html  = '<option value=""  selected="selected">Entrada...</option>';
	    html += '<option value="00:00">00:00</option><option value="00:30">00:30</option>';	
		html += '<option value="01:00">01:00</option><option value="01:30">01:30</option>';	
		html += '<option value="02:00">02:00</option><option value="02:30">02:30</option>';	
		html += '<option value="03:00">03:00</option><option value="03:30">03:30</option>';	
		html += '<option value="04:00">04:00</option><option value="04:30">04:30</option>';	
		html += '<option value="05:00">05:00</option><option value="05:30">05:30</option>';	
		html += '<option value="06:00">06:00</option><option value="06:30">06:30</option>';	
		html += '<option value="07:00">07:00</option><option value="07:30">07:30</option>';	
		html += '<option value="08:00">08:00</option><option value="08:30">08:30</option>';	
		html += '<option value="09:00">09:00</option><option value="09:30">09:30</option>';	
		html += '<option value="10:00">10:00</option><option value="10:30">10:30</option>';	
		html += '<option value="11:00">11:00</option><option value="11:30">11:30</option>';	
		html += '<option value="12:00">12:00</option><option value="12:30">12:30</option>';	
		html += '<option value="13:00">13:00</option><option value="13:30">13:30</option>';	
		html += '<option value="14:00">14:00</option><option value="14:30">14:30</option>';	
		html += '<option value="15:00">15:00</option><option value="15:30">15:30</option>';	
		html += '<option value="16:00">16:00</option><option value="16:30">16:30</option>';	
		html += '<option value="17:00">17:00</option><option value="17:30">17:30</option>';	
		html += '<option value="18:00">18:00</option><option value="18:30">18:30</option>';	
		html += '<option value="19:00">19:00</option><option value="19:30">19:30</option>';	
		html += '<option value="20:00">20:00</option><option value="20:30">20:30</option>';	
		html += '<option value="21:00">21:00</option><option value="21:30">21:30</option>';	
		html += '<option value="22:00">22:00</option><option value="22:30">22:30</option>';	
		html += '<option value="23:00">23:00</option><option value="23:30">23:30</option>';
	
		return html;
}

function preencherHorariosSaida(){
	var html  = '<option value=""  selected="selected">Saída...</option>';
	    html += '<option value="00:00">00:00</option><option value="00:30">00:30</option>';	
		html += '<option value="01:00">01:00</option><option value="01:30">01:30</option>';	
		html += '<option value="02:00">02:00</option><option value="02:30">02:30</option>';	
		html += '<option value="03:00">03:00</option><option value="03:30">03:30</option>';	
		html += '<option value="04:00">04:00</option><option value="04:30">04:30</option>';	
		html += '<option value="05:00">05:00</option><option value="05:30">05:30</option>';	
		html += '<option value="06:00">06:00</option><option value="06:30">06:30</option>';	
		html += '<option value="07:00">07:00</option><option value="07:30">07:30</option>';	
		html += '<option value="08:00">08:00</option><option value="08:30">08:30</option>';	
		html += '<option value="09:00">09:00</option><option value="09:30">09:30</option>';	
		html += '<option value="10:00">10:00</option><option value="10:30">10:30</option>';	
		html += '<option value="11:00">11:00</option><option value="11:30">11:30</option>';	
		html += '<option value="12:00">12:00</option><option value="12:30">12:30</option>';	
		html += '<option value="13:00">13:00</option><option value="13:30">13:30</option>';	
		html += '<option value="14:00">14:00</option><option value="14:30">14:30</option>';	
		html += '<option value="15:00">15:00</option><option value="15:30">15:30</option>';	
		html += '<option value="16:00">16:00</option><option value="16:30">16:30</option>';	
		html += '<option value="17:00">17:00</option><option value="17:30">17:30</option>';	
		html += '<option value="18:00">18:00</option><option value="18:30">18:30</option>';	
		html += '<option value="19:00">19:00</option><option value="19:30">19:30</option>';	
		html += '<option value="20:00">20:00</option><option value="20:30">20:30</option>';	
		html += '<option value="21:00">21:00</option><option value="21:30">21:30</option>';	
		html += '<option value="22:00">22:00</option><option value="22:30">22:30</option>';	
		html += '<option value="23:00">23:00</option><option value="23:30">23:30</option>';
	
		return html;
}

//preenche os selects de funções de acordo com o id do colaborador, disponibilizando assim
//apenas as funções nas quais ele se cadastrou
function preencherFuncoes(id, func){
	$('#func'+id+'').empty(); //limpa o select
	$('#func2'+id+'').empty(); //limpa o select
	
	var xhr = new XMLHttpRequest();	
	var html = '<option value="" selected="selected">Função...</option>';
	xhr.onreadystatechange = function() { 
		if (xhr.readyState==4 && xhr.status==200) {
			if (xhr.responseText == 'sessaoExpirada'){
				window.location.href = 'erros/erro7.html';
			}
			else if (xhr.responseText == "erroConexao") {
				window.location="erros/erro1.html";
			}
			else if (xhr.responseText == "erroSelecao") {
				window.location="erros/erro2.html";
			}
			else{	
				var funcao = JSON.parse(xhr.responseText);	//resposta do servidor
	
				for(i=0 ; i<funcao.length ; i++){
					html += '<option value="'+funcao[i]+'">'+funcao[i]+'</option>';	
				}
				
				$('#func'+id+'').append(html); //adiciona as opções ao select
				$('#func2'+id+'').append(html); //adiciona as opções ao select
				$('#func'+id+'').val(func);
			}
		}
	}
	xhr.open('GET', '../controler/carregaFuncoesColaborador.php?id=' + id, true);
	xhr.send(); //envia ao servidor	
}

//preenche os selects de funções de acordo com o id do colaborador, disponibilizando assim
//apenas as funções nas quais ele se cadastrou
function preencherSetores(id, set){
	$('#set'+id+'').empty(); //limpa o select
	$('#set2'+id+'').empty(); //limpa o select
	
	var xhr = new XMLHttpRequest();	
	var html = '<option value="" selected="selected">Setor...</option>';
	xhr.onreadystatechange = function() { 
		if (xhr.readyState==4 && xhr.status==200) {
			if (xhr.responseText == 'sessaoExpirada'){
				window.location.href = 'erros/erro7.html';
			}
			else if (xhr.responseText == "erroConexao") {
				window.location="erros/erro1.html";
			}
			else if (xhr.responseText == "erroSelecao") {
				window.location="erros/erro2.html";
			}
			else{	
				var setor = JSON.parse(xhr.responseText);	//resposta do servidor
	
				for(i=0 ; i<setor.length ; i++){
					html += '<option value="'+setor[i]+'">'+setor[i]+'</option>';	
				}
				
				$('#set'+id+'').append(html); //adiciona as opções ao select
				$('#set2'+id+'').append(html); //adiciona as opções ao select
				$('#set'+id+'').val(set);
			}
		}
	}
	xhr.open('GET', '../controler/carregaSetores.php', true);
	xhr.send(); //envia ao servidor	
}