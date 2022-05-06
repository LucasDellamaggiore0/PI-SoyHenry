import GameCard from "./GameCard";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllGames } from "../../redux/actions/index";
import { Pagination } from "../Pagination/Pagination";
import GamesMap from "./GamesMap";

const GameContainer = () => {
  const { games, loading } = useSelector((store) => store);
  const [posts, setPosts] = useState(games);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(15);
  const dispatch = useDispatch();

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    dispatch(getAllGames());
  }, []);

  useEffect(() => {
    setPosts(games);
    setCurrentPage(1);
  }, [games]);

  console.log(games.length, posts.length);
  if (loading) {
    return <h1>Cargando...</h1>;
  } else {
    return (
      <>
        <Pagination
          postsPerPage={postsPerPage}
          allPosts={posts.length}
          setCurrentPage={setCurrentPage}
        />
        <div className="games--container">
          <GamesMap currentPosts={currentPosts} />
        </div>
      </>
    );
  }
};

export default GameContainer;
