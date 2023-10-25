const tokenValidator = require("../services/token")

const verifyToken = async(req,res,next) => {
    try {

        if(!req.headers.authorization){ return res.status(401).json({code:401,message:"API Token not found"})}
        if(req.headers.authorization.includes("Bearer ") === false){ return res.status(401).json({code:401,message:"Invalid API Token"})}
        
        const verify_token =await (new tokenValidator({token:req.headers.authorization.replaceAll("Bearer","").replaceAll(" ","")}).verifyToken())
        if(verify_token.status !== 200){ return res.status(401).send("Invalid API Token") }
        req.user_data = verify_token
        return next()

    } catch (err) {
        return res.status(500).json({code:500,message:"Internal server error"})
    }
}

module.exports = verifyToken