import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getGameTitle, getGenres, setLoading} from '../../redux/actions/index'
import '../../scss/_home.scss'
import {Link} from 'react-router-dom'

export default function SearchBar(){
  
  const [search, setSearch] = useState('')
  const [error, setError] = useState(false)
  
  
  const dispatch = useDispatch();

  const {games} = useSelector((store)=> store)

  const handleChange = (e)=>{
    setSearch(e.target.value)
    // console.log(2, e.target.value)
    // console.log(1, games)
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    if(!search){
      return alert('Debes ingresar un juego para realizar la busqueda')
    }else{
        dispatch(getGameTitle(search))
        dispatch(setLoading())
        setError(true)
    }
  }

  return (
      <div className='searchBar--container'>
        <form onSubmit={handleSubmit}>
          {games.length === 0 && error && <span className='alert--msg'>No se encontraron juegos con el nombre ingresado</span>}
          <input className="searchbar--inpt" type="text" placeholder='Game...' onChange={handleChange} value={search}/>
          <button className='searchbar__btn' type="submit">Search</button>
          <Link to={'/newgame'}>
            <button className='newGame--btn'>Create Game</button>
          </Link>
        </form>
      </div>
    )
}