const express = require("express")
const mongoose = require("mongoose")

const mongodb = "mongodb+srv://admin:admin@meliplayhelper.iktuapo.mongodb.net/?retryWrites=true&w=majority"
const app = express()

const port = 3000 || process.env.PORT

app.use(require("./router"))

app.listen(port,()=>{
    try {
        console.log(`Server is running on port ${port}`)    
        
        mongoose.connect(mongodb).then((v)=>{
            console.log("Banco de dados conectado")
        }).catch((err)=>{
            console.log("Erro ao conectar banco de dados")
        })
        
    } catch (err) {
        console.log("Error occurred on start server")
    }    
})