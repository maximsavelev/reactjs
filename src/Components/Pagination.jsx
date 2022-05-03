import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import "../resources/styles/Pagination.css";
import "../resources/styles/PaginationMedia.css";

function Pagination(props) {
  const navigate = useNavigate();
  const [pages, setPages] = useState([]);

  const range = (start, end) => {
    let length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
  };

  useEffect(() => {
    const totalPageCount = Math.ceil(props.totalCount / props.pageSize);
    const totalPageNumbers = props.siblingCount + 5;
    if (totalPageNumbers >= totalPageCount) {
      setPages(range(1, totalPageCount));
    }

    const leftSiblingIndex = Math.max(
      Number(props.currentPage) - Number(props.siblingCount),
      1
    );
    const rightSiblingIndex = Math.min(
      Number(props.currentPage) + Number(props.siblingCount),
      totalPageCount
    );

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * props.siblingCount;
      let leftRange = range(1, leftItemCount);

      setPages([...leftRange, "...", totalPageCount]);
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * props.siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      setPages([firstPageIndex, "...", ...rightRange]);
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      setPages([firstPageIndex, "...", ...middleRange, "...", lastPageIndex]);
    }
  }, [props.totalCount, props.currentPage]);

  const navigateOnPage = (page) => {
    navigate(props.pageUrl + page);
  };

  const next = () => {
    if(props.currentPage < Math.ceil(props.totalCount / props.pageSize)){
      navigate(props.pageUrl + (Number(props.currentPage) + 1));
    }
  };

  const prev = () => {
    if(props.currentPage > 1){
      navigate(props.pageUrl + (Number(props.currentPage) - 1));
    }
  };


  if(props.totalCount<=2){
    return(
        <>

        </>
    );
  }

  return (
      <>
    <div className="main">
      <ul className="pagination">
        <li onClick={prev}> &#10094; </li>
        {pages.map((page) => {
          if (page === Number(props.currentPage)) {
            return (
              <li
                key={uuidv4()}
                onClick={() => navigateOnPage(page)}
                className="chosenPage"
              >
                {page}
              </li>
            );
          } else {
            if (!(page === "...")) {
              return (
                <li key={uuidv4()} onClick={() => navigateOnPage(page)}>
                  {page}
                </li>
              );
            } else {
              return (
                <li
                  style={{ cursor: "auto", background: "#FAFAFA00" }}
                  key={uuidv4()}
                >
                  {page}
                </li>
              );
            }
          }
        })}
        <li onClick={next}> &#10095; </li>
      </ul>
    </div>
      </>
  );
}

export default Pagination;
