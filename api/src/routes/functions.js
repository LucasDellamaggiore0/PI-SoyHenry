require('dotenv').config();
const axios = require('axios').default;
const {Op} = require('sequelize')
const {API_KEY} = process.env;
const {Videogame, Genres} = require('../db')


function mainRouteInformation(apiGame){
    let mainRoute = apiGame.map(e =>{
        return {
            id: e.id,
            name: e.name,
            img: e.background_image,
            genres: e.genres.map(g=>{
                return g.name
            }),
            rating: e.rating,
            released: e.released
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


async function requestDB(){
    let dataDB = await Videogame.findAll({
        include:[
                {
                    model: Genres,
                    attributes: ["name"],
                }
            ]
    })
    return dataDB;
}

async function SearchNameDB(name){
    let gameMatchDB = await Videogame.findAll({
        where:{
            name : {[Op.iLike]: `%${name}%`}
        },
        include:[
                {
                    model: Genres,
                    attributes: ["name"],
                }
            ]
    })
    console.log(3, gameMatchDB)
    return gameMatchDB;
}

async function SearchGameByGenreDB(name){
    let gameByGenreDB = await Videogame.findAll({
        include:[
            {
                model: Genres,
                where: {name}
            }
        ]
    })
    console.log(gameByGenreDB)
    return gameByGenreDB;
}



async function searchApi(name){
    let gamesMatch = [];

        var requestSearch = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)
            .then(r => {
                gamesMatch = [...gamesMatch, ...r.data.results]
            })    
    return gamesMatch;
}


function dataBaseXApi(db, api){
    let allInformation = db.concat(
        api
    )
    return allInformation;
}


function gameDetails(gameDetail){
    if(Array.isArray(gameDetail)){
        let detailRoute = gameDetail.map(d =>{
            return {
                id: d.id,
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
    }else{
        return[
            {
                id: gameDetail.id,
                name: gameDetail.name,
                img: gameDetail.background_image,
                description: gameDetail.description,
                released: gameDetail.released,
                rating: gameDetail.rating,
                genres: gameDetail.genres.map((g)=>{
                    return g.name
                }),
                platforms: gameDetail.platforms 
            }
        ]
    }
}

function validate(id){
    let idChange = Number(id)
    if(isNaN(idChange)){
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

async function requestApi2(){
    let llamado1 = axios.get('https://api.rawg.io/api/games?key=3ed60c1cc25f4ef3aaa68155a5b08680&page=1')
    let llamado2 = axios.get('https://api.rawg.io/api/games?key=3ed60c1cc25f4ef3aaa68155a5b08680&page=2')
    let llamado3 = axios.get('https://api.rawg.io/api/games?key=3ed60c1cc25f4ef3aaa68155a5b08680&page=3')
    let llamado4 = axios.get('https://api.rawg.io/api/games?key=3ed60c1cc25f4ef3aaa68155a5b08680&page=4')
    let llamado5 = axios.get('https://api.rawg.io/api/games?key=3ed60c1cc25f4ef3aaa68155a5b08680&page=5')
    let response = await Promise.all([llamado1,llamado2,llamado3,llamado4,llamado5])
    let datos = response.map(e=> e.data.results)
    let datosProcesados = datos.flat(2);
    let fin = datosProcesados.map(d =>{
        return{
            id: d.id,
            name: d.name,
            img: d.background_image,
            genres: d.genres.map(g=>{
                return g.name
            }),
            rating: d.rating
        }
    })
    // console.log(fin)
    /* for(let i=0; i < datos.length; i++){
        filtros = {name: datos[i].name}
    } */
    // console.log(datos.flat(2))
    // console.time('Inicio')
    // console.log(data.flat(2))
    // console.timeEnd('Inicio')
    return fin
}



module.exports = {
    dataBaseXApi,
    searchApi,
    SearchNameDB,
    requestDB,
    mainRouteInformation,
    gameDetailApi,
    gameDetailDB,
    gameDetails,
    validate,
    requestGenresApi,
    requestGenresDB,
    genresInfo,
    requestApi2,
    SearchGameByGenreDB
}