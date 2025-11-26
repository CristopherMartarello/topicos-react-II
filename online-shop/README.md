# Loja Online

Uma aplicação de e-commerce moderna construída com React, TypeScript e Vite. Este projeto demonstra uma plataforma completa de compras online com navegação de produtos, gerenciamento de clientes, funcionalidade de carrinho de compras e autenticação de usuários.

## Stack de Tecnologias

### Framework Frontend
- React 19.1.1 - Biblioteca de UI moderna com recursos de renderização concorrente
- React Router DOM 7.9.4 - Roteamento e navegação do lado do cliente
- TypeScript 5.9.3 - Desenvolvimento JavaScript com segurança de tipos

### Ferramentas de Build e Desenvolvimento
- Vite 7.1.7 - Ferramenta de build rápida e servidor de desenvolvimento com Hot Module Replacement (HMR)
- ESLint 9.36.0 - Linting de código e aplicação de estilo
- TypeScript ESLint - Regras de linting com consciência de tipos

### Estilização
- Tailwind CSS 4.1.15 - Framework CSS baseado em utilitários
- Plugin Tailwind CSS Vite - Integração do Vite com Tailwind

### Gerenciamento de Estado e API
- Redux Toolkit 2.9.2 - Container de estado previsível para JavaScript
- React-Redux 9.2.0 - Ligações oficiais do React para Redux
- Axios 1.12.2 - Cliente HTTP para requisições de API

### Componentes de UI
- Ant Design 5.27.6 - Biblioteca de componentes de UI nível empresarial
- Ant Design Icons 6.1.0 - Biblioteca de ícones

## Funcionalidades Principais

### Autenticação e Autorização
- Funcionalidade de login de usuário com autenticação baseada em JWT
- Proteção de rotas privadas para páginas autenticadas
- Perfil de usuário e capacidades de logout
- Estado de autenticação persistente entre sessões

### Gerenciamento de Produtos
- Navegação do catálogo de produtos com paginação
- Exibição dos 5 produtos em destaque na página inicial
- Detalhes e especificações do produto
- Funcionalidade de criar novo produto
- Deletar produtos com modal de confirmação
- Capacidades de busca e filtro
- Gerenciamento de inventário de produtos

### Carrinho de Compras
- Adicionar produtos ao carrinho
- Remover produtos do carrinho
- Visualizar resumo do carrinho
- Gerenciamento de estado do carrinho persistente
- Interface de drawer de carrinho para acesso rápido

### Gerenciamento de Clientes
- Criar e gerenciar perfis de clientes
- Deletar clientes com confirmação
- Exibição de informações do cliente
- Interface de drawer para operações de cliente

### Suporte a Temas
- Alternância de tema claro e escuro
- Persistência de tema entre sessões
- Gerenciamento de temas baseado em contexto

### Busca e Filtros
- Funcionalidade de busca de produtos em tempo real
- Filtrar produtos por vários critérios

## Scripts

Antes de executar qualquer um dos comandos a seguir, você deve instalar as dependências:

```bash
npm install
```

Então você pode usar estes scripts:

```bash
# Inicia o servidor de desenvolvimento com hot reload
npm run dev

# Build para produção
npm run build

# Execute ESLint para verificar a qualidade do código
npm run lint

# Visualize o build de produção localmente
npm run preview
```

## Começando

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

3. Abra seu navegador e navegue até a URL do desenvolvimento local fornecida pelo Vite (normalmente http://localhost:5173)

4. Faça login com suas credenciais para acessar a aplicação

## Arquivos de Configuração

- `tsconfig.json` - Configuração base do TypeScript
- `tsconfig.app.json` - Configuração do TypeScript para código da aplicação
- `tsconfig.node.json` - Configuração do TypeScript para ferramentas de build do node
- `vite.config.ts` - Configuração de build do Vite
- `eslint.config.js` - Regras e configuração do ESLint

## Arquitetura de Gerenciamento de Estado

A aplicação usa Redux Toolkit com os seguintes slices:

- `authSlice` - Gerencia estado de autenticação e informações do usuário
- `productSlice` - Manipula lista de produtos e operações de produtos
- `clientSlice` - Gerencia dados de clientes e operações
- `cartSlice` - Manipula itens do carrinho de compras e operações

## Integração com API

A aplicação se comunica com uma API de backend usando Axios. Os serviços são organizados por domínio:

- `userService` - Operações de autenticação de usuário e perfil
- `productService` - Operações do catálogo de produtos
- `clientService` - Operações de gerenciamento de clientes
- `storageService` - Gerenciamento de armazenamento local

## Práticas de Desenvolvimento

- Desenvolvimento seguro de tipos com TypeScript
- Arquitetura baseada em componentes para reutilização
- Redux para gerenciamento centralizado de estado
- Componentes Ant Design para UI consistente
- Tailwind CSS para estilização responsiva
- ESLint para garantia de qualidade de código
