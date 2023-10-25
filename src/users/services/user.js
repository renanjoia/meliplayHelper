const db = require("../models/user")
const api = require("../../api/services/token")

const jwt = require("jsonwebtoken")
const emailVerification = require("email-validator")

class User {
    constructor({userId,email,token,movie_data}){
        this.uid = userId
        this.email = email
        this.token = token
        this.movie_data = movie_data
    }

    getData = async()=>{
        try {
            if(!this.uid){ return {status:401}}

            const user = await db.findById(this.uid).select({__v:false})
            if(!user){ return {status:404}}

            return {status:200,user}
        } catch (err) {
            console.log(err)
            return {status:500}

        }
    }

    register = async()=>{
        try{

            if(!this.email){ return {status:401,message:"Email not found"}}
            if(emailVerification.validate(this.email) === false){ return {status:401,message:"Invalid email address"}}

            const findEmail = await db.findOne({email:this.email})
            if(findEmail){ return {status:401,message:"User already exist"}}

            const user_data = {
                email:this.email,
                token:""
            }

            const create = await db.create(user_data)

            if(!create){ throw create}

            const apiToken = await (new api({userId:create._id}).createToken())

            if(apiToken.status !== 200){ throw Error(apiToken)}
            
            create.token = apiToken.token 
            const save = await create.save()

            return {status:200,token:apiToken.token}

        }catch(err){
            if(err.status){ return {status:err.status}}
            return {status:500,message:"internal server error"}
        }
    }

    watchMovie = async()=>{
        try {
            
            const user = await db.findById(this.uid)

            if(!user){ return {status:401,message:"Unauthhorized Action"}}

            const movies = user.movies_watched

            movies.push(this.movie_data)

            user.movies_watched = movies

            const save = await user.save()

            return {status:200}

        } catch (err) {
            
        }
    }

    moviesSuggestions = async()=>{
        try {
            
            

        } catch (err) {
            
        }
    }
}

module.exports = User