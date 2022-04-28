require('dotenv').config();
const axios = require('axios').default;
const {Op} = require('sequelize')
const {API_KEY} = process.env;
const {Videogame, Genres} = require('../db')


function mainRouteInformation(apiGame){
    let mainRoute = apiGame.map(e =>{
        return {
            name: e.name,
            img: e.background_image,
            genres: e.genres.map(g=>{
                return g.name
            })
        }
    })
    return mainRoute;
}

async function gameDetailApi(idGameApi){
    let gameMatchId = [];
    var gameId = await axios.get(`https://api.rawg.io/api/games/${idGameApi}?key=${API_KEY}`)
        .then(r => {
            gameMatchId = [r.data]
        })
    return gameMatchId;
}

async function gameDetailDB(idGameDB){
    let dataDB = await Videogame.findByPk(idGameDB, {
        include: Genres
    })
    return dataDB;
}

async function requestGenresApi(){
    let genres = [];
    var gameGenresApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
        .then(g => {
            genres = [...genres,...g.data.results]
        })
    return genres;
}
async function requestGenresDB(){
    let dataDB = await Genres.findAll(
    )
    return dataDB;
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
            
        }
    /* console.log(1, allData.length); */
    /* console.log(1, allData) */
    return allData;
}

async function requestDB(){
    let dataDB = await Videogame.findAll({
        include:[
                {
                    model: Genres,
                    attributes: ["name"],
                    through: {
                        attributes: []
                    }
                }
            ]
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
    console.log(2, gamesMatch)
    return gamesMatch;
}


function dataBaseXApi(api, db){
    let allInformation = api.concat(
        db
    )
    return allInformation;
}


function gameDetails(gameDetail){
    let detailRoute = gameDetail.map(d =>{
        return {
            name: d.name,
            img: d.background_image,
            description: d.description,
            released: d.released,
            rating: d.rating,
            platforms: d.platforms.map(p=>{
                return platforms = p.platform.name
            }),
            genres: d.genres.map(g=>{
                return g.name
            })
        }
    })
    return detailRoute;
}

function validate(id){
    if(typeof id === 'string'){
        return true;
    }
    else{
        return false;
    }
}

function genresInfo(genres){
    let genresData = genres.map(g =>{
        return{
            id: g.id,
            name: g.name
        }
    })
    return genresData;
}


module.exports = {
    dataBaseXApi,
    searchApi,
    SearchNameDB,
    requestDB,
    requestApi,
    mainRouteInformation,
    gameDetailApi,
    gameDetailDB,
    gameDetails,
    validate,
    requestGenresApi,
    requestGenresDB,
    genresInfo,
}