
const express = require('express');
const router = express.Router();
const {requestApi, requestDB, searchApi, SearchNameDB, dataBaseXApi, mainRouteInformation, mainRouteInfo} = require('./functions')


router.get('/', async (req,res,next)=>{
    const {name} = req.query
    
    try {
        if(!name){
            var requestA = await requestApi()
            var requestB = await  requestDB()
            /* var requestBModified = mainRouteInfo(requestB) */
            var response = dataBaseXApi(requestA, requestB)
            res.send(mainRouteInformation(response)); 
            /* res.send(requestB) */
        }
        else{
            var responseSearchApi = await searchApi(name)
            var responseSearchDB = await SearchNameDB(name)
            var responseMatch = dataBaseXApi(responseSearchApi,responseSearchDB )
            if(responseMatch.length === 0){
                res.status(404).send('No hay juegos con el nombre recibido')
            }
            else{
                res.send(mainRouteInformation(responseMatch.slice(0,15)));
            }
        }
    } catch (error) {
        next(error);
    }
})
















module.exports = router;