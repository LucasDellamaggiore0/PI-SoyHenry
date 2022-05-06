import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { createGame, getAllGames, getGenres } from "../../redux/actions";
import { Link } from "react-router-dom";

export default function NewGame(){
    
    const [gameInput, setGameInput] = useState({
        name: '',
        description: '',
        rating: '',
        released: '',
        genres: [],
        platforms: []
    })
    
    // console.log(2, gameInput)
    const dispatch = useDispatch();
    const {genres} = useSelector((store)=>store);

    useEffect(()=>{
        dispatch(getGenres())
    },[])

    function handleChange(e){
        setGameInput({
            ...gameInput,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e){
        dispatch(createGame(gameInput))
        dispatch(getAllGames())
        alert('Juego creado exitosamente')
        console.log(gameInput)
    }

    function handleGenres(e){
        if(e.target.value === 'Genres...') return
        if(gameInput.genres.includes(e.target.value)) return
        setGameInput({
            ...gameInput,
            genres: [...gameInput.genres, e.target.value]
        })
        console.log(e.target.value)

    }

    function handlePlatforms(e){
        setGameInput({
            ...gameInput,
            platforms: [...gameInput.platforms, e.target.value]
        })
    }

    
    
    
    return(
        <div>
            <form onSubmit={handleSubmit} >
                <input type="text" name="name" placeholder="Game name..."  onChange={handleChange} />
                <input type="text" name="description" placeholder="Description"   onChange={handleChange} />
                <input type="number" name="rating" min={0} max={5} placeholder="Rating..." onChange={handleChange}/>
                <input type="datetime" name="released" placeholder="Released..."  onChange={handleChange}/>
                <select name="genres" onClick={handleGenres}>
                    <option selected="true" disabled="disabled">Genres...</option>
                    {genres.map((g)=>{
                        return <option value={g.id}>{g.name}</option>
                    })}
                </select>
                <ul>
                    <li>{gameInput.genres.map(g => g + ',')}</li>
                </ul>
                <select name="platforms" onChange={handlePlatforms}>
                    <option value="PC">PC</option>
                    <option value="PS5">PS5</option>
                    <option value="PS5">PS5</option>
                    <option value="PS3">PS3</option>
                    <option value="Linux">Linux</option>
                    <option value="XBOX360">XBOX360</option>
                    <option value="XBOX">XBOX</option>
                    <option value="XBOXOne">XBOXOne</option>
                    <option value="Android">Android</option>
                    <option>macOs</option>
                </select>
                <ul>
                    <li>{gameInput.platforms.map(p => p)}</li>
                </ul>
                <input type="submit"value="Create" />
            </form>
            <Link to={'/home'}>
                <button>Volver al Home</button>
            </Link>
        </div>
    )
}
