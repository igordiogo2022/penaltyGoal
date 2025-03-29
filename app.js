var vez = 'player';
var golsPlayer = 0;
var golsAdversario = 0;
var contagemPlayer = '';
var contagemAdversario = '';
var qtdBatidas = 0;
var a = 1;
function obterId(timeId){
    localStorage.setItem('timePlayer', timeId);
    localStorage.setItem('faseCdb', 16);
}

function carregarImagensTimes(classeId){
    //obtem todos com a classe
    times = document.querySelectorAll(classeId);

    //para cada time insere a foto do time pegando o id
    for(const time of times){
        time.style.backgroundImage = "url('/Times/"+time.id+".png')";
    } 
}

function cdb(){
    fase = localStorage.getItem('faseCdb');
    localStorage.setItem('faseCdb', fase/2);
}

function carregarTimesCdb(){
    fase = localStorage.getItem('faseCdb');

    if(fase == 8){
        cdbOitavas();
    }else if(fase == 4){
        cdbQuartas();
    }else if(fase == 2){
        cdbSemis();
    }else if(fase == 1){
        cdbFinal();
    }else if(fase == 0.5){
        cdbCampeao();
    }
}

function passarFazerCdb(){
    const listaTimes = localStorage.getItem('listaTimes').split(',');
    const listaClassificados = [];
    
    vencedorJogo = localStorage.getItem('vencedorJogo');
    if(vencedorJogo=='player'){
        listaClassificados.push(localStorage.getItem('timePlayer'));
    }else if(vencedorJogo=='adversario' && localStorage.getItem('status')=='competindo'){
        listaClassificados.push(localStorage.getItem('adversario'));
    }
    
    if(localStorage.getItem('status')=='eliminado'){
        a=0;
    }
    
    for(let i=a;i<(listaTimes.length/2);i++){
        golsDono = Math.round(Math.random()*5);
        golsVisitante = Math.round(Math.random()*5);
        
        
        if(golsDono==golsVisitante){
            desempate = Math.round(Math.random()*1);
            
            if(desempate==0){
                golsDono++;
            }else if(desempate==1){
                golsVisitante++;
            }
        }
        
        
        if(golsDono>golsVisitante){
            listaClassificados.push(listaTimes[i*2]);
        }else if(golsVisitante>golsDono){
            listaClassificados.push(listaTimes[i*2+1]);
        }
    }
    
    if(vencedorJogo=='adversario'){
        localStorage.setItem('status', 'eliminado');
        botao = document.querySelector('#botao');
        botao.href = 'cdb.html';
        cdb();
    }
    
    times = document.querySelectorAll(".opcao");
    
    //adiciona o id na ordem sorteada
    for(let i=0;i<listaClassificados.length;i++){
        times[i].id = listaClassificados[i];
    }
    
    
    localStorage.setItem('listaTimes', listaClassificados);
    
    localStorage.setItem('adversario', listaClassificados[1]);
    
    carregarImagensTimes('.opcao');
}

function cdbOitavas(){
    var timePlayerId = localStorage.getItem('timePlayer');
    
    //uma lista normal e uma embaralhada
    const listaTimes = ['sccp','cep','spfc','santos','fla','flu','btfg','vasco','inter','gremio','cruzeiro','atl_mg','ath_pr','fort','bahia'];
    const listaTimesSorteada = [];
    
    //o time do player é adicionado como primeiro e excluido da lista times para evitar repetições
    listaTimesSorteada.push(timePlayerId);
    var indexT = listaTimes.indexOf(timePlayerId);
    listaTimes.splice(indexT, 1);
    
    //embaralha os times
    for(let i=listaTimes.length-1; i>=0; i--){
        //sorteia um numero que será o index do item
        index = Math.round(Math.random()*i);
        
        //adiciona o item a lista nova
        listaTimesSorteada.push(listaTimes[index]);
        
        //exclui o item da lista antiga para evitar repetições
        listaTimes.splice(index, 1);
    }
    
    times = document.querySelectorAll(".opcao");
    
    //adiciona o id na ordem sorteada
    for(let i=0;i<listaTimesSorteada.length;i++){
        times[i].id = listaTimesSorteada[i];
    }

    localStorage.setItem('listaTimes', listaTimesSorteada);

    localStorage.setItem('adversario', listaTimesSorteada[1])
    carregarImagensTimes('.opcao');
}

function cdbQuartas(){
    passarFazerCdb();
    
    jogosDiv = document.querySelectorAll('.jogos');
    jogosDiv[1].style.display = 'none';
}

function cdbSemis(){
    cdbQuartas();

    jogoDiv = document.querySelectorAll('.jogo');
    jogoDiv[2].style.display = 'none';
    jogoDiv[3].style.display = 'none';
}

function cdbFinal(){
    cdbSemis();
    
    jogoDiv = document.querySelectorAll('.jogo');
    jogoDiv[1].style.display = 'none';
}

function cdbCampeao(){
    cdbFinal();
    const listaTimes = localStorage.getItem('listaTimes').split(',');

    jogosDiv = document.querySelectorAll('.jogos');
    jogosDiv[0].style.display = 'none';

    campeaoDiv = document.querySelector('#campeao');
    campeaoDiv.style.display = 'flex';

    timeCampeao = document.querySelector('.timeCampeao');
    timeCampeao.id = listaTimes[0];

    botao = document.querySelector('#botao');
    botao.href = 'index.html';

    carregarImagensTimes('.timeCampeao');
}

function timesJogo(){
    times = document.querySelectorAll('.time');
    
    times[0].id = localStorage.getItem('timePlayer');
    times[1].id = localStorage.getItem('adversario');
    times[2].id = localStorage.getItem('timePlayer');
    times[3].id = localStorage.getItem('adversario');
    
    carregarImagensTimes('.time');
}

function mudarVez(){
    frase = document.querySelector('#fraseVez');
    placar = document.querySelectorAll('.contagemAcertos');
    
    if(vez=='player'){
        vez='adversario';
        frase.innerHTML = 'ESCOLHA UM LUGAR PARA DEFENDER';
    }else if(vez=='adversario'){
        vez='player';
        frase.innerHTML = 'ESCOLHA UM LUGAR PARA CHUTAR';
    }
    placar[0].innerHTML = contagemPlayer;
    placar[1].innerHTML = contagemAdversario;
    qtdBatidas = qtdBatidas + 0.5;
}

function analisarChute(posPlayer){
    posAdversario = Math.round(Math.random()*6);
    if(posPlayer==posAdversario){
        if(vez=='player'){
            contagemPlayer = contagemPlayer + ' X';
        }else if(vez=='adversario'){
            contagemAdversario = contagemAdversario + ' X';
        }
    }else{
        if(vez=='player'){
            golsPlayer++;
            contagemPlayer = contagemPlayer + ' O';
        }else if(vez=='adversario'){
            golsAdversario++;
            contagemAdversario = contagemAdversario + ' O';
        }
    }

    if((golsPlayer-golsAdversario)>(5-qtdBatidas)){
        localStorage.setItem('vencedorJogo', 'player')
        fimJogo();
    }else if((golsAdversario-golsPlayer)>(5-qtdBatidas)){
        localStorage.setItem('vencedorJogo', 'adversario')
        fimJogo();
    }
    
    mudarVez();
}

function fimJogo(){
    fimJogo = document.querySelector('#fimJogo');
    penaltis = document.querySelector('#penaltiOpcoes');
    fraseVez = document.querySelector('#fraseVez');
    resultado = document.querySelector('#resultado');
    
    fimJogo.style.display = 'flex';
    
    penaltis.style.display = 'none';
    fraseVez.style.display = 'none';
    
    resultado.innerHTML = golsPlayer+" x "+golsAdversario;
    localStorage.setItem('status', 'competindo');
}