const express = require('express');
const router = express.Router();
const {requestDB, searchApi, SearchNameDB, dataBaseXApi, mainRouteInformation, requestApi2} = require('./functions')


router.get('/', async (req,res,next)=>{
    const {name} = req.query
    console.log(1, name)
    try {
        
        if(!name){
            var requestA = await requestApi2()
            var requestB = await  requestDB()
            /* var requestBModified = mainRouteInfo(requestB) */
            var response = dataBaseXApi(requestA, requestB)
            res.send(response); 
            /* res.send(requestB) */
        }
        else{
            var responseSearchApi = await searchApi(name)
            var responseSearchDB = await SearchNameDB(name)
            var responseMatch = dataBaseXApi(responseSearchApi,responseSearchDB )
            if(responseMatch.length === 0){
                res.json(responseMatch)
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