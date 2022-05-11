export const GET_ALL_GAMES = 'GET_ALL_GAMES'
export const CREATE_GAME = 'CREATE_GAME'
export const GAMES_ORIGIN = 'GAMES_ORIGIN'
export const GET_GENRES = 'GET_GENRES'
export const GET_GAME_ID = 'GET_GAME_ID'
export const RESET = 'RESET'
export const ORDER_BY_NAME = 'ORDER_BY_NAME'
export const ORDER_BY_RATING = 'ORDER_BY_RATING'
export const FILTER_GENRES = 'FILTER_GENRES'
export const LOADING = 'LOADING'
export const CHANGE_PAGE = 'CHANGE_PAGE'

export const getAllGames = () =>async dispatch =>{
    const response = await fetch('http://localhost:3001/videogames')
    const games = await response.json()
    return dispatch({type: GET_ALL_GAMES, payload: games, loader: false})
}

export const getGameTitle = (title) => async dispatch =>{
    try {
        const res = await  fetch(`http://localhost:3001/videogames?name=${title}`)
        const gamesTitles = await res.json()
        return dispatch({type:GET_ALL_GAMES, payload:gamesTitles, loader: false })
    } catch (error) {
        console.log(error)
    }
}

export const getGameById = (id) => async dispatch =>{
    let r = await fetch(`http://localhost:3001/videogame/${id}`)
    let gameId = await r.json()
    return dispatch({type: GET_GAME_ID, payload: gameId, loader:false})
}

export const getGenres = () => async dispatch =>{
    const res = await fetch('http://localhost:3001/genres')
    const genres = await res.json()
    return dispatch({type: GET_GENRES, payload: genres})
}


export const createGame = (values) => {
    return (dispatch) =>{
        fetch('http://localhost:3001/videogame',{
            body: JSON.stringify(values),
            method: 'POST',
            headers: { 'Content-Type': 'application/json'}
        })
    }
}

export const orderByName = (name)=>{
    return{
        type: ORDER_BY_NAME,
        payload: name
    }
}

export const orderByRating = (rating)=>{
    return{
        type: ORDER_BY_RATING,
        payload: rating
    }
}

export const gamesDB = ()=>async (dispatch)=>{
    const gamesDB = await fetch('http://localhost:3001/videogames/gamesDB')
    const gamesDBMatch = await gamesDB.json()
    return dispatch({type:GAMES_ORIGIN, payload: gamesDBMatch, origin: 'db',  loader:false})
}
export const gamesAPI = ()=> async(dispatch)=>{
    const gamesAPI = await fetch('http://localhost:3001/videogames/gamesAPI')
    const gamesAPIMatch = await gamesAPI.json()
    return dispatch({type: GAMES_ORIGIN, payload: gamesAPIMatch, origin: 'api', loader:false})
}


export const filterGenres = (genres)=> async (dispatch)=>{
    const response = await fetch(`http://localhost:3001/videogames/genres?genre=${genres}`)
    const gameByGenres = await response.json()
    return dispatch({type: FILTER_GENRES, payload: gameByGenres, loader: false})
}

export const reset = ()=>{
    return {type: RESET, payload: []}
}

export const setLoading = ()=>{
    return {type: LOADING, payload: true}
}

export const changeCurrentPage = (page)=>{
    return {type: CHANGE_PAGE, payload: page}
}