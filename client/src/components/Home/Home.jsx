import React from "react";
import GameContainer from "../GameCard/GameContainer";
import NavBar from "../NavBar/NavBar";

export default function Home(){
    return(
        <div className="home--container">
            <NavBar/>
            <GameContainer/>
        </div>
    )
}