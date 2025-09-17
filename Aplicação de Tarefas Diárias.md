# Aplicação de Tarefas Diárias

Uma aplicação web simples e eficiente para gerenciar tarefas diárias com cronômetro de 24 horas e reset automático.

## Funcionalidades

✅ **5 Tarefas Pré-definidas:**
- Estudar para concurso
- Estudar
- Projeto
- Algo saudável
- Ler

✅ **Cronômetro de 24h:** Mostra o tempo restante até o reset automático às 00:00

✅ **Checkboxes Inteligentes:** Uma vez marcadas, não podem ser desmarcadas

✅ **Reset Automático:** Todas as tarefas são resetadas automaticamente às 00:00 de cada dia

✅ **Persistência Local:** Os dados são salvos no localStorage do navegador

✅ **Design Responsivo:** Funciona perfeitamente em desktop e mobile

✅ **Progresso Visual:** Mostra quantas tarefas foram completadas (X/5)

## Como Usar

1. Acesse a aplicação no seu navegador
2. Marque as tarefas conforme as completa durante o dia
3. Acompanhe o cronômetro para saber quanto tempo resta até o reset
4. No dia seguinte (às 00:00), todas as tarefas serão automaticamente desmarcadas

## Tecnologias Utilizadas

- **React** - Framework JavaScript para interface
- **Tailwind CSS** - Framework CSS para estilização
- **Vite** - Bundler e servidor de desenvolvimento
- **localStorage** - Persistência de dados no navegador

## Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Fazer build para produção
npm run build
```

## Deploy

A aplicação está configurada para deploy automático no Netlify. O build de produção é gerado na pasta `dist/`.

---

**Desenvolvido com ❤️ para ajudar na organização de tarefas diárias**

