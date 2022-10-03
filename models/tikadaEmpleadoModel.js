import mongoose from 'mongoose'

const schemaTikada = new mongoose.Schema({
    idEmpleado: {type: String},
    estado: {type: String},
    entrada: {type: String},
    salida: {type: String},
    mes: {type: String},
    comentario: {type: String}
});

export default mongoose.model('Tikada', schemaTikada);