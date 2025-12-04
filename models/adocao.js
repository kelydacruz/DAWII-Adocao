import conexao from "../config/conexao.js";

const Adocao = new conexao.Schema({
    adotante: {
        type: conexao.Schema.Types.ObjectId,
        ref: "Adotante",
        required: false
    },
    animal: {
        type: conexao.Schema.Types.ObjectId,
        ref: "Animal",
        required: false
    },

    dataAdocao: {
        type: Date,
        default: Date.now
    },
});

export default conexao.model("Adocao", Adocao)
