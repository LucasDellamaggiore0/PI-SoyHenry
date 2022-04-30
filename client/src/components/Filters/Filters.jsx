import {React, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux"
import {orderBy, filterGenres, getGenres} from "../../redux/actions/index"

export default function Filters(){
    const dispatch = useDispatch();
    const {genres} = useSelector((store)=> store)

    useEffect(()=>{
        dispatch(getGenres())
    },[])

    function orderSelect(e){
        e.preventDefault();
        dispatch(orderBy(e.target.value))
        console.log(1, e.target.value)
    }

    function genresSelect(e){
        e.preventDefault();
        dispatch(filterGenres(e.target.value))
    }

    return(
        <div>
            <section className="orderContainer">
                <select name="order" onChange={orderSelect}>
                    <option value="ALL">Todos los juegos</option>
                    <option value="A-Z">A - Z</option>
                    <option value="Z-A">Z - A</option>
                    <option value="AS">Mayor rating</option>
                    <option value="DES">Menor rating</option>
                    <option value="GAME_API">Juegos de la api</option>
                    <option value="GAME_DB">Juegos creados</option>
                </select>
            </section>
            <section className="genresContainer">
                <select name="genres" onChange={genresSelect}>
                    {genres.map((g)=>{
                        <option value={g.name}>{g.name}</option>
                    })}
                </select>
            </section>
        </div>
    )

}