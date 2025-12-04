import express from 'express';
const router = express.Router();

import AnimalController from '../controllers/AnimalController.js'
import multer from 'multer';
const controle = new AnimalController();

const caminhobase =  'animal/'

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/' + caminhobase + 'add', controle.openAdd)
router.post('/' + caminhobase + 'add', upload.single('foto'), controle.add)
router.get('/' + caminhobase + 'lst', controle.list)
router.post('/' + caminhobase + 'lst', upload.single('foto'), controle.find)
router.get('/' + caminhobase + 'del/:id', controle.del)
router.get('/' + caminhobase + 'edt/:id', controle.openEdt)
router.post('/' + caminhobase + 'edt/:id', upload.single('foto'), controle.edt)
export default router
