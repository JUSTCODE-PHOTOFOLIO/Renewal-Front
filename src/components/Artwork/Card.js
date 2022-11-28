import React from 'react';
import { useNavigate } from 'react-router-dom';
import './card.scss';

function Card({
  id,
  nickname,
  profile_image,
  img_url,
  title,
  view_count,
  created_at,
  sympathy_cnt,
  comment_cnt,
}) {
  const navigate = useNavigate();

  return (
    <div
      className="card"
      onClick={() => {
        navigate(`/works/${id}`);
      }}
    >
      <div
        className="cardImg"
        style={{ backgroundImage: `url(${img_url})`, backgroundSize: 'cover' }}
      />
      <div className="cardTitle">
        <span className="cardTitleSpan">{title}</span>
        <div className="cardProfileDiv">
          <span>{nickname}</span>
        </div>
      </div>
      <div className="cardValue">
        <div className="cardValueMargin">
          <div className="cardValueMargin2">
            <i class="fa-regular fa-face-smile"></i>
            <span className="cardValueSpanMargin">{sympathy_cnt}</span>
          </div>
          <div className="cardValueMargin2">
            <i class="fa-regular fa-comment"></i>
            <span className="cardValueSpanMargin">{comment_cnt}</span>
          </div>
          <div className="cardValueMargin2" id="viewCount">
            <i class="fa-regular fa-eye"></i>
            <span className="cardValueSpanMargin">{view_count}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
