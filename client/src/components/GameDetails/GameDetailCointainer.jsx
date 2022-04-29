import Details from './Details'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect} from 'react'
import {getGameById} from '../../redux/actions/index'
import { useParams } from 'react-router-dom'
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
    console.log(2,id)
    return(
        <div >
            <h2>{game[0]?.name}</h2>
            <p>{game[0]?.desription}</p>
            <img src={game[0]?.img} alt="img not found" />
            <span>{game[0]?.genres?.join('-')}</span>
            <p>{game[0]?.platforms}</p>
            <p>{game[0]?.released}</p>
            {game[0]?.rating > 0 && <p>{game[0]?.rating}</p>}
        </div>
    )

} 


export default GameDetailContainer;