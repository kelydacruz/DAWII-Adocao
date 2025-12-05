import conexao from '../config/conexao.js'
import mongoose from 'mongoose'
import Adocao from '../models/adocao.js'

async function normalize() {
  try {
    console.log('Conectado, iniciando normalização de Adocoes...')

    const adocoes = await Adocao.find({})
    let updated = 0

    for (const ad of adocoes) {
      const updates = {}

      // adotante pode ser: ObjectId, string id, ou objeto embutido
      if (ad.adotante) {
        if (typeof ad.adotante === 'object' && ad.adotante._id) {
          updates.adotante = ad.adotante._id
        } else if (typeof ad.adotante === 'string') {
          try {
            updates.adotante = mongoose.Types.ObjectId(ad.adotante)
          } catch (e) {}
        }
      } else {
        updates.adotante = null
      }

      // animal
      if (ad.animal) {
        if (typeof ad.animal === 'object' && ad.animal._id) {
          updates.animal = ad.animal._id
        } else if (typeof ad.animal === 'string') {
          try {
            updates.animal = mongoose.Types.ObjectId(ad.animal)
          } catch (e) {}
        }
      } else {
        updates.animal = null
      }

      // Se houver alguma mudança, aplica
      const needUpdate = (('adotante' in updates && String(updates.adotante) !== String(ad.adotante)) || ('animal' in updates && String(updates.animal) !== String(ad.animal)))
      if (needUpdate) {
        await Adocao.findByIdAndUpdate(ad._id, updates)
        updated++
        console.log(`Atualizado ${ad._id}: adotante=${updates.adotante} animal=${updates.animal}`)
      }
    }

    console.log(`Normalização concluída. Registros atualizados: ${updated}`)
    process.exit(0)
  } catch (err) {
    console.error('Erro durante normalização:', err)
    process.exit(1)
  }
}

normalize()
