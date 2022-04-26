require('dotenv').config();
const express = require('express');
const router = express.Router();
const {gameDetailApi, gameDetailDB ,gameDetails, validate} = require('./functions')
const {Videogame, Genres} = require('../db')
const sequelize = require('sequelize')

// https://api.rawg.io/api/games/91069?key=3ed60c1cc25f4ef3aaa68155a5b08680

router.get('/:idgame', async (req,res,next)=>{
    const {idgame} = req.params
    try {
        if(!validate(idgame)){
            let gameDetailD = await gameDetailDB(idgame)
            res.send(gameDetails(gameDetailD))
        }
        let gameDetailA = await gameDetailApi(idgame);
        res.send(gameDetails(gameDetailA))
        
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
            platforms,
        })
        let genresMatch = await Genres.findAll({
            where:{name : [...genres]}
        })

        await videogameCreate.setGenres(genresMatch)

        res.send(videogameCreate);
    } catch (error) {
        next(error)
    }
})





module.exports = router;