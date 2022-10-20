import mongoose from 'mongoose'

const schemaTikada = new mongoose.Schema({
    idEmpleado: {type: String},
    estado: {type: String},
    entrada: {type: String},
    entradaHumana: {type: String},
    salidaHumana: {type: String},
    salida: {type: String},
    entradaLongitude: {type: String},
    entradaLatitude: {type: String},
    salidaLongitude: {type: String},
    salidaLatitude: {type: String},
    mes: {type: String},
    año: {type: String},
    totalTrabajado: {type: String},
    horas: {type: String},
    minutos: {type: String},
    segundos: {type: String},
    segundosMostrar: {type: String},
    empresa: {type: String},
    comentario: {type: String},
});

export default mongoose.model('Tikada', schemaTikada);