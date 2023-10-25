const jwt = require("jsonwebtoken")

const verifyToken = async(req,res)=>{
    try {
        if(!req.headers.authorization){ return res.status(401).json({code:401,message:"Unauthorized access"})}

        const token = req.headers.authorization.replace("Bearer ","").replaceAll(" ","")

        const validate = await jwt.decode(token,)

    }catch (err){
        
    }
}

module.exports = verifyToken