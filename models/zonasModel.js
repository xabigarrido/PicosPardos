import mongoose from 'mongoose'

const schemaZona = new mongoose.Schema({
    nombre: String,
    nombreMin: String,
    descripcion: String,
    habilitarZona: Boolean,
    orden: Number,
    fecha: String
})

export default mongoose.model('Zona', schemaZona)