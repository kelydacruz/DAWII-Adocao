import Animal from "../models/animal.js";
import Abrigo from "../models/abrigo.js";

export default class AnimalController{

    constructor(caminhoBase = 'animal/'){
        this.caminhoBase = caminhoBase;

        this.openAdd = async (req, res) => {
                    const resultado = await Abrigo.find({});
                    res.render(caminhoBase + "add", { Abrigo: resultado });
                };

        this.del = async (req, res) => {
            await Animal.findByIdAndDelete(req.params.id);
            res.redirect("/" + this.caminhoBase + "lst");
        };
        this.add = async (req, res) => {
            var abrigo = null;

            if (req.body.abrigo != null) {
                abrigo = await Abrigo.findById(req.body.abrigo);
            }
            await Animal.create({
                foto: req.file.buffer,
                nome: req.body.nome,
                especie: req.body.especie,
                raca: req.body.raca,
                idade: req.body.idade,
                genero: req.body.genero,
                descricao: req.body.descricao,
                abrigo: abrigo,
            });
            res.redirect("/" + this.caminhoBase + "lst");
        };
        this.list = async (req, res) => {
            const abrigo = await Abrigo.find({});
            const resultado = await Animal.find({}).populate("abrigo");

            res.render(caminhoBase + "lst", {
                Animais: resultado,
                Abrigo: abrigo,
            });
        };
        this.openEdt = async (req, res) => {
            const id = req.params.id;
            const animal = await Animal.findById(id);
            const abrigo = await Abrigo.find({});
            console.log(Animal);
            res.render(caminhoBase + "edt", {
                Animal: animal,
                Abrigo: abrigo,
            });
        };
        this.edt = async (req, res) => {
            var abrigo = null;

            const dados = req.body;

            if (req.body.abrigo != null) {
                abrigo = await Abrigo.findById(req.body.abrigo);
                dados.abrigo = abrigo;
            }
            if (req.file) {
                dados.foto = req.file.buffer;
            }
            await Animal.findByIdAndUpdate(req.params.id, dados);
            res.redirect("/" + caminhoBase + "lst");
        };

        this.find = async (req, res) => {
            const filtro = req.body.filtro;
            const abrigo = await Abrigo.find({});
            const resultado = await Animal.find({
                especie: { $regex: filtro, $options: "i" },
            });
            res.render(caminhoBase + "lst", {
                Animais: resultado,
                Abrigo: abrigo,
            });
        };
    }
}