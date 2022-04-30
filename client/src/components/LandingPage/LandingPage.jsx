import React from "react";
import { Link } from "react-router-dom";


export default function LandingPage(){
    return(
        <div className="landing_page--container">
            <h1>Landing page</h1>
            <Link to='/home'>
                <button>Ir al Home</button>
            </Link>
        </div>
    )
}