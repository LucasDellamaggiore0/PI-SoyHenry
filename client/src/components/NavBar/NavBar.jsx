import SearchBar from "../SearchBar/SearchBar"
import React from 'react'
import Filters from "../Filters/Filters"


const NavBar = () => {
    return (
        <div className="navbar--container">
            <SearchBar/>
            <Filters/>
        </div>
)
}

export default NavBar


