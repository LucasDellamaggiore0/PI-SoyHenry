import {React, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux"

import {filterGenres, getAllGames, getGenres, gamesDB, gamesAPI, setLoading} from "../../redux/actions/index"

export default function Filters(){
    const dispatch = useDispatch();
    const {genres} = useSelector((store)=> store)
    useEffect(()=>{
        dispatch(getGenres())
    },[])


    function filterGenre(e){
        e.preventDefault()
        if(e.target.value === 'ALL'){
            dispatch(setLoading())
            dispatch(getAllGames())
        }
        dispatch(setLoading())
        dispatch(filterGenres(e.target.value))
    }

    function handleGamesOrigin(e){
        e.preventDefault()
        if(e.target.value === 'ALL'){
            dispatch(setLoading())
            dispatch(getAllGames())
        }
        if(e.target.value === 'DB'){
            dispatch(setLoading())
            dispatch(gamesDB())
        }
        if(e.target.value === 'API'){ 
            dispatch(setLoading())
            dispatch(gamesAPI())
        }
    }
    

    return(
            <div className="filters--container">
                <section className="filterByGenres"  name="filterGenre" onChange={filterGenre}>
                    <p className="filterTitle">Genres</p>
                    {genres.map(g => <button value={g.name} onClick={filterGenre}>{g.name}</button>)}
                    
                </section>
                <section className="filterByOrigin">
                    <p className="filterTitle">Origin of games</p>
                    <button onClick={handleGamesOrigin} value="DB">My Games</button>
                    <button onClick={handleGamesOrigin} value="API">API Games</button>
                    <button onClick={handleGamesOrigin} value="ALL">All Games</button>
                </section>    
            </div>
        )

}