import React, { Component, useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import SimilarNew from "./SimilarNew";
import axios from "axios";
import "../resources/styles/SimilarNew.css";

const SimilarNewsSet = (props) => {
  const [similarNews, setSimilarNews] = useState([{ news: "" }]);

  let {pageNumber} = useParams();

  useEffect(() => {
    axios
      .get(
        "https://api.spaceflightnewsapi.net/v3/articles?_limit=5&title_contains=" +
          props.news
      )
      .then((res) => {
        setSimilarNews(res.data);
      });
  }, [props]);

  return (
    <div>
      <div className="scroll">
      <h3>Новости с похожим содержанием:</h3>
      {similarNews.map((similarNews) => (
        <SimilarNew similarNews={similarNews} key={similarNews.id} pageNumber={pageNumber}/>
      ))}
      </div>
    </div>
  );
};

export default SimilarNewsSet;
