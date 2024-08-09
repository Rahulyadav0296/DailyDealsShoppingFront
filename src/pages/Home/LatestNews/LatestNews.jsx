import React from "react";
import { Link } from "react-router-dom";
import { latestNews } from "../../../utils/homeImage";
import "./LatestNews.css";

function LatestNews() {
  return (
    <div className="latest-news">
      {latestNews.map((news) => (
        <div key={news.id} className="news-item">
          <img src={news.image} alt={news.title} className="news-image" />
          <h3 className="news-title">{news.title}</h3>
          <p className="news-description">{news.description}</p>
          <Link
            to={news.wikipediaLink}
            target="_blank"
            className="read-more-link"
          >
            <button className="read-more-button">Read More</button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default LatestNews;
