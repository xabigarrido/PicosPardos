import mongoose from 'mongoose'

const schemaEmpresa = new mongoose.Schema({
    nombreEmpresa: String,
    precioCopa: Number,
    rangoTikada: Number,
    diaCreada: String,
    mantenimiento: Boolean,
    fondoPantalla: String,
})

export default mongoose.model('Empresa', schemaEmpresa);