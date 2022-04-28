import React from 'react'
// import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getGameTitle} from '../../redux/actions/index'

export default function SearchBar(){
  
  const [search, setSearch] = useState('')
  const [error, setError] = useState(false)
  
  
  const dispatch = useDispatch();

  const {games} = useSelector((store)=> store)

  const handleChange = (e)=>{
    setSearch(e.target.value)
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    if(!search){
      return alert('Debes ingresar un juego para realizar la busqueda')
    }else{
        dispatch(getGameTitle(search))
        setError(true)
    }
  }

  return (
      <div>
        <form onSubmit={handleSubmit}>
          {games.length === 0 && error && <span>No se encontraron juegos con el nombre ingresado</span>}
          <input type="text" placeholder='Game...' onChange={handleChange} value={search}/>
          <button type="submit">Search</button>
        </form>
      </div>
    )
}