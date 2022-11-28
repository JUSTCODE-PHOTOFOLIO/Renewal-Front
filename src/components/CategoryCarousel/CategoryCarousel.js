import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CategoryCarousel.scss';

const CategoryCarousel = () => {
  const [categories, setCategories] = useState([]);

  //hover 여부 확인
  const [isHovering, setIsHovering] = useState(false);

  //click 여부 확인
  const [isClick, setIsClick] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://43.201.0.95:8000/works')
      .then(res => res.json())
      .then(json => {
        setCategories(json.categorySortCountList);
      });
  }, []);

  //hover 여부에 따라 isHovering 값 바뀜
  const handleMouseOver = () => {
    setIsHovering(true);
  };
  const handleMouseOut = () => {
    setIsHovering(false);
  };

  //click 여부에 따라 isClick 달라짐
  const handleRightClick = () => {
    setIsClick(true);
  };
  const handleLeftClick = () => {
    setIsClick(false);
  };

  return (
    <div className="category-wrap">
      <h3>Category</h3>
      <div
        className="carousel-div"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <div
          className={
            isClick === false
              ? 'thumbnail-list goToRight'
              : 'thumbnail-list goToLeft'
          }
        >
          <ul>
            {categories.map(category => {
              return (
                <li
                  className="item"
                  key={category.id}
                  onClick={() => {
                    navigate('/category/' + category.eng_category_name);
                  }}
                >
                  <div
                    className={
                      'categoryImg ' + category.eng_category_name + 'Img'
                    }
                  />
                  <div className={'category ' + category.eng_category_name}>
                    <div className="title">
                      <span>{category.category_name}</span>
                      <span>{category.category_cnt}</span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <button
          onClick={handleLeftClick}
          className={
            isHovering
              ? 'on category-btn previous'
              : 'off category-btn previous'
          }
        />
        <button
          onClick={handleRightClick}
          className={
            isHovering ? 'on category-btn next' : 'off category-btn next'
          }
        />
      </div>
    </div>
  );
};

export default CategoryCarousel;
