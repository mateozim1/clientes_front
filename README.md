# Clientes Frontend

Este é o frontend de um sistema de gerenciamento de clientes, desenvolvido em **Vue 3**, **Vuetify** e **Vite**, que consome uma **API Laravel**.

## 🔧 Requisitos

Antes de iniciar, certifique-se de que você tem instalado:

- [Node.js](https://nodejs.org/) (versão 18.x ou superior recomendada)
- [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
- A API Laravel em execução (por padrão em `http://localhost:8000`)

## 🚀 Instalação

1. Clone este repositório:

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

2. Instale as dependências do projeto:

```bash
npm install
# ou
yarn install
```

3. Execute o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

O projeto estará disponível em `http://localhost:5173`.

## ⚙️ Configuração da API

Este projeto espera que a API Laravel esteja rodando em:

```
http://localhost:8000
```

Caso a API esteja em outro endereço, você pode alterar a URL base no serviço HTTP do frontend (exemplo: `src/services/api.js`, `axios.js`, etc).

## 📁 Estrutura de Pastas (resumo)

```
src/
├── components/         # Componentes reutilizáveis
├── views/              # Telas principais
├── router/             # Rotas do aplicativo
├── store/              # Estado global (Pinia ou Vuex)
├── services/           # Integração com API (Axios)
├── assets/             # Arquivos estáticos (imagens, CSS)
├── App.vue             # Componente raiz
├── main.js             # Arquivo de entrada
```

## 🧩 Tecnologias Utilizadas

- [Vue 3](https://vuejs.org/)
- [Vuetify 3](https://next.vuetifyjs.com/)
- [Vite](https://vitejs.dev/)
- [Axios](https://axios-http.com/)
- [Vue Router](https://router.vuejs.org/)

## 📦 Scripts úteis

| Comando           | Descrição                         |
|-------------------|-----------------------------------|
| `npm run dev`     | Inicia o servidor de desenvolvimento |
| `npm run build`   | Gera a versão de produção         |
| `npm run preview` | Visualiza o build de produção     |
