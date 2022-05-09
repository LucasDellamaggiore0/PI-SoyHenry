import React from 'react'

export const Pagination = ({ postsPerPage, allPosts, setCurrentPage }) => {

    const pages = []
    for (let i = 1; i <= Math.ceil(allPosts / postsPerPage); i++) {
        pages.push(i)
    }

    function pagination(number) {
        setCurrentPage(number)
    }

    return (
        <>
            {
                pages?.map((num) => {
                    return <button onClick={() => pagination(num)}>{num}</button>
                })
            }
        </>
    )
}
