require('dotenv').config();
const express = require('express');
const router = express.Router();
const {Genres, Videogame} = require('../db')
const {requestGenresApi,requestGenresDB, genresInfo} = require('./functions')



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
            var genresInDB = await Genres.bulkCreate(arrayG)
            res.send(genresInfo(genresInDB))
        }else{
            res.send(allGenres)
        }
    } catch (error) {
        next(error)
    }
})





module.exports = router;