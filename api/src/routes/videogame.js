require('dotenv').config();
const express = require('express');
const router = express.Router();
const {gameDetailApi, gameDetailDB ,gameDetails, validate} = require('./functions')
const {Videogame, Genres} = require('../db')



router.get('/:idgame', async (req,res,next)=>{
    const {idgame} = req.params
    try {
        if(validate(idgame)){
            let gameDetailD = await gameDetailDB(idgame)
            res.json(gameDetails(gameDetailD))
            return
        }
        let gameDetailA = await gameDetailApi(idgame);
        res.json(gameDetails(gameDetailA))
        
    } catch (error) {
        next(error)
    }
})

router.post('/',async (req,res,next)=>{
    const {name, description, released, rating, platforms, genres } = req.body
    try {
        let videogameCreate = await Videogame.create({
            name,
            description,
            released,
            rating,
            platforms
        })
        // let genresMatch = await Genres.findAll(
        //     {
        //         where: {
        //             name: genres
        //         }
        //     }
        // )

        videogameCreate.addGenres(genres)

        res.json(videogameCreate.toJSON());
    } catch (error) {
        next(error)
    }
})





module.exports = router;