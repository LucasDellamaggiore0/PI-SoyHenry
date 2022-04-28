import {GET_ALL_GAMES, CREATE_GAME, GET_GENRES, GET_GAME_ID} from '../actions/index'

const initialState = {
    games: [],
    game: [],
    genres: [],
    gameCreated: []
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
                game: [...state.game, action.payload]
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
        default:
            return state;
    }
}


export default reducer;