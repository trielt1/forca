var palavras = ["CACHORRO","ALFABETO","RICARDO","DANIEL"],
    dicas = ["Animal de Estimação","Base da escrita","Professor de Web","Autor deste projeto"],
    palavra = "", dica = "", palavraOculta = "",
    mostradorPalavra = document.getElementById("mostraPalavra"),
    mostradorDica = document.getElementById("mostraDica"),
    mostradorErro = document.getElementById("erroLetra"),
    forca = document.getElementById("state"),
    states = ["forca2.jpg","forca3.jpg","forca4.jpg","forca5.jpg","forca6.jpg","fail.jpg"];
    

function alphabet(){

     var alphabet = new Array(),
         select = document.getElementById("chuteLetras");

     for(var count = 65; count<90; count++){
        var letter = String.fromCharCode(count);
        alphabet.push({
                "text" : letter,
                "value" : letter
            });


        select.options[select.options.length] = new Option(letter,letter);
    }
}

function start(){
    alphabet();

    var randPos = Math.floor(Math.random()*palavras.length), count;

    palavra = palavras[randPos]; dica = dicas[randPos];

    for(count = 0; count < palavra.length; count++){
        palavraOculta += "_";
    }

    mostradorPalavra.innerHTML += palavraOculta;
    mostradorDica.innerHTML += dica;

    state.src="img/forca1.jpg";
    state.onclick="";
    
    var btns = document.getElementsByClassName("chute");
    for(count = 0; count<btns.length; count++){btns[count].disabled = false;}
}

function limpar(){
    mostradorPalavra.innerHTML = "Palavra: ";
    mostradorDica.innerHTML = "Dica: ";
    mostradorErro.innerHTML = "Erros: ";

    palavraOculta = "";

    document.getElementById("forca").onclick = start;
    document.getElementById("chutePalavra").text = "";
    document.getElementById("chutePalavra").value = "";
    document.getElementById("chuteLetras").innerHTML = "";
    states = ["forca2.jpg","forca3.jpg","forca4.jpg","forca5.jpg","forca6.jpg","fail.jpg"];
    
    var btns = document.getElementsByClassName("chute");
    for(count = 0; count<btns.length; count++){btns[count].disabled = true;}
}

function clickLetra(){
    var select = document.getElementById("chuteLetras"),
        letra = select.value,
        index = palavra.indexOf("letra"),
        letrasOcultas = palavraOculta.split(""),
        newPalavraOculta = "",
        win = false;
        matches = 0;    

        for(index = 0; index<palavra.length; index++){
            if(palavra.charAt(index) == letra){
                letrasOcultas[index] = letra;
                matches ++;
            }
        }

        console.log("\nletrasOcultas: "+letrasOcultas);
        if(matches){
            console.log("I'm here!");
            
            newPalavraOculta = letrasOcultas.join("");

            if(palavra == newPalavraOculta){
                win = true;
            }

            console.log("\newPalavraOculta: "+newPalavraOculta);
            letrasOcultas = mostradorPalavra.innerHTML.split(" ");
            letrasOcultas[1] = newPalavraOculta;
            console.log("\nletrasOcultas: "+letrasOcultas);
            mostradorPalavra.innerHTML = letrasOcultas.join(" ");
            palavraOculta = newPalavraOculta;
            console.log("\npalavraOculta: "+palavraOculta);

            if(win){
                winStage();
            }            
        }else{
            mostradorErro.innerHTML += " "+letra;
            nextStage();
        }

        select.remove(select.selectedIndex);
}

function clickPalavra(){
    if(document.getElementById("chutePalavra").value.toUpperCase() == palavra){
        winStage();
    }else{
        mostradorErro.innerHTML += " "+document.getElementById("chutePalavra").value;
        nextStage();
        document.getElementById("chutePalavra").text = "";
        document.getElementById("chutePalavra").value = "";
    }
}

function nextStage(){
    var pic = states.shift();
    if(pic == "fail.jpg"){
        limpar();
    }
    forca.src="img/"+pic;
}

function winStage(){
    limpar();
    forca.src="img/win.jpg";
}