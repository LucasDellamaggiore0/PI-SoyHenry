import React from 'react'

export const Pagination = ({ postsPerPage, allPosts, setCurrentPage }) => {

    const pages = []
    console.log(allPosts.length)
    for (let i = 1; i <= Math.ceil(allPosts / postsPerPage); i++) {
        console.log(i)
        pages.push(i)
    }

    function pagination(number) {
        setCurrentPage(number)
    }

    return (
        <div>
            {
                pages?.map((num) => {
                    return <button onClick={() => pagination(num)}>{num}</button>
                })
            }
        </div>
    )
}
