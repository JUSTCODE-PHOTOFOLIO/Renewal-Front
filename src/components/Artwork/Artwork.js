import React, { useState } from 'react';
import ArtworkFilter from './ArtworkFilter';
import CardList from './CardList';
import './artwork.scss';

function Artwork({ URI, PORT }) {
  const [filter, setFilter] = useState(1);
  const filterArr = ['최신', '추천순', '공감순'];
  let filterCounter = 1;

  return (
    <>
      <div className="artwork">
        <h2
          className="header"
          style={{ fontSize: '30px', fontWeight: '700', marginRight: '20px' }}
        >
          Artwork
        </h2>
        {filterArr.map(elem => {
          return (
            <ArtworkFilter
              key={filterCounter}
              curr={filterCounter++}
              setFilter={setFilter}
              filter={filter}
              name={elem}
            />
          );
        })}
      </div>
      <CardList filter={filter} URI={URI} PORT={PORT} />
    </>
  );
}

export default Artwork;
