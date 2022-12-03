import React, { useState } from 'react';
import ArtworkFilter from './ArtworkFilter';
import CardList from './CardList';
import './artwork.scss';

function Artwork({ URI }) {
  const [filter, setFilter] = useState(1);
  const filterArr = ['최신', '주목받는', '데뷰', '발견'];
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
        {filterArr.map(() => {
          return (
            <div style={{ cursor: 'pointer' }}>
              <ArtworkFilter
                curr={1}
                setFilter={setFilter}
                filter={filter}
                name={'최신'}
              />
            </div>
          );
        })}
        {/* <div style={{ cursor: 'pointer' }}>
          <ArtworkFilter
            curr={1}
            setFilter={setFilter}
            filter={filter}
            name={'최신'}
          />
        </div>
        <div style={{ cursor: 'pointer' }}>
          <ArtworkFilter
            curr={2}
            setFilter={setFilter}
            filter={filter}
            name={'주목받는'}
          />
        </div>
        <div style={{ cursor: 'pointer' }}>
          <ArtworkFilter
            curr={3}
            setFilter={setFilter}
            filter={filter}
            name={'데뷰'}
          />
        </div>
        <div style={{ cursor: 'pointer' }}>
          <ArtworkFilter
            curr={4}
            setFilter={setFilter}
            filter={filter}
            name={'발견'}
          />
        </div> */}
      </div>
      <CardList filter={filter} URI={URI} />
    </>
  );
}

export default Artwork;
