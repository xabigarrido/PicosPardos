import mongoose from 'mongoose'

const URI = "mongodb+srv://xabi:123@cluster0.xmvtl.mongodb.net/PicosPardos2";

export async function connectDb(){
    try {
        await mongoose.connect(URI);
        console.log('👍👍 Conectado a la base')
    } catch (error) {
        console.log('❌❌ No conectado a la base')
    }
}