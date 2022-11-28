import React, { useRef, useState, useEffect } from 'react';
import './uploadMain.scss';

function App({ onImgChange }) {
  function replaceBtn(event) {
    event.preventDefault();
    document.querySelector('#userfileInput').click();
  }
  return (
    <div className="uploadComponent">
      <span className="typeSelectSpan">업로드 타입을 선택해주세요 :)</span>
      <div className="selectBox">
        <div className="selectBoxComponent">
          <form>
            <input
              className="inputFile"
              type="file"
              name="userfile"
              id="userfileInput"
              accept="image/*"
              onChange={onImgChange}
              multiple
            ></input>
            <button className="replaceBtn" onClick={replaceBtn}>
              이미지
            </button>
          </form>
        </div>
        <div className="selectBoxComponent">
          <button className="replaceBtn">사운드</button>
        </div>
        <div className="selectBoxComponent">
          <button className="replaceBtn">동영상</button>
        </div>
        <div className="selectBoxComponent">
          <button className="replaceBtn">그림책</button>
        </div>
        <div className="selectBoxComponent">
          <button className="replaceBtn">배경화면</button>
        </div>
      </div>
      <div className="alertBox">
        <img className="alertImg" src="" alt="" />
        <div className="alertSpanBox">
          <span className="alertSpan">
            업로드 시, 이 콘텐츠의 저작권 소유자이며서비스 운영원칙에 동의한
            것으로 간주합니다.
          </span>
          <span className="alertSpan">
            * 저작권 등 타인의 권리를 침해하거나 명예를 훼손하는 이미지, 동영상,
            음원 등을 게시하는 경우이용약관 및 관련 법률에 의하여 제재를 받으실
            수 있습니다.
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
