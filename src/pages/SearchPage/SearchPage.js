import React, { Fragment, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import CardList from '../../components/Artwork/CardList';
import Footer from '../../components/Footer/Footer';
import './SearchPage.scss';
const SearchPage = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [resultCount, setResultCount] = useState([]);
  const [content, setContent] = useState('');
  //true면 토글 메뉴 열기
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  //true면 토글버튼 이미지 toggleUp
  const [isToggleBtnOn, setIsToggleBtnOn] = useState(false);
  const [selectMenu, setSelectMenu] = useState('분야전체');
  const [countIndex, setCountIndex] = useState(9);
  const [newUrl, setNewUrl] = useState('');
  const [nowUrl, setNowUrl] = useState(window.location.href);
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

  //검색 필터링 로직
  //선택한 메뉴 id값
  const [selectMenuNum, setSelectMenuNum] = useState(window.location.href);
  console.log('현재url : ', nowUrl);

  const handleOnClick = (e, idx, id) => {
    setSelectMenu(e.target.innerText);
    setCountIndex(idx);
    setSelectMenuNum(id);
    setNewUrl(nowUrl + '&category_id=' + selectMenuNum);
    setNowUrl(window.location.href);
  };

  //카테고리 배열
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://' + URI + ':8000/works')
      .then(res => res.json())
      .then(json => {
        setCategories(json.categorySortCountList);
      });
  }, []);

  const menuListArr = [...categories, { id: 10, category_name: '분야전체' }];

  const handleToggleOpen = () => {
    setIsToggleOpen(!isToggleOpen);
    setIsToggleBtnOn(!isToggleBtnOn);
  };

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
        <div className="filterContainer">
          <div className="filterLists">
            <div className="filterList">
              <button
                className={
                  isToggleBtnOn ? 'filterListBtnOn' : 'filterListBtnOff'
                }
                onClick={handleToggleOpen}
              >
                {selectMenu}
              </button>
              <ul
                className={
                  isToggleOpen
                    ? 'filterListMenu toggleListOn'
                    : 'filterListMenu'
                }
              >
                {menuListArr.map((menuList, idx) => {
                  return (
                    <li
                      key={menuList.id}
                      className={countIndex === idx ? 'on' : undefined}
                      onClick={e => handleOnClick(e, idx, menuList.id)}
                    >
                      {menuList.category_name}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
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
