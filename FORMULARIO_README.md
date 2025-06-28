# Formulário de Cadastro Angular

## 📋 Descrição

Este projeto implementa uma página de cadastro completa em Angular com as seguintes funcionalidades:

- **Angular Reactive Forms** para gerenciamento de formulários
- **Tailwind CSS** para estilização moderna e responsiva  
- **Angular Animations** para animações fluidas
- **Validação dinâmica** com mensagens de erro personalizadas
- **Máscara de telefone** automática
- **Design responsivo** que funciona em desktop e mobile

## 🚀 Funcionalidades

### Campos do Formulário
- **Nome Completo** (obrigatório, mínimo 2 caracteres)
- **Email** (obrigatório, formato válido)
- **Telefone** (obrigatório, formato brasileiro com máscara)
- **Senha** (obrigatório, mínimo 6 caracteres)
- **Confirmar Senha** (obrigatório, deve coincidir com a senha)
- **Aceitar Termos** (obrigatório)

### Validações
- Validação em tempo real
- Mensagens de erro específicas para cada campo
- Verificação de confirmação de senha
- Validação de formato de email
- Validação de formato de telefone brasileiro

### Animações
- **Zoom In**: Formulário aparece com efeito de zoom
- **Shake**: Campos com erro balançam para chamar atenção
- **Fade In**: Mensagens aparecem suavemente
- **Checkmark**: Ícone de sucesso com animação
- **Loading**: Spinner durante o envio

### Visual
- Design moderno com gradientes
- Efeitos de hover e focus
- Cores condicionais para estados de erro
- Layout responsivo
- Sombras e bordas arredondadas

## 🛠️ Tecnologias Utilizadas

- **Angular 20** - Framework principal
- **Angular Reactive Forms** - Gerenciamento de formulários
- **Angular Animations** - Animações e transições
- **Tailwind CSS 4** - Framework de estilização
- **TypeScript** - Linguagem de programação

## 📱 Como Usar

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Instalar Angular Animations (se necessário):**
   ```bash
   npm install @angular/animations --legacy-peer-deps
   ```

3. **Executar o projeto:**
   ```bash
   npm start
   ```

4. **Acessar no navegador:**
   ```
   http://localhost:4200
   ```

## 🎨 Customizações

### Estilos
Os estilos estão organizados em:
- **Tailwind CSS**: Classes utilitárias no template
- **CSS customizado**: Estilos específicos no arquivo `.css`

### Animações
As animações são definidas no componente TypeScript usando Angular Animations:
- `zoomIn`: Animação de entrada do formulário
- `shake`: Animação de erro nos campos
- `fadeIn`: Animação para mensagens
- `checkmark`: Animação de sucesso

### Validações
Validações customizadas podem ser adicionadas no método `passwordMatchValidator` ou criando novos validators.

## 📁 Estrutura do Componente

```
formulario-teste/
├── formulario-teste.ts      # Lógica do componente
├── formulario-teste.html    # Template HTML
└── formulario-teste.css     # Estilos customizados
```

## 🔧 Configuração das Animações

As animações foram configuradas em:
1. **app.config.ts**: Adicionado `provideAnimations()`
2. **Componente**: Definidas as animações no decorator `@Component`
3. **Template**: Aplicadas as animações nos elementos HTML

## 💡 Dicas de Desenvolvimento

- Use `markAsTouched()` para mostrar erros após tentativa de submit
- Implemente `passwordMatchValidator` para validação de senhas
- Use `formatarTelefone()` para aplicar máscaras em tempo real
- Combine classes Tailwind com CSS customizado quando necessário

## 🎯 Próximos Passos

Possíveis melhorias:
- Integração com API real
- Testes unitários
- Validação de força da senha
- Campos adicionais (CPF, data de nascimento)
- Modo escuro
- Internacionalização (i18n)
