
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllGames } from "../../redux/actions/index";
import { Pagination } from "../Pagination/Pagination";
import GamesMap from "./GamesMap";
import '../../scss/_home.scss'
import Orders from "../Filters/Orders";

const GameContainer = () => {
  const { games, loading, currentPage  } = useSelector((store) => store);
  const postsPerPage = 15;
  const dispatch = useDispatch();

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = games.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    dispatch(getAllGames());
  }, [dispatch]);

  if(loading) {
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
            allPosts={games.length}
            // setCurrentPage={setCurrentPage}
          />
        </section>
      </>
    );
  }
};

export default GameContainer;
