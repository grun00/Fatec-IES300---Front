
import React, { useContext, useEffect, useState } from "react";


import Header from "../../Match/MatchHeader/MatchHeader";
import GameScreen from "../GameScreen";
import LoadScreen from "../LoadScreen";
import CartasScreen from "../CartasScreen";
import ConvidadosScreen from "../ConvidadosScreen";
import UniversitariosScreen from "../UniversitariosScreen";
import { UserContext} from "../../../context/UserContext";
import api from "../../../services/api";

import "./styles.css";


const MatchScreenComponent = (props) => {  

  const {user} = useContext(UserContext);

  const [universitarios, setUniversitarios] = useState(() => {
    for(var i=0; i<user.backpack.length; i++){
      if(user.backpack[i].item_id == "60ba86bec6a9b11a5cb359a7"){
      return parseInt(user.backpack[i].quantity,10) ;
      }
    }
    return 0;
  });
  const [cartas, setCartas] = useState(() => {
    for(var i=0; i<user.backpack.length; i++){
      if(user.backpack[i].item_id == "609ead9f9fc12b2ee4553793"){
      return parseInt(user.backpack[i].quantity,10 );
      }
    }
    return 0;
  });
  const [convidados, setConvidados] = useState(() => {
    for(var i=0; i<user.backpack.length; i++){
      if(user.backpack[i].item_id == "60ba86fec6a9b11a5cb359a8"){
      return parseInt(user.backpack[i].quantity,10) ;
      }
    }
    return 0;
  });

  const [pular, setPular] = useState(() => {
    for(var i=0; i<user.backpack.length; i++){
      if(user.backpack[i].item_id == "60ba8736c6a9b11a5cb359a9"){
      return parseInt(user.backpack[i].quantity,10) ;
      }
    }
    return 0;
  });




  const [numPerguntaAtual, setNumPerguntaAtual] = useState(-1);
  const getCartaDesv = () => {
    const cartaDesvirada = [];
    const itens = {};
    let i = 4;
    for (let a = 0; a < 4; a++) {
      do {
        i = Math.floor(Math.random() * 4); //sorteia as cartas
      } while (itens[i] !== undefined);
      itens[i] = i;
      cartaDesvirada[a] = i;
    }
    return cartaDesvirada;
  };

  const getRespUniv = () => {
    const prob = 70 - 10 * Number(pergunta.difficulty); //probabilidade em % da resposta correta (diminui com a dificuldade)
    const respostaUniversitario = [];
    const resposta = ["A", "B", "C", "D"];
    const max = 300 / (100 - prob);
    for (let a = 0; a < 3; a++) {
      let i = Math.floor(Math.random() * max);
      let rand = i < 4 ? i : pergunta.answerIndex; //sorteia a resposta proporcionalmente
      respostaUniversitario[a] = resposta[rand];
    }
    return respostaUniversitario;
  };

  const getRespConv = () => {
    const prob = 60 - 10 * Number(pergunta.difficulty); //probabilidade em % da resposta correta (diminui com a dificuldade)
    const respostaConvidado = [];
    const resposta = ["A", "B", "C", "D"];
    const max = 300 / (100 - prob);
    for (let a = 0; a < 5; a++) {
      let i = Math.floor(Math.random() * max);
      let rand = i < 4 ? i : pergunta.answerIndex; //sorteia a resposta proporcionalmente
      respostaConvidado[a] = resposta[rand];
    }
    return respostaConvidado;
  };

  const getCartaVir = () => {
    return Array(4).fill(4);
  };
  const iniciarStatusAlternativas = () => {
    return Array(4).fill("naoEscolhida");
  };

  const iniciarStatusAlterVisibilidade = () => {
    return Array(4).fill("inativo");
  };

  const iniciarStatusRespConv = () => {
    //ultimo elem usado para guardar convidado a ativar
    return Array(6).fill("inativo");
  };
  const iniciarStatusRespUniv = () => {
    //ultimo elem usado para guardar universitario a ativar
    return Array(4).fill("inativo");
  };

  const [statusLoad, setStatusLoad] = useState("inativo");
  const [statusMenu, setStatusMenu] = useState("inativo");
  const [msgLoad, setMgsLoad] = useState(["", ""]);
  const [statusPulo, setStatusPulo] = useState(3);
  const [statusCartas, setStatusCartas] = useState("inativo");
  const [statusVitinho, setStatusVitinho] = useState("inativo");
  const [statusUniversitarios, setStatusUniversitarios] = useState("inativo");
  const [statusConvidados, setStatusConvidados] = useState("inativo");
  const [statusPergunta, setStatusPergunta] = useState("inativo");
  const [inicializado, setInicializado] = useState(false);
  const [encerrado, setEncerrado] = useState(true);
  const [finalizado, setFinalizado] = useState(true);
  const idAlternativa = ["A", "B", "C", "D"];
  const pergunta = props.currentQuestion;

  const [statusAlternativa, setStatusAlternativa] = useState(() =>
    iniciarStatusAlternativas()
  );
  const [statusAlterVisibilidade, setStatusAlterVisibilidade] = useState(() =>
    iniciarStatusAlterVisibilidade()
  );
  const [statusRespConvidado, setStatusRespConvidado] = useState(() =>
    iniciarStatusRespConv()
  );
  const [statusRespUniversitario, setStatusRespUniversitario] = useState(() =>
    iniciarStatusRespUniv()
  );
  const [tempo, setTempo] = useState("");
  const [cartaViradas, setCartaViradas] = useState(() => getCartaVir()); //todas viradas
  const [cartaDesviradas, setCartaDesviradas] = useState(() => getCartaDesv());
  const [respostaUniversitarios, setRespostaUniversitarios] = useState(() =>
    getRespUniv()
  );
  const [respostaConvidados, setRespostaConvidados] = useState(() =>
    getRespConv()
  );
  const [scoreAtual, setScoreAtual] = useState(0);

  const handleClickMenu = () => {
    return statusMenu === "ativo" ? abrirMenu() : fecharMenu();
  };

  const abrirMenu = () => {
    carregamentoClose();
    setStatusMenu("inativo");
  };

  const fecharMenu = () => {
    carregamento(["", ""]);
    setStatusMenu("ativo");
  };

  const marcar = (opcao) => {
    //marcar alternativa escolhida
    const status = statusAlternativa.slice();
    for (let i in status) status[i] = "naoEscolhida";
    status[opcao] = "escolhida";
    setStatusAlternativa(status);
  };

  const verificar = () => {
    //verificar alternativa escolhida apos termino
    const status = statusAlternativa.slice();
    for (let opcao in status) {
      if (status[opcao].search("escolhida") != -1) {
        if (pergunta.answerIndex == opcao) {
          status[opcao] = "correta";
          props.handlePlayerAnswer({
            alternative: opcao,
            isCorrect: true,
            difficulty: pergunta.difficulty,
          });
        } else {
          status[opcao] = "errada";
          props.handlePlayerAnswer({ alternative: opcao, isCorrect: false });
        }
      }
    }
    if (props.skipMessage){
      carregamento(["DANÇOU!", props.skipMessage]);
      setTimeout(() => carregamentoClose(), 1500)
    }
    setStatusAlternativa(status); //console.log('verificou')
    setInicializado(false);
    setTimeout(() => {
      //console.log('atualizou')
      setFinalizado(true);
      carregarPergunta(); //*******no meu codigo era assim que carregava o proximo ******************//
    }, 1500);
    console.log(`score: ${scoreAtual}`);
  };

  const carregarPergunta = () => {
    /*const num = numPerguntaAtual + 1;*/
    setNumPerguntaAtual((num) => (num += 1));
    setTempo("");
    props.handleTimeUp();
  };


  useEffect(() => {
    numPerguntaAtual > -1 &&
      finalizado &&
      setStatusAlternativa(iniciarStatusAlternativas());
  }, [numPerguntaAtual]);

  useEffect(() => {
    numPerguntaAtual > -1 &&
      finalizado &&
      setStatusAlterVisibilidade(iniciarStatusAlterVisibilidade());
  }, [statusAlternativa]);

  useEffect(() => {
    finalizado && setStatusRespConvidado(iniciarStatusRespConv());
  }, [statusAlterVisibilidade]);

  useEffect(() => {
    finalizado && setStatusRespUniversitario(iniciarStatusRespUniv());
  }, [statusRespConvidado]);

  useEffect(() => {
    finalizado && setCartaViradas(getCartaVir());
  }, [statusRespUniversitario]);

  useEffect(() => {
    finalizado && setCartaDesviradas(getCartaDesv());
  }, [cartaViradas]);

  useEffect(() => {
    finalizado && setRespostaUniversitarios(getRespUniv());
  }, [cartaDesviradas]);

  useEffect(() => {
    finalizado && setRespostaConvidados(getRespConv());
  }, [respostaUniversitarios]);

  useEffect(() => {
    finalizado && props.handleNextQuestion();
  }, [respostaConvidados]);

  useEffect(() => {
    setFinalizado(false);
  }, [pergunta]);

  useEffect(() => {
    !finalizado &&
      numPerguntaAtual >= -1 &&
      statusLoad === "inativo" &&
      iniciar();
  }, [finalizado]);

  useEffect(() => {
    if (!encerrado && tempo > 0.0) {
      setTimeout(() => {
        const tempoAtual = tempo;
        setTempo(tempoAtual - 0.1); //funcionamento do cronometro
      }, 100);
    }
  }, [tempo]);

  useEffect(() => {
    if (!encerrado && tempo < 0.0) {
      setEncerrado(true); //tempo encerrado
      verificar();
    }
  }, [tempo]);

  const temporizador = () => {
    if (tempo === "") return tempo;
    const count = tempo.toString().replace("-", "").split("."); //para tirar sinal negativo do zero
    return (
      ("0" + count[0]).slice(-2) +
      "." +
      (count[1] ? count[1] : "0")
    ).slice(0, 4);
  };

  const handleClickAjuda = (i) => {
    const ajuda = [
      () => {
        if (temAjuda(["AGUARDE!", "Consultando os universitários"])) {
          setTimeout(() => {
            carregamentoClose();
            setStatusUniversitarios("ativo");
            const primeiro = Math.floor(Math.random() * 3); //primeiro a responder
            const ultimo = (primeiro + 2) % 3;
            tempoRespostaUniversitarios(primeiro, ultimo);
          }, 1500);
        }
      },
      () => {
        if (temAjuda(["AGUARDE!", "Embaralhando as cartas"])) {
          setTimeout(() => {
            carregamentoClose();
            setStatusCartas("ativo");
          }, 1500);
        }
      },
      () => {
        if (temAjuda(["AGUARDE!", "Consultando os convidados"])) {
          setTimeout(() => {
            carregamentoClose();
            setStatusConvidados("ativo");
            const status = statusRespConvidado.slice();
            status[5] = Math.floor(Math.random() * 5); //primeiro a responder
            setStatusRespConvidado(status);
          }, 1500);
        }
      },
    ];
    return ajuda[i];
  };

  const handleClickPulo = (e) => {
    e.preventDefault()
    if(temAjuda(["PULOU!", "Aguarde o adversário"])){
      props.handleSkipQuestion()
      setTimeout(() => {
        carregamentoClose()
      }, 1500);
    }
    
  };

  const temAjuda = (msg) => {
    //verifica se tem ajuda e lanca
    
    if (!inicializado) return;
    let pulos = statusPulo;
    if (pulos > 0) {
      if(numPerguntaAtual >=16){
        msg = ["NEGATIVO!", "Na rodada do dobro não tem ajuda!"]
        setTimeout(() => carregamentoClose(), 1000);
        pulos = 0;
      }else{
        setStatusPulo(pulos - 1);
      }
    }
    else {
      const rota = "/players/" + user._id;
      var backp ;
      backp = user.backpack;
      if(msg[1] == "Embaralhando as cartas"){
         if(cartas > 0){

          for(var i=0; i<backp.length; i++){
            if(backp[i].item_id == "609ead9f9fc12b2ee4553793"){
              
              backp[i].quantity = cartas -1 ;
              
              
            }
          }
          api.patch(rota,{  "backpack":backp  })

          user.backpack = backp;

            setCartas(cartas - 1);
            carregamento(msg);

            

            return true;
         }
      
      }else if(msg[1] == "Consultando os convidados"){
        if(convidados > 0){

          for(var i=0; i<backp.length; i++){
            if(backp[i].item_id == "60ba86fec6a9b11a5cb359a8"){
              
              backp[i].quantity = convidados -1;
              
              
            }
          }
          api.patch(rota,{  "backpack":backp  })

            user.backpack = backp;
          setConvidados(convidados-1);
          carregamento(msg);
          
          return true;
        }
        
      }else if(msg[1] == "Consultando os universitários"){
        if(universitarios > 0){

          for(var i=0; i<backp.length; i++){
            if(backp[i].item_id == "60ba86bec6a9b11a5cb359a7"){
              
              backp[i].quantity = universitarios - 1 ;
              
              
            }
          }
          api.patch(rota,{  "backpack":backp  })

            user.backpack = backp;

          setUniversitarios(universitarios-1); 
          carregamento(msg);
          
          return true;
        }
        
      }else {
        if(pular > 0)     {   

          for(var i=0; i<backp.length; i++){
            if(backp[i].item_id == "60ba8736c6a9b11a5cb359a9"){
              
              backp[i].quantity = pular  - 1 ;
              
              
            }
          }
          api.patch(rota,{  "backpack":backp  })

            user.backpack = backp;
          setPular(pular-1);
          carregamento(msg);
          
          return true;
        }
        
      }
      msg = ["QUE TRISTE!", "Você não tem mais nenhuma ajuda"];
      carregamento(msg);

      /* atualiza items no banco */
      
      
      
    
    

      setTimeout(() => carregamentoClose(), 1000);
      return false;
      
    }
    carregamento(msg);
    return pulos !== 0;
  };

  const tempoRespostaUniversitarios = (i, ultimo) => {
    setTimeout(() => {
      const statusRespUn = statusRespUniversitario.slice();
      statusRespUn[(i + 2) % 3] = "inativo";
      statusRespUn[i] = "ativo";
      if (i != ultimo) tempoRespostaUniversitarios((i + 1) % 3, ultimo);
      else
        setTimeout(() => {
          const status = statusRespUniversitario.slice();
          status[i] = "inativo";
          setStatusRespUniversitario(status);
          setTimeout(() => {
            setStatusUniversitarios("inativo");
          }, 1000);
        }, Math.floor(Math.random() * 1000) + 1000);
      setStatusRespUniversitario(statusRespUn);
    }, Math.floor(Math.random() * 1000) + 1000);
  };

  useEffect(() => {
    !encerrado &&
      setTimeout(() => {
        const status = statusRespConvidado.slice();
        const convidado = status[5];
        if (convidado === "inativo") return; //foi inicializado
        if (status[convidado] === "ativo") {
          //todos apresentaram as placas
          setTimeout(() => {
            iniciarStatusRespConv();
            setTimeout(() => {
              setStatusConvidados("inativo");
            }, 1000);
          }, 500);
        } else {
          status[convidado] = "ativo";
          status[5] = (convidado + 4) % 5; //no momento carrega sempre o convidado anterior
          setStatusRespConvidado(status);
        }
      }, Math.floor(Math.random() * 500) + 500);
  }, [statusRespConvidado]);

  const carregamento = (msg) => {
    setMgsLoad(msg);
    setStatusLoad("ativo");
  };

  const carregamentoClose = () => {
    setMgsLoad(["", ""]);
    setStatusLoad("inativo");
  };

  const chamarVitinho = () => {
    setStatusVitinho("ativo");
  };

  const dispensarVitinho = () => {
    setStatusVitinho("inativo");
  };

  const iniciar = () => {
    carregamento(["Aguarde!", "Estamos carregando a nova pergunta"]);
    setTimeout(() => {
      carregamentoClose();
      setEncerrado(false);
      chamarVitinho();
      setStatusPergunta("ativo");
      liberarAlternativas();
    }, 2000);
  };

  const liberarAlternativas = () => {
    setTimeout(() => {
      const status = statusAlterVisibilidade.slice();
      let cont = 0;
      while (cont < 4) {
        if (status[cont] == "inativo") {
          status[cont] = "";
          setStatusAlterVisibilidade(status);
          return;
        }
        cont++;
      }
      setInicializado(true);
      setTempo(15.0); //liberarAlternativas(i+1);
    }, 1000);
  };


  useEffect(() => {
    !encerrado && liberarAlternativas(); //para liberar uma alternativa por vez
  }, [statusAlterVisibilidade]);


  const opcaoCarta = (i) => {
    const cv = cartaViradas.slice();
    return cv[i];
  };

  const handleClickCarta = (i) => {
    //mostra carta escolhida e depois guarda as cartas
    const cv = cartaViradas.slice();
    const cd = cartaDesviradas.slice();
    cv[i] = cd[i];
    setCartaViradas(cv);
    setTimeout(() => {
      setStatusCartas("inativo");
      eliminarAlternativas(cd[i]);
    }, 1000);
  };

  const eliminarAlternativas = (tot) => {
    const status = statusAlterVisibilidade.slice();
    const itens = {};
    let i = 0;
    for (let a = 0; a < tot; a++) {
      do {
        i =
          Math.floor(Math.random() * 3 + Number(pergunta.answerIndex) + 1) % 4;
      } while (itens[i] != undefined);
      itens[i] = i;
      status[i] = "eliminada";
    }
    setStatusAlterVisibilidade(status);
  };

  const renderStatusAlternativas = (i) =>
    statusAlterVisibilidade[i] +
    (!inicializado ? " desabilitada " : " ") +
    statusAlternativa[i];
  const renderRespostaUniversitario = (i) => respostaUniversitarios[i];
  const renderStatusRespostaUniversitario = (i) => statusRespUniversitario[i];
  const renderRespostaConvidado = (i) => respostaConvidados[i];
  const renderStatusRespostaConvidado = (i) => statusRespConvidado[i];

  return (
    <>
      <div className="container">
        <div className="gameToFill-area">
          <div className="header">
            <Header players={props.players} />
          </div>
          <div className="gameInterface-area">
            <GameScreen
              tempo={temporizador()}
              onClick={marcar}
              statusPergunta={statusPergunta}
              statusAlternativa={(i) => renderStatusAlternativas(i)}
              statusVitinho={statusVitinho}
              pergunta={pergunta.question}

              qtd_universitario={universitarios}
              qtd_cartas={cartas}
              qtd_convidados={convidados}
              qtd_pular={pular}
              alternativas = {pergunta.randomAlternatives}

              disabled={!inicializado ? "disabled" : ""}
              pulos={statusPulo}
              onClickAjuda={(i) => handleClickAjuda(i)}
              onClickPular={handleClickPulo}
            />
          </div>
          <div className={"gameLoad-area " + statusLoad}>
            <LoadScreen aviso={msgLoad[0]} avisoComplemento={msgLoad[1]} />
          </div>
          <div className={"gameCartas-area " + statusCartas}>
            <CartasScreen
              onClickCarta={(i) => handleClickCarta(i)}
              opcaoCarta={(i) => opcaoCarta(i)}
            />
          </div>
          <div className={"gameConvidados-area " + statusConvidados}>
            <ConvidadosScreen
              respostaConvidado={(i) => renderRespostaConvidado(i)}
              statusRespConvidado={(i) => renderStatusRespostaConvidado(i)}
            />
          </div>
          <div className={"gameUniversitarios-area " + statusUniversitarios}>
            <UniversitariosScreen
              respostaUniversitario={(i) => renderRespostaUniversitario(i)}
              statusRespUniversitario={(i) =>
                renderStatusRespostaUniversitario(i)
              }
            />
          </div>
          <div className="footer"></div>
        </div>
      </div>
    </>
  );
};

export default MatchScreenComponent;
