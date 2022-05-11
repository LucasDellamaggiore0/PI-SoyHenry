import '../../scss/main.scss'
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
    

        return(
            <>
                <h2 className='game__details--title'>{game[0]?.name}</h2>
                <div className='game__details--img--container'>
                    <img className="game__details--img" src={game[0]?.img} alt="img not found" />
                </div>
                <section className='game__details--description--container'>
                    <p className='game__detailes--description--title'>Description</p>
                    <p className='game__details--description'>{game[0]?.description}</p>
                </section>
                <section className='details__container--game'>
                    <div className='detail__genres--container'>
                        <p className='detail__genres--title'>Genres</p>
                        {game[0]?.genres.map(g=>{
                            return <p>{g}</p>
                        })}
                    </div>
                    <div className='detail__platforms--container'>
                        <p className='detail__platforms--title'>Platforms</p>
                        {game[0]?.platforms.map(p=>{
                            return <p>{p}</p>
                        })}
                    </div>
                    <div className='detail__released--container'>
                        <p className='detail__released--title'>Released</p>
                        <p>{game[0]?.released.slice(0,10)}</p>
                    </div>
                    <div className='detail__rating--container'>
                        <p className='detail__rating--title'>Rating</p>
                        {game[0]?.rating >= 0 && <p>{game[0]?.rating}</p>}
                    </div>
                </section>
            </>
        )
    }


export default GameDetailContainer;