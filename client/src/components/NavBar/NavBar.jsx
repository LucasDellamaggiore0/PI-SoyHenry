
import React from 'react'
import Filters from "../Filters/Filters"
import '../../scss/_home.scss'
import {Link} from 'react-router-dom'

const NavBar = () => {
    return (
        <>
            <Link to='/'>
                <p className='title-page'>GAMELAND</p>
            </Link>
            <Filters/>
        </>
)
}

export default NavBar


