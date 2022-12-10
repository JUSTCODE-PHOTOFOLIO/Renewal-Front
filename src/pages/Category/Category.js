import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CardList from '../../components/Artwork/CardList';
import './category.scss';

function App() {
  const [category, setCategory] = useState();
  const [categorySelect, setCategorySelect] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const URI = process.env.REACT_APP_BASE_URL;

  const categoryList = [
    '패션',
    '패턴&질감',
    '여행',
    '동물',
    '애니메이션',
    '디자인',
    '조소/공예',
    '사운드',
    '헬로! 아티스트',
  ];

  function moveCategory(event) {
    if (event.target.innerText === '패션')
      window.location.href = 'http://' + URI + ':3000/category/fashion';
    if (event.target.innerText === '패턴&질감')
      window.location.href = 'http://' + URI + ':3000/category/pattern';
    if (event.target.innerText === '여행')
      window.location.href = 'http://' + URI + ':3000/category/travel';
    if (event.target.innerText === '동물')
      window.location.href = 'http://' + URI + ':3000/category/animal';
    if (event.target.innerText === '애니메이션')
      window.location.href = 'http://' + URI + ':3000/category/animation';
    if (event.target.innerText === '디자인')
      window.location.href = 'http://' + URI + ':3000/category/design';
    if (event.target.innerText === '조소/공예')
      window.location.href = 'http://' + URI + ':3000/category/craft';
    if (event.target.innerText === '사운드')
      window.location.href = 'http://' + URI + ':3000/category/sound';
    if (event.target.innerText === '헬로! 아티스트')
      window.location.href = 'http://' + URI + ':3000/category/helloartist';
  }

  function clickCategory(event) {
    if (categorySelect === true) setCategorySelect(false);
    if (categorySelect === false) setCategorySelect(true);
  }

  useEffect(() => {
    if (params.id === 'fashion') setCategory('패션');
    if (params.id === 'pattern') setCategory('패턴&질감');
    if (params.id === 'travel') setCategory('여행');
    if (params.id === 'animal') setCategory('동물');
    if (params.id === 'animation') setCategory('애니메이션');
    if (params.id === 'design') setCategory('디자인');
    if (params.id === 'craft') setCategory('조소/공예');
    if (params.id === 'sound') setCategory('사운드');
    if (params.id === 'helloartist') setCategory('헬로! 아티스트');
  }, []);

  return (
    <>
      <Header />
      <div className={`categoryComponent ${params.id}Img`}>
        <div className="mosaicDiv">
          <div className={`insideComponent ${params.id}Img`}>
            <div className="categoryName" onClick={clickCategory}>
              {category} ▼
            </div>
          </div>
        </div>
      </div>
      {categorySelect && (
        <div className="categorySelectDiv">
          {categoryList.map((elem, idx) => {
            return (
              <div className="categoryChild" key={idx} onClick={moveCategory}>
                {elem}
              </div>
            );
          })}
        </div>
      )}
      <CardList URI={URI} />
      <Footer />
    </>
  );
}

export default App;
