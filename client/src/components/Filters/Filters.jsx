import {React, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux"

import {filterGenres, getAllGames, getGenres, orderByName, orderByRating, gamesDB, gamesAPI, setLoading} from "../../redux/actions/index"

export default function Filters(){
    const dispatch = useDispatch();
    const {genres} = useSelector((store)=> store)
    useEffect(()=>{
        dispatch(getGenres())
    },[])

    function orderName(e){
        e.preventDefault()
        if(e.target.value === 'Order by name...') return
        dispatch(orderByName(e.target.value))
        // console.log(e.target.value)
    }

    function orderRating(e){
        e.preventDefault()
        if(e.target.value === 'Order by rating...') return
        dispatch(orderByRating(e.target.value))
        // console.log(e.target.value)
    }

    function filterGenre(e){
        e.preventDefault()
        // dispatch(getAllGames())
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
        <div className="filters__container">
            <section className="orders__container">
                <select className="orderByName" name="orderName" onClick={orderName}>
                    <option selected="true" disabled="disabled">Order by name...</option>
                    <option value="A-Z">A - Z</option>
                    <option value="Z-A">Z - A</option>
                </select>
                <select name="orderRating" onClick={orderRating}>
                    <option selected="true" disabled="disabled">Order by rating...</option>
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