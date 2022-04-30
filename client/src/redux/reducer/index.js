import {GET_ALL_GAMES, CREATE_GAME, GET_GENRES, GET_GAME_ID, RESET,ORDER_FILTER,
FILTER_GENRES} from '../actions/index'

const initialState = {
    games: [],
    game: [],
    genres: [],
    gameCreated: [],
    gamesFiltered: [],
    orderedGames : 'ALL',
    filteredGames: 'ALL'
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ALL_GAMES:
            return{
                ...state,
                games: [...action.payload]
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
        case ORDER_FILTER:
            switch(action.payload){
                case 'A-Z':
                    return{
                        ...state,
                        gamesFiltered : [...state.gamesFiltered].sort((a,b)=>{
                            return a.name > b.name ? 1 : b.name > a.name ? -1 : 0
                        }),
                        orderedGames : action.payload
                    }
                case 'Z-A':
                    return{
                        ...state,
                        gamesFiltered : [...state.gamesFiltered].sort((a,b)=>{
                            return (a.name < b.name ? 1 : b.name < a.name ? -1 : 0)
                        }),
                        orderedGames : action.payload
                    }
                case 'AS':
                    return{
                        ...state,
                        gamesFiltered : [...state.gamesFiltered].sort((a,b)=>{
                            return a.rating < b.rating ? 1 : b.rating < a.rating ? -1 : 0
                        }),
                        orderedGames : action.payload
                    }
                case 'DES':
                    return{
                        ...state,
                        gamesFiltered : [...state.gamesFiltered].sort((a,b)=>{
                            return a.rating > b.rating ? 1 : b.rating > a.rating ? -1 : 0
                        }),
                        orderedGames : action.payload
                    }
                case 'GAME_API':
                    return{
                        ...state,
                        gamesFiltered : [...state.games].filter((i)=>{
                            return typeof i.id === 'number'
                        }),
                        orderedGames: action.payload
                    }
                case 'GAME_DB':
                    return{
                        ...state,
                        gamesFiltered : [...state.games].filter((i)=>{
                            return typeof i.id === 'string'
                        }),
                        orderedGames: action.payload
                    }
                case 'ALL':
                    return{
                        ...state,
                        filteredGames : [...state.games],
                        orderedGames: action.payload
                    }
                default:
                    return state.games
            }
        case FILTER_GENRES:
            if(action.payload === 'ALL'){
                return{
                    ...state,
                    filteredGames: state.games,
                    orderedGames: action.payload
                }
            }else{
                return{
                    ...state,
                    filteredGames: state.games.filter((g)=>{
                        g.genres.includes(action.payload)
                    }),
                    orderedGames: action.payload
                }
            }
        default:
            return state;
    }
}


export default reducer;