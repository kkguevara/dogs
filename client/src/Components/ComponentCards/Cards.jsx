import React from "react";
import Card from "../ComponentCard/Card";
import style from "../../Styles/styles.module.css";
import Pagination from "../ComponentPagination/Pagination";

const Cards = ({ info, currentPage, setCurrentPage }) => {
  const dogsPerPage = 8;

  const totalPages = Math.ceil(info.length / dogsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const showContent = info;

  return (
    <>
      {showContent && (
        <div>
          {info.length === 0 ? (
            <div>No se encontraron razas de perros</div>
          ) : (
            <div className={style.cards_container}>
              {info
                .slice(
                  (currentPage - 1) * dogsPerPage,
                  currentPage * dogsPerPage
                )
                .map((d) => {
                  return (
                    <div className={style.cards_container}>
                      <Card
                        key={d.id}
                        id={d.id}
                        imagen={d.imagen}
                        nombre={d.nombre}
                        peso={d.peso}
                        temperamentos={d.temperamentos}
                      />
                    </div>
                  );
                })}
            </div>
          )}
          <Pagination
            currentPage={currentPage} //pagina actual
            totalPages={totalPages}
            handlePrevPage={handlePrevPage}
            handlePageChange={handlePageChange}
            handleNextPage={handleNextPage} // pagina siguiente
          />
          <br />
        </div>
      )}
    </>
  );
};

export default Cards;
