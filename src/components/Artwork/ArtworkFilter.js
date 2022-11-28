import React, { useState, useEffect } from 'react';

function ArtworkFilter({ curr, name, filter, setFilter }) {
  const [fontWeight, setFontWeight] = useState();
  const [underline, setUnderline] = useState('none');
  const [underlinePosition, setUnderlinePosition] = useState('');

  const clickFilter = event => {
    setFilter(curr);
  };

  useEffect(() => {
    filter === curr ? setFontWeight(700) : setFontWeight(400);
    filter === curr ? setUnderline('underline') : setUnderline('none');
    filter === curr
      ? setUnderlinePosition('under')
      : setUnderlinePosition('none');
  }, [filter]);

  return (
    <>
      <span
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
    </>
  );
}

export default ArtworkFilter;
