import mongoose from 'mongoose'

const schemaNotification = new mongoose.Schema({
    idEmpleado: String,
    nombreEmpleado: String,
    rango: String,
    token: String,
    contenido: String,
    enviadoPor: String,
    habilitado: Boolean,
});

export default mongoose.model('Notification', schemaNotification)