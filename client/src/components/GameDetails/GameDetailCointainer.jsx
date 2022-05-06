import '../../scss/main.scss'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect} from 'react'
import {getGameById} from '../../redux/actions/index'
import { Link, useParams } from 'react-router-dom'
import {reset} from '../../redux/actions/index'

const GameDetailContainer = () =>{
    const dispatch = useDispatch();
    const {game} = useSelector((store)=>store)
    const {id} = useParams();
    
    useEffect(()=>{
        dispatch(getGameById(id))
        return (()=>{
            dispatch(reset())
        })
    },[])
    return(
        <div className='game__details'>
            <h2 className='game__details--title'>{game[0]?.name}</h2>
            <p>{game[0]?.desription}</p>
            <img className="game__details--img" src={game[0]?.img} alt="img not found" />
            <div className='details__container--game'>
                <span>{game[0]?.genres}</span>
                <p>{game[0]?.platforms}</p>
                <p>{game[0]?.released}</p>
                {game[0]?.rating > 0 && <p>{game[0]?.rating}</p>}
            </div>
            <Link to='/home'>
                <button>Volver al Home</button>
            </Link>
        </div>
    )

} 


export default GameDetailContainer;