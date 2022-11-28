import React from 'react';
import './categoryModal.scss';

function App({ setCategoryState, setCategory_name }) {
  function checkCategory(event) {
    setCategory_name(event.target.value);
    setCategoryState(false);
  }
  return (
    <div className="categoryModal" onChange={checkCategory}>
      <div className="leftRadio">
        <label>
          <input type="radio" name="category" value="패션"></input>패션
        </label>
        <label>
          <input type="radio" name="category" value="패턴"></input>패턴
        </label>
        <label>
          <input type="radio" name="category" value="여행"></input>
          여행
        </label>
        <label>
          <input type="radio" name="category" value="동물"></input>
          동물
        </label>
        <label>
          <input type="radio" name="category" value="디자인"></input>
          디자인
        </label>
      </div>
      <div className="rightRadio">
        <label>
          <input type="radio" name="category" value="캘리그라피"></input>
          캘리그라피
        </label>
        <label>
          <input type="radio" name="category" value="애니메이션"></input>
          애니메이션
        </label>
        <label>
          <input type="radio" name="category" value="사운드"></input>사운드
        </label>
        <label>
          <input type="radio" name="category" value="헬로아티스트"></input>
          헬로아티스트
        </label>
      </div>
    </div>
  );
}

export default App;
