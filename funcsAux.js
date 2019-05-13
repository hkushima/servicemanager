/**

	Função para criar interfaces para servidor com base nas interfaces do pool

*/


function criaInterfaceServer(server, pool, change){
	
	var cirel = new SCFile('cirelationship');
	var retCirel = cirel.doSelect('logical.name="' + pool +'" and uol.subtype.parent="interface-logica"' );
	
	if (retCirel == RC_SUCCESS){
		
		do{
		
			var prefix = (cirel.relationship_name.substring(0,cirel.relationship_name.indexOf("t-")));;
			var interf = prefix + "f-" + server;
			var criadev = criaDevice(interf, change, "servidor", "interface-f", "producao", "secadm")
			
			if (criadev == RC_SUCCESS){
				
				// cria relacionamento entre interface e hostname
					system.library.UOLCSFuncoes.criaRelac(interf,server,"interface-f","servidor","producao","producao","logico","depender",change)
				
			}
			
			retCirel = cirel.getNext();
			
		} while (retCirel == RC_SUCCESS)
		
	}
	
}



/**

	Função para criar interfaces para hosts com base nas interfaces do pool

*/

function criaInterfaceHost(ci, pool, change, server){
	
	var cirel = new SCFile('cirelationship');
	var retCirel = cirel.doSelect('logical.name="' + pool +'" and uol.subtype.parent#"interface"' );

	if (retCirel == RC_SUCCESS){
		
		
		do{
			
			if (cirel.uol_subtype_parent == "interface-logica"){

				var iflogica = cirel.relationship_name;
				var prefix = (iflogica.substring(0,iflogica.indexOf("t-")));
				var interf = prefix + ci;
				var interfServer = prefix + "f-" +server;
				var cria = criaDevice(interf, change, "servidor", "interface", "producao", "secadm")
				if (cria == RC_SUCCESS){
					
					// cria relacionamento entre interface e hostname
					system.library.UOLCSFuncoes.criaRelac(interf,ci,"interface","hostname","producao","producao","logico","depender",change)
					// cria relacionamento entre interface do hostname e a interface da pool
					system.library.UOLCSFuncoes.criaRelac(interf,iflogica,"interface","interface-logica","producao","producao","logico","depender",change)
					// cria relacionamento entre interface do hostname e a interface da server
					system.library.UOLCSFuncoes.criaRelac(interf,interfServer,"interface","interface-f","producao","producao","logico","depender",change)
					
					var ifalias = searchListaCIRelac(null,iflogica,"interface-alias", "interface-logica")
					ifalias = system.functions.UOLCSFuncoes.removeDuplicateEmptyElement(ifalias)
					var tam = system.functions.lng(ifalias);
					for (var i=0;i<tam;i++) system.library.UOLCSFuncoes.criaRelac(interf,interfServer,"interface","interface-f","producao","producao","logico","depender",change)

				}
				
			}
			else if (cirel.uol_subtype_parent == "interface-bond"){
				var ifbond = cirel.relationship_name
				var prefix = (ifbond.substring(0,ifbond.indexOf("tb-")));
				var interfb = prefix + "b-" +ci;
				var criabond = criaDevice(interfb, change, "servidor", "interface-b", "producao", "redes");
				
				if (criabond == RC_SUCCESS){
					
					// cria relacionamento entre interface bond e hostname
					system.library.UOLCSFuncoes.criaRelac(interfb,ci,"interface-b","hostname","producao","producao","logico","depender",change)
					// cria relacionamento entre interface bond do hostname e a interface bond da pool
					system.library.UOLCSFuncoes.criaRelac(interfb,ifbond,"interface-b","interface-bond","producao","producao","logico","depender",change)
					
					// cria relacionamento entre interface do hostname e a interface da host
					if (system.functions.index(prefix,interf)>0) system.library.UOLCSFuncoes.criaRelac(interfb,interf,"interface-b","interface","producao","producao","logico","depender",change)
					else {
						var newIF = prefix+ci;
						system.library.UOLCSFuncoes.criaRelac(interfb,newIF,"interface-b","interface","producao","producao","logico","depender",change)
					}
				}
			}
			
			retCirel = cirel.getNext();
			
		} while (retCirel == RC_SUCCESS)
		
	}
	
}


function criaDevice(ci, change, type, subtype, istatus, owner){
	
	var dev = new SCFile('device');
	dev.logical_name = ci;
	dev.description = "CI criada pela "+change;
	dev.device_type = type;
	dev.subtype	= subtype;
	dev.assignment = owner;
	dev.istatus = istatus;
	dev.uol_baseline = change;
	dev.doInsert();
	
}


function searchCIRelac(relacname,logicalname,relacType, logicalType){
	
	var cirel = new SCFile('cirelationship');
	if (relacname != null){
	
		var ret = cirel.doSelect('relationship.name="'+relacname+'" and uol.subtype.logical.name="'+logicalType+'" and uol.subtype.parent="'+relacType+'"');
		if (ret == RC_SUCCESS) return cirel.logical_name;
		
	} else if (logicalname != null){
		
		var ret = cirel.doSelect('logical.name="'+logicalname+'" and uol.subtype.logical.name="'+logicalType+'" and uol.subtype.parent="'+relacType+'"');
		if (ret == RC_SUCCESS) return cirel.relationship_name;
	}
	else return "not found"
}

function searchListaCIRelac(relacname,logicalname,relacType, logicalType){
	
    var cirel = new SCFile('cirelationship');
    var lista = new Array();

	if (relacname != null){
	
		var ret = cirel.doSelect('relationship.name="'+relacname+'" and uol.subtype.logical.name="'+logicalType+'" and uol.subtype.parent="'+relacType+'"');
		if (ret == RC_SUCCESS) {
            do{
                
                lista.push(cirel.logical_name);
                ret = cirel.getNext();

            } while (ret == RC_SUCCESS)
        }

        return lista;

	} else if (logicalname != null){
		
		var ret = cirel.doSelect('logical.name="'+logicalname+'" and uol.subtype.logical.name="'+logicalType+'" and uol.subtype.parent="'+relacType+'"');
		if (ret == RC_SUCCESS) {
            
            do{
                
                lista.push(cirel.logical_name);
                ret = cirel.getNext();

            } while (ret == RC_SUCCESS)

        }

        return lista;
	}
	else return "not found"
}


