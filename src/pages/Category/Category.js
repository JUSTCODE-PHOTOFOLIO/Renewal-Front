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

  function moveCategory(event) {
    if (event.target.innerText === '패션')
      window.location.href = 'http://43.201.0.95:3000/category/fashion';
    if (event.target.innerText === '패턴&질감')
      window.location.href = 'http://43.201.0.95:3000/category/pattern';
    if (event.target.innerText === '여행')
      window.location.href = 'http://43.201.0.95:3000/category/travel';
    if (event.target.innerText === '동물')
      window.location.href = 'http://43.201.0.95:3000/category/animal';
    if (event.target.innerText === '애니메이션')
      window.location.href = 'http://43.201.0.95:3000/category/animation';
    if (event.target.innerText === '디자인')
      window.location.href = 'http://43.201.0.95:3000/category/design';
    if (event.target.innerText === '조소/공예')
      window.location.href = 'http://43.201.0.95:3000/category/craft';
    if (event.target.innerText === '사운드')
      window.location.href = 'http://43.201.0.95:3000/category/sound';
    if (event.target.innerText === '헬로! 아티스트')
      window.location.href = 'http://43.201.0.95:3000/category/helloartist';
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

  useEffect(() => {
    console.log(category);
  }, [category]);

  return (
    <div>
      <Header />
      <div className="categoryComponent">
        <div className="categoryName" onClick={clickCategory}>
          {category} ▼
        </div>
      </div>
      {categorySelect && (
        <div className="categorySelectDiv">
          <div className="categoryChild" onClick={moveCategory}>
            패션
          </div>
          <div className="categoryChild" onClick={moveCategory}>
            패턴&질감
          </div>
          <div className="categoryChild" onClick={moveCategory}>
            여행
          </div>
          <div className="categoryChild" onClick={moveCategory}>
            동물
          </div>
          <div className="categoryChild" onClick={moveCategory}>
            애니메이션
          </div>
          <div className="categoryChild" onClick={moveCategory}>
            디자인
          </div>
          <div className="categoryChild" onClick={moveCategory}>
            조소/공예
          </div>
          <div className="categoryChild" onClick={moveCategory}>
            사운드
          </div>
          <div className="categoryChild" onClick={moveCategory}>
            헬로! 아티스트
          </div>
        </div>
      )}
      <CardList />
      <Footer />
    </div>
  );
}

export default App;
