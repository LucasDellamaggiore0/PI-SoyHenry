import React from 'react'
import GameCard from './GameCard'
import '../../scss/_home.scss'
const GamesMap = ({ currentPosts }) => {
    return (
        <>
            {
            currentPosts.length > 0 ? 
            currentPosts.map((games) => {
                return <GameCard key={games.id} id={games.id} name={games.name} img={games.img} genres={games.genres} />
            }): <h1 className="alert--msg">No se encontraron juegos</h1>}
        </>
    )
}

export default GamesMap