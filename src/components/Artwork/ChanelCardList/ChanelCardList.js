import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from './ChanelCard';
import './chanelCardList.scss';

function CardList({ filter }) {
  const [data, setData] = useState([]);
  let param = useParams();
  let params = param.user_id;

  fetch('http://43.201.0.95:8000/channel/' + params)
    .then(res => res.json())
    .then(data => {
      setData(data.usersPosts);
    });

  return (
    <div className="chanelcardList">
      {data.map((elem, idx) => {
        return (
          <Card
            key={idx}
            id={elem.id}
            nickname={elem.nickname}
            profile_image={elem.profile_image}
            img_url={elem.img_url}
            title={elem.title}
            view_count={elem.view_count}
            created_at={elem.created_at}
            sympathy_cnt={elem.sympathy_cnt}
            comment_cnt={elem.comment_cnt}
          />
        );
      })}
    </div>
  );
}

export default CardList;
