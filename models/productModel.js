import mongoose from 'mongoose'

const schemaProducts = new mongoose.Schema({
    nombre: String,
    nombreMin: String,
    categoria: String,
    categoriaMin: String,
    status: Boolean,
    stock: String,
    precio: Number,
    imagen: String,
    orden: Number,
    fecha: String,
});

export default mongoose.model('Product', schemaProducts);