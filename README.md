# Wrappo - Debugger Inteligente para Aplicações Node.js

![Wrappo Logo](https://your-logo-url.com) <!-- Adicione um logo se desejar -->

**Wrappo** é um **wrapper inteligente para logs e erros** em aplicações Node.js. Ele transforma mensagens de erro do console em mensagens **mais amigáveis, coloridas e explicativas**, sugerindo possíveis soluções. Além disso, pode enviar logs para uma plataforma centralizada, facilitando o monitoramento em produção. 🚀

## ✨ **Diferenciais**

✔️ **Erros mais claros** - Stack trace formatado e legível 🧐  
✔️ **Sugestões automáticas** - Dicas para resolver erros comuns 💡  
✔️ **Modo produção** - Notificações silenciosas, logs estruturados 📡  
✔️ **Integração com plataformas** - Envio para dashboards e alertas 📊  
✔️ **Fácil de instalar e usar** - Apenas 1 linha de código! ⚡

---

## 📦 **Instalação**

```sh
npm install wrappo-node
```

Ou com Yarn:

```sh
yarn add wrappo-node
```

---

## 🚀 **Como Usar?**

### **1️⃣ Importação e Inicialização**

```typescript
import { Wrappo } from "wrappo-node";

const wrappo = new Wrappo("SUA_API_KEY"); // APIKey opcional só deixar em branco. Implementação futura
wrappo.init();
```

### **2️⃣ Captura Automática de Erros**

Basta instanciar o `Wrappo` que ele automaticamente **captura erros e logs do console**:

```typescript
console.error("Erro ao conectar ao banco de dados");
```

🔴 **Wrappo transforma isso em:**

```
🔴 Erro detectado!
📌 Stack Trace: ...
💡 Sugestão: Verifique se a conexão com o banco está ativa.
```

### **3️⃣ Logs de Aviso e Debug**

```typescript
console.warn("Configuração inválida detectada");
```

🟡 Exibe uma **mensagem amigável** com contexto e sugestões.

---

## 🏗 **Modos de Uso**

### **🛠️ Modo Desenvolvimento**

✅ Mostra **erros detalhados no console** com sugestões de correção.

<!-- ### **🚀 Modo Produção**

✅ **Silencia logs no console** e envia relatórios para um servidor. -->

```typescript
const wrappo = new Wrappo("MINHA_API_KEY", { production: true });
wrappo.init();
```

---

## 🔗 **Integrações Futuras**

- **📊 Painel Web**: Monitoramento de erros e logs em tempo real
- **🔔 Notificações**: Alertas no Slack, Discord e Telegram
- **🛡️ Segurança**: Detecção de padrões suspeitos de erro

---

## 🤝 **Contribua com o Wrappo!**

Se você gostou do Wrappo, deixe uma ⭐ no [GitHub](https://github.com/devJcdzn/wrappo)!  
Tem sugestões ou encontrou um bug? Abra uma issue!

---

## 📜 **Licença**

Wrappo é um projeto open-source sob a licença MIT. Sinta-se livre para usar e contribuir!
