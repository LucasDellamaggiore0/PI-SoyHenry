import React from "react";
import { Link } from "react-router-dom";

export default function GameCard(props){
    return(
        <div>
            <article>
                <Link to={`/details/${props.id}`}>
                    <h2>{props.name}</h2>
                </Link>
                <img src={props.img} alt="img not found" />
                <span>{props.genres?.join('-')}</span>
            </article>
        </div>
    )
}