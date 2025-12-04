import mongoose from "mongoose";
//const url = "mongodb+srv://marcelosiedler:ifsul@ifsul.fify4.mongodb.net/"
const url = "mongodb+srv://aluno:aluno@cluster0.y7nn2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const conexao = await mongoose.connect(url)

export default conexao