import GameCard from './GameCard'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect} from 'react'
import {getAllGames} from '../../redux/actions/index'




const GameContainer = () => {
    const allVideogames = useSelector((store) => store)
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getAllGames())
    }, [])
    return (
        <div className='games--container'>
            {
                allVideogames.games.map(el =>{
                    return <GameCard id={el.id} name={el.name} img={el.img} genres={el.genres}/>
                })
            }
        </div>
    )
}

export default GameContainer
