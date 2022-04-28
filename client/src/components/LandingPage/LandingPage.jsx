import React from "react";
import { Link } from "react-router-dom";


export default function LandingPage(){
    return(
        <div>
            <h1>Landing page</h1>
            <Link to='/home'>
                <button>Ir al Home</button>
            </Link>
        </div>
    )
}