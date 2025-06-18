/**
 * ===================================================================================
 * API PROXY SEGURA - O GUARDIÃO DA URL DO WEBHOOK
 * -----------------------------------------------------------------------------------
 * Este arquivo define uma Função Serverless que roda na infraestrutura da Vercel.
 *
 * O que este código faz?
 * - Ele cria um endpoint de API em "/api/chat" no seu próprio domínio.
 * - Atua como um intermediário (proxy) seguro entre o seu chat (frontend) e o
 * workflow do n8n (backend).
 * - Lê a URL real do webhook de uma variável de ambiente secreta, que está
 * configurada apenas no servidor do Vercel.
 * - Recebe a mensagem do usuário enviada pelo chat e a repassa para o n8n.
 * - Recebe a resposta do n8n e a devolve para o chat, completando a comunicação.
 *
 * O resultado final é que a URL real do webhook NUNCA fica exposta no
 * navegador do usuário, garantindo a segurança do endpoint.
 * ===================================================================================
 */

// A Vercel exige que a função seja exportada como 'default' para ser reconhecida.
// 'async' indica que a função pode usar operações que demoram, como chamadas de rede ('await').
// 'handler' é o nome padrão da função que a Vercel executa.
// 'req' (Request): Contém todas as informações da requisição que o frontend fez (método, corpo, cabeçalhos).
// 'res' (Response): É um objeto que usamos para construir e enviar a resposta de volta ao frontend.
export default async function handler(req, res) {

  // Esta é a linha mais importante para a segurança.
  // 'process.env.N8N_WEBHOOK_URL' lê o valor da variável de ambiente que você
  // configurou no painel do Vercel. Ela só existe aqui, no lado do servidor.
  const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;

  // Uma verificação de segurança básica. O chat do n8n envia mensagens usando o método POST.
  // Se alguém tentar acessar a URL via GET (ex: digitando no navegador), a função será bloqueada.
  if (req.method !== 'POST') {
    // Retorna um status HTTP 405 - Method Not Allowed (Método Não Permitido).
    res.status(405).json({ error: 'Method Not Allowed' });
    // Interrompe a execução da função aqui.
    return;
  }

  // O bloco 'try...catch' é uma boa prática para lidar com erros que podem acontecer
  // durante operações de rede, como o servidor do n8n estar offline.
  try {
    // Aqui, a "mágica" acontece. Usamos a função 'fetch' para fazer uma chamada de rede
    // DESTE SERVIDOR (Vercel) para o servidor do n8n, usando a URL secreta.
    const n8nResponse = await fetch(n8nWebhookUrl, {
      // Especifica que esta requisição também é do tipo POST.
      method: 'POST',
      // Define o cabeçalho para informar ao n8n que estamos enviando dados em formato JSON.
      headers: {
        'Content-Type': 'application/json',
      },
      // 'req.body' contém os dados (a mensagem do chat) que o frontend enviou.
      // 'JSON.stringify' converte o objeto JavaScript em uma string no formato JSON para a transmissão.
      body: JSON.stringify(req.body),
    });

    // Espera pela resposta do servidor n8n e a converte de volta para um objeto JavaScript.
    const responseData = await n8nResponse.json();

    // Envia a resposta obtida do n8n de volta para o frontend (o seu chat).
    // 'n8nResponse.status' repassa o mesmo status HTTP (ex: 200 OK) que o n8n retornou.
    res.status(n8nResponse.status).json(responseData);

  } catch (error) {
    // Se qualquer coisa no bloco 'try' der errado, o código entra aqui.
    // 'console.error' imprime o erro detalhado nos logs do servidor Vercel (não no navegador do usuário),
    // o que é muito útil para depuração.
    console.error('Erro ao fazer proxy para o n8n:', error);

    // Envia uma resposta de erro genérica e segura para o frontend.
    // O status 500 indica um "Internal Server Error" (Erro Interno do Servidor).
    res.status(500).json({ error: 'Internal Server Error' });
  }
}