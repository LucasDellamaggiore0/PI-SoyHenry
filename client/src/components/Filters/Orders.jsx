import {React} from "react";
import {useDispatch} from "react-redux"
import { orderByName, orderByRating } from "../../redux/actions";

export default function Orders(){
    const dispatch = useDispatch();

    function orderName(e){
        e.preventDefault()
        if(e.target.value === 'Order by name...') return
        dispatch(orderByName(e.target.value))
        // console.log(e.target.value)
    }

    function orderRating(e){
        e.preventDefault()
        if(e.target.value === 'Order by rating...') return
        dispatch(orderByRating(e.target.value))
    }
    return(
        <div className="orders--container">
            <div className="orders--name__container">
                <span>Order by name: </span>
                <button onClick={orderName} value="A-Z">A-Z</button>
                <button onClick={orderName} value="Z-A">Z-A</button>
            </div>
            <div className="orders--rating__container">
                <span>Order by rating: </span>
                <button onClick={orderRating} value="ASC">Higher rating</button>
                <button onClick={orderRating} value="DESC">Lower rating</button>
            </div>
        </div>
        
    )
}