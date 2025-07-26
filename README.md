# CM Restauração de Móveis - Website

Um site profissional e responsivo para a empresa CM Restauração de Móveis, especializada em serviços de restauração, montagem e colocação de móveis.

## 🛠️ Serviços Oferecidos

- **Desmontagem/Montagem** de móveis
- **Restauração com verniz** e acabamentos especiais
- **Troca de peças**: dobradiças, corrediças, puxadores e outros componentes
- **Pinturas**: portas, janelas e pergolados de madeira
- **Colocação**: varal, cortinas, persianas, quadros, prateleiras
- **Prateleiras sob medida**: fabricação e instalação personalizada

## 📱 Contato

- **Proprietário**: Cláudio
- **WhatsApp**: (43) 9.9980-9090
- **Região de Atendimento**: Andirá e cidades vizinhas

## 🚀 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Design responsivo com Flexbox e Grid
- **JavaScript ES6+**: Interatividade e funcionalidades modernas
- **Font Awesome**: Ícones profissionais
- **WhatsApp API**: Integração direta para contato

## 📁 Estrutura do Projeto

```
CMoveis/
├── index.html          # Página principal
├── styles.css          # Estilos responsivos
├── script.js           # Funcionalidades JavaScript
├── README.md           # Documentação
└── .github/
    └── copilot-instructions.md
```

## 🎨 Design

- **Cores principais**:
  - Azul escuro (#2c3e50)
  - Laranja (#f39c12)
  - Cinza claro (#f8f9fa)
- **Tipografia**: Inter (principal), Montserrat (títulos), Material Icons (ícones Google)
- **Favicons**: Compatíveis com todos os navegadores (em `img/favicon`)
- **Layout**: Mobile-first, totalmente responsivo
- **Animações**: Suaves e profissionais

## ✨ Funcionalidades

### 🎥 Trailer de Apresentação

- Vídeo do YouTube integrado na homepage
- Reprodução automática (muted) para demonstrar os serviços
- Layout responsivo para todos os dispositivos

### 🏆 Seção de Destaques

- Produtos em destaque com a **Casinha de Boneca** como principal
- Cards interativos com preços e descrições
- Botões de ação para personalização e contato

### � Marketplace Interativo

- **Personalizador de Casinha de Boneca** completo
- Galeria de imagens com thumbnails
- Opções de personalização:
  - **Tamanhos**: Pequena, Média, Grande
  - **Cores**: Rosa, Azul, Amarela, Branca, Madeira
  - **Janelas**: Simples, Florida, Veneziana
  - **Portas**: Simples, Dupla, Com Vitrô
  - **Extras**: Varanda, Jardim, Cercadinho, Kit LED

### 📱 Responsividade

- Design adaptável para desktop, tablet e mobile
- Menu hamburger para dispositivos móveis
- Layout em grid responsivo

### 🎯 Interatividade

- Navegação suave entre seções
- Formulário de contato integrado ao WhatsApp
- Animações ao fazer scroll
- Efeitos hover nos elementos

### 📞 Integração WhatsApp

- **Pedidos formatados**: Sistema automático que formata o pedido completo
- **Cálculo automático**: Preço total baseado nas personalizações
- **Envio direto**: Mensagem formatada enviada para o WhatsApp do Cláudio
- Clique nos cartões de contato abre o WhatsApp
- Formulário geral também integrado

### 💰 Sistema de Preços

- Cálculo automático baseado no tamanho escolhido
- Valores extras para personalizações
- Exibição em tempo real do total

## 🚀 Como Executar

### Método 1: Servidor Local Simples

1. Abra o terminal na pasta do projeto
2. Execute um servidor local:

   ```bash
   # Python 3
   python -m http.server 8000

   # Python 2
   python -m SimpleHTTPServer 8000

   # Node.js (se tiver instalado)
   npx http-server
   ```

3. Acesse `http://localhost:8000` no navegador

### Método 2: Live Server (VS Code)

1. Instale a extensão "Live Server" no VS Code
2. Clique com o botão direito no arquivo `index.html`
3. Selecione "Open with Live Server"

### Método 3: Abrir Diretamente

- Simplesmente abra o arquivo `index.html` em qualquer navegador moderno

## 🔧 Personalização

### Alterando Informações de Contato

Edite as seguintes seções no `index.html`:

- Seção de contato (`#contact`)
- Número do WhatsApp no `script.js` (linha 31)

### Modificando Cores

Altere as variáveis CSS no `styles.css`:

- `#2c3e50` (azul escuro)
- `#f39c12` (laranja)
- `#f8f9fa` (cinza claro)

### Adicionando Novos Serviços

1. Adicione um novo `.service-card` na seção `#services`
2. Use um ícone do Font Awesome apropriado
3. Mantenha a estrutura consistente

## 📊 Performance

- ✅ Imagens otimizadas (usando ícones SVG)
- ✅ CSS minificado em produção
- ✅ JavaScript otimizado
- ✅ Carregamento rápido
- ✅ SEO-friendly

## 🌟 Recursos Avançados

- **Smooth Scrolling**: Navegação suave entre seções
- **Intersection Observer**: Animações baseadas no scroll
- **Form Validation**: Validação nativa do HTML5
- **Acessibilidade**: Semântica adequada e navegação por teclado
- **Favicons personalizados**: Compatíveis com todos os navegadores
- **Ícones de envio**: Google Material Icons (local_shipping, store)
- **Sobre**: Agora menciona mais de 20 anos de experiência

## 📝 Próximas Melhorias

- [ ] Sistema de galeria de trabalhos realizados
- [ ] Seção de depoimentos de clientes
- [ ] Blog com dicas de manutenção
- [ ] Sistema de orçamento online
- [ ] Integração com Google Maps
- [ ] PWA (Progressive Web App)

## 🤝 Contribuição

Para contribuir com este projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature
3. Commit suas alterações
4. Abra um Pull Request

## 📄 Licença

Este projeto foi desenvolvido para uso comercial da CM Restauração de Móveis.

---

**Desenvolvido com ❤️ para CM Restauração de Móveis**
