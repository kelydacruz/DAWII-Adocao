import Animal from "../models/animal.js";
import Abrigo from "../models/abrigo.js";

export default class ClienteController {
    constructor() {
        // Carrega a página inicial bonita do cliente
        this.index = async (req, res) => {
            try {
                // Pega animais e dados do abrigo
                const animais = await Animal.find({}).populate("abrigo");
                
                // Renderiza a view da pasta 'cliente'
                res.render("cliente/index", {
                    Animais: animais
                });
            } catch (error) {
                console.error("Erro:", error);
                res.status(500).send("Erro no servidor");
            }
        };
    }
}