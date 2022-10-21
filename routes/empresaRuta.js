import {Router} from 'express'
import Empresa from '../models/empresaModel.js'
import moment from 'moment'
const ruta = Router();
 ruta.post("/addEmpresa", async (req, res) =>{
    try {
        req.body.diaCreada = moment();
        const newEmpresa = new Empresa(req.body);
        
        console.log(newEmpresa)
        await newEmpresa.save();
        res.send('Agregada');
    } catch (error) {
        console.log( error)
    }
 })

 ruta.get("/allEmpresas", async(req, res)=>{
    try {
        const data = await Empresa.find();
        res.json(data)
    } catch (error) {
        console.log(error)
    }
 })

 ruta.get("/:id", async(req, res)=>{
    try {
        const data = await Empresa.findById(req.params.id);
        res.json(data)
    } catch (error) {
        console.log(error)
    }
 })

 ruta.put("/editarEmpresa/:id", async(req,res)=>{
    try {
        console.log(req.body)
    await Empresa.findByIdAndUpdate(req.params.id, req.body);
    res.send('ok')
    } catch (error) {
        console.log(error)
    }
 })
export default ruta;