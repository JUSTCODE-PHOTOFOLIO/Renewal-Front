import React, { Fragment, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header/Header';
import SearchBar from '../../components/SearchBar/SearchBar';
import SearchFilter from '../../components/SearchBar/SearchFilter/SearchFilter';
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

  //검색 페이지 데이터 불러오기
  useEffect(() => {
    setContent(query);
    fetch('http://43.201.0.95:8000/searchlist' + location.search)
      .then(res => res.json())
      .then(json => {
        setResultCount(json.resultCount[0].result_cnt);
        setSearchResult(json.searchResult);
      });
  }, []);

  return (
    <Fragment>
      <Header pathname={location.pathname} />
      <SearchBar resultCount={resultCount} />
      <SearchFilter />
      {searchResult.length === 0 ? (
        <Fragment>
          <div className="noResult">
            <p>검색 결과가 없습니다😥</p>
          </div>
        </Fragment>
      ) : (
        <CardList />
      )}

      <Footer />
    </Fragment>
  );
};

export default SearchPage;
