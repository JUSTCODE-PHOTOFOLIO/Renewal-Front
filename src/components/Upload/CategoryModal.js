import React from 'react';
import './categoryModal.scss';

function App({ setCategoryState, setCategory_name, setModalAlretSpanValue }) {
  const leftRadioList = ['패션', '패턴', '여행', '동물', '디자인'];
  const rightRadioList = ['캘리그라피', '애니메이션', '사운드', '헬로아티스트'];

  function checkCategory(event) {
    setCategory_name(event.target.value);
    setModalAlretSpanValue(event.target.value);
    setCategoryState(false);
  }
  return (
    <div className="categoryModal" onChange={checkCategory}>
      <div className="leftRadio">
        {leftRadioList.map((elem, idx) => {
          return (
            <label key={idx}>
              <input type="radio" name="category" value={elem}></input>
              {elem}
            </label>
          );
        })}
      </div>
      <div className="rightRadio">
        {rightRadioList.map((elem, idx) => {
          return (
            <label key={idx}>
              <input type="radio" name="category" value={elem}></input>
              {elem}
            </label>
          );
        })}
      </div>
    </div>
  );
}

export default App;
