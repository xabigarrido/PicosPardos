import mongoose from "mongoose";

const schemaCategory = new mongoose.Schema({
    nombre: String,
    nombreMin: String,
    descripcion: String,
    status: Boolean,
    orden: Number,
    fecha: String
});

export default mongoose.model('Category', schemaCategory)