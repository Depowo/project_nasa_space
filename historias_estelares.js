(function() {
  // Criar estrelas no background
  const bg = document.getElementById('bgSpace');
  const frag = document.createDocumentFragment();
  
  for (let i = 0; i < 120; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    s.style.cssText = `top:${Math.random()*100}%;left:${Math.random()*100}%;animation-delay:${Math.random()*3}s;opacity:${Math.random()}`;
    frag.appendChild(s);
  }
  
  bg.insertBefore(frag, bg.firstChild);

  // Sistema de chat
  const body = document.getElementById('chat-body');
  
  // Diálogos da Estrelinha
  const dialogos = {
    inicio: {
      texto: 'Olá, pequeno explorador! 🌟 Eu sou a Estrelinha! Vim do céu para te contar sobre o clima espacial. O que você quer saber?',
      opcoes: [
        {texto: '🌞 O que é o Sol?', proximo: 'sol'},
        {texto: '⚡ O que é clima espacial?', proximo: 'clima'},
        {texto: '🌈 O que são as auroras?', proximo: 'aurora'},
        {texto: '🛰️ Como o espaço afeta a gente?', proximo: 'impacto'}
      ]
    },
    sol: {
      texto: 'O Sol é uma estrela gigante super quente! ☀️ Ele é como um fogão enorme no céu que nos dá luz e calor. Às vezes ele fica agitado e manda faíscas para o espaço! É muito legal, mas também pode causar alguns probleminhas aqui na Terra.',
      opcoes: [
        {texto: '😮 Que tipo de faíscas?', proximo: 'faciscas'},
        {texto: '🌍 Como isso afeta a Terra?', proximo: 'terra'},
        {texto: '🔙 Voltar ao início', proximo: 'inicio'}
      ]
    },
    clima: {
      texto: 'Clima espacial é tipo o clima aqui na Terra, mas lá no espaço! 🌌 Quando o Sol solta suas faíscas e nuvens de partículas, elas viajam pelo espaço como trens invisíveis. Quando chegam perto da Terra, podem causar tempestades espaciais!',
      opcoes: [
        {texto: '🚂 Como são essas nuvens?', proximo: 'nuvens'},
        {texto: '⛈️ O que é tempestade espacial?', proximo: 'tempestade'},
        {texto: '🔙 Voltar ao início', proximo: 'inicio'}
      ]
    },
    aurora: {
      texto: 'As auroras são luzes mágicas no céu! 🌈✨ Elas acontecem quando as partículas do Sol encontram o escudo protetor da Terra (a magnetosfera). É como fogos de artifício naturais verdes, rosas e roxos dançando no céu!',
      opcoes: [
        {texto: '🛡️ O que é a magnetosfera?', proximo: 'magnetosfera'},
        {texto: '🎨 Por que têm cores diferentes?', proximo: 'cores'},
        {texto: '🔙 Voltar ao início', proximo: 'inicio'}
      ]
    },
    impacto: {
      texto: 'O clima espacial pode bagunçar algumas coisas aqui! 📡 GPS dos carros pode parar, aviões mudam de rota, astronautas precisam se proteger, e até a energia elétrica pode ter problemas. Mas não se preocupe, temos cientistas espertos cuidando disso!',
      opcoes: [
        {texto: '👨‍🌾 Como afeta os fazendeiros?', proximo: 'fazendeiro'},
        {texto: '✈️ E os aviões?', proximo: 'avioes'},
        {texto: '👨‍🚀 E os astronautas?', proximo: 'astronautas'},
        {texto: '🔙 Voltar ao início', proximo: 'inicio'}
      ]
    },
    faciscas: {
      texto: 'São chamadas de erupções solares! ⚡🔥 Imagine o Sol tendo um espirro gigante de energia! Essas explosões mandam luz e partículas super rápidas pelo espaço. Elas podem chegar aqui em apenas 8 minutos!',
      opcoes: [
        {texto: '🏃 Tão rápido assim?!', proximo: 'velocidade'},
        {texto: '🔙 Voltar ao início', proximo: 'inicio'}
      ]
    },
    terra: {
      texto: 'A Terra tem um super poder! 🦸‍♀️ Ela tem um escudo magnético invisível que protege a gente. Mas quando vem uma tempestade solar muito forte, algumas partículas conseguem passar e podem atrapalhar satélites e comunicações.',
      opcoes: [
        {texto: '🛡️ Como funciona esse escudo?', proximo: 'magnetosfera'},
        {texto: '🔙 Voltar ao início', proximo: 'inicio'}
      ]
    },
    nuvens: {
      texto: 'São chamadas de EMC - Ejeções de Massa Coronal! 🌪️☁️ São como bolhas gigantes cheias de partículas que o Sol solta. Imagine o Sol soprando bolhas de sabão, mas essas bolhas são do tamanho de planetas e viajam super rápido!',
      opcoes: [
        {texto: '🎈 Quanto tempo leva?', proximo: 'tempo'},
        {texto: '🔙 Voltar ao início', proximo: 'inicio'}
      ]
    },
    tempestade: {
      texto: 'Uma tempestade espacial acontece quando muitas partículas do Sol chegam de uma vez! 🌩️⚡ É como uma chuva de energia que pode fazer as luzes piscarem, atrapalhar o GPS e criar auroras lindas no céu!',
      opcoes: [
        {texto: '😨 É perigoso?', proximo: 'perigo'},
        {texto: '🔙 Voltar ao início', proximo: 'inicio'}
      ]
    },
    magnetosfera: {
      texto: 'A magnetosfera é o escudo mágico da Terra! 🛡️💫 É um campo magnético gigante que envolve nosso planeta como uma bolha protetora. Ela desvia a maioria das partículas perigosas do Sol para longe da gente!',
      opcoes: [
        {texto: '🧲 Como ela funciona?', proximo: 'funciona'},
        {texto: '🔙 Voltar ao início', proximo: 'inicio'}
      ]
    },
    cores: {
      texto: 'As cores dependem de qual gás as partículas solares atingem! 🎨 Verde vem do oxigênio, vermelho também do oxigênio mas mais alto no céu, e roxo/azul vem do nitrogênio. É como pintar o céu com luz!',
      opcoes: [
        {texto: '🌍 Onde posso ver?', proximo: 'onde'},
        {texto: '🔙 Voltar ao início', proximo: 'inicio'}
      ]
    },
    fazendeiro: {
      texto: 'Os fazendeiros usam GPS para plantar e colher! 🚜🌾 Quando há tempestade solar, o GPS pode parar de funcionar direitinho. Aí eles precisam usar métodos antigos, como bússolas e experiência!',
      opcoes: [
        {texto: '🧭 Como faziam antes?', proximo: 'antes'},
        {texto: '🔙 Voltar ao início', proximo: 'inicio'}
      ]
    },
    avioes: {
      texto: 'Os aviões precisam mudar de rota! ✈️🌐 Durante tempestades solares, há mais radiação em certas alturas. Os pilotos recebem avisos e voam por caminhos mais seguros, como desviar de uma nuvem de chuva!',
      opcoes: [
        {texto: '📻 E as comunicações?', proximo: 'comunicacao'},
        {texto: '🔙 Voltar ao início', proximo: 'inicio'}
      ]
    },
    astronautas: {
      texto: 'Os astronautas são super corajosos! 👨‍🚀🚀 No espaço, eles ficam sem a proteção total da Terra. Quando tem tempestade solar, eles correm para áreas especiais da estação espacial que são mais protegidas!',
      opcoes: [
        {texto: '🏠 Como é essa área?', proximo: 'abrigo'},
        {texto: '🔙 Voltar ao início', proximo: 'inicio'}
      ]
    },
    velocidade: {
      texto: 'A luz do Sol viaja super mega rápido! 🚀💨 Ela percorre 300.000 km por segundo! Em 8 minutos ela sai do Sol e chega até nós. Já as partículas demoram de 1 a 3 dias para chegar, dependendo da tempestade.',
      opcoes: [
        {texto: '🤔 Por que a diferença?', proximo: 'diferenca'},
        {texto: '🔙 Voltar ao início', proximo: 'inicio'}
      ]
    },
    tempo: {
      texto: 'As EMC levam entre 1 a 3 dias para chegar aqui! 🕐🌍 Depende de quão forte foi a explosão solar. Isso nos dá tempo para nos prepararmos! Cientistas ficam de olho e avisam quando uma está vindo.',
      opcoes: [
        {texto: '🔭 Como eles sabem?', proximo: 'cientistas'},
        {texto: '🔙 Voltar ao início', proximo: 'inicio'}
      ]
    },
    perigo: {
      texto: 'Para a maioria das pessoas, não é perigoso! 😊🛡️ A atmosfera e a magnetosfera nos protegem. Mas pode atrapalhar tecnologias como satélites, GPS e energia. Os cientistas monitoram tudo para avisar e proteger os equipamentos!',
      opcoes: [
        {texto: '👨‍🔬 Quem cuida disso?', proximo: 'cientistas'},
        {texto: '🔙 Voltar ao início', proximo: 'inicio'}
      ]
    },
    funciona: {
      texto: 'A Terra é como um imã gigante! 🧲🌍 O núcleo de ferro derretido cria um campo magnético. Quando partículas solares chegam, esse campo as empurra para os polos (norte e sul), por isso as auroras aparecem lá!',
      opcoes: [
        {texto: '🧊 Sempre nos polos?', proximo: 'polos'},
        {texto: '🔙 Voltar ao início', proximo: 'inicio'}
      ]
    },
    onde: {
      texto: 'As auroras aparecem perto dos polos! 🌍❄️ Lugares como Noruega, Islândia, Canadá e Alasca no norte, e Antártida no sul. Mas quando a tempestade é muito forte, dá para ver em lugares mais ao sul também!',
      opcoes: [
        {texto: '📸 Posso tirar foto?', proximo: 'foto'},
        {texto: '🔙 Voltar ao início', proximo: 'inicio'}
      ]
    },
    antes: {
      texto: 'Antigamente não tinha GPS! 🗺️⭐ Os fazendeiros usavam o sol, as estrelas, marcos naturais e muita experiência. Eles conheciam tão bem suas terras que não precisavam de tecnologia!',
      opcoes: [
        {texto: '⭐ Como usavam estrelas?', proximo: 'navegacao'},
        {texto: '🔙 Voltar ao início', proximo: 'inicio'}
      ]
    },
    comunicacao: {
      texto: 'As ondas de rádio ficam bagunçadas! 📻🌊 Durante tempestades solares, as comunicações dos aviões com a torre de controle podem ter chiados ou parar por alguns minutos. Por isso sempre têm sistemas de backup!',
      opcoes: [
        {texto: '🆘 E se falhar tudo?', proximo: 'backup'},
        {texto: '🔙 Voltar ao início', proximo: 'inicio'}
      ]
    },
    abrigo: {
      texto: 'É uma área com paredes mais grossas! 🏠🛡️ Geralmente fica no centro da estação espacial, longe das janelas. Lá dentro tem água e provisões. É como um cofre super seguro contra a radiação!',
      opcoes: [
        {texto: '⏱️ Quanto tempo ficam lá?', proximo: 'duracao'},
        {texto: '🔙 Voltar ao início', proximo: 'inicio'}
      ]
    },
    diferenca: {
      texto: 'A luz não tem peso e viaja na velocidade máxima! 💨✨ Já as partículas são pedacinhos de matéria que pesam um pouquinho, então viajam mais devagar. É como comparar um raio de sol com poeira voando!',
      opcoes: [
        {texto: '🤓 Interessante!', proximo: 'inicio'},
        {texto: '🔙 Voltar ao início', proximo: 'inicio'}
      ]
    },
    cientistas: {
      texto: 'Existem cientistas chamados heliofísicos! 👨‍🔬🔭 Eles usam satélites especiais que ficam entre o Sol e a Terra, observando o tempo todo. Quando veem algo vindo, avisam todo mundo para se proteger!',
      opcoes: [
        {texto: '🛰️ Que satélites?', proximo: 'satelites'},
        {texto: '🔙 Voltar ao início', proximo: 'inicio'}
      ]
    },
    polos: {
      texto: 'Sim, principalmente! 🧭❄️ Mas em tempestades muito fortes, as auroras podem aparecer em lugares mais distantes dos polos. Já teve aurora vista até nos Estados Unidos e Europa central!',
      opcoes: [
        {texto: '😮 Nossa, que legal!', proximo: 'inicio'},
        {texto: '🔙 Voltar ao início', proximo: 'inicio'}
      ]
    },
    foto: {
      texto: 'Sim! 📸✨ Mas precisa de uma câmera boa que funcione no escuro. As auroras dançam no céu noturno, então quanto mais escuro e longe das luzes da cidade, melhor fica a foto!',
      opcoes: [
        {texto: '🎥 Quero ver uma!', proximo: 'inicio'},
        {texto: '🔙 Voltar ao início', proximo: 'inicio'}
      ]
    },
    navegacao: {
      texto: 'Eles observavam a posição das estrelas! ⭐🧭 Cada constelação aparece em horários diferentes. Eles também usavam o sol durante o dia para saber onde era norte, sul, leste e oeste. Muito inteligente!',
      opcoes: [
        {texto: '🌟 Que demais!', proximo: 'inicio'},
        {texto: '🔙 Voltar ao início', proximo: 'inicio'}
      ]
    },
    backup: {
      texto: 'Os aviões têm muitos sistemas de segurança! 🛡️✈️ Se um falha, outro entra no lugar. E os pilotos são super treinados para voar até sem comunicação, usando instrumentos do próprio avião!',
      opcoes: [
        {texto: '👨‍✈️ Pilotos são heróis!', proximo: 'inicio'},
        {texto: '🔙 Voltar ao início', proximo: 'inicio'}
      ]
    },
    duracao: {
      texto: 'Geralmente algumas horas! ⏰🛡️ As tempestades solares mais intensas duram de 2 a 8 horas. Depois os níveis de radiação voltam ao normal e eles podem sair do abrigo em segurança!',
      opcoes: [
        {texto: '😊 Que bom!', proximo: 'inicio'},
        {texto: '🔙 Voltar ao início', proximo: 'inicio'}
      ]
    },
    satelites: {
      texto: 'O principal é o SOHO! 🛰️☀️ Ele fica num ponto especial do espaço observando o Sol 24 horas por dia. Também tem o SDO que tira fotos incríveis do Sol, e o ACE que detecta as partículas chegando!',
      opcoes: [
        {texto: '📷 Posso ver as fotos?', proximo: 'fotos'},
        {texto: '🔙 Voltar ao início', proximo: 'inicio'}
      ]
    },
    fotos: {
      texto: 'Sim! 🌐📸 A NASA tem um site com fotos do Sol ao vivo! Você pode ver manchas solares, erupções e até EMCs saindo. É como ter um telescópio espacial na sua mão!',
      opcoes: [
        {texto: '🤩 Incrível!', proximo: 'inicio'},
        {texto: '🔙 Voltar ao início', proximo: 'inicio'}
      ]
    }
  };

  function mostrarDialogo(id) {
    const dialogo = dialogos[id];
    if (!dialogo) return;
    
    const msgBot = document.createElement('div');
    msgBot.className = 'chat-msg bot';
    msgBot.textContent = 'Estrelinha: ' + dialogo.texto;
    body.appendChild(msgBot);
    
    if (dialogo.opcoes) {
      const opcoes = document.createElement('div');
      opcoes.className = 'chat-options';
      
      dialogo.opcoes.forEach(op => {
        const btn = document.createElement('button');
        btn.className = 'chat-btn';
        btn.textContent = op.texto;
        btn.onclick = () => {
          const msgUser = document.createElement('div');
          msgUser.className = 'chat-msg user';
          msgUser.textContent = 'Você: ' + op.texto;
          body.appendChild(msgUser);
          opcoes.remove();
          
          setTimeout(() => {
            mostrarDialogo(op.proximo);
          }, 500);
        };
        opcoes.appendChild(btn);
      });
      
      body.appendChild(opcoes);
    }
    
    body.scrollTop = body.scrollHeight;
  }

  mostrarDialogo('inicio');
})();