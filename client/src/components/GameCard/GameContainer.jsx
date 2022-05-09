
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllGames } from "../../redux/actions/index";
import { Pagination } from "../Pagination/Pagination";
import GamesMap from "./GamesMap";
import '../../scss/_home.scss'
import Orders from "../Filters/Orders";

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

  if (loading) {
    return (
      <div className="loader-content">
        <h1 className="loader-title">Cargando...</h1>;
      </div>
    )
  } else {
    return (
      <>
        <Orders/>
        <section className="gameCard--container">
          <GamesMap currentPosts={currentPosts} />
        </section>
        <section className="pagination--container">
          <Pagination
            postsPerPage={postsPerPage}
            allPosts={posts.length}
            setCurrentPage={setCurrentPage}
          />
        </section>
      </>
    );
  }
};

export default GameContainer;
