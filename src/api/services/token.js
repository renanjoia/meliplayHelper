const jwt = require("jsonwebtoken")

class Token {
    constructor({userId,token}){
        this.uid = userId
        this.token = token
    }

    createToken = async()=>{
        try {
            const token = jwt.sign({uid:this.uid},"c36fa3ea-72bd-11ee-b962-0242ac120002")

            return {status:200,token}
        }catch(err){
            console.log(err)
            return {status:500}
        }
    }

    verifyToken = async()=>{
        try {
            if(!this.token){ return {status:404,message:"Token not found"}}

            const token = await jwt.verify(this.token,"c36fa3ea-72bd-11ee-b962-0242ac120002")
            console.log(token)
            return {status:200,token}

        } catch (err) {
            
        }
    }
}

module.exports = Token