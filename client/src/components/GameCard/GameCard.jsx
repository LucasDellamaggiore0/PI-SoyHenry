import React from "react";
import { Link } from "react-router-dom";
import '../../scss/_home.scss'

export default function GameCard(props){
    // console.log(1, props.genres)
    return(
            <article className="game--content">
                <Link to={`/details/${props.id}`}>
                    <h2 className="game--content__title">{props.name}</h2>
                </Link>
                    <img className="game--content__img" src={props.img} alt="img not found" />
                    <div className="game--content__container">
                        <span className="game--content__text">{props.genres?.map((g)=>{
                            if(typeof g === 'object'){
                                return g.name
                            }else{
                                return g
                            }
                        }).join('-')}</span>
                    </div>
            </article>
    )
}