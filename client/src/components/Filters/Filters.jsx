import {React, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux"

import {filterGenres, getAllGames, getGenres, orderByName, orderByRating, gamesDB, gamesAPI} from "../../redux/actions/index"

export default function Filters(){
    const dispatch = useDispatch();
    const {genres, gameOrigin} = useSelector((store)=> store)
    useEffect(()=>{
        dispatch(getGenres())
    },[])

    function orderName(e){
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        // console.log(e.target.value)
    }

    function orderRating(e){
        e.preventDefault()
        dispatch(orderByRating(e.target.value))
        // console.log(e.target.value)
    }

    function filterGenre(e){
        e.preventDefault()
        // dispatch(getAllGames())
        if(e.target.value === 'ALL'){
            dispatch(getAllGames())
        }
        if(gameOrigin === 'all'){
            dispatch(filterGenres(e.target.value))
        }
        if(gameOrigin === 'db')
        console.log(e.target.value)
    }

    function handleGamesOrigin(e){
        e.preventDefault()
        if(e.target.value === 'ALL') dispatch(getAllGames())
        if(e.target.value === 'DB') dispatch(gamesDB())
        if(e.target.value === 'API') dispatch(gamesAPI())
    }
    

    return(
        <div className="filters__container">
            <section className="orders__container">
                <select className="orderByName" name="orderName" onChange={orderName}>
                    <option value="A-Z">A - Z</option>
                    <option value="Z-A">Z - A</option>
                </select>
                <select name="orderRating" onChange={orderRating}>
                    <option value="ASC">Mayor rating</option>
                    <option value="DESC">Menor rating</option>
                </select>
                <select name="filterGenre" onChange={filterGenre}>
                    <option>ALL</option>
                    {genres.map(g => <option value={g.name}>{g.name}</option>)}
                </select>
                <select name="gamesByOrigin" onChange={handleGamesOrigin}>
                    <option value="DB">DB</option>
                    <option value="API">API</option>
                    <option value="ALL">ALL</option>
                </select>
                
            </section>
            
        </div>
    )

}