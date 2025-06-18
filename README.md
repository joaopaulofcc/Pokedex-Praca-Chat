# Pokédex Praca Chat 🤖💬

<p align="center">
  <img src="https://i.ibb.co/Q7rky0Kd/gifChat.gif" alt="Demonstração do PokédexBot em Ação" width="350">
</p>

## 📖 Sobre o Projeto

O **Pokédex Praca Chat** é a interface de conversação interativa criada para o evento "Unilavras na Praça", em comemoração aos 60 anos da instituição. Este projeto não é apenas um chatbot, mas uma demonstração prática e divertida do que é ensinado no curso de **Análise e Desenvolvimento de Sistemas (ADS)** do Unilavras, servindo como o ponto de entrada para a experiência do usuário.

Através desta aplicação web, os participantes conversam com uma Inteligência Artificial (o PokédexBot), participam de um quiz sobre o universo Pokémon e escolhem um Pokémon para "capturar", enviando os dados em tempo real para um telão principal no evento.

---

## 🚀 Principais Funcionalidades

* **Chat Interativo com IA:** Converse com o PokédexBot, alimentado pela IA do Google Gemini, para uma experiência de diálogo natural.
* **Quiz Pokémon:** Teste seus conhecimentos com um quiz de perguntas e respostas aleatórias.
* **Pokédex Comunitária:** Cada Pokémon capturado por um participante é adicionado a uma contagem geral, incentivando a colaboração.
* **Geração de Cards em Tempo Real:** As informações e imagens dos Pokémon são buscadas e exibidas em formato de cards colecionáveis.
* **Design Responsivo:** A interface do chat foi projetada para funcionar perfeitamente tanto em desktops quanto em dispositivos móveis.
* **Detecção de Fim de Conversa:** O JavaScript "assiste" à conversa e, ao detectar a imagem final do Pokémon, habilita o botão de encerramento e desativa a área de digitação.

---

## 🛠️ Tecnologias Utilizadas

Este projeto é uma fusão de tecnologias web modernas, demonstrando na prática as habilidades desenvolvidas no curso de ADS:

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white)
![n8n.io](https://img.shields.io/badge/n8n.io-1A1A1A?style=for-the-badge&logo=n8n&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=google-gemini&logoColor=white)

---

## ▶️ Como Executar Localmente

A interface do chat é um projeto estático (frontend). Para executá-la localmente:

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/SEU_USUARIO/Pokedex-Praca-Chat.git](https://github.com/SEU_USUARIO/Pokedex-Praca-Chat.git)
    ```
2.  **Navegue até a pasta do projeto.**
    ```bash
    cd Pokedex-Praca-Chat
    ```
3.  **Abra o arquivo `index.html`** em qualquer navegador de internet.

> **Nota:** Para que o chat funcione, o workflow correspondente no **n8n.io** deve estar ativo e acessível. Para o modo local, talvez seja necessário alterar a URL no arquivo `script.js` para o endpoint de teste do n8n ou usar a versão de produção se ela estiver acessível publicamente.

---

## 🚀 Deploy e Configuração na Vercel

O projeto está pronto para ser hospedado na Vercel, que oferece uma plataforma ideal para sites estáticos com funções serverless.

1.  **Crie uma conta:** Se ainda não tiver, crie uma conta gratuita na [Vercel.com](https://vercel.com/).

2.  **Crie um "New Project":**
    * No seu dashboard, clique em **"Add New..."** e selecione **"Project"**.
    * Conecte sua conta do GitHub e selecione o repositório `Pokedex-Praca-Chat`.

3.  **Configure o Projeto:**
    * **Framework Preset:** Vercel deve detectar automaticamente que não há um framework específico. Selecione **"Other"**.
    * **Build and Output Settings:** Não são necessárias alterações. A Vercel servirá os arquivos da raiz por padrão.
    * O passo mais importante é configurar as variáveis de ambiente.

4.  **Adicione a Variável de Ambiente (Essencial):**
    * Antes de fazer o deploy, expanda a seção **"Environment Variables"**.
    * Adicione a seguinte variável, que é crucial para a segurança e funcionamento do chat:
        * **Key:** `N8N_WEBHOOK_URL`
        * **Value:** `COLE_AQUI_A_URL_REAL_DO_SEU_WEBHOOK_DO_N8N`

    > **Por que isso é importante?** O arquivo `api/chat.js` funciona como um proxy seguro. Ele esconde a URL do seu webhook do n8n do público, lendo-a a partir desta variável de ambiente no servidor da Vercel. Isso impede que usuários mal-intencionados encontrem e abusem do seu workflow.

5.  **Faça o Deploy:**
    * Clique em **"Deploy"**. A Vercel irá construir e hospedar seu site.
    * Após o processo, você receberá uma URL pública (ex: `pokedex-chat.vercel.app`). O chat estará online e funcional, comunicando-se de forma segura com o n8n.

---

## 📂 Estrutura do Projeto

* `index.html`: O "esqueleto" da página, contendo toda a estrutura dos elementos visuais.
* `style.css`: O "diretor de arte", responsável por todo o design, cores, fontes e animações.
* `script.js`: O "cérebro" da aplicação, que controla a jornada do usuário e a inicialização do chat.
* `/api/chat.js`: Uma função serverless que atua como um proxy seguro entre o frontend e o webhook do n8n, protegendo a URL real.

---

## ⚖️ Aviso Legal e Créditos

> Este é um projeto de fãs, sem fins lucrativos, criado para fins educacionais e de entretenimento como parte de um evento acadêmico. Pokémon e todos os nomes, imagens e sons associados são marcas registradas e direitos autorais de ©1995-2025 Nintendo, Game Freak e The Pokémon Company.

Este projeto só foi possível graças aos incríveis recursos disponibilizados pela comunidade de fãs e desenvolvedores. Agradecemos e damos o devido crédito às seguintes fontes:

* **Imagens dos Cards de Pokémon:** As imagens dos cards de Pokémon, que sinalizam o fim da captura, são fornecidas pela API do [**Limitless TCG**](https://limitlesstcg.com/).
* **Chat Engine:** A funcionalidade de chat é construída com a biblioteca [**n8n-chat**](https://www.npmjs.com/package/@n8n/chat), que facilita a criação de interfaces de conversação.
* **Inteligência Artificial:** O diálogo do PokédexBot é alimentado pelo [**Google Gemini**](https://gemini.google.com/).
* **Ícones:** Os ícones utilizados na interface são do [**Font Awesome**](https://fontawesome.com/).
* **Fontes:** A fonte principal do projeto é a 'Nunito', disponibilizada pelo [**Google Fonts**](https://fonts.google.com/).

---

## 🎓 Um Projeto do Curso de ADS

Este projeto, o **Pokedex-Praca-Chat**, é a porta de entrada e o coração da interação da experiência criada para o evento **Unilavras na Praça 2025**. Ele opera em total sinergia com o [**Pokedex-Praca-Telao**](https://github.com/joaopaulofcc/Pokedex-Praca-Telao), formando uma aplicação *full-stack* dinâmica e envolvente.

Enquanto o telão oferece o grande espetáculo visual, este chatbot é o cérebro da comunicação, permitindo que qualquer participante, usando seu próprio celular, possa **"capturar" Pokémon em tempo real** e ver seu nome brilhar no evento.

> **Venha fazer ADS e transforme suas ideias em realidade!**
