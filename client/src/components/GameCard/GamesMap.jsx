import React from 'react'
import GameCard from './GameCard'

const GamesMap = ({ currentPosts }) => {
    return (
        <>
            {
                currentPosts.length > 0 ? 
            currentPosts.map((games) => {
                return <GameCard id={games.id} name={games.name} img={games.img} genres={games.genres} />
            }): <h1>No se encontraron juegos</h1>}
        </>
    )
}

export default GamesMap