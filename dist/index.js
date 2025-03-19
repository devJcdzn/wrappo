"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wrappo = void 0;
class Wrappo {
    apiKey;
    constructor(apiKey) {
        this.apiKey = apiKey;
    }
    init() {
        this.wrapConsole();
        this.captureErrors();
    }
    wrapConsole() {
        const originalError = console.error;
        const originalWarn = console.warn;
        console.error = (...args) => {
            const errorDetails = this.extractErrorDetails(args) || {
                message: "Erro desconhecido",
                type: "Unknown",
                location: "N/A",
                stack: "N/A",
            };
            if (!this.apiKey) {
                this.displayWrappoError(errorDetails);
            }
            else {
                this.sendToServer("error", errorDetails);
            }
            originalError.apply(console, args);
        };
        console.warn = (...args) => {
            const errorDetails = this.extractErrorDetails(args) || {
                message: "Aviso desconhecido",
                type: "Unknown",
                location: "N/A",
                stack: "N/A",
            };
            if (!this.apiKey) {
                this.displayWrappoWarning(errorDetails);
            }
            else {
                this.sendToServer("warn", errorDetails);
            }
            originalWarn.apply(console, args);
        };
    }
    captureErrors() {
        process.on("uncaughtException", (err) => {
            const errorDetails = this.extractErrorDetails([err]) || {
                message: "Erro desconhecido",
                type: "Unknown",
                location: "N/A",
                stack: "N/A",
            };
            this.displayWrappoError(errorDetails);
            this.sendToServer("error", errorDetails);
        });
        process.on("unhandledRejection", (reason) => {
            const errorDetails = this.extractErrorDetails([reason]) || {
                message: "Erro desconhecido",
                type: "Unknown",
                location: "N/A",
                stack: "N/A",
            };
            this.displayWrappoError(errorDetails);
            this.sendToServer("error", errorDetails);
        });
    }
    extractErrorDetails(args) {
        try {
            const error = args[0] instanceof Error
                ? args[0]
                : new Error(args[0]?.toString() || "Erro desconhecido");
            const stackLines = error.stack ? error.stack.split("\n") : [];
            let location = "Desconhecido";
            let file = "Desconhecido";
            let line = "N/A";
            // Filtrar stack trace para remover linhas irrelevantes (módulos internos)
            const relevantStackLines = stackLines.filter((line) => !line.includes("node_modules") && !line.includes("internal/"));
            if (relevantStackLines.length > 1) {
                const match = relevantStackLines[1].match(/\((.*):(\d+):(\d+)\)/);
                if (match) {
                    file = match[1];
                    line = match[2];
                    location = `${file}:${line}`;
                }
            }
            return {
                message: error.message || "Erro desconhecido",
                type: error.name || "Unknown",
                stack: relevantStackLines.join("\n") || "N/A",
                location,
                file,
                line,
                suggestion: this.getFixSuggestion(error.message),
            };
        }
        catch (e) {
            return {
                message: "Erro desconhecido",
                type: "Unknown",
                location: "N/A",
                stack: "N/A",
            };
        }
    }
    displayWrappoError(error) {
        console.log("\x1b[31m🔴 Erro detectado!\x1b[0m", error.type, "em", error.location);
        console.log("\x1b[37m📌 Mensagem:\x1b[0m", error.message);
        console.log("\x1b[37m📄 Arquivo:\x1b[0m", error.file);
        console.log("\x1b[37m📍 Linha:\x1b[0m", error.line);
        console.log("\x1b[33m💡 Sugestão:\x1b[0m", error.suggestion);
        console.log("\x1b[36m🛠️ Stack Trace:\x1b[0m\n", error.stack);
    }
    displayWrappoWarning(error) {
        console.log("\x1b[33m🟡 Aviso detectado!\x1b[0m", error.type, "em", error.location);
        console.log("\x1b[37m📌 Mensagem:\x1b[0m", error.message);
        console.log("\x1b[37m📄 Arquivo:\x1b[0m", error.file);
        console.log("\x1b[37m📍 Linha:\x1b[0m", error.line);
        console.log("\x1b[33m💡 Sugestão:\x1b[0m", error.suggestion);
        console.log("\x1b[36m🛠️ Stack Trace:\x1b[0m\n", error.stack);
    }
    getFixSuggestion(message) {
        if (message.includes("undefined")) {
            return "🔍 Verifique se a variável está definida antes de usá-la.";
        }
        if (message.includes("null")) {
            return "🛠️ Certifique-se de que o valor não seja `null` antes de acessar suas propriedades.";
        }
        if (message.includes("NetworkError")) {
            return "🌐 Verifique sua conexão de rede e se a API está acessível.";
        }
        if (message.includes("SyntaxError")) {
            return "📌 Erro de sintaxe! Revise a estrutura do código.";
        }
        if (message.includes("TypeError")) {
            return "🔄 Confira se a variável contém o tipo esperado antes de acessá-la.";
        }
        return "🤖 Não foi possível sugerir uma correção específica. Verifique a documentação.";
    }
    async sendToServer(type, error) {
        if (!this.apiKey)
            return;
        try {
            await fetch("https://wrappo-logs.com/api/logs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.apiKey}`,
                },
                body: JSON.stringify({
                    type,
                    message: error.message,
                    errorType: error.type,
                    file: error.file,
                    line: error.line,
                    location: error.location,
                    suggestion: error.suggestion,
                    stack: error.stack,
                    timestamp: new Date().toISOString(),
                }),
            });
        }
        catch (error) {
            console.warn("⚠️ Wrappo: Falha ao enviar log para o servidor.");
        }
    }
}
exports.Wrappo = Wrappo;
