import React from "react";
import "../resources/styles/SimilarNew.css";
import "../resources/styles/SimilarNewMedia.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";

const SimilarNew = (props) => {
  const navigate = useNavigate();
  const params = useParams();

  if (params.id != props.similarNews.id) {
    return (
      <div className="similarWrapper" onClick={() => navigate('/news/'+ props.pageNumber + "/" + props.similarNews.id)}>
          <img className="preview" src= {props.similarNews.imageUrl} />
          {props.similarNews.title}
      </div>
    );
  } else {
    return <></>;
  }
};

export default SimilarNew;
