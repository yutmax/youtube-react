import { useState } from "react";
import preview01 from "../img/previews/next/01.webp";
import preview02 from "../img/previews/next/02.webp";
import preview03 from "../img/previews/next/03.webp";
import preview04 from "../img/previews/next/04.webp";
import Toggle from "./Toggle";

const NextVideos = () => {
  const [toggle, setToggle] = useState(false);

  const toggleOnChange = () => {
    setToggle(!toggle);
  };

  return (
    <div className="video-page__next next-videos-block">
      <div className="next-videos-block__header">
        <h5 className="next-videos-block__title">Next</h5>
        <Toggle name={"Autoplay"} onChange={toggleOnChange} value={toggle} />
      </div>

      <ul className="next-videos-block__videos">
        <li className="next-videos-block__item">
          <a href="#" className="next-videos-block__link video-card">
            <div className="video-card__preview">
              <img src={preview01} alt="Video preview" className="video-card__image" />
              <span className="video-card__duration">8:00</span>
            </div>
            <div className="video-card__meta">
              <h4 className="video-card__title">Baby Monitor Technology</h4>
              <div className="video-card__info">
                <span className="video-card__stats">123k views</span>
                <span className="video-card__channel">Dollie Blair</span>
              </div>
            </div>
          </a>
        </li>

        <li className="next-videos-block__item">
          <a href="#" className="next-videos-block__link video-card">
            <div className="video-card__preview">
              <img src={preview02} alt="Video preview" className="video-card__image" />
              <span className="video-card__duration">8:00</span>
            </div>
            <div className="video-card__meta">
              <h4 className="video-card__title">A Good Autoresponder</h4>
              <div className="video-card__info">
                <span className="video-card__stats">123k views</span>
                <span className="video-card__channel">Dollie Blair</span>
              </div>
            </div>
          </a>
        </li>

        <li className="next-videos-block__item">
          <a href="#" className="next-videos-block__link video-card">
            <div className="video-card__preview">
              <img src={preview03} alt="Video preview" className="video-card__image" />
              <span className="video-card__duration">8:00</span>
            </div>
            <div className="video-card__meta">
              <h4 className="video-card__title">Selecting The Right Hotel</h4>
              <div className="video-card__info">
                <span className="video-card__stats">123k views</span>
                <span className="video-card__channel">Dollie Blair</span>
              </div>
            </div>
          </a>
        </li>

        <li className="next-videos-block__item">
          <a href="#" className="next-videos-block__link video-card">
            <div className="video-card__preview">
              <img src={preview04} alt="Video preview" className="video-card__image" />
              <span className="video-card__duration">8:00</span>
            </div>
            <div className="video-card__meta">
              <h4 className="video-card__title">Selecting The Right Hotel</h4>
              <div className="video-card__info">
                <span className="video-card__stats">123k views</span>
                <span className="video-card__channel">Dollie Blair</span>
              </div>
            </div>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default NextVideos;
