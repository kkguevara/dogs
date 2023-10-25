import React, { useState, useEffect } from "react";
import style from "../../Styles/styles.module.css";

const Pagination = ({
  currentPage,
  totalPages,
  handlePrevPage,
  handlePageChange,
  handleNextPage,
}) => {
  const [inputPage, setInputPage] = useState(currentPage);

  useEffect(() => {
    setInputPage(currentPage);
  }, [currentPage]);

  const handleInputChange = (event) => {
    setInputPage(event.target.value);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter") {
      const newPage = parseInt(inputPage);
      if (newPage >= 1 && newPage <= totalPages) {
        handlePageChange(newPage);
      } else {
        setInputPage(currentPage);
      }
    }
  };

  return (
    <div>
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className={style.button_pag}
      >
        &laquo;
      </button>
      <input
        type="number"
        value={inputPage}
        min={1}
        max={totalPages}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        readOnly
        className={style.input_pag}
      />
      de {totalPages} páginas
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className={style.button_pag}
      >
        &raquo;
      </button>
    </div>
  );
};

export default Pagination;
