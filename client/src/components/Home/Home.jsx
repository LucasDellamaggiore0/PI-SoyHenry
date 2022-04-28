import React from "react";
import GameContainer from "../GameCard/GameContainer";
import NavBar from "../NavBar/NavBar";


export default function Home(){
    return(
        <div className="games-container">
            <NavBar/>
            <GameContainer/>
        </div>
    )
}