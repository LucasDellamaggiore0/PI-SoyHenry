import React from "react";

export default function GameCard(props){
    return(
        <div>
            <article>
                <h2>{props.name}</h2>
                <img src={props.img} alt="img not found" />
                <span>{props.genres?.join('-')}</span>
            </article>
        </div>
    )
}