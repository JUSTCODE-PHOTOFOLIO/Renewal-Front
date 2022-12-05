import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import css from './SearchFilter.module.scss';

const SearchFilter = ({ URI }) => {
  //true면 토글 메뉴 열기
  const [isToggleOpen, setIsToggleOpen] = useState(false);

  //true면 토글버튼 이미지 toggleUp
  const [isToggleBtnOn, setIsToggleBtnOn] = useState(false);

  const [selectMenu, setSelectMenu] = useState('분야전체');

  const [countIndex, setCountIndex] = useState(9);

  const handleOnClick = (e, idx) => {
    setSelectMenu(e.target.innerText);
    setCountIndex(idx);
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
  return (
    <div className={css.filterContainer}>
      <div className={css.filterLists}>
        <div className={css.filterList}>
          <button
            className={
              isToggleBtnOn
                ? `${css.filterListBtnOn}`
                : `${css.filterListBtnOff}`
            }
            onClick={handleToggleOpen}
          >
            {selectMenu}
          </button>
          <ul
            className={
              isToggleOpen
                ? `${css.filterListMenu} ${css.toggleListOn}`
                : `${css.filterListMenu}`
            }
          >
            {menuListArr.map((menuList, idx) => {
              return (
                <li
                  key={menuList.id}
                  className={countIndex === idx ? `${css.on}` : undefined}
                  onClick={e => handleOnClick(e, idx)}
                >
                  {menuList.category_name}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default SearchFilter;
