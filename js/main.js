"use strict";

(function()
{
    //automatically called as soon as the javascript is loaded
    window.addEventListener("load", main);
}());
var n_horiz = 18;
var Xoriginal = Math.floor(n_horiz/2);
var array_pecas=[];
function main(){
	var perc = 0.30;
	var canvas = document.getElementById("MyCanvas");
    var ctx = canvas.getContext("2d");

    var numQuadrados_h = n_horiz;
    var numQuadrados_v = 25;

	canvas.width = window.innerWidth*perc;

    var square_thick = canvas.width/numQuadrados_h;

    canvas.height = square_thick*numQuadrados_v;


    sessionStorage.flag = "0";

    var score = document.getElementById("pontos");
    score.innerHTML = sessionStorage.score;

    var level = document.getElementById("p_level");
    level.innerHTML = sessionStorage.nivel;

    var lines = document.getElementById("p_lines");
    lines.innerHTML = sessionStorage.total_linhas;


    var posInicial = new Posicao(Math.floor(numQuadrados_h/2), 0);


    var tabela = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    			  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    			  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    			  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    			  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    			  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    			  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    			  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    			  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    			  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    			  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    			  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    			  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    			  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    			  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    			  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    			  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    			  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    			  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    			  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];

            criaFigura(posInicial);
            init_figura(tabela, square_thick, ctx, posInicial, numQuadrados_v, numQuadrados_h);




}
function mov_left(peca, tabela, numQuadrados_h, ctx, square_thick){
    if(verifica_lateral_esq(peca, tabela, numQuadrados_h) == 1){
                    peca.apaga(tabela, square_thick, ctx);
                    peca.pos_base.x--;
                    peca.draw(tabela, square_thick, ctx);
                }
}

function mov_right(peca, tabela, numQuadrados_h, ctx, square_thick){
    if(verifica_lateral_dir(peca, tabela, numQuadrados_h) == 1){
                    peca.apaga(tabela, square_thick, ctx);
                    peca.pos_base.x++;
                    peca.draw(tabela, square_thick, ctx);
                }

}

function mov_down(peca, tabela, numQuadrados_v, ctx, square_thick){
    if(verificaBase(peca, tabela, numQuadrados_v) == 1){

                    peca.apaga(tabela, square_thick, ctx);
                    peca.pos_base.y++;
                    peca.draw(tabela, square_thick, ctx);

                }
}
function key(peca, numQuadrados_h, numQuadrados_v, tabela, square_thick, ctx, ev){

    var key = ev.keyCode;


    //Movement
    switch (key) {
        case 37://seta esquerda
            mov_left(peca, tabela, numQuadrados_h, ctx, square_thick);


            break;
        case 38://seta cima
            peca.rotate(tabela, square_thick, ctx);
            break;
        case 39://seta direita

                mov_right(peca, tabela, numQuadrados_h, ctx, square_thick);

            break;
        case 40://seta baixo
                mov_down(peca, tabela, numQuadrados_v, ctx, square_thick);
            break;
    }


}



function verifica_lateral_dir(peca, tabela, numQuadrados_h){
    var vetor = peca.vetor;

    var xBase = peca.get_Xbase();
    var max = -1;
    for(let i= 0; i< vetor.length; i++){
        for(let j = 0; j< vetor[i].length; j++){
            if( vetor[i][j] == 1 || vetor[i][j] == 2){
                max = j;
            }
        }
        if(max != -1){
            var offset = max - xBase;
            if(tabela[peca.pos_base.y - (vetor.length - i -1)][peca.pos_base.x + offset +1] == 1)
                return 0;
        }

        if(peca.pos_base.x + offset +1 >= numQuadrados_h)
            return 0;

    }

    return 1;

}

function verifica_lateral_esq(peca, tabela){
    var vetor = peca.vetor;

    var xBase = peca.get_Xbase();
    var max = -1;
    for(let i= 0; i< vetor.length; i++){
        for(let j = vetor[i].length-1; j>= 0; j--){
            if( vetor[i][j] == 1 || vetor[i][j] == 2){
                max = j;
            }
        }
        if(max != -1){
            var offset = xBase - max;
            if(tabela[peca.pos_base.y - (vetor.length - i -1)][peca.pos_base.x - offset -1] == 1)
                return 0;
        }
        if(peca.pos_base.x - offset -1 < 0)
            return 0;
    }

    return 1;

}

function criaFigura(posInicial){
    array_pecas.push(getfigura(posInicial));
}

function init_figura(tabela, square_thick, ctx, posInicial, numQuadrados_v, numQuadrados_h){

    var peca = array_pecas[0];
    criaFigura(posInicial);

    var canvas1 = document.getElementById("nextPeca");
    var ctx1 = canvas1.getContext("2d");

    ctx1.clearRect(0,0, canvas1.width, canvas1.height);
    array_pecas[1].draw_next(square_thick, ctx1, canvas1);

    peca.pos_base.y = peca.getAltura() -1;
    //peca_glob = peca;
    //primeiro desenho
    peca.draw(tabela, square_thick, ctx);
    movimenta_peca(peca, tabela, square_thick, ctx, numQuadrados_v, posInicial, numQuadrados_h);
    array_pecas.shift();


}
/*
function swipe_mov(tabela, numQuadrados_v, ctx, square_thick, numQuadrados_h){
    var supportTouch = $.support.touch,
            scrollEvent = "touchmove scroll",
            touchStartEvent = supportTouch ? "touchstart" : "mousedown",
            touchStopEvent = supportTouch ? "touchend" : "mouseup",
            touchMoveEvent = supportTouch ? "touchmove" : "mousemove";
    $.event.special.swipeupdown = {
        setup: function() {
            var thisObject = this;
            var $this = $(thisObject);
            $this.bind(touchStartEvent, function(event) {
                var data = event.originalEvent.touches ?
                        event.originalEvent.touches[ 0 ] :
                        event,
                        start = {
                            time: (new Date).getTime(),
                            coords: [ data.pageX, data.pageY ],
                            origin: $(event.target)
                        },
                        stop;

                function moveHandler(event) {
                    if (!start) {
                        return;
                    }
                    var data = event.originalEvent.touches ?
                            event.originalEvent.touches[ 0 ] :
                            event;
                    stop = {
                        time: (new Date).getTime(),
                        coords: [ data.pageX, data.pageY ]
                    };

                    // prevent scrolling
                    if (Math.abs(start.coords[1] - stop.coords[1]) > 10) {
                        event.preventDefault();
                    }
                }
                $this
                        .bind(touchMoveEvent, moveHandler)
                        .one(touchStopEvent, function(event) {
                    $this.unbind(touchMoveEvent, moveHandler);
                    if (start && stop) {
                        if (stop.time - start.time < 1000 &&
                                Math.abs(start.coords[1] - stop.coords[1]) > 30 &&
                                Math.abs(start.coords[0] - stop.coords[0]) < 75) {
                            start.origin
                                    .trigger("swipeupdown")
                                    .trigger(start.coords[1] > stop.coords[1] ? "swipeup" : "swipedown");
                        }
                    }
                    start = stop = undefined;
                });
            });
        }
    };
    $.each({
        swipedown: "swipeupdown",
        swipeup: "swipeupdown"
    }, function(event, sourceEvent){
        $.event.special[event] = {
            setup: function(){
                $(this).bind(sourceEvent, $.noop);
            }
        };
    });

$(document).on('swipedown',function(){mov_down(peca_glob, tabela, numQuadrados_v, ctx, square_thick);} );
$(document).on('swipeup',function(){peca_glob.rotate(tabela, square_thick, ctx);} );
    $(document).on("swiperight",function(){
    mov_right(peca_glob, tabela, numQuadrados_h, ctx, square_thick);

  });

  $(document).on("swipeleft",function(){
    mov_left(peca_glob, tabela, numQuadrados_h, ctx, square_thick);

});



}
*/
function movimenta_peca(peca, tabela, square_thick, ctx, numQuadrados_v, posInicial, numQuadrados_h){


    document.onkeydown = keyHandler;

    function keyHandler(ev){
        key(peca, numQuadrados_h, numQuadrados_v, tabela, square_thick, ctx, ev);
    }

    //swipe_mov(tabela, numQuadrados_v, ctx, square_thick,numQuadrados_h);

    var timer = setInterval(function(){

                if(verificaBase(peca, tabela, numQuadrados_v) == 1){

                    peca.apaga(tabela, square_thick, ctx);
                    peca.pos_base.y++;
                    peca.draw(tabela, square_thick, ctx);

                }

                else {
                    clearInterval(timer);
                    posInicial.x = Xoriginal;
                    if(tabela[0].indexOf(1) == -1){
                        var audio = new Audio('../audio/next.mp3');
                        audio.play();
                        verifica_linhas(tabela, ctx, square_thick, numQuadrados_h);

                        init_figura(tabela, square_thick, ctx, posInicial, numQuadrados_v, numQuadrados_h);

                    }
                    else{
                        sessionStorage.score = 0;
                        alert("GAME OVER");
                       location.href=('../html/leaderboard.html');
                    }



                }
            }, (500 - parseInt(50*sessionStorage.nivel)), posInicial);
}


function getfigura(posInicial){
        var randomNumber = Math.floor((Math.random() * 8) + 0);//entre 0 e 7
        var randomNumber_1 = Math.floor((Math.random() * 10) + 0);//entre 0 e 9

        var cores = ["#FF0000", "#00FF00", "#00FFFF", "#FFFF00", "#000000", "#FFA500","#FF1493", "#7A5230", "0000FF", "#FFFFFF" ]

        var v1 = [  [0,0,0,0],
                    [0,0,0,0],
                    [1,1,0,0],
                    [2,1,0,0] ];

        var v2 = [  [1,0,0,0],
                    [1,0,0,0],
                    [1,0,0,0],
                    [2,0,0,0] ];

        var v3 = [  [0,0,0,0],
                    [0,0,0,0],
                    [0,1,1,0],
                    [2,1,0,0] ];

        var v4 = [  [0,0,0,0],
                    [1,0,0,0],
                    [1,1,0,0],
                    [0,2,0,0] ];

        var v5 = [  [0,0,0,0],
                    [1,0,0,0],
                    [1,0,0,0],
                    [2,1,0,0] ];


        var v6 = [  [0,0,0,0],
                    [0,0,0,0],
                    [1,0,0,0],
                    [2,1,1,0] ];

        var v7 = [  [0,0,0,0],
                    [0,0,0,0],
                    [1,1,1,0],
                    [0,2,0,0] ];

        var v8 = [  [0,0,0,0],
                    [1,1,0,0],
                    [0,1,0,0],
                    [0,2,0,0] ];




        var figuras = [v1, v2, v3, v4, v5, v6, v7, v8];

        var peca = new figura(posInicial, figuras[randomNumber], cores[randomNumber_1]);

        return peca;

}

function verificaBase(peca, tabela, numQuadrados_v){

    var x_array = peca.get_Xbase(); // onde esta o 2


    if(peca.pos_base.y +1 >= numQuadrados_v)
        return 0;


    for(let i = 0; i<= peca.vetor.length; i++){

        if(peca.verifica_coord(i) == 1){


            if(i < x_array){

                if(tabela[getY((peca.pos_base.x - (x_array - i)), tabela, peca, i)/*novoY*/][peca.pos_base.x -  (x_array - i)] == 1){
                    return 0;
                }

            }

            else if(i > x_array){

                if(tabela[getY((peca.pos_base.x + (i - x_array)), tabela, peca, i)/*novoY*/][peca.pos_base.x + (i - x_array)] == 1){
                    return 0;
                }

            }
            else{
                if(tabela[getY(peca.pos_base.x, tabela, peca, i)/*novoY*/][peca.pos_base.x] == 1){
                    return 0;
                }

            }

        }
    }





    return 1;

}

function getY(indice, tabela, peca, ii){
    var max = 0;

    for(let i = 0; i < peca.vetor.length; i++){
            if(peca.vetor[i][ii] == 1 || peca.vetor[i][ii] == 2){
                if(i > max)
                    max = i;
            }
        }

    var index = peca.pos_base.y - (peca.vetor.length - max)+2;

    return index;

}

function verifica_linhas(tabela, ctx, square_thick, numQuadrados_h){
    var nLinhas;
    var count = 0;
    var n = 0;
    var array = [];

    for(let i = 0; i< tabela.length; i++){
        for(let j = 0; j< tabela[i].length; j++){
            if(tabela[i][j] == 1)
                count++;
            else
                break;
        }

        if(count == tabela[i].length){
            n++;

            for(let a=i; a>1; a--){
                for(let b=0; b< tabela[a].length; b++){

                        tabela[a][b] = tabela[a-1][b];

                }

            }
            var ImgData = ctx.getImageData(0,0, numQuadrados_h*square_thick, (i)*square_thick);
            ctx.putImageData(ImgData, 0,square_thick);

        }



        else{
            if(n!=0){
                array.push(n);
                n=0;
            }

        }

        count=0;



    }
    if(n!=0)
        array.push(n);







    for(let a = 0; a< array.length; a++){

        sessionStorage.total_linhas= parseInt(sessionStorage.total_linhas) + parseInt(array[a]);
        atualiza_score(array[a]);

    }


}



function atualiza_score(nLinhas){
        var linhasPorNivel = 10;
        if(parseInt(sessionStorage.total_linhas) < linhasPorNivel)
            sessionStorage.nivel = 0;

        else{
            if(parseInt(sessionStorage.total_linhas%linhasPorNivel) == 0)
                sessionStorage.nivel = parseInt(sessionStorage.total_linhas/linhasPorNivel);
        }


        //pontuacao por linhas
        if(nLinhas == 1){
            sessionStorage.score = parseInt(sessionStorage.score) + parseInt(40*(parseInt(sessionStorage.nivel) +1));

        }
        else if(nLinhas == 2){
            sessionStorage.score = parseInt(sessionStorage.score) + parseInt(100*(parseInt(sessionStorage.nivel) +1));

        }

        else if(nLinhas == 3){
            sessionStorage.score = parseInt(sessionStorage.score) + parseInt(300*(parseInt(sessionStorage.nivel) +1));

        }

        else if(nLinhas == 4){
            sessionStorage.score = parseInt(sessionStorage.score) + parseInt(1200*(parseInt(sessionStorage.nivel) +1));

        }


        //atualizar o score no ecra
        var score = document.getElementById("pontos");
        score.innerHTML = sessionStorage.score;

        var level = document.getElementById("p_level");
        level.innerHTML = sessionStorage.nivel;

        var lines = document.getElementById("p_lines");
        lines.innerHTML = sessionStorage.total_linhas;
}
