import mongoose from 'mongoose'

const schemaCajaActual = new mongoose.Schema({
    abiertaPor: String,
    comandas: Array,
    dineroCaja: Number,
    fecha: Number
})

export default mongoose.model('CajaActual', schemaCajaActual)