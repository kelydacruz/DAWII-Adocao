import conexao from "../config/conexao.js";

const Animal = new conexao.Schema({
    foto: {type: Buffer, required: false,
        get: (valor) => {
            if (!valor) return null;
            return `data:image/png;base64,${valor.toString('base64')}`;
        },
    },
    nome: {
        type: String,
        required: true,
    },
    especie: {
        type: String,
        required: true,
    },
    raca: {
        type: String,
        required: true,
    },
    idade: {
        type: Number,
        required: true,
    },
    genero: {
        type: String,
        required: true,
    },
    descricao: {
        type: String,
    },
    abrigo: { type: conexao.Types.ObjectId, ref: "Abrigo", required: false }
});

export default conexao.model("Animal", Animal)
