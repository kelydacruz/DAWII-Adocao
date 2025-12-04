import Time from '../models/time.js'

export default class TimeController{ 
   
    constructor(caminhoBase='time/'){
        this.caminhoBase = caminhoBase
    
        this.openAdd = async(req, res)=>{
            res.render(caminhoBase + "add")
        }
        this.add = async(req, res)=>{
           
            await Time.create({
                nome: req.body.nome,
                cidade: req.body.cidade
            });
            res.redirect('/'+caminhoBase + 'add');
        }
        this.list = async(req, res)=>{
            const resultado = await Time.find({})
            res.render(caminhoBase + 'lst', {Times:resultado})
        }
        this.find = async(req, res)=>{
            const filtro = req.body.filtro;
            const resultado = await 
            Time.find({ nome: { $regex: filtro,
                $options: "i" }})
            res.render(caminhoBase + 'lst', {Times:resultado})
        }

         this.openEdt = async(req, res)=>{
            //passar quem eu quero editar
            const id = req.params.id
            console.log(id)
            const time = await Time.findById(id) 
            console.log(time)
            res.render(caminhoBase + "edt", 
                {Time:time})
        }


        this.edt = async(req, res)=>{
        await Time.findByIdAndUpdate(req.params.id, req.body)
        res.redirect('/'+caminhoBase + 'lst');
        
        }

         this.del = async(req, res)=>{
        await Time.findByIdAndDelete(req.params.id)
        res.redirect('/'+caminhoBase + 'lst');
        
        }

    }
}