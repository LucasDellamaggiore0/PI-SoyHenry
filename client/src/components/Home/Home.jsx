import React from "react";
import GameContainer from "../GameCard/GameContainer";
import NavBar from "../NavBar/NavBar";
import SearchBar from "../SearchBar/SearchBar";
import '../../scss/_home.scss'
export default function Home(){
    return(
        <div className="home--container">
            <section className="navbar--container">
                <NavBar/>
            </section>
            <div className="container">
                <section className="searchBar--container">
                    <SearchBar/>
                </section>
                <section className="games--container">
                    <h2 className="games--container__subtitle">Currently trending games</h2>
                    <GameContainer/>
                </section>
            </div>
        </div>
    )
}