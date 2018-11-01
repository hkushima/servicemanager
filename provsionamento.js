/**
Passos
1. Relaciona server com host
2. Atualiza status do host e do server
3. Relaciona interfaces com o cabos
4. Relaciona porta com a cabos
5. Relaciona rack com server / host
6. Atualiza o rack com change
*/

var change = system.vars.$script.parent_change;
var host = system.vars.$script.logical_name;
var rack = system.vars.$script.uol_location_ci;
var posrack = system.vars.$script.uol_project;
var server = system.vars.$script.uol_hard_server;

var regua1 = system.vars.$script.uol_regua_eletrica;
var regua2 = system.vars.$script.uol_regua_eletrica1;

var portaIF0 = system.vars.$script.uol_porta_adm;
var caboIF0 = system.vars.$script.uol_cabo_adm;
var macIF0 = system.vars.$script.misc7;

var portaIF1 = system.vars.$script.uol_porta_srv;
var caboIF1 = system.vars.$script.uol_cabo_srv;
var macIF1 = system.vars.$script.uol_physical_address1;

var portaIF2 = system.vars.$script.uol_porta_ext;
var caboIF2 = system.vars.$script.uol_cabo_ext;
var macIF2 = system.vars.$script.uol_physical_address2;

var portaIF3 = system.vars.$script.uol_porta_l2slb;
var caboIF3 = system.vars.$script.uol_cabo_l2slb;
var macIF3 = system.vars.$script.uol_physical_address3;

var portaIF4 = system.vars.$script.uol_porta_l2multi;
var caboIF4 = system.vars.$script.uol_cabo_l2multi; 
var macIF4 = system.vars.$script.uol_physical_address4;

var portaIF5 = system.vars.$script.erp_unique_id;
var caboIF5 = system.vars.$script.erp_parent_unique_id;
var macIF5 = system.vars.$script.erp_type;

var portaIF6 = system.vars.$script.erp_sid;
var caboIF6 = system.vars.$script.erp_client;
var macIF6 = system.vars.$script.erp_approver;

var portaIF7 = system.vars.$script.erp_imported;
var caboIF7 = system.vars.$script.erp_development_client;
var macIF7 = system.vars.$script.erp_development_gateway_id;

// interfaces
var if0 = "if-0-"+host;
var if1 = "if-1-"+host;
var if2 = "if-2-"+host;
var if3 = "if-3-"+host;
var if4 = "if-4-"+host;
var if5 = "if-5-"+host;
var if6 = "if-6-"+host;
var if7 = "if-7-"+host;

// 1. Relaciona server com host
var criaRelSVRack = system.library.UOLCSFuncoes.criaRelac(host, server, "hostname","servidor", "producao", "producao", "logico", "depender", change);

// 2. Atualiza status do host
var device = new SCFile('device');
var retDev = device.doSelect('logical.name="'+host+'"');
if (retDev == RC_SUCCESS){

	//print('atualizacao da location')
	device.location = local;
	device.istatus  = "producao"
	device.doUpdate();

}

// 2. Atualiza status do server
var device2 = new SCFile('device');
var retDev2 = device2.doSelect('logical.name="'+server+'"');
if (retDev2 == RC_SUCCESS){

	//print('atualizacao da location')
	device2.location = local;
	device2.istatus  = "producao"
	device2.doUpdate();

}

//cria relac entre server e rack
var criaRelSVRack = system.library.UOLCSFuncoes.criaRelac(server, local, "servidor", "rack", "producao", "producao", "fisico", "depender", change);

//print('-----------------------------------------------------------------------------')
//print('Inicio da criação de relacionamento entre SV e pos-rack')

// atualiza o status do pos-rack para producao
var atualizaStatusPos1 = system.library.UOLCSFuncoes.atualizacaoStatusCI(pos1,"producao");

if (pos2 != null){
	var criaRelHostPosRack2 = system.library.UOLCSFuncoes.criaRelac(server, pos2, "servidor", "pos-rack", "producao", "producao", "fisico", "depender", change);
	var atualizaStatusPos2 = system.library.UOLCSFuncoes.atualizacaoStatusCI(pos2,"producao");
}

if (pos3 != null){
	var criaRelHostPosRack3 = system.library.UOLCSFuncoes.criaRelac(server, pos3, "servidor", "pos-rack", "producao", "producao", "fisico", "depender", change);
	var atualizaStatusPos3 = system.library.UOLCSFuncoes.atualizacaoStatusCI(pos3,"producao");
}

if (pos4 != null){
	var criaRelHostPosRack4 = system.library.UOLCSFuncoes.criaRelac(server, pos4, "servidor", "pos-rack", "producao", "producao", "fisico", "depender", change);
	var atualizaStatusPos4 = system.library.UOLCSFuncoes.atualizacaoStatusCI(pos4,"producao");
}

if (pos5 != null){
	var criaRelHostPosRack5 = system.library.UOLCSFuncoes.criaRelac(server, pos5, "servidor", "pos-rack", "producao", "producao", "fisico", "depender", change);
	var atualizaStatusPos5 = system.library.UOLCSFuncoes.atualizacaoStatusCI(pos5,"producao");
}

if (pos6 != null){
	var criaRelHostPosRack6 = system.library.UOLCSFuncoes.criaRelac(server, pos6, "servidor", "pos-rack", "producao", "producao", "fisico", "depender", change);
	var atualizaStatusPos6 = system.library.UOLCSFuncoes.atualizacaoStatusCI(pos6,"producao");
}

if (pos7 != null){
	var criaRelHostPosRack7 = system.library.UOLCSFuncoes.criaRelac(server, pos7, "servidor", "pos-rack", "producao", "producao", "fisico", "depender", change);
	var atualizaStatusPos7 = system.library.UOLCSFuncoes.atualizacaoStatusCI(pos7,"producao");
}

if (pos8 != null){
	var criaRelHostPosRack8 = system.library.UOLCSFuncoes.criaRelac(server, pos8, "servidor", "pos-rack", "producao", "producao", "fisico", "depender", change);
	var atualizaStatusPos8 = system.library.UOLCSFuncoes.atualizacaoStatusCI(pos8,"producao");
}

if (pos9 != null){
	var criaRelHostPosRack9 = system.library.UOLCSFuncoes.criaRelac(server, pos9, "servidor", "pos-rack", "producao", "producao", "fisico", "depender", change);
	var atualizaStatusPos9 = system.library.UOLCSFuncoes.atualizacaoStatusCI(pos9,"producao");
}

if (pos10 != null){
	var criaRelHostPosRack10 = system.library.UOLCSFuncoes.criaRelac(server, pos10, "servidor", "pos-rack", "producao", "producao", "fisico", "depender", change);
	var atualizaStatusPos10 = system.library.UOLCSFuncoes.atualizacaoStatusCI(pos10,"producao");
}

//print('fim da criação de relacionamento de SV e pos-rack')

//print('-----------------------------------------------------------------------------')

//print('Inicio da criação de relacionamento entre SV e regua')

// criar relac entre host e regua(s)
if (site != "BL" || site == "BL" && regua1 != null) var criaRelHostRegua1 = system.library.UOLCSFuncoes.criaRelac(server, regua1, "servidor", "regua", "producao", "producao", "fisico", "depender", change);
if (regua2 != null) var criaRelHostRegua2 = system.library.UOLCSFuncoes.criaRelac(server, regua2, "servidor", "regua", "producao", "producao", "fisico", "depender", change);

//print('fim da criação de relacionamento de SV e regua')

//print('-----------------------------------------------------------------------------')

//interfaces do server
var ifserver0 = "if-0-f-"+server;
var ifserver1 = "if-1-f-"+server;
var ifserver2 = "if-2-f-"+server;
var ifserver3 = "if-3-f-"+server;
var ifserver4 = "if-4-f-"+server;

//print('Inicio da criação de relacionamento entre interface e cabo / cabo e porta')


// interface 0
//print('interface 0');
if (vlanAdm != null){

	// criar relac entre interface e cabo
	if (site != "BL" || site == "BL" && caboAdm != null) {
		
		var criaRelCaboIf0 = system.library.UOLCSFuncoes.criaRelac(caboAdm, if0, "cabeamento", "interface", "producao", "producao", "fisico", "depender", change);
		var criaRelCaboIfserver0 = system.library.UOLCSFuncoes.criaRelac(caboAdm, ifserver0, "cabeamento", "interface-f", "producao", "producao", "fisico", "depender", change);
		
	}
	// criar relac entre cabo e porta
	if (site != "BL" || site == "BL" && caboAdm != null && portaAdm != null) {
	
		var criaRelCaboPorta0 = system.library.UOLCSFuncoes.criaRelac(caboAdm, portaAdm, "cabeamento", "porta", "producao", "producao", "fisico", "depender", change);
		var atualizaStatusPortaAdm = system.library.UOLCSFuncoes.atualizacaoStatusCI(portaAdm,"producao");
		var atualizaStatusCaboAdm = system.library.UOLCSFuncoes.atualizacaoStatusCI(caboAdm,"producao");
	}
	else if (site == "BL" && caboAdm != null && portaAdm == null){
		
		var criaRelCaboPorta0 = system.library.UOLCSFuncoes.criaRelac(caboAdm, portaAdmOld, "cabeamento", "porta", "producao", "producao", "fisico", "depender", change);
		var atualizaStatusCaboAdm = system.library.UOLCSFuncoes.atualizacaoStatusCI(caboAdm,"producao");
	}
}

// interface 1
//print('interface 1');
if (vlanSrv != null){

	// criar relac entre interface e cabo
	if (site != "BL" || site == "BL" && caboSrv != null){
	
		var criaRelCaboIf1 = system.library.UOLCSFuncoes.criaRelac(caboSrv, if1, "cabeamento", "interface", "producao", "producao", "fisico", "depender", change);
		var criaRelCaboIfserver1 = system.library.UOLCSFuncoes.criaRelac(caboSrv, ifserver1, "cabeamento", "interface-f", "producao", "producao", "fisico", "depender", change);
	
	}
	// criar relac entre cabo e porta
	if (site != "BL" || site == "BL" && caboSrv != null && portaSrv != null){
		
		var criaRelCaboPorta1 = system.library.UOLCSFuncoes.criaRelac(caboSrv, portaSrv, "cabeamento", "porta", "producao", "producao", "fisico", "depender", change);
		var atualizaStatusPortaSrv = system.library.UOLCSFuncoes.atualizacaoStatusCI(portaSrv,"producao");
		var atualizaStatusCaboSrv = system.library.UOLCSFuncoes.atualizacaoStatusCI(caboSrv,"producao");
	}
	else if (site == "BL" && caboSrv != null && portaSrv == null){
			
		var criaRelCaboPorta1 = system.library.UOLCSFuncoes.criaRelac(caboSrv, portaSrvOld, "cabeamento", "porta", "producao", "producao", "fisico", "depender", change);
		var atualizaStatusCaboSrv = system.library.UOLCSFuncoes.atualizacaoStatusCI(caboSrv,"producao");
	}
}

// interface 2
//print('interface 2');
if (vlanExt != null){

	// criar relac entre interface e cabo
	if (site != "BL" || site == "BL" && caboExt != null){
	
		var criaRelCaboIf2 = system.library.UOLCSFuncoes.criaRelac(caboExt, if2, "cabeamento", "interface", "producao", "producao", "fisico", "depender", change);
		var criaRelCaboIfserver2 = system.library.UOLCSFuncoes.criaRelac(caboExt, ifserver2, "cabeamento", "interface-f", "producao", "producao", "fisico", "depender", change);
	}
	
	// criar relac entre cabo e porta
	if (site != "BL" || site == "BL" && caboExt != null && portaExt != null){
		
		var criaRelCaboPorta2 = system.library.UOLCSFuncoes.criaRelac(caboExt, portaExt, "cabeamento", "porta", "producao", "producao", "fisico", "depender", change);
		var atualizaStatusPortaExt = system.library.UOLCSFuncoes.atualizacaoStatusCI(portaExt,"producao");
		var atualizaStatusCaboExt = system.library.UOLCSFuncoes.atualizacaoStatusCI(caboExt,"producao");
	}
	else if (site == "BL" && caboExt != null && portaExt == null){
		
		var criaRelCaboPorta2 = system.library.UOLCSFuncoes.criaRelac(caboExt, portaExtOld, "cabeamento", "porta", "producao", "producao", "fisico", "depender", change);
		var atualizaStatusCaboExt = system.library.UOLCSFuncoes.atualizacaoStatusCI(caboExt,"producao");
	}

}

// interface 3
//print('interface 3');
if (vlanL2s != null){

	// criar relac entre interface e cabo
	if (site != "BL" || site == "BL" && caboL2s != null){
		
		var criaRelCaboIf3 = system.library.UOLCSFuncoes.criaRelac(caboL2s, if3, "cabeamento", "interface", "producao", "producao", "fisico", "depender", change);
		var criaRelCaboIfserver3 = system.library.UOLCSFuncoes.criaRelac(caboL2s, ifserver3, "cabeamento", "interface-f", "producao", "producao", "fisico", "depender", change);
	
	}
	// criar relac entre cabo e porta
	if (site != "BL" || site == "BL" && caboL2s != null && portaL2s != null){
		
		var criaRelCaboPorta3 = system.library.UOLCSFuncoes.criaRelac(caboL2s, portaL2s, "cabeamento", "porta", "producao", "producao", "fisico", "depender", change);
		var atualizaStatusPortaL2s = system.library.UOLCSFuncoes.atualizacaoStatusCI(portaL2s,"producao");
		var atualizaStatusCaboL2s = system.library.UOLCSFuncoes.atualizacaoStatusCI(caboL2s,"producao");
	}
	else if (site == "BL" && caboL2s != null && portaL2s == null){
		
		var criaRelCaboPorta3 = system.library.UOLCSFuncoes.criaRelac(caboL2s, portaL2sOld, "cabeamento", "porta", "producao", "producao", "fisico", "depender", change);
		var atualizaStatusCaboL2s = system.library.UOLCSFuncoes.atualizacaoStatusCI(caboL2s,"producao");
	}
}


// interface 4
//print('interface 4');
if (vlanL2m != null){

	// criar relac entre interface e cabo
	if (site != "BL" || site == "BL" && caboL2m != null){
		
		var criaRelCaboIf4 = system.library.UOLCSFuncoes.criaRelac(caboL2m, if4, "cabeamento", "interface", "producao", "producao", "fisico", "depender", change);
		var criaRelCaboIfserver4 = system.library.UOLCSFuncoes.criaRelac(caboL2m, ifserver4, "cabeamento", "interface-f", "producao", "producao", "fisico", "depender", change);
		
	}
	
	// criar relac entre cabo e porta
	if (site != "BL" || site == "BL" && caboL2m != null && portaL2m != null){
		
		var criaRelCaboPorta4 = system.library.UOLCSFuncoes.criaRelac(caboL2m, portaL2m, "cabeamento", "porta", "producao", "producao", "fisico", "depender", change);
		var atualizaStatusPortaL2m = system.library.UOLCSFuncoes.atualizacaoStatusCI(portaL2m,"producao");
		var atualizaStatusCaboL2m = system.library.UOLCSFuncoes.atualizacaoStatusCI(caboL2m,"producao");
	}
	
	else if (site == "BL" && caboL2m != null && portaL2m == null){
		var criaRelCaboPorta4 = system.library.UOLCSFuncoes.criaRelac(caboL2m, portaL2mOld, "cabeamento", "porta", "producao", "producao", "fisico", "depender", change);
		var atualizaStatusCaboL2m = system.library.UOLCSFuncoes.atualizacaoStatusCI(caboL2m,"producao");
	}

}
