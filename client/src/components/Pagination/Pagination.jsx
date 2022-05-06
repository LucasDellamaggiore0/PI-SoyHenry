import React from 'react'

export const Pagination = ({postsPerPage, allPosts, setCurrentPage}) => {
    
    const pages = []
    for (let i = 0; i < Math.ceil(allPosts / postsPerPage); i++) {
        pages.push(i)
    }
    
    function pagination(number){
        setCurrentPage(number)
    }
    
    return (
        <div>
            {
                pages?.map((num)=>{
                    if(num === 0) return
                    return <button onClick={()=>pagination(num)}>{num}</button>
                })
            }
        </div>
    )
}
