export const GET_ALL_GAMES = 'GET_ALL_GAMES'
export const CREATE_GAME = 'CREATE_GAME'
export const GET_GENRES = 'GET_GENRES'
export const GET_GAME_ID = 'GET_GAME_ID'
export const RESET = 'RESET'
export const ORDER_FILTER = 'ORDER_FILTER'
export const FILTER_GENRES = 'FILTER_GENRES'

export const getAllGames = () =>async dispatch =>{
    const response = await fetch('http://localhost:3001/videogames')
    const games = await response.json()
    return dispatch({type: GET_ALL_GAMES, payload: games})
}

export const getGameTitle = (title) => async dispatch =>{
    try {
        const res = await  fetch(`http://localhost:3001/videogames?name=${title}`)
        const gamesTitles = await res.json()
        return dispatch({type:GET_ALL_GAMES, payload:gamesTitles})
    } catch (error) {
        console.log(error)
    }
}

export const getGameById = (id) => async dispatch =>{
    let r = await fetch(`http://localhost:3001/videogame/${id}`)
    let gameId = await r.json()
    return dispatch({type: GET_GAME_ID, payload: gameId})
}

export const getGenres = () => async dispatch =>{
    const res = await fetch('http://localhost:3001/genres')
    const genres = await res.json()
    return dispatch({type: GET_GENRES, payload: genres})
}


export const createGame = (values) => {
    return {type: CREATE_GAME, payload: values}
}

export const reset = ()=>{
    return {type: RESET, payload: []}
}

export const orderBy = (type)=> async dispatch=>{
    return dispatch({type: ORDER_FILTER, payload: type})
}

export const filterGenres = (genres)=> async dispatch=>{
    return dispatch({type: FILTER_GENRES, type: genres})
}