import React from "react";
import "../resources/styles/News.css";
import "../resources/styles/NewsMedia.css";
import {useNavigate, useParams} from "react-router-dom";

const News = (props) => {
    let {pageNumber} = useParams();

    const navigate = useNavigate();
    return (
    <div className="block" onClick={() => navigate('/news/'+ pageNumber + '/' + props.news.id)}>
            <div className="elem">
                <img src={props.news.imageUrl} alt="newsPreview" className="image"/>
                <div className="information">
                    <h1 className="text">{props.news.title}</h1>
                    <h1 className="date">
                     Дата публикации: {props.news?.publishedAt?.slice(8,10)}/
                        {props.news?.publishedAt?.slice(5,7)}/
                        {props.news?.publishedAt?.slice(0,4)}
                    </h1>
                </div>
            </div>
    </div>
    );
}

export default News;