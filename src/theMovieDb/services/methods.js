const axios = require("axios")

class Movies {
    constructor({movie_name,genre_id,movie_id}){
        this.movie_name = movie_name
        this.movie_id = movie_id
        this.genre_id = genre_id
        this.token = require("../config/token")
    }

    findMovie = async()=>{
        try {
            //eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZDFjYWE1Njk0ZTQzYzU5NDliNDM4ZDU2NzI5ZjJiOCIsInN1YiI6IjY1MzcwZWQ5ZjQ5NWVlMDBlMmM0OGU3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OiS3fS4drfmq2p9u1UJWEVjMT1CyIJfZkb4pWPeYgaM
            const request = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${this.movie_name}&include_adult=false&language=pt-BR-US&page=1`,{headers:{Authorization:`Bearer ${this.token}`}})

            if(request.data.results.length === 0){ return {status:404,message:"Movie not found"}}

            return {status:200,movie:request.data.results[0]}

        } catch (err) {
            return {status:500,message:"Internal server error"}
        }
    }

    similarMovies = async()=>{
        try {
            
            const request = await axios.get(`https://api.themoviedb.org/3/movie/${this.movie_id}/recommendations?language=pt-BR&page=1`,{headers:{Authorization:`Bearer ${this.token}`}})
            
            return request.data
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = Movies