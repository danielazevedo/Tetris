"use strict";

class Posicao{

	constructor(x, y){
		this.x = x;
		this.y = y;
	}
}





class figura{


	constructor(posBase, vetor, cor){

		this.cor = cor;
		this.vetor = vetor;
		this.pos_base = posBase;

	}

	getXdist(){
		var count = 0;
		var max = 0;
		for(let i = 0; i< this.vetor.length; i++){
			for(let j= 0; j< this.vetor[i].length; j++){
				if(this.vetor[i][j] == 1 || this.vetor[i][j] == 2)
					count++;
			}

			if(count>max)
				max = count;

			count = 0;
		}
		return max;
	}



	getYdist(){
		var count = 0;
		var max = 0;

		for(let i = 0; i< this.vetor.length; i++){
			for(let j= 0; j< this.vetor[i].length; j++){
				if(this.vetor[j][i] == 1 || this.vetor[j][i] == 2)
					count++;
			}

			if(count>max)
				max = count;

			count = 0;
		}
		return max;
	}


	draw_next(square_thick, ctx, canvas){

	var i, j;
	var porporcao = 0.8;
	var x = 0, y = 0, offsetX = 0, offsetY = 0;
	for(i = 0; i< this.vetor.length; i++){
		for(j = 0; j< this.vetor[i].length; j++){
			if(this.vetor[i][j] == 2){
				x = j;
				y = i;
				break;
			}
		}
	}

	for(i = 0; i< this.vetor.length; i++){
		for(j = 0; j< this.vetor[i].length; j++){
			if(this.vetor[i][j] == 1 || this.vetor[i][j] == 2){
					offsetY = i - y;
					offsetX = j - x;

					ctx.fillStyle = this.cor;
					//console.log(this.getXdist(), this.getXdist()/2, canvas.width, offsetX);
					//console.log(this.getYdist(), this.getYdist()/2, canvas.height, offsetY);
					ctx.fillRect(canvas.width/2 - (Math.ceil(this.getXdist()/2))*(square_thick*porporcao) + (offsetX) * (square_thick*porporcao), canvas.height/2 + (offsetY) * (square_thick*porporcao), (square_thick*porporcao), (square_thick*porporcao));


			}
		}

	}
}


	//retorna o x
	get_Xbase(){
		var last_vect = this.vetor[this.vetor.length - 1];
		for(let i = 0; i< last_vect.length; i++){
			if(last_vect[i] == 2){
				return i;
			}
			}

	return -1;
	}

	//verifica se uma coluna tem algum 1
	verifica_coord(indice){
		for(let i = 0; i< this.vetor.length; i++){
			if(this.vetor[i][indice] == 1 || this.vetor[i][indice] == 2)
				return 1;
		}
		return 0;
	}


	getAltura(){
		var count = 0;
		for(let i=0; i<this.vetor.length; i++){
			for(let j=0; j< this.vetor[i].length; j++){

				if(this.vetor[i][j] == 1 || this.vetor[i][j] == 2){
					count++;
					break;
				}

			}

		}

		return count;
	}


	draw(tabela, square_thick, ctx){

		var i, j;
		var x = 0, y = 0, offsetX = 0, offsetY = 0;
		for(i = 0; i< this.vetor.length; i++){
			for(j = 0; j< this.vetor[i].length; j++){
				if(this.vetor[i][j] == 2){
					x = j;
					y = i;
					break;
				}
			}
		}

		for(i = 0; i< this.vetor.length; i++){
			for(j = 0; j< this.vetor[i].length; j++){
				if(this.vetor[i][j] == 1 || this.vetor[i][j] == 2){
						offsetY = i - y;
						offsetX = j - x;

						ctx.fillStyle = this.cor;
						ctx.fillRect((this.pos_base.x + offsetX) * square_thick, (this.pos_base.y + offsetY) * square_thick, square_thick, square_thick);
						tabela[this.pos_base.y + offsetY][this.pos_base.x + offsetX] = 1;


				}
			}

	}



	}


	apaga(tabela, square_thick, ctx){
		var extra = 1;
		var i, j;
		var x = 0, y = 0, offsetX = 0, offsetY = 0;
		for(i = 0; i< this.vetor.length; i++){
			for(j = 0; j< this.vetor[i].length; j++){
				if(this.vetor[i][j] == 2){
					x = j;
					y = i;
					break;
				}
			}
		}

		for(i = 0; i< this.vetor.length; i++){
			for(j = 0; j< this.vetor[i].length; j++){
				if(this.vetor[i][j] == 1 || this.vetor[i][j] == 2){
						offsetY = i - y;
						offsetX = j - x;

						ctx.clearRect((this.pos_base.x + offsetX) * square_thick-(extra/2), (this.pos_base.y + offsetY) * square_thick-(extra/2), square_thick+extra, square_thick+extra);
						tabela[this.pos_base.y + offsetY][this.pos_base.x + offsetX] = 0;

				}
			}

	}

	}


	rotate(tabela, square_thick, ctx){




		this.apaga(tabela, square_thick, ctx);
		var tabela_aux = [[0,0,0,0],
		    			  [0,0,0,0],
		    			  [0,0,0,0],
		    			  [0,0,0,0]]


		var xMax = 0;
		var yMin = this.vetor.length;

		for(let i= 0; i< this.vetor.length; i++){
			for(let j=0; j< this.vetor[i].length; j++){
				if(this.vetor[i][j] == 1){
					if(j>xMax)
						xMax = j;
					if(i<yMin)
						yMin =i;
				}


			}
		}

		var a = 0;
		var b = this.vetor.length-1;
		for(let i= yMin; i< this.vetor.length; i++){
			for(let j=0; j<= xMax; j++){
				tabela_aux[b][a] = this.vetor[i][j];
				b--;
			}
			a++;
			b = this.vetor.length-1;

		}

		for(let i= 0; i< tabela_aux.length; i++){
			for(let j=0; j< tabela_aux[i].length; j++){
				if(tabela_aux[i][j] == 2){
					tabela_aux[i][j] = 1;
					break;
				}
			}
		}

		for(let i= 0; i< tabela_aux.length; i++){
			if(tabela_aux[tabela_aux.length-1][i]	 == 1){
				tabela_aux[tabela_aux.length-1][i] = 2;
				break;
			}
		}



		if(this.verifica_peca_rot(tabela_aux, tabela) == 1){
			for(let i= 0; i< tabela_aux.length; i++){
				for(let j=0; j< tabela_aux[i].length; j++){
					this.vetor[i][j] = tabela_aux[i][j];
				}

			}

	}


		this.draw(tabela, square_thick, ctx);



	}

	verifica_peca_rot(tabela_aux, tabela){

		var i, j;
		var x = 0, y = 0, offsetX = 0, offsetY = 0;
		for(i = 0; i< this.vetor.length; i++){
			for(j = 0; j< this.vetor[i].length; j++){
				if(tabela_aux[i][j] == 2){
					x = j;
					y = i;
					break;
				}
			}
		}

		for(i = 0; i< tabela_aux.length; i++){
			for(j = 0; j< tabela_aux[i].length; j++){
				if(tabela_aux[i][j] == 1 || tabela_aux[i][j] == 2){
						offsetY = i - y;
						offsetX = j - x;
						if(this.pos_base.y + offsetY < 0)
							return 0;
						if(tabela[this.pos_base.y + offsetY][this.pos_base.x + offsetX] == 1 || this.pos_base.x + offsetX> 17 || this.pos_base.x + offsetX< 0)
							return 0;


				}
			}


	}
	return 1;

	}

}
