require('dotenv').config();
const express = require('express');
const router = express.Router();
const {Genero, Videogame} = require('../db')
const {requestGenresApi,requestGenresDB, genresInfo} = require('./functions')
// https://api.rawg.io/api/genres?key=${API_KEY}


router.get('/', async(req,res,next)=>{
    try {
        let allGenres = await requestGenresDB()
        if(allGenres.length === 0){
            var arrayG = [];
            let genresA = await requestGenresApi()
            genresA.map(g=>{
                arrayG.push({
                    id: g.id,
                    name: g.name
                })
            })
            var genresInDB = await Genero.bulkCreate(arrayG)
            res.send(genresInfo(genresInDB))
        }else{
            res.send(allGenres)
        }
    } catch (error) {
        next(error)
    }
})





module.exports = router;