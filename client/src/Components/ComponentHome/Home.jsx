import React, { useEffect } from "react";
import Cards from "../ComponentCards/Cards";
import Navbar from "../ComponentNavbar/Navbar";
import SearchBar from "../ComponentSearchBar/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { getDog } from "../../Redux/Action/action";
import Filters from "../ComponentFilters/Filter";

function Home({ currentPage, setCurrentPage }) {
  const dispatch = useDispatch();
  const allDog = useSelector((state) => state.allDog);

  useEffect(() => {
    dispatch(getDog());
  }, []);

  return (
    <div>
      <Navbar />
      <SearchBar setCurrentPage={setCurrentPage} />
      <Filters />
      <Cards
        info={allDog}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      ></Cards>
    </div>
  );
}

export default Home;
