import React, { useEffect, useState } from "react";
import axios from "axios";
import News from "./News";
import "../resources/styles/News.css";
import { useParams } from "react-router-dom";
import Pagination from "./Pagination";

function NewsCatalog() {
  let { pageNumber } = useParams();
  const [news, setNews] = useState([]);
  const [keyWord, setKeyWord] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [mode, setMode] = useState("default");
  const [sort, setSort] = useState(false);
  const [type, setType] = useState("title");

  useEffect(() => {
    axios
      .get("https://api.spaceflightnewsapi.net/v3/articles/count")
      .then((res) => {
        setTotalCount(res.data);
      });
  }, []);

  useEffect(() => {
    switch (mode) {
      case "search":
        setSearch();
        break;
      default:
        setDefault();
        break;
    }
  }, [pageNumber, sort]);

  const setDefault = () => {
    if (!sort) {
      axios
        .get(
          "https://api.spaceflightnewsapi.net/v3/articles?_limit=12" +
            "&_start=" +
            (pageNumber - 1) * 12
        )
        .then((res) => {
          setNews(res.data);
        });
    } else {
      axios
        .get(
          "https://api.spaceflightnewsapi.net/v3/articles?_limit=12" +
            "&_start=" +
            (pageNumber - 1) * 12 +
            "&_sort=publishedAt"
        )
        .then((res) => {
          setNews(res.data);
        });
    }
  };

  const setSearch = () => {
    const searchStr = type === "title" ? "title_contains" : "summary_contains";
    const sortStr = sort ? "&_sort=publishedAt" : "";
    axios
      .get(
        `https://api.spaceflightnewsapi.net/v3/articles?${searchStr}=${keyWord}${sortStr}&_start=${
          (pageNumber - 1) * 12
        }&_limit=12`
      )
      .then((res) => {
        setNews(res.data);
      });

    axios
      .get(
        `https://api.spaceflightnewsapi.net/v3/articles/count?${searchStr}=${keyWord}`
      )
      .then((res) => {
        setTotalCount(res.data);
      });
  };

  return (
    <div className="content">
      <div className="panel">
        <div className="findBoard">
          <div className="search">
            <input
              className="input"
              placeholder="Search"
              type="text"
              value={keyWord}
              onChange={(event) => {
                setKeyWord(event.target.value);
              }}
            />
          </div>
          <input
            className="buttonFind"
            type="image"
            src="https://iconape.com/wp-content/png_logo_vector/search-3.png"
            onClick={() => {
              setMode("search");
              setSearch();
            }}
          />
        </div>
        <select
          className="select"
          onChange={(event) => setType(event.target.value)}
          value={type}
        >
          <option default="default" value="по названию">
            by title
          </option>
          <option value="по описанию">by summary</option>
        </select>
        <input
          className="sort"
          type="button"
          value="sort by date"
          alt="sort_by_date"
          onClick={() => {
            if (!sort) {
              setSort(true);
            } else {
              setSort(false);
            }
          }}
        />
      </div>

      <div>
        {news.map((news) => (
          <News news={news} key={news.id} />
        ))}
      </div>

      <Pagination
        totalCount={totalCount}
        pageSize={12}
        currentPage={pageNumber}
        siblingCount={1}
        pageUrl={"/news/"}
      />
    </div>
  );
}

export default NewsCatalog;
