import React from "react";
import { Link } from "react-router-dom";

export default function GameCard(props){
    // console.log(1, props.genres)
    return(
            <article className="game--content">
                <Link to={`/details/${props.id}`}>
                    <h2 className="game--content__title">{props.name}</h2>
                </Link>
                    <img className="gamecontent__img" src={props.img} alt="img not found" />
                    <span>{props.genres?.map((g)=>{
                        if(typeof g === 'object'){
                            return g.name
                        }else{
                            return g
                        }
                    }).join('-')}</span>
            </article>
    )
}