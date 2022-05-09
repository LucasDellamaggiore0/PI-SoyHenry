import React from "react";
import { Link } from "react-router-dom";
import '../../scss/_landingPage.scss'

export default function LandingPage(){
    return(
        <div className="landing_page--container">
            <h1 className="landing_page--title">GAMELAND</h1>
            <p className="landing_page--subtitle">Discover your next favorite game</p>
            <div className="gif--landingPage__container">
                <img src="https://i.gifer.com/PjHw.gif" alt="startGIF" />
            </div>
            <div className="btn--landingPage__container">
                <Link to='/home'>
                    <button className="landingPage--btn">HOME</button>
                </Link>
            </div>
        </div>
    )
}