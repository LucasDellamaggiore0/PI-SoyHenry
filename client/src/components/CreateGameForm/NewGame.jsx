import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { createGame, getAllGames, getGenres } from "../../redux/actions";
import { Link } from "react-router-dom";

export default function NewGame(){
    
    function validateInputs(input){
        const errors = {}
        if(!input.name){
            errors.name = 'Name is required'
        }
        if(!/^[A-Za-z0-9\s]+$/g.test(input.name)){
            errors.nameInvalid = 'Name is invalid'
        }
        if(!input.description){
            errors.description = 'Description is required'
        }
        if(!/^[0-5]$/.test(input.rating)){
            errors.rating = 'The rating must contain values ​​between 0 and 5'
        }
        if(!/^([0]?[1-9]|[1|2][0-9]|[3][0|1])[/-]([0]?[1-9]|[1][0-2])[/-]([0-9]{4})$/.test(input.released)){
            errors.date = 'Date is invalid. Ej: 11/11/2001'
        }
        return errors
    }

    const [gameInput, setGameInput] = useState({
        name: '',
        description: '',
        rating: '',
        released: '',
        genres: [],
        platforms: []
    })
    
    const [error, setError] = useState({})
    // const [status, setStatus] = useState(false)

    const dispatch = useDispatch();
    const {genres} = useSelector((store)=>store);

    useEffect(()=>{
        dispatch(getGenres())
    },[])

    function handleChange(e){
        e.preventDefault()
        setGameInput({
            ...gameInput,
            [e.target.name]: e.target.value
        })
        setError(validateInputs({...gameInput, [e.target.name]: e.target.value}))
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(createGame(gameInput))
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
        if(e.target.value === 'Platforms...') return
        if(gameInput.platforms.includes(e.target.value)) return
        setGameInput({
            ...gameInput,
            platforms: [...gameInput.platforms, e.target.value]
        })
    }

    
    
    
    return(
        <div>
            <form onSubmit={handleSubmit} >
                <input type="text" name="name" placeholder="Game name..."  onChange={handleChange} value={gameInput.name}/>
                {error.name && (<p>{error.name}</p>)}
                <input type="text" name="description" placeholder="Description" onChange={handleChange} value={gameInput.description}/>
                {error.description && (<p>{error.description}</p>)}
                <input type="text" name="rating" min={0} max={5} placeholder="Rating..." onChange={handleChange} value={gameInput.rating}/>
                {error.rating && (<p>{error.rating}</p>)}
                <input type="text" name="released" placeholder="DD-MM-YYYY"  onChange={handleChange} value={gameInput.released}/>
                {error.date && (<p>{error.date}</p>)}
                <select name="genres" onClick={handleGenres}>
                    <option selected="true" disabled="disabled">Genres...</option>
                    {genres.map((g)=>{
                        return <option value={g.id}>{g.name}</option>
                    })}
                </select>
                <ul>
                    <li>{
                        gameInput.genres.map(g => {
                            return g + ','
                        })
                    }</li>
                </ul>
                <select name="platforms" onClick={handlePlatforms}>
                    <option selected="true" disabled="disabled">Platforms...</option>
                    <option value="PC">PC</option>
                    <option value="PS5">PS5</option>
                    <option value="PS4">PS4</option>
                    <option value="PS3">PS3</option>
                    <option value="Linux">Linux</option>
                    <option value="XBOX360">XBOX360</option>
                    <option value="XBOX">XBOX</option>
                    <option value="XBOXOne">XBOXOne</option>
                    <option value="Android">Android</option>
                    <option value="macOs">macOs</option>
                </select>
                <ul>
                    <li>{gameInput.platforms.map(p => {
                        return p + ','
                    })}</li>
                </ul>
                <button onClick={handleSubmit}>Create</button>
            </form>
            <Link to={'/home'}>
                <button name="create">Volver al Home</button>
            </Link>
        </div>
    )
}
