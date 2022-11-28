import React from 'react';
import { useNavigate } from 'react-router-dom';
import './chanelCard.scss';

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
      className="chanelcard"
      onClick={() => {
        navigate(`/works/${id}`);
      }}
    >
      {/* <img className="chanelcardImg" src={`url(${img_url})`} alt="" /> */}
      <div
        className="cardImg"
        style={{ backgroundImage: `url(${img_url})`, backgroundSize: 'cover' }}
      />
      <div className="chanelcardTitle">
        <span className="chanelcardTitleSpan">{title}</span>
        <div>
          <img />
          <span>{nickname}</span>
        </div>
      </div>
      <div className="chanelcardValue">
        {/* <img src="" alt="" /> */}
        <i class="fa-regular fa-face-smile"></i>
        <span className="cardValueSpanMargin">{sympathy_cnt}</span>
        {/* <img src="" alt="" /> */}
        <i class="fa-regular fa-comment"></i>
        <span className="cardValueSpanMargin">{comment_cnt}</span>
        {/* <img src="" alt="" /> */}
        <i class="fa-regular fa-eye"></i>
        <span className="cardValueSpanMargin">{view_count}</span>
      </div>
    </div>
  );
}

export default Card;
