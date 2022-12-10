import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import css from './ArtworkFilter.module.scss';

function ArtworkFilter({ curr, name, filter, setFilter }) {
  const [fontWeight, setFontWeight] = useState();
  const [underline, setUnderline] = useState('none');
  const [underlinePosition, setUnderlinePosition] = useState('');

  const navigate = useNavigate();

  const clickFilter = event => {
    setFilter(curr);
    if (event.target.innerText === '최신') navigate(`/works`);
    if (event.target.innerText === '추천순')
      navigate(`/works?sort=recommendpoint `);
    if (event.target.innerText === '공감순')
      navigate(`/works?sort=sympathycnt `);
  };

  useEffect(() => {
    filter === curr ? setFontWeight(700) : setFontWeight(400);
    filter === curr ? setUnderline('underline') : setUnderline('none');
    filter === curr
      ? setUnderlinePosition('under')
      : setUnderlinePosition('none');
  }, [filter]);

  return (
    <span
      className={css.filter}
      onClick={clickFilter}
      style={{
        margin: '15px',
        fontWeight: fontWeight,
        textDecoration: underline,
        textUnderlinePosition: underlinePosition,
      }}
    >
      {name}
    </span>
  );
}

export default ArtworkFilter;
