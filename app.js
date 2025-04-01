//lista de times e seus jogadores
const listaTimes = [['sccp', 'Memphis Depay','Yuri Alberto', 'Rodrigo Garro','Carrilho','Raniele','Hugo Souza'],
['cep','Raphael Veiga','Estêvão','Richard Rios','Vitor Roque','Felipe Anderson','Weverton'],
['spfc','Lucas Moura','Oscar','Luciano','Calleri','Luiz Gustavo','Rafael'],
['santos','Neymar', 'Guilherme', 'Soteldo', 'Thacianno', 'João Schmidt', 'Gabriel Brazão'],
['fla','Pedro', 'Arrascaeta', 'Gerson', 'De La Cruz', 'Wesley', 'Rossi'],
['flu','Germán Cano', 'John Arias', 'Ganso', 'Martinelli', 'Canobbio', 'Fábio'],
['btfg','Igor Jesus', 'Savarino', 'Marlon Freitas', 'Gregore', 'Alexander Barboza', 'John'],
['vasco','Pablo Vegetti', 'P. Coutinho', 'Hugo Moura', 'Nuno Moreira', 'Lucas Piton', 'Leo Jardim'],
['inter','Alan Patrick', 'Enner Valencia', 'Wesley', 'Bruno Henrique', 'Vitão', 'Anthoni'],
['gremio','Braithwaite', 'Edenílson', 'Villlasanti', 'Monsalve', 'Cristian Pavón', 'Tiago Volpi'],
['cruzeiro','Gabriel', 'Dudu', 'Matheus Pereira', 'Matheus Henrique', 'Kaio Jorge', 'Cássio'],
['atl_mg','Hulk', 'Rony', 'Gustavo Scarpa', 'Gabriel Menino', 'Guilherme Arana', 'Everson'],
['ath_pr','Zapelli', 'Luiz Fernando', 'Velasco', 'Felipinho', 'Raul', 'Mycael'],
['coxa','Josué', 'Dellatorre', 'Ronier', 'Coutinho', 'Rafinha', 'Pedro Morisco'],
['fort','Lucero', 'Marinho', 'Yago Pikachu', 'Lucas Sasha', 'Emmanuel Martínez', 'João Ricardo'],
['ceara','Pedro Raul', 'Fernando Sobral', 'Aylon', 'Fernandinho', 'Lucas Mugni', 'Bruno'],
['bahia','Everton Ribeiro', 'Luciano Rodríguez', 'Erick Pulga', 'Jean Lucas', 'Caio Alexandre', 'Ronaldo'],
['vito','Wellington Rato', 'Gustavo Mosquito', 'Matheuzinho', 'Ronald', 'Lucas Halter', 'Lucas Arcanjo'],
['sport','Lucas Lima', 'Pablo', 'Du Queiroz', 'Sérgio Oliveira', 'Hereda', 'Caique'],
['rbb','Jhon Jhon', 'Thiago Borbas', 'Matheus Fernandes', 'Juninho Capixaba', 'Laquitana', 'Cleiton']];

//determina de quem a vez de chutar
var vez = 'player';
var golsPlayer = 0;
var golsAdversario = 0;
var contagemPlayer = '';
var contagemAdversario = '';
var qtdAtualBatidas = 0;
var qtdGeralBatidas = 5;
var desempate = 'desativado';
//valor que é 1 caso o time player esteja jogando e 0 caso ele tenha sido eliminado
//usado para cálculo dos jogos entre a própria máquina
var a = 1;

//obtem o id do time escolhido e inicia a cdb
function obterId(timeId){
    localStorage.setItem('timePlayer', timeId);
    localStorage.setItem('faseCdb', 16);
}

//busca pelo id do time o lugar na lista de time 
function obterIdNumerico(timePlayerId){
    for(let i=0;i<listaTimes.length;i++){
        var idTime = listaTimes[i][0];
        if(idTime == timePlayerId){
            return i;
        }
    }
}

function carregarImagensTimes(classeId){
    //obtem todos com a classe
    times = document.querySelectorAll(classeId);

    //para cada time insere a foto do time pelo o id
    for(const time of times){
        time.style.backgroundImage = "url('/Times/"+time.id+".png')";
    } 
}

//indica qual fase da cdb está
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
    var vencedorJogo = localStorage.getItem('vencedorJogo');

    //verifica o vencedor do jogo do player e classifica o vencedor
    if(vencedorJogo=='player'){
        listaClassificados.push(localStorage.getItem('timePlayer'));
    }else if(vencedorJogo=='adversario' && localStorage.getItem('status')=='competindo'){
        listaClassificados.push(localStorage.getItem('adversario'));
    }
    
    //repete todas as fases que o player não está
    if(localStorage.getItem('status')=='eliminado'){
        a=0;
    }
    
    //simula as partidas entre a própria máquina
    //quando 'a' é 1 ignora a primeira partida(partida do player)
    for(let i=a;i<(listaTimes.length/2);i++){
        golsMandante = Math.round(Math.random()*5);
        golsVisitante = Math.round(Math.random()*5);
        
        //caso empate realiza um desempate
        if(golsMandante==golsVisitante){
            desempate = Math.round(Math.random()*1);
            
            if(desempate==0){
                golsMandante++;
            }else if(desempate==1){
                golsVisitante++;
            }
        }

        //verifica o vencedor
        if(golsMandante>golsVisitante){
            listaClassificados.push(listaTimes[i*2]);
        }else if(golsVisitante>golsMandante){
            listaClassificados.push(listaTimes[i*2+1]);
        }
    }

    //eleimina o player caso ele tenha perdido
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
    const listaTimesSorteada = [];
    
    //o time do player é adicionado como primeiro e excluido da lista times para evitar repetições
    idNumerico = obterIdNumerico(timePlayerId);
    listaTimesSorteada.push(timePlayerId);
    listaTimes.splice(idNumerico, 1);
    
    //embaralha os times
    for(let i=14; i>=0; i--){
        //sorteia um numero que será o index do item
        index = Math.round(Math.random()*(listaTimes.length-1));
        //adiciona o item a lista nova
        listaTimesSorteada.push(listaTimes[index][0]);
        
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
    
    //retira uma das div jogos
    jogosDiv = document.querySelectorAll('.jogos');
    jogosDiv[0].style.borderRadius = '8px';
    jogosDiv[0].style.padding = '30px 0';
    jogosDiv[1].style.display = 'none';
}

function cdbSemis(){
    cdbQuartas();

    //retira duas div jogo
    jogoDiv = document.querySelectorAll('.jogo');
    jogoDiv[2].style.display = 'none';
    jogoDiv[3].style.display = 'none';
}

function cdbFinal(){
    cdbSemis();
    
    //retira uma div jogo
    jogoDiv = document.querySelectorAll('.jogo');
    jogoDiv[1].style.display = 'none';
}

function cdbCampeao(){
    cdbFinal();
    const listaTimes = localStorage.getItem('listaTimes').split(',');

    //retira a div jogos
    jogosDiv = document.querySelectorAll('.jogos');
    jogosDiv[0].style.display = 'none';

    //ativa a div de campeão
    campeaoDiv = document.querySelector('#campeao');
    campeaoDiv.style.display = 'flex';

    //adicionar o id do campeão
    timeCampeao = document.querySelector('.timeCampeao');
    timeCampeao.id = listaTimes[0];

    botao = document.querySelector('#botao');
    botao.href = 'index.html';
    botao.innerHTML = 'Jogar Novamente';

    carregarImagensTimes('.timeCampeao');
}

//define no html os times e o primeiro batedor
function timesJogo(){
    times = document.querySelectorAll('.time');
    nomeBatedor = document.querySelector('#nomeBatedor');
    idPlayer = obterIdNumerico(localStorage.getItem('timePlayer'));
    
    nomeBatedor.innerHTML = listaTimes[idPlayer][1];

    //define os time no placar
    times[0].id = localStorage.getItem('timePlayer');
    times[1].id = localStorage.getItem('adversario');
    //define os times na tela final
    times[2].id = localStorage.getItem('timePlayer');
    times[3].id = localStorage.getItem('adversario');
    
    carregarImagensTimes('.time');
}

//altena entre a vez do player e adversário
function mudarVez(){
    frase = document.querySelector('#fraseVez');
    placar = document.querySelectorAll('.contagemAcertos');
    nomeBatedor = document.querySelector('#nomeBatedor');

    idPlayer = obterIdNumerico(localStorage.getItem('timePlayer'));
    idAdversario = obterIdNumerico(localStorage.getItem('adversario'));

    //se o ultimo a chutar foi o player define a frase e o nome do adversário, e vice-versa
    if(vez=='player'){
        vez='adversario';
        frase.innerHTML = 'ESCOLHA UM LUGAR PARA DEFENDER';
        nomeBatedor.innerHTML = listaTimes[idAdversario][((qtdAtualBatidas)%5)+1];
    }else if(vez=='adversario'){
        vez='player';
        frase.innerHTML = 'ESCOLHA UM LUGAR PARA CHUTAR';
        nomeBatedor.innerHTML = listaTimes[idPlayer][((qtdAtualBatidas+0.5)%5)+1];
    }
    //atualiza o placar
    placar[0].innerHTML = contagemPlayer;
    placar[1].innerHTML = contagemAdversario;
    qtdAtualBatidas = qtdAtualBatidas + 0.5;
}

//analisa se foi gol
function analisarChute(posPlayer){
    narracao = document.querySelector('#narracaoTexto');

    //sorteio o lugar do adversário
    posAdversario = Math.round(Math.random()*5)+1;
    
    //verifica quem chutou
    if(vez=='player'){
        //reseta o placar caso já tenha tido 5 chutes de cada
        if(qtdGeralBatidas!=5 && (qtdGeralBatidas-1)%5==0){
            contagemPlayer = '';
            contagemAdversario = '';
        }

        //verifica se o player acertou ou não
        if(posPlayer==posAdversario){
            contagemPlayer = contagemPlayer + ' X';
            narracao.innerHTML = 'DEFENDEUUUUU, GOLEIRO BUSCOU NO '+posAdversario;
        }else{
            golsPlayer++;
            contagemPlayer = contagemPlayer + ' O';
            narracao.innerHTML = 'Chute no '+posPlayer+' e goleiro no '+posAdversario;
        }
    }else if(vez=='adversario'){
        //verifica se o adversário acertou ou não
        if(posPlayer==posAdversario){
            contagemAdversario = contagemAdversario + ' X';
            narracao.innerHTML = 'DEFENDEUUUUU, GOLEIRO BUSCOU NO '+posPlayer;
        }else{
            golsAdversario++;
            contagemAdversario = contagemAdversario + ' O';
            narracao.innerHTML = 'Chute no '+posAdversario+' e goleiro no '+posPlayer;
        }

        //quando está em desempate a verificação se alguem venceu é feita após o o chute do adversário
        if(desempate=='ativado'){
            if(golsPlayer>golsAdversario){
                fimJogo('player');
            }else if(golsAdversario>golsPlayer){
                fimJogo('adversario');
            }
        }
    }

    //verifica se empatou após as 5 batidas de cada
    if(qtdAtualBatidas>=4.5 && golsAdversario==golsPlayer){
        
        qtdGeralBatidas++;
        desempate = 'ativado';
    }
    
    //verifica quem venceu
    if(desempate=='desativado'){
        //calculo permite saber se alguem venceu antes do fim das 5 batidas
        if((golsPlayer-golsAdversario)>(qtdGeralBatidas-qtdAtualBatidas)){
            fimJogo('player');
        }else if((golsAdversario-golsPlayer)>(qtdGeralBatidas-qtdAtualBatidas)){
            fimJogo('adversario');
        }
    }

    mudarVez();
}

//determina o vencedor e mostra a tela final
function fimJogo(vencedor){
    localStorage.setItem('vencedorJogo', vencedor);

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