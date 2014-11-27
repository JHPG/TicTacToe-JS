
indice = new Array(9);
travaid = new Array(9)
jogadas = new Array(9);
var vez='X', i, trava=0, tipodejogo="MP", velha=0, contj=0;;

function joga(id)		//onclick="joga(0);"
{
	if(tipodejogo == "MP")
	{
		jogo(id);
	}
	else if(tipodejogo == "SP")
	{
		jogadaSP(id);
	}
}

function jogo(id){	
	if(travaid[id] != 1 && trava==0){	
		indice[id] = vez;
		travaid[id] = 1;
		
		document.getElementById("c" + id).src = "img/"+vez+".png";		// id="c0", c1, c2 ...	X.png, O.png, Xrh, Xrv(x riscado vertical) ...
		
		if(verifica() == "S")
		{
			trava = 1;
			alert(" -->    "+vez+"  venceu!    <--");
			document.getElementById("vez").innerHTML = " >    "+vez+"  venceu!    <" ;
		}
		else{
			if(vez == "X"){	vez = "O";	}
			else{	vez = "X";	}
			document.getElementById("vez").innerHTML = "Vez do " + vez;
		}	
	}
	if(velha==1){
		alert(" -->    Deu velha!    <--");
		document.getElementById("vez").innerHTML = " >    Deu velha!    <" ;
	}
}

function verifica(){
	//Se der velha
	for(i=0;i<9;i++){
		if(indice[i]!="X" && indice[i]!="O"){
			velha=0; break;
		}else{	velha=1; }
	}
	//Horizontal
	if(indice[0]==indice[1] && indice[1]==indice[2]){ //Linha 1
		return "S";
		document.getElementById("c0").src = "img/"+indice[0]+"rh.png";	
		document.getElementById("c1").src = "img/"+indice[1]+"rh.png";	
		document.getElementById("c2").src = "img/"+indice[2]+"rh.png";	
	}
	if(indice[3]==indice[4] && indice[4]==indice[5]){ //Linha 2
		return "S";
		document.getElementById("c3").src = "img/"+indice[3]+"rh.png";	
		document.getElementById("c4").src = "img/"+indice[4]+"rh.png";	
		document.getElementById("c5").src = "img/"+indice[5]+"rh.png";	
	}
	if(indice[6]==indice[7] && indice[7]==indice[8]){ //Linha 3
		return "S";
		document.getElementById("c6").src = "img/"+indice[6]+"rh.png";	
		document.getElementById("c7").src = "img/"+indice[7]+"rh.png";	
		document.getElementById("c8").src = "img/"+indice[8]+"rh.png";	
	}
	
	//Vertical
	if(indice[0]==indice[3] && indice[3]==indice[6]){ //Coluna 1
		return "S";
		document.getElementById("c0").src = "img/"+indice[0]+"rv.png";	
		document.getElementById("c3").src = "img/"+indice[3]+"rv.png";	
		document.getElementById("c6").src = "img/"+indice[6]+"rv.png";	
	}
	if(indice[1]==indice[4] && indice[4]==indice[7]){ //Coluna 2
		return "S";
		document.getElementById("c1").src = "img/"+indice[1]+"rv.png";	
		document.getElementById("c4").src = "img/"+indice[4]+"rv.png";	
		document.getElementById("c7").src = "img/"+indice[7]+"rv.png";	
	}
	if(indice[2]==indice[5] && indice[5]==indice[8]){ //Coluna 3
		return "S";
		document.getElementById("c2").src = "img/"+indice[2]+"rv.png";	
		document.getElementById("c5").src = "img/"+indice[5]+"rv.png";	
		document.getElementById("c8").src = "img/"+indice[8]+"rv.png";	
	}
	//Diagonal
	if(indice[0]==indice[4] && indice[4]==indice[8]){ //Diagonal 1
		return "S";
		document.getElementById("c0").src = "img/"+indice[0]+"d1.png";	
		document.getElementById("c4").src = "img/"+indice[4]+"d1.png";	
		document.getElementById("c8").src = "img/"+indice[8]+"d1.png";	
	}
	if(indice[2]==indice[4] && indice[4]==indice[6]){ //Diagonal 2
		return "S";
		document.getElementById("c0").src = "img/"+indice[2]+"d2.png";	
		document.getElementById("c4").src = "img/"+indice[4]+"d2.png";	
		document.getElementById("c8").src = "img/"+indice[6]+"d2.png";	
	}
}
	
function reset()
{ 
	for(i=0; i<9; i++){ indice[i] = "v"+i;	} //mistura
	for(i=0; i<9; i++){ travaid[i] = 0;	}	  //tira todas as travas individuais						
	trava=0;								  //tira a trava geral
	vez = "X";
	document.getElementById("vez").innerHTML = "Vez do X";
	velha=0;
	for(i=0; i<9; i++){	document.getElementById("c" + i).src = "img/none.png";	}
	for(i=0; i<9; i++){	jogadas[i]="v"+i; }
	contj = 0;
}
	
function alternaMP()
{
	document.getElementById("SPMP").innerHTML = "Multiplayer";
	tipodejogo = "MP";
	reset();
}

function alternaSP()
{
	document.getElementById("SPMP").innerHTML = "Singleplayer (invencível)";
	tipodejogo = "SP";
	reset();
	document.getElementById("vez").innerHTML = "Vez do Jogador (X)";
}

function jogadaSP(jogador)
{
	jogadas[contj] = jogador; 
	jogo(jogador);			//jogador joga
	//					//esperar 1/2 segundo
	jogo(planejar(jogador));	//planejar a jogada e jogar
	contj++;
}

function planejar(jogador){	// Jogada por IA
	
	if(jogadas[0]==1){					//J começa pelo [1]
		if(jogadas[1]==2 || jogadas[1]==8 || jogadas[1]==5){
			if(jogadas[2]==3){
				if(jogadas[3]==4){
					return 7;
				}else if(jogadas[3]==7){
					return 4;
				}else if(jogadas[1]==5){			//dentro deste caso
					if(jogadas[3]==2){			//se [2] estiver ocupado
						return 8;
					}else if(jogadas[3]==8){	//se [8] estiver ocupado
						return 2;
					}else{
						return 8;
					}
				}else{return 4;}		//descer
			}else{ return 0; }			//natural
		}else{ return 6; }
	} else{ }
}



	
//																		0 | 1 | 2
//																		3 | 4 | 5
//																		6 | 7 | 8
		
		
		
		
		
		
		
		
		
		
		
		

