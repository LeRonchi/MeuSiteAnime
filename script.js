document.addEventListener('DOMContentLoaded', () => {
    const videoElement = document.getElementById('myVideo');

    // Lista de caminhos para os seus vídeos
    // ATENÇÃO: Use barras normais (/) no JavaScript para caminhos de arquivo, mesmo no Windows.
    const videoList = [
        'assets/video/siteanime.mp4',
        'assets/video/siteanime2.mp4',
        'assets/video/siteanime3.mp4',
        // Adicione mais vídeos aqui se tiver
    ];

    let currentVideoIndex = -1; // Para garantir que o primeiro vídeo seja aleatório

    function playRandomVideo() {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * videoList.length);
        } while (randomIndex === currentVideoIndex && videoList.length > 1); // Evita repetir o mesmo vídeo se houver mais de um

        currentVideoIndex = randomIndex;
        videoElement.src = videoList[currentVideoIndex];
        videoElement.load(); // Carrega o novo vídeo
        videoElement.play().catch(error => {
            console.log('Erro ao tentar tocar o vídeo automaticamente:', error);
            // Isso pode acontecer se o navegador bloquear o autoplay sem interação do usuário.
            // O loop geralmente ainda funciona depois da primeira interação.
        });
    }

    // Toca o primeiro vídeo aleatório quando a página carrega
    playRandomVideo();

    // Quando um vídeo termina, toca o próximo vídeo aleatório
    videoElement.addEventListener('ended', playRandomVideo);
});