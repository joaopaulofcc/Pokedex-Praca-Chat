/**
 * ===================================================================================
 * SCRIPT JAVASCRIPT - O DIRETOR DE PALCO DO POKÉDEXBOT
 * -----------------------------------------------------------------------------------
 * Olá! Este arquivo é o "cérebro" que controla a experiência do usuário na página do chat.
 * Ele funciona como um "diretor de palco", decidindo qual cenário mostrar e quando.
 *
 * A jornada que ele controla é a seguinte:
 * 1.  Mostra a tela de boas-vindas.
 * 2.  Quando o usuário clica em "Iniciar Aventura", ele esconde a tela de boas-vindas
 * e carrega a janela de chat do n8n.
 * 3.  Enquanto o chat acontece, ele fica "vigiando" a conversa em silêncio.
 * 4.  Quando ele detecta que a imagem de um card de Pokémon apareceu (o final da
 * interação), ele entra em ação:
 * - Mostra o botão vermelho "Encerrar" no canto da tela.
 * - Trava a caixa de texto para que o usuário não possa mais enviar mensagens.
 * 5.  Quando o usuário clica no botão "Encerrar", ele esconde a tela do chat e
 * mostra a tela final de agradecimento.
 * ===================================================================================
 */


// A primeira coisa que fazemos é importar a "ferramenta" principal do chat do n8n,
// que vem de um endereço na internet (CDN).
import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';

// Todo o nosso código fica dentro deste grande bloco. Isso garante que ele só vai
// rodar DEPOIS que toda a página HTML estiver completamente carregada, evitando erros.
document.addEventListener('DOMContentLoaded', () => {

    // --- SEÇÃO 1: "MAPEANDO" NOSSOS ELEMENTOS HTML ---

    // Aqui, criamos "apelidos" (variáveis) para cada parte interativa da nossa página
    // (os botões e as telas/divs). Isso facilita encontrá-los e manipulá-los depois no código.
    const startButton = document.getElementById('start-chat-button');       // O botão "Iniciar Aventura"
    const welcomeContainer = document.getElementById('welcome-container');   // A tela de boas-vindas
    const chatWrapper = document.getElementById('chat-wrapper');             // O "invólucro" que contém o chat e o botão de encerrar
    const chatContainer = document.getElementById('n8n-chat-container');     // A área onde o chat do n8n será renderizado
    const endSessionButton = document.getElementById('end-session-button');  // O botão vermelho "Encerrar"
    const thankYouContainer = document.getElementById('thank-you-container'); // A tela final de agradecimento


    // --- SEÇÃO 2: FUNÇÕES AUXILIARES ---

    /**
     * Função de utilidade para "travar" a área de digitação do chat no final da conversa.
     * Ela é chamada quando a imagem do Pokémon é detectada.
     */
    function disableChatInput() {
        // Procura pela caixa de texto (textarea) dentro da janela do chat.
        const chatTextarea = document.querySelector('#n8n-chat-container textarea');
        // Se encontrar a caixa de texto...
        if (chatTextarea) {
            // ...desabilita a digitação.
            chatTextarea.disabled = true;
            // ...e muda o texto de exemplo para avisar o usuário.
            chatTextarea.placeholder = '✅ Fim da jornada! Clique em Encerrar para concluir. ✅';
        }
        // Procura pelo botão de "Enviar" mensagem.
        const sendButton = document.querySelector('#n8n-chat-container .n8n-chat-footer button');
        // Se encontrar o botão de envio...
        if (sendButton) {
            // ...também o desabilita.
            sendButton.disabled = true;
            // ...muda o cursor do mouse para um ícone de "não permitido".
            sendButton.style.cursor = 'not-allowed';
            // ...e o deixa um pouco transparente para parecer desativado.
            sendButton.style.opacity = '0.5';
        }
    }

    /**
     * Esta função é como um "detetive" que fica vigiando o chat sem parar.
     * Sua única missão é encontrar uma pista específica: o aparecimento de uma imagem
     * de um card de Pokémon, que sinaliza o fim da conversa.
     */
    function observeForPokemonImage() {
        // Usamos uma ferramenta do navegador chamada 'MutationObserver' para vigiar mudanças no HTML.
        const observer = new MutationObserver((mutationsList, obs) => {
            // A cada pequena mudança no chat...
            // ...procuramos por TODAS as imagens que estão na tela.
            const allImages = document.querySelectorAll('#n8n-chat-container img');

            // Verificamos cada uma das imagens encontradas.
            for (const image of allImages) {
                // ESTA É A CONDIÇÃO DA NOSSA PISTA:
                // Se o endereço (src) da imagem contiver o texto do nosso servidor de imagens...
                if (image.src && image.src.includes('limitlesstcg.nyc3.cdn.digitaloceanspaces.com')) {
                    
                    // ...o detetive encontrou o que procurava!
                    console.log("Imagem do Pokémon detectada pela URL correta! Finalizando interação...");
                    
                    // E agora ele executa as ações finais:
                    // 1. Mostra o botão "Encerrar".
                    endSessionButton.classList.add('visible');

                    // 2. Chama a função para desabilitar a área de digitação.
                    disableChatInput();
                    
                    // 3. O detetive se "aposenta", parando de observar para não repetir as ações.
                    obs.disconnect(); 
                    
                    // 4. Encerramos a busca.
                    return; 
                }
            }
        });

        // O comando que diz ao nosso "detetive" para começar a vigiar a área do chat.
        observer.observe(chatContainer, { childList: true, subtree: true });
    }


    // --- SEÇÃO 3: O CORAÇÃO DA APLICAÇÃO ---

    /**
     * Esta é a função que efetivamente carrega e configura o chat do n8n.
     */
    async function initializeChat() {
        // Primeiro, torna a área do chat visível.
        chatWrapper.classList.remove('hidden');

        try {
            // A URL do nosso workflow no n8n que vai conversar com o usuário.
            const n8nWebhookUrl = 'https://unichatwebhooks-homolog.unilavras.edu.br/webhook/9be89b31-2f31-45fd-a195-f10ba750f66d/chat';

            // Chamamos a ferramenta 'createChat' que importamos lá no início.
            createChat({
                webhookUrl: n8nWebhookUrl,           // Diz ao chat para qual endereço enviar as mensagens.
                target: '#n8n-chat-container',       // Diz em qual 'div' da nossa página o chat deve ser desenhado.
                mode: 'fullscreen',                  // O chat ocupará todo o espaço do 'target'.
                initialMessages: [],                 // Garante que o chat não comece com mensagens padrão.
                i18n: {                              // Permite traduzir e personalizar os textos da interface do chat.
                    en: {
                        title: 'PokédexBot Unilavras',
                        subtitle: "✨Fale com a IA e capture um Pokémon!✨",
                        inputPlaceholder: '💬 Bora conversar! 💬',
                    },
                },
            });
            
            // Depois de criar o chat, ativamos nosso "detetive" para ficar de olho na conversa.
            observeForPokemonImage();

        } catch (error) {
            // Se algo der muito errado ao carregar o chat, mostramos uma mensagem de erro na tela.
            console.error("Erro ao carregar o chat do n8n:", error);
            chatContainer.innerHTML = '<p style="color: red; text-align: center;">Não foi possível carregar o chat. Tente atualizar a página.</p>';
        }
    }


    // --- SEÇÃO 4: TORNANDO OS BOTÕES CLICÁVEIS (EVENT LISTENERS) ---

    // Nesta parte final, nós dizemos o que deve acontecer quando o usuário clica nos botões.

    // Adicionamos um "ouvinte" de cliques ao botão "Iniciar Aventura".
    startButton.addEventListener('click', () => {
        console.log("Botão de iniciar clicado! Escondendo boas-vindas...");
        // Quando clicado, a tela de boas-vindas é escondida...
        welcomeContainer.classList.add('hidden');
        // ...e a função para inicializar o chat é chamada.
        initializeChat();
    });

    // Adicionamos um "ouvinte" de cliques ao botão "Encerrar Sessão".
    endSessionButton.addEventListener('click', () => {
        console.log("Botão de encerrar clicado! Mostrando tela de agradecimento.");
        // Quando clicado, a área do chat é escondida...
        chatWrapper.classList.add('hidden');
        // ...e a tela de agradecimento final é mostrada.
        thankYouContainer.classList.remove('hidden');
    });
});