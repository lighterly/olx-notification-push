# 🔔 OLX Notification Push

<div align="center">

![Version](https://img.shields.io/badge/version-1.0-blue.svg)
![Node](https://img.shields.io/badge/Node.js-%3E%3D18-green.svg)
![Puppeteer](https://img.shields.io/badge/Puppeteer-Automation-orange.svg)
![Platform](https://img.shields.io/badge/platform-Windows-lightgrey.svg)

**Script rápido e quebra-galho para monitorar anúncios novos na OLX e pechinchar raridades**

[Visão Geral](#-visão-geral) •
[Funcionalidades](#-funcionalidades) •
[Instalação](#-instalação) •
[Como Usar](#-como-usar) •
[Configuração](#-configuração)

</div>

---

## 🚀 Visão Geral

O **OLX Notification Push** é um script simples e direto ao ponto, criado para quem gosta de **garimpar raridades, pechinchar preços baixos e ser o primeiro a ver anúncios novos na OLX**.

Ele utiliza **Puppeteer** para abrir uma página específica da OLX, monitora os anúncios em um intervalo de tempo configurável e envia **notificações no Windows** sempre que um novo anúncio aparece.

Ao receber a notificação, é possível **clicar e abrir o link do anúncio**, facilitando agir rápido antes que outra pessoa veja.

> ⚠️ Este projeto não tem fins maliciosos. Ele apenas automatiza a visualização de uma página pública da OLX.

---

## ✨ Funcionalidades

- 🔍 Monitora uma página específica da OLX
- ⏱️ Verificação automática em intervalo configurável
- 🆕 Detecta **apenas anúncios novos**
- 🔔 Notificação no Windows com:
  - Título
  - Nome do anúncio
  - Preço
  - Horário de postagem
  - Imagem do anúncio
- 🖱️ Botão **“Abrir anúncio”** na notificação
- 🔊 Som de notificação personalizado
- 🪟 Navegador Puppeteer com janela visível (800x600)

---

## 📋 Requisitos

Antes de começar, você precisa ter:

- **Node.js versão 18 ou superior**
- **Windows 10 ou superior**
- Conexão com a internet

---

## 📦 Instalação

1. **Instale o Node.js (>= 18)**  
Baixe em: https://nodejs.org/

2. **Abra o Prompt de Comando ou PowerShell** na pasta do projeto

3. **Instale as dependências**
	```bash
	npm install
	```

---

## 🚀 Como Usar

Após instalar as dependências:

```bash
npm start
```

O script irá:

* Abrir o navegador via Puppeteer
* Acessar a página configurada da OLX
* Monitorar novos anúncios automaticamente
* Enviar notificações quando algo novo aparecer

---

## ⚙️ Configuração

### 🔗 URL da OLX

Edite o arquivo principal do script e altere a URL para a página da OLX que você deseja monitorar.

Exemplo:

```js
const URL = 'https://www.olx.com.br/games/jogos-de-video-game?q=jogo&sf=1';
```

### ⚠️ AVISO IMPORTANTE

**NÃO ESQUEÇA** de adicionar o parâmetro:

```
&sf=1
```

No final da URL.

👉 Esse parâmetro **filtra apenas os anúncios mais recentes**.
Sem ele, o script pode detectar anúncios antigos como se fossem novos.

---

### ⏱️ Intervalo de Verificação

Você pode ajustar o tempo entre cada verificação no script:

```js
const CHECK_INTERVAL = 5 * 60 * 1000; // 5 minutos
```

---

### 🔊 Som da Notificação

O script utiliza um arquivo de som local:

```txt
notification.mp3
```

Você pode substituir esse arquivo por qualquer outro `.mp3`, mantendo o mesmo nome.

---

## 🧠 Como Funciona (Resumo Técnico)

* Puppeteer abre a página da OLX
* O script captura apenas o **container principal de anúncios**
* Compara anúncios já vistos com os novos
* Quando detecta um anúncio novo:

  * Extrai título, preço, horário, imagem e link
  * Envia uma notificação via `node-notifier`
  * Disponibiliza o botão **“Abrir anúncio”**

---

## ⚠️ Observações Importantes

* Este é um **script simples**, feito para uso pessoal
* A OLX pode mudar o HTML a qualquer momento
* Se isso acontecer, será necessário ajustar os seletores
* Use com bom senso para evitar bloqueios

---

## 👨‍💻 Autor

Criado por **Lighterly**

Projeto feito como **quebra-galho funcional**, focado em velocidade, praticidade e eficiência para garimpo de anúncios.

---

## 📝 Changelog

### v1.0

* ✨ Versão inicial
* 🔔 Notificações no Windows
* 🆕 Detecção de anúncios novos
* 🖱️ Ação “Abrir anúncio”
* 🔊 Som personalizado
* 🪟 Puppeteer com janela visível

## 📄 Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

<div align="center">

**OLX Notification Push** - Garimpando raridades antes de todo mundo 💰⚡

Made with ❤️ in Brazil

</div>