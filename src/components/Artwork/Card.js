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

  //이제 수정 해야함
  //왜 저장이 안되지..
  // ㅇㅁㄹㅇ
  return (
    <div
      className="card"
      onClick={() => {
        navigate(`/works/${id}`);
      }}
    >
      <div
        className="cardImg"
        style={{
          backgroundImage: `url(${img_url})`,
          backgroundSize: 'cover',
        }}
      />
      {/* <img src={img_url} className="cardImg" /> */}
      <div className="cardTitle">
        <span className="cardTitleSpan">{title}</span>
        <div className="cardProfileDiv">
          <span>{nickname}</span>
        </div>
      </div>
      <div className="cardValue">
        <div className="cardValueMargin">
          <div className="cardValueMargin2">
            <i className="fa-regular fa-face-smile"></i>
            <span className="cardValueSpanMargin">{sympathy_cnt}</span>
          </div>
          <div className="cardValueMargin2">
            <i className="fa-regular fa-comment"></i>
            <span className="cardValueSpanMargin">{comment_cnt}</span>
          </div>
          <div className="cardValueMargin2" id="viewCount">
            <i className="fa-regular fa-eye"></i>
            <span className="cardValueSpanMargin">{view_count}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
