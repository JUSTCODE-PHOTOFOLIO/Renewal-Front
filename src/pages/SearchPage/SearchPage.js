import React, { Fragment, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import SearchFilter from '../../components/SearchFilter/SearchFilter';
import CardList from '../../components/Artwork/CardList';
import Footer from '../../components/Footer/Footer';
import './SearchPage.scss';
const SearchPage = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [resultCount, setResultCount] = useState([]);
  const [content, setContent] = useState('');
  let location = useLocation();
  let params = new URLSearchParams(location.search); //?query=구름
  let query = params.get('query');
  const URI = process.env.REACT_APP_BASE_URL;

  //검색창 로직
  const navigate = useNavigate();

  //x버튼 클릭 시 input내용 reset
  // const resetInput = e => {
  //   setContent('');
  // };

  //url에서
  useEffect(() => {
    setContent(query);
  }, [query]);

  //엔터키 눌렀을 때 검색페이지로 재 이동(url의 쿼리파라미터 변경)
  const search = e => {
    if (e.key === 'Enter') {
      let url = '/searchlist?query=' + content;
      navigate(url);
      window.location.reload();
    } else {
      setContent(e.target.value);
    }
  };

  //검색 페이지 데이터 불러오기
  useEffect(() => {
    setContent(query);
    fetch('http://' + URI + ':8000/searchlist' + location.search)
      .then(res => res.json())
      .then(json => {
        setResultCount(json.searchResultCount[0].result_cnt);
        setSearchResult(json.searchResult);
      });
  }, []);

  return (
    <Fragment>
      <Header pathname={location.pathname} URI={URI} />
      <div className="searchKeyWordBar">
        <div className="searchKeyWord">
          <div className="searchLogoImg" />

          <input
            className="searchinput"
            placeholder="검색어를 입력해주세요."
            onKeyUp={search}
            defaultValue={content}
            type="search"
          />
          {/* <button
            className={
              query === content ? 'inputResetBtn' : 'inputResetBtn blind'
            }
            onClick={resetInput}
          /> */}
        </div>
        <SearchFilter URI={URI} />
      </div>
      <div className="count">
        <span>작품 검색 결과: </span>
        <span className="workCnt">{resultCount}</span>
        <span>건</span>
      </div>
      {searchResult.length === 0 ? (
        <Fragment>
          <div className="noResult">
            <p>검색 결과가 없습니다😥</p>
          </div>
        </Fragment>
      ) : (
        <CardList URI={URI} />
      )}

      <Footer />
    </Fragment>
  );
};

export default SearchPage;
