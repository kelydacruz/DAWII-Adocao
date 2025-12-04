import Adotante from '../models/adotante.js'

export default class AdotanteController{ 
   
    constructor(caminhoBase='adotante/'){
        this.caminhoBase = caminhoBase
    
        this.openAdd = async(req, res)=>{
            res.render(caminhoBase + "add")
        }

        this.add = async(req, res)=>{
           
            await Adotante.create({
                nome: req.body.nome,
                cpf: req.body.cpf,
                dataNascimento: req.body.dataNascimento,
                telefone: req.body.telefone,
                email: req.body.email,
                endereco: req.body.endereco,
                senha: req.body.senha,
                dataCadastro: req.body.dataCadastro
            });
            res.redirect('/'+caminhoBase + 'add');
        }

        this.list = async(req, res)=>{
            const resultado = await Adotante.find({})
            res.render(caminhoBase + 'lst', {Adotantes:resultado})
        }

        this.find = async(req, res)=>{
            const filtro = req.body.filtro;
            const resultado = await 
            Adotante.find({ nome: { $regex: filtro,
                $options: "i" }})
            res.render(caminhoBase + 'lst', {Adotantes:resultado})
        }

         this.openEdt = async(req, res)=>{
            const id = req.params.id
            console.log(id)
            const adotante = await Adotante.findById(id) 
            console.log(adotante)
            res.render(caminhoBase + "edt", 
                {Adotante:adotante})
        }


        this.edt = async(req, res)=>{
        await Adotante.findByIdAndUpdate(req.params.id, req.body)
        res.redirect('/'+caminhoBase + 'lst');
        
        }

         this.del = async(req, res)=>{
        await Adotante.findByIdAndDelete(req.params.id)
        res.redirect('/'+caminhoBase + 'lst');
        
        }

    }
}