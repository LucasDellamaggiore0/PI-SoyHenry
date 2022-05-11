import React from 'react'
import { useDispatch } from 'react-redux'
import { changeCurrentPage } from '../../redux/actions';


export const Pagination = ({ postsPerPage, allPosts}) => {
    const dispatch = useDispatch();
    const pages = []
    for (let i = 1; i <= Math.ceil(allPosts / postsPerPage); i++) {
        pages.push(i)
    }

    function pagination(number) {
        // setCurrentPage(number)
        dispatch(changeCurrentPage(number))
    }

    return (
        <>
            {
                pages?.map((num) => {
                    return <button key={num} onClick={() => pagination(num)}>{num}</button>
                })
            }
        </>
    )
}
