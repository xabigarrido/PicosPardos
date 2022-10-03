import mongoose from 'mongoose'

const schemaComanda = new mongoose.Schema({
    idMesa: String,
    datosMesa: String,
    tipo: Array,
    contenido: Array,
    precioComanda: Number,
    fecha: String,
    atendidoPor: String,
    pagada: Boolean,
    idCaja: String,
})

export default mongoose.model('Comanda', schemaComanda);
