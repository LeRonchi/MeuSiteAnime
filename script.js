document.addEventListener('DOMContentLoaded', () => {
    const videoElement = document.getElementById('myVideo');
    const homeVideoButton = document.querySelector('.home-video-button');
    const frierenVideoButton = document.querySelector('.frieren-video-button');
    const lordOfMysteriesButton = document.querySelector('.lord-of-mysteries-button');
    
    const actionAreaContainer = document.querySelector('.action-area-container'); 
    const actionButton = document.querySelector('.action-button'); 
    const actionTextElement = document.querySelector('.action-text'); 

    // Lista de caminhos para os seus vídeos aleatórios
    const randomVideoList = [
        'assets/video/siteanime.mp4',
        'assets/video/siteanime2.mp4',
        'assets/video/siteanime3.mp4',
        // Adicione mais vídeos aleatórios aqui se tiver
    ];

    // Textos para cada modo
    const descriptions = {
        home: `Este site é uma expressão da minha paixão pelo universo dos animes — histórias que me inspiram, emocionam e me fazem refletir. Criado como parte dos meus estudos em HTML, CSS e JavaScript, ele representa não só meu gosto pessoal, mas também minha evolução como estudante de Análise e Desenvolvimento de Sistemas.
        Com o apoio da inteligência artificial, consegui transformar ideias em código, explorando conceitos de design, interatividade e estrutura web. Cada detalhe foi pensado para unir aprendizado técnico com criatividade e identidade própria.`,
        frieren: `Frieren: Além do Fim.
        Após uma década enfrentando perigos ao lado do lendário herói Himmel e seu grupo, a poderosa maga elfa Frieren cumpre sua missão: derrotar o Rei Demônio e restaurar a paz no reino. Mas, para ela, que vive por milênios, essa vitória é apenas um breve capítulo.
        Frieren parte em uma jornada solitária, prometendo reencontrar seus amigos. Cinquenta anos se passam — um piscar de olhos para uma elfa, mas uma eternidade para humanos. Quando finalmente retorna, ela encontra seus companheiros envelhecidos, à beira do fim. A morte de Himmel a confronta com um arrependimento profundo: ter negligenciado o valor do tempo compartilhado.
        Movida por esse sentimento, Frieren embarca em uma nova jornada, não para salvar o mundo, mas para entender melhor as pessoas e os laços que as unem. Ao longo do caminho, ela viverá aventuras emocionantes, conhecerá novos aliados e descobrirá que, mesmo com séculos pela frente, o presente é o que realmente importa.`,
        lordOfMysteries: `Lord of the Mysteries: O Despertar do Louco.
        Zhou Mingrui acorda em um corpo que não é seu. Agora como Klein Moretti, ele se vê lançado em uma realidade alternativa inspirada no período vitoriano — um mundo onde máquinas a vapor convivem com poções mágicas, sociedades secretas e forças ocultas que desafiam a lógica.
        Preso entre avanços tecnológicos e mistérios sobrenaturais, Klein mergulha em uma espiral de segredos cada vez mais sombrios. Seu caminho o leva a confrontos com igrejas — ortodoxas ou heréticas — e a descobrir que o mundo é muito mais complexo do que aparenta.
        Guiado pelas poções Beyonder, Klein começa a despertar habilidades extraordinárias ligadas ao arquétipo do tarô que carrega: O Louco. À medida que explora os limites dessa carta, ele revela poderes infinitos e dá início à construção de uma lenda — a lenda de “O Louco”.`
    };

    let currentVideoIndex = -1;
    let isRandomPlaybackEnabled = true;
    let timeoutToRandom = null;
    let currentMode = 'home'; // Inicia no modo home

    // Função para atualizar o texto de ação
    function updateActionText(mode) {
        currentMode = mode;
        // Reinicia a opacidade para 0 antes de atualizar o texto, se o painel estiver aberto
        if (actionAreaContainer.classList.contains('active')) {
            actionTextElement.style.opacity = '0';
            setTimeout(() => {
                actionTextElement.textContent = descriptions[mode];
                actionTextElement.style.opacity = '1';
            }, 200); // Pequeno atraso para a transição de opacidade
        } else {
            actionTextElement.textContent = descriptions[mode];
        }
    }

    // Função para ativar o modo de reprodução aleatória
    function enableRandomPlayback() {
        isRandomPlaybackEnabled = true;
        if (timeoutToRandom) {
            clearTimeout(timeoutToRandom);
            timeoutToRandom = null;
        }
        playRandomVideo();
        updateActionText('home'); // Atualiza o texto para o modo Home
        actionAreaContainer.classList.remove('active'); // Garante que o painel esteja fechado
    }

    // Função para tocar um vídeo específico
    function playSpecificVideo(videoSrc, mode) {
        isRandomPlaybackEnabled = false;
        if (timeoutToRandom) {
            clearTimeout(timeoutToRandom);
            timeoutToRandom = null;
        }
        videoElement.src = videoSrc;
        videoElement.load();
        videoElement.play().catch(error => {
            console.log('Erro ao tentar tocar o vídeo:', error);
        });
        updateActionText(mode); // Atualiza o texto para o modo específico
        actionAreaContainer.classList.remove('active'); // Garante que o painel esteja fechado
    }

    // Função para tocar um vídeo aleatório
    function playRandomVideo() {
        if (!isRandomPlaybackEnabled) {
            return;
        }
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * randomVideoList.length);
        } while (randomIndex === currentVideoIndex && randomVideoList.length > 1);

        currentVideoIndex = randomIndex;
        videoElement.src = randomVideoList[currentVideoIndex];
        videoElement.load();
        videoElement.play().catch(error => {
            console.log('Erro ao tentar tocar o vídeo automaticamente:', error);
        });
        updateActionText('home'); // Garante que o texto volte para Home no modo aleatório
        actionAreaContainer.classList.remove('active'); // Garante que o painel esteja fechado
    }

    // Toca o primeiro vídeo aleatório e define o texto inicial quando a página carrega
    playRandomVideo();
    updateActionText('home'); // Define o texto inicial como Home

    // Quando um vídeo termina
    videoElement.addEventListener('ended', () => {
        if (isRandomPlaybackEnabled) {
            playRandomVideo();
        } else {
            console.log('Vídeo específico terminou. Voltando ao modo aleatório em 5 segundos...');
            timeoutToRandom = setTimeout(() => {
                enableRandomPlayback();
            }, 5000); // 5 segundos
        }
    });

    // Evento para o botão da Frieren
    frierenVideoButton.addEventListener('click', () => {
        const videoSrc = frierenVideoButton.dataset.videoSrc;
        playSpecificVideo(videoSrc, 'frieren'); 
    });

    // Evento para o botão Lord of Mysteries
    lordOfMysteriesButton.addEventListener('click', () => {
        const videoSrc = lordOfMysteriesButton.dataset.videoSrc;
        playSpecificVideo(videoSrc, 'lordOfMysteries');
    });

    // Evento para o botão Home
    homeVideoButton.addEventListener('click', () => {
        console.log('Botão Home clicado. Ativando reprodução aleatória.');
        enableRandomPlayback(); 
    });

    // Evento para o botão de ação
    actionButton.addEventListener('click', () => {
        actionAreaContainer.classList.toggle('active'); // Alterna a classe 'active'
    });
});