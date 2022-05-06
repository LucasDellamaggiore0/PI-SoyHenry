const express = require('express');
const router = express.Router();
const {requestDB, searchApi, SearchNameDB, dataBaseXApi, mainRouteInformation, requestApi2, SearchGameByGenreDB} = require('./functions')


router.get('/', async (req,res,next)=>{
    const {name} = req.query
    try {
        
        if(!name){
            var requestA = await requestApi2()
            var requestB = await  requestDB()
            var requestBMaped = mainRouteInformation(requestB)
            
            //     requestB.genres = requestDBMaped
            /* var requestBModified = mainRouteInfo(requestB) */
            var response = dataBaseXApi(requestA, requestBMaped)
            res.send(response); 
            /* res.send(requestB) */
        }
        else{
            var responseSearchApi = await searchApi(name)
            var responseSearchDB = await SearchNameDB(name)
            console.log(1, responseSearchDB)
            console.log(2, mainRouteInformation(responseSearchApi))
            var responseMatch = dataBaseXApi(responseSearchApi,responseSearchDB)
            
            res.send(mainRouteInformation(responseMatch.slice(0,15)));
        }

    } catch (error) {
        next(error);
    }
})


router.get('/genres', async (req,res,next)=>{
    const {genre} = req.query
    try {
        let gamesByGenresApi = await requestApi2();
        let gamesByGenresDB = await SearchGameByGenreDB(genre)
        
        let resp = [...gamesByGenresDB, ...gamesByGenresApi.filter((g)=>g.genres.includes(genre))]
        console.log(resp)
        res.json([...gamesByGenresDB, ...gamesByGenresApi.filter((g)=>g.genres.includes(genre))])
    } catch (error) {
        next(error)
    }
})


router.get('/gamesDB', async (req,res,next)=>{
    try {
        let gamesDB = await requestDB()
        res.json(gamesDB)
    } catch (error) {
        next(error)
    }
})
router.get('/gamesAPI', async (req,res,next)=>{
    try {
        let gamesAPI = await requestApi2()
        res.json(gamesAPI)
    } catch (error) {
        next(error)
    }
})










module.exports = router;