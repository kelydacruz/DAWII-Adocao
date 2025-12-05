import conexao from "../config/conexao.js";

const Adotante = new conexao.Schema({
    nome: {
        type: String,
        required: true,
    },
     cpf: {
        type: String,
        required: true,
    },
    dataNascimento: { 
        type: Date,
        required: true,
    },
    telefone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    endereco: {
        type: String,
        required: true,
    },
    dataCadastro: {
        type: Date,
        required: true,
    }
});

export default conexao.model('Adotante', Adotante)
