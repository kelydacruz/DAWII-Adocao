import Adocao from '../models/adocao.js'
import Adotante from '../models/adotante.js'
import Animal from '../models/animal.js'

export default class AdocaoController { 
   
    constructor(caminhoBase = 'adocao/') {
        this.caminhoBase = caminhoBase
    
        this.openAdd = async (req, res) => {
            const adotantes = await Adotante.find({});
            const animais = await Animal.find({});
            res.render(caminhoBase + "add", {
                Adotantes: adotantes,
                Animais: animais
            });
        }

        this.add = async (req, res) => {
            let adotante = null;
            if (req.body.adotante) {
                adotante = await Adotante.findById(req.body.adotante);
            }

            let animal = null;
            if (req.body.animal) {
                animal = await Animal.findById(req.body.animal);
            }

            await Adocao.create({
                adotante: adotante,
                animal: animal,
                dataAdocao: req.body.dataAdocao
            });

            res.redirect('/' + caminhoBase + 'add');
        }

        this.list = async (req, res) => {
            const resultado = await Adocao.find({})
                .populate('adotante')
                .populate('animal');

            res.render(caminhoBase + 'lst', { Adocoes: resultado });
        }

        this.find = async (req, res) => {
            const filtro = req.body.filtro;
            const resultado = await Adocao.find({
                dataAdocao: { $regex: filtro, $options: "i" }
            })
            .populate('adotante')
            .populate('animal');

            res.render(caminhoBase + 'lst', { Adocoes: resultado });
        }

        this.openEdt = async (req, res) => {
            const id = req.params.id;
            const adocao = await Adocao.findById(id);
            const adotantes = await Adotante.find({});
            const animais = await Animal.find({});

            res.render(caminhoBase + "edt", {
                Adocao: adocao,
                Adotantes: adotantes,
                Animais: animais
            });
        }

        this.edt = async (req, res) => {
            let adotante = null;
            if (req.body.adotante) {
                adotante = await Adotante.findById(req.body.adotante);
            }

            let animal = null;
            if (req.body.animal) {
                animal = await Animal.findById(req.body.animal);
            }

            const { dataAdocao } = req.body;

            await Adocao.findByIdAndUpdate(req.params.id, {
                adotante: adotante,
                animal: animal,
                dataAdocao: dataAdocao
            });

            res.redirect('/' + caminhoBase + 'lst');
        }

        this.del = async (req, res) => {
            await Adocao.findByIdAndDelete(req.params.id);
            res.redirect('/' + caminhoBase + 'lst');
        }

    } 
}
