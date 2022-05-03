import React, { useEffect, useState } from "react";
import axios from "axios";
import News from "./News";
import "../resources/styles/PinNew.css";
import Pagination from "./Pagination";
import { useParams } from "react-router-dom";

function Bookmarks() {
  let { pageNumber } = useParams();
  let pinnedNews = [];
  const [newPins, setNewPins] = useState([{ id: 0 }]);
  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage] = useState(10);

  if (localStorage.getItem("bookmarks")) {
    pinnedNews = JSON.parse(localStorage.getItem("bookmarks"));
  }

  useEffect(() => {
    setNewPins(pinnedNews);
  }, []);

  return (
    <div>
      <div className="bookmarks">
        <div className="bookmarks-container">
          {pinnedNews.slice((pageNumber-1)*newsPerPage, (pageNumber)*newsPerPage).map((news) => (
            <News key={news.id} news={news} />
          ))}
        </div>
      </div>
      <Pagination
        totalCount={pinnedNews.length}
        pageSize={newsPerPage}
        currentPage={pageNumber}
        siblingCount={1}
        pageUrl={"/bookmarks/"}
      />
    </div>
  );
}

export default Bookmarks;
