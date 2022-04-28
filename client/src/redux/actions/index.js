export const GET_ALL_GAMES = 'GET_ALL_GAMES'
export const CREATE_GAME = 'CREATE_GAME'
export const GET_GENRES = 'GET_GENRES'
export const GET_GAME_ID = 'GET_GAME_ID'

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
    return fetch(`http://localhost:3001/videogame/${id}`)
        .then(res => res.json)
        .then(game => dispatch({type: GET_GAME_ID, payload: game}))
}

export const getGenres = () => async dispatch =>{
    const res = await fetch('http://localhost:3001/genres')
    const genres = await res.json()
    return dispatch({type: GET_GENRES, payload: genres})
}


export const createGame = (values) => {
    return {type: CREATE_GAME, payload: values}
}