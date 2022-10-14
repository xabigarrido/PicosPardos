import mongoose from 'mongoose'

const schemaReservas = new mongoose.Schema({
    horaLlegada: {type: String},
    mesa: {type: Number},
    numeroPersonas: {type: Number},
    botellas: {type: Number},
    reservaCreadaPor: {type: String},
    reservaLlegada: {type: Boolean},
    comentario: {type: String},
    diaDeLaReservaCreada: {type: String},
    reservaDia: {type: String},
    nombreDeLaReserva: {type: String}
});

export default mongoose.model('Reserva', schemaReservas)