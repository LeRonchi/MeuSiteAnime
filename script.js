document.addEventListener('DOMContentLoaded', () => {
    const videoElement = document.getElementById('myVideo');
    // Selecionar os botões na nova ordem do HTML
    const homeVideoButton = document.querySelector('.home-video-button');
    const frierenVideoButton = document.querySelector('.frieren-video-button');

    // Lista de caminhos para os seus vídeos aleatórios
    const randomVideoList = [
        'assets/video/siteanime.mp4',
        'assets/video/siteanime2.mp4',
        'assets/video/siteanime3.mp4',
        // Adicione mais vídeos aleatórios aqui se tiver
    ];

    let currentVideoIndex = -1; // Para garantir que o primeiro vídeo seja aleatório
    let isRandomPlaybackEnabled = true; // Flag para controlar se a reprodução aleatória está ativa
    let timeoutToRandom = null; // Para armazenar o ID do timeout

    // Função para ativar o modo de reprodução aleatória
    function enableRandomPlayback() {
        isRandomPlaybackEnabled = true;
        if (timeoutToRandom) {
            clearTimeout(timeoutToRandom); // Limpa qualquer timeout pendente
            timeoutToRandom = null;
        }
        playRandomVideo(); // Inicia a reprodução aleatória imediatamente
    }

    // Função para tocar um vídeo específico
    function playSpecificVideo(videoSrc) {
        isRandomPlaybackEnabled = false; // Desativa a reprodução aleatória
        if (timeoutToRandom) {
            clearTimeout(timeoutToRandom); // Limpa qualquer timeout pendente
            timeoutToRandom = null;
        }
        videoElement.src = videoSrc;
        videoElement.load();
        videoElement.play().catch(error => {
            console.log('Erro ao tentar tocar o vídeo:', error);
        });
    }

    // Função para tocar um vídeo aleatório
    function playRandomVideo() {
        if (!isRandomPlaybackEnabled) { // Garante que não tente tocar aleatório se desativado
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
    }

    // Toca o primeiro vídeo aleatório quando a página carrega
    playRandomVideo();

    // Quando um vídeo termina
    videoElement.addEventListener('ended', () => {
        if (isRandomPlaybackEnabled) {
            playRandomVideo(); // Continua a reprodução aleatória
        } else {
            // Se um vídeo específico acabou, esperamos 5 segundos e voltamos para o modo aleatório
            console.log('Vídeo específico terminou. Voltando ao modo aleatório em 5 segundos...');
            timeoutToRandom = setTimeout(() => {
                enableRandomPlayback();
            }, 5000); // 5 segundos
        }
    });

    // Evento para o botão da Frieren
    frierenVideoButton.addEventListener('click', () => {
        const videoSrc = frierenVideoButton.dataset.videoSrc;
        playSpecificVideo(videoSrc);
    });

    // Evento para o botão Home
    homeVideoButton.addEventListener('click', () => {
        console.log('Botão Home clicado. Ativando reprodução aleatória.');
        enableRandomPlayback(); // Ativa o modo aleatório imediatamente
    });
});