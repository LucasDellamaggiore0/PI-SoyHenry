import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { createGame, getAllGames, getGenres } from "../../redux/actions";
import { Link } from "react-router-dom";

export default function NewGame(){
    
    function validateInputs(input){
        const errors = {
            statusName: true,
            statusDescription: true,
            statusRating: true,
            statusDate: true,
        }
        if(!input.name){
            errors.name = 'Name is required'
            errors.statusName = false
        }else{
            errors.statusName = true
        }
        if(!input.description){
            errors.description = 'Description is required'
            errors.statusDescription = false
        }else{
            errors.statusDescription = true
        }
        if(!/^[0-5]$/.test(input.rating)){
            errors.rating = 'The rating must contain values ​​between 0 and 5'
            errors.statusRating = false
        }else{
            errors.statusRating = true
        }
        if(!/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/.test(input.released)){
            errors.date = 'Date is invalid. Ej: 12/12/2001'
            errors.statusDate = false
        }else{
            errors.statusDate = true
        }
        return errors
    }

    const [gameInput, setGameInput] = useState({
        name: '',
        description: '',
        rating: '',
        released: '',
        genres: [],
        platforms: [],
        
    })
    
    const [error, setError] = useState({})
    

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
            setError(validateInputs({
                ...gameInput,[e.target.name]: e.target.value
            }))
    }

    function handleSubmit(e){
        e.preventDefault()
        if(error.statusName && error.statusDescription && error.statusRating && error.statusDate){
            dispatch(createGame(gameInput))
            alert('Game created successfully!')
        }else{
            alert('Invalid or empty fields, check the form')
        }
    }

    function handleGenres(e){
        if(e.target.value === 'Genres...') return
        if(gameInput.genres.includes(e.target.value)) return
        setGameInput({
            ...gameInput,
            genres: [...gameInput.genres, e.target.value]
        })
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
            <section className="form--newGame__container">
                <form className="form--newGame" onSubmit={handleSubmit} >
                    <h2 className="form__newGame--title">CREATE NEW GAME</h2>
                    <section className="input__newGame--name">
                        <input type="text" name="name" placeholder="Game name..."  onChange={handleChange} value={gameInput.name}/>
                        {error.name && (<span className="error__msg--form">{error.name}</span>)}
                    </section>
                    <section className="input__newGame--description">
                        <input type="text" name="description" placeholder="Description" onChange={handleChange} value={gameInput.description}/>
                        {error.description && (<span className="error__msg--form">{error.description}</span>)}
                    </section>
                    <section className="input__newGame--rating">
                        <input type="text" name="rating" placeholder="Rating..." onChange={handleChange} value={gameInput.rating}/>
                        {error.rating && (<span className="error__msg--form">{error.rating}</span>)}
                    </section>
                    <section className="input__newGame--released">
                        <input type="date" name="released" placeholder="YYYY/MM/DD"  onChange={handleChange} value={gameInput.released} pattern="\d{4}-\d{2}-\d{2}"/>
                        {error.date && (<span className="error__msg--form">{error.date}</span>)}
                    </section>
                    <section className="select__newGame--genres">
                        <select name="genres" onClick={handleGenres}>
                            <option selected="true" disabled="disabled">Genres...</option>
                            {genres.map((g)=>{
                                return <option value={g.id}>{g.name}</option>
                            })}
                        </select>
                        <ul>
                            {gameInput.genres?.map(g => {let gen = genres?.find(e => e.id == g)
                                    return <li className="option__newGame--select">{gen?.name}</li>
                            })}
                            
                        </ul>
                    </section>
                    <section className="select__newGame--platforms">
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
                            <li className="option__newGame--select">{gameInput.platforms.map(p => {
                                return p + ','
                            })}</li>
                        </ul>
                    </section>
                    <button className="newGame__btn--create" onClick={handleSubmit}>Create</button>
                </form>
                <div className="form__newGame--btnBack">
                    <Link to={'/home'}>
                        <button name="create">Home</button>
                    </Link>
                </div>
            </section>
    )
}
