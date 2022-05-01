import GameCard from './GameCard'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect} from 'react'
import {getAllGames} from '../../redux/actions/index'




const GameContainer = () => {
    const {games, gamesFiltered, orderedGames,filteredGames} = useSelector((store) => store)
    const dispatch = useDispatch();
    const [cardsGames, setCardsGames] = useState(games)
    
    useEffect(()=>{
        if(games.length === 0){
            dispatch(getAllGames())
        }
    }, [])
    
    useEffect(()=>{
        if(orderedGames === 'ALL' && filteredGames === 'ALL'){
            setCardsGames(games)
        }else{
            setCardsGames(gamesFiltered)
        }
        console.log(1, gamesFiltered)
        console.log(2, games)
        console.log(3, filteredGames)
    }, [games, gamesFiltered, orderedGames, filteredGames])
    
    return (
        <div className='games--container'>
            {
                cardsGames.map(el =>{
                    return <GameCard id={el.id} name={el.name} img={el.img} genres={el.genres}/>
                })
            }
        </div>
    )
}

export default GameContainer
