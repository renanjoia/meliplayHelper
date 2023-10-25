const app = require("express").Router()
const express = require("express")

const User = require("./src/users/services/user")
const Movie = require("./src/theMovieDb/services/methods")

app.get("/",(req,res)=>{
    res.json({code:200})
})

app.post("/api/register",express.json(),async(req,res)=>{
    try{
        
        const { email } = req.body
        
        if(!email){ return res.status(404).json({status:404,message:"Email not found"})}
        
        const register =await(new User({email}).register())

        return res.status(register.status).json(register)

    }catch (err){
        console.log(err)
        return res.status(500).json({status:500,message:"Internal server error"})

    }
})

app.get("/api/users/me",require("./src/api/midlewares/verifyToken"),async(req,res)=>{
    try {
        
        const user = await (new User({userId:req.user_data.token.uid}).getData())
        
        if(user.status !== 200){ return res.status(401).json({status:404,message:"User not found"})}
        return res.json(user)

    } catch (err){
        
    }
})

app.post("/api/users/watched_movie",express.json(),require("./src/api/midlewares/verifyToken"),async(req,res)=>{
    try {
        
        if(!req.body.movie_title){ return res.status(404).send({status:404,message:"Movie title not found"})}

        

        const movie = await (new Movie({movie_name:req.body.movie_title}).findMovie())

        const save_movie =await (new User({userId:req.user_data.token.uid,movie_data:movie.movie}).watchMovie())

        return res.json({status:200})
    } catch (err) {
        return res.status(500).json({status:500,message:"Internal Server Error"})
    }
})

app.get("/api/users/recommendations",express.json(),require("./src/api/midlewares/verifyToken"),async(req,res)=>{
    try {
        console.log("Route")
        const user = await(new User({userId:req.user_data.token.uid}).getData())
        
        var similar_movies = []
        const task = await Promise.all(user.user.movies_watched.map(async(v)=>{
            
            const similars = await (new Movie({movie_id:v.id}).similarMovies())
            const movies = similars.results
            similar_movies = similar_movies.concat(movies)
            return similars
        }))

        similar_movies.sort((a,b)=> b.vote_average - a.vote_average)

        return res.json(similar_movies)

    } catch (err) {
        console.log(err)
    }
})

module.exports = app