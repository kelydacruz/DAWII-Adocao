import Abrigo from '../models/abrigo.js'

export default class AbrigoController{ 
   
    constructor(caminhoBase='abrigo/'){
        this.caminhoBase = caminhoBase
    
        this.openAdd = async(req, res)=>{
            res.render(caminhoBase + "add")
        }

        this.add = async(req, res)=>{
           
            await Abrigo.create({
                nome: req.body.nome,
                endereco: req.body.endereco,
                telefone: req.body.telefone,
                email: req.body.email
            });
            res.redirect('/'+caminhoBase + 'add');
        }

        this.list = async(req, res)=>{
            const resultado = await Abrigo.find({})
            res.render(caminhoBase + 'lst', {Abrigos:resultado})
        }

        this.find = async(req, res)=>{
            const filtro = req.body.filtro;
            const resultado = await 
            Abrigo.find({ nome: { $regex: filtro,
                $options: "i" }})
            res.render(caminhoBase + 'lst', {Abrigos:resultado})
        }

         this.openEdt = async(req, res)=>{
            const id = req.params.id
            console.log(id)
            const abrigo = await Abrigo.findById(id) 
            console.log(abrigo)
            res.render(caminhoBase + "edt", 
                {Abrigo:abrigo})
        }


        this.edt = async(req, res)=>{
        await Abrigo.findByIdAndUpdate(req.params.id, req.body)
        res.redirect('/'+caminhoBase + 'lst');
        
        }

         this.del = async(req, res)=>{
        await Abrigo.findByIdAndDelete(req.params.id)
        res.redirect('/'+caminhoBase + 'lst');
        
        }

    }
}