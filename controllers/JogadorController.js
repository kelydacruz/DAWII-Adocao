import Jogador from '../models/jogador.js'

export default class JogadorController{ 
   
    constructor(caminhoBase='jogador/'){
        this.caminhoBase = caminhoBase
    
        this.openAdd = async(req, res)=>{
            res.render(caminhoBase + "add")
        }
        this.add = async(req, res)=>{
           
            await Jogador.create({
                nome: req.body.nome,
                time: req.body.time,
                posicao: req.body.posicao,
                idade: req.body.idade,
                altura: req.body.altura
            });
            res.redirect('/'+caminhoBase + 'add');
        }
        this.list = async(req, res)=>{
            const resultado = await Jogador.find({})
            res.render(caminhoBase + 'lst', {Jogadores:resultado})
        }
        this.find = async(req, res)=>{
            const filtro = req.body.filtro;
            const resultado = await 
            Jogador.find({ nome: { $regex: filtro,
                $options: "i" }})
            res.render(caminhoBase + 'lst', {Jogadores:resultado})
        }

         this.openEdt = async(req, res)=>{
            //passar quem eu quero editar
            const id = req.params.id
            console.log(id)
            const jogador = await Jogador.findById(id) 
            console.log(jogador)
            res.render(caminhoBase + "edt", 
                {Jogador:jogador})
        }


        this.edt = async(req, res)=>{
        await Jogador.findByIdAndUpdate(req.params.id, req.body)
        res.redirect('/'+caminhoBase + 'lst');
        
        }

         this.del = async(req, res)=>{
        await Jogador.findByIdAndDelete(req.params.id)
        res.redirect('/'+caminhoBase + 'lst');
        
        }

    } 
}
















