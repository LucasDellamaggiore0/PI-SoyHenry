require('dotenv').config();
const axios = require('axios').default;
const {Op} = require('sequelize')
const {API_KEY} = process.env;
const {Videogame, Genero} = require('../db')


function mainRouteInformation(apiGame){
    let mainRoute = apiGame.map(e =>{
        return {
            name: e.name,
            img: e.background_image,
            genders: e.genres.map(g =>{
                return {
                    name : g.name
                }
            })
        }
    })
    return mainRoute;
}

/* https://api.rawg.io/api/games?search={portal}&key=3ed60c1cc25f4ef3aaa68155a5b08680 */
async function requestApi(){
    let allData = [];
    for(let i=1; i <=5; i++){
        var req = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`)
            .then(r => {
                allData = [...allData,...r.data.results]
            })
    } 
    /* console.log(1, allData.length); */
    /* console.log(1, allData) */
    return allData;
}

async function requestDB(){
    let dataDB = await Videogame.findAll({
        include: Genero
    })
    return dataDB;
}

async function SearchNameDB(name){
    let gameMatchDB = await Videogame.findAll({
        where:{
            name : {[Op.iLike]: `%${name}%`}
        }
    })
    return gameMatchDB;
}


async function searchApi(name){
    let gamesMatch = [];
    for(let i=1; i <= 5; i++){
        var requestSearch = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)
            .then(r => {
                gamesMatch = [...gamesMatch, ...r.data.results]
            })
    }
    return gamesMatch;
}


function dataBaseXApi(api, db){
    let allInformation = api.concat(
        db
    )
    return allInformation;
}


module.exports = {
    dataBaseXApi,
    searchApi,
    SearchNameDB,
    requestDB,
    requestApi,
    mainRouteInformation
}