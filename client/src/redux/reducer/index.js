import {GET_ALL_GAMES, CREATE_GAME, GET_GENRES, GET_GAME_ID, RESET,ORDER_BY_NAME, ORDER_BY_RATING, FILTER_GENRES, GAMES_ORIGIN, LOADING} from '../actions/index'

const initialState = {
    games: [],
    game: [],
    genres: [],
    gameOrigin: 'all',
    loading: true
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ALL_GAMES:
            return{
                ...state,
                games: [...action.payload],
                loading: action.loader
            }
        case GET_GAME_ID:
            return {
                ...state,
                game: [...action.payload]
            }
        case GET_GENRES:
            return {
                ...state,
                genres: [...state.genres, ...action.payload]
            }
        case CREATE_GAME:
            return {
                ...state,
                gameCreated: [...state.gameCreated, action.payload]
            }
        case RESET:
            return{
                ...state,
                game: action.payload
            }
        case ORDER_BY_NAME:
            let all = state.games
            let sort = action.payload === 'A-Z' ? all.sort((a,b)=>{
                if(a.name > b.name) return 1
                if(a.name < b.name) return -1
                return 0
            }) : all.sort((a,b)=>{
                if(a.name > b.name) return -1
                if(a.name < b.name) return 1
                return 0
            })
            return{
                ...state,
                games: sort
            }
        case ORDER_BY_RATING:
            let allGames = state.games
            let ascDesc = action.payload === 'ASC' ? allGames.sort((a,b)=>{
                if(a.rating < b.rating) return 1
                if(a.rating > b.rating) return -1
                return 0
            }): allGames.sort((a,b)=>{
                if(a.rating < b.rating) return -1
                if(a.rating > b.rating) return 1
                return 0
            })
            return{
                ...state,
                games: ascDesc
            }
        case FILTER_GENRES:
            return{
                ...state,
                games: [...action.payload],
                loading: action.loader
            }
        case GAMES_ORIGIN:
            return{
                ...state,
                games: action.payload,
                gameOrigin: action.origin,
                loading: action.loader
            }
        case LOADING:
            return{
                ...state,
                loading: action.payload
            }
        default:
            return state;
    }
}


export default reducer;