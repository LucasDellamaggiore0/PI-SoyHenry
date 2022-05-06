import GameCard from './GameCard'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect} from 'react'
import {getAllGames} from '../../redux/actions/index'
import { Pagination } from '../Pagination/Pagination'




const GameContainer = () => {
    const {games} = useSelector((store) => store)
    const [posts, setPosts] = useState(games)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(15)
    const dispatch = useDispatch();
    
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

    useEffect(()=>{
            dispatch(getAllGames())
    }, [])
    
    useEffect(()=>{
        setPosts(games)
        setCurrentPage(1)
    },[games])


    return (
        <>
            <Pagination 
                postsPerPage={postsPerPage}
                allPosts={posts.length}
                setCurrentPage={setCurrentPage}
            />
        <div className='games--container'>
            {
                currentPosts.map((games)=>{
                    return <GameCard id={games.id} name={games.name} img={games.img} genres={games.genres}/>
                })
            }
        </div>
        </>
    )
}

export default GameContainer
