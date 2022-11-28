import React, { useState, useRef, useEffect } from 'react';
import './join.scss';

function Join({ setJoinPage }) {
  const [userData, setUserData] = useState();
  const [files, setFiles] = useState();

  const [idAlert, setIdAlert] = useState();
  const [pwAlert, setPwAlert] = useState();
  const [pwCheckAlert, setPwCheckAlert] = useState();
  const [korNameAlert, setKorNameAlert] = useState();
  const [EngNameAlert, setEngNameAlert] = useState();
  const [nationalityAlert, setNationalityAlert] = useState();
  const [emailAlert, setEmailAlert] = useState();

  const userId = useRef();
  const password = useRef();
  const passwordCheck = useRef();
  const userName = useRef();
  const EnglishName = useRef();
  const nationality = useRef();
  const userEmail = useRef();

  function closeJoinpage() {
    setJoinPage(false);
  }

  function onLoadFile(event) {
    setFiles(event.target.files);
  }

  const clickJoin = function (event) {
    event.preventDefault();

    const formdata = new FormData();
    // Object.values(files).map((elem, idx) => formdata.append(profile, elem));

    formdata.append('login_id', userId.current.value);
    formdata.append('password', password.current.value);
    formdata.append('password_check', passwordCheck.current.value);
    formdata.append('kor_name', userName.current.value);
    formdata.append('eng_name', EnglishName.current.value);
    formdata.append('nickname', nationality.current.value);
    formdata.append('email', userEmail.current.value);
    formdata.append('profile', files[0]);

    setUserData(formdata);
  };

  useEffect(() => {
    if (
      userId.current.value &&
      password.current.value &&
      passwordCheck.current.value &&
      userName.current.value &&
      EnglishName.current.value &&
      nationality.current.value &&
      userEmail.current.value &&
      files[0]
    ) {
      fetch('http://43.201.0.95:8000/user/signup', {
        method: 'POST',
        headers: {
          // 'Content-Type': 'multipart/form-data', // 헤더 없으면 에러남
        },
        body: userData,
      })
        .then(res => res.json())
        .then(res => {
          console.log(res.message);
          console.log(typeof res.message);

          setIdAlert();
          setPwAlert();
          setPwCheckAlert();
          setKorNameAlert();
          setEngNameAlert();
          setNationalityAlert();
          setEmailAlert();

          if (res.message === '회원가입 되었습니다.') {
            localStorage.clear();
            window.location.href = 'http://43.201.0.95:3000/works';
          }

          if (res.message === '아이디를 4자리 ~ 12자리 이내로 입력해주세요.') {
            setIdAlert(res.message);
            localStorage.clear();
            return;
          }

          if (res.message === '아이디는 공백 없이 입력해주세요.') {
            setIdAlert(res.message);
            localStorage.clear();
            return;
          }

          if (res.message === '해당 아이디가 이미 존재합니다.') {
            setIdAlert(res.message);
            localStorage.clear();
            return;
          }

          if (res.message === '비밀번호가 서로 다릅니다.') {
            setPwAlert(res.message);
            localStorage.clear();
            return;
          }

          if (
            res.message === '비밀번호는 8자리 ~ 20자리 이내로 입력해주세요.'
          ) {
            setPwAlert(res.message);
            localStorage.clear();
            return;
          }

          if (res.message === '비밀번호는 공백 없이 입력해주세요.') {
            setPwAlert(res.message);
            localStorage.clear();
            return;
          }

          if (res.message === '영문, 숫자, 특수문자를 혼합하여 입력해주세요.') {
            setPwAlert(res.message);
            localStorage.clear();
            return;
          }

          if (res.message === '한글은 안되요.') {
            setKorNameAlert(res.message);
            localStorage.clear();
            return;
          }
          if (res.message === '자음, 모음은 안되요.') {
            setKorNameAlert(res.message);
            localStorage.clear();
            return;
          }
          if (res.message === '한국 이름 다시 확인해주세요.') {
            setKorNameAlert(res.message);
            localStorage.clear();
            return;
          }
          if (res.message === '한글만 가능해요.') {
            setKorNameAlert(res.message);
            localStorage.clear();
            return;
          }
          if (res.message === '영문 이름 다시 확인해주세요.') {
            setEngNameAlert(res.message);
            localStorage.clear();
            return;
          }
          if (res.message === '영어만 가능해요.') {
            setEngNameAlert(res.message);
            localStorage.clear();
            return;
          }
          if (res.message === '이메일 확인 부탁드립니다') {
            setEmailAlert(res.message);
            localStorage.clear();
            return;
          }
          if (res.message === '해당 이메일이 이미 존재합니다.') {
            setEmailAlert(res.message);
            localStorage.clear();
            return;
          }
        });
    }
  }, [userData]);

  return (
    <>
      <div className="clickArea" onClick={closeJoinpage}></div>
      <div className="loginDiv">
        <span className="titleLogo">PHOTOFOLIO</span>
        <form className="loginForm" encType="multipart/form-data">
          <div className="loginInputDiv">
            <span className="loginBoxName">
              USER ID<span className="alertMent">{idAlert}</span>
            </span>
            <input
              className="loginBoxInput"
              ref={userId}
              placeholder=""
            ></input>
          </div>
          <div className="loginInputDiv">
            <span className="loginBoxName">
              PASSWORD<span className="alertMent">{pwAlert}</span>
            </span>
            <input
              className="loginBoxInput"
              type="password"
              ref={password}
            ></input>
          </div>
          <div className="loginInputDiv">
            <span className="loginBoxName">
              PASSWORD CHECK<span className="alertMent">{pwCheckAlert}</span>
            </span>
            <input
              className="loginBoxInput"
              type="password"
              ref={passwordCheck}
            ></input>
          </div>
          <div className="loginInputDiv">
            <span className="loginBoxName">
              USER NAME<span className="alertMent">{korNameAlert}</span>
            </span>
            <input className="loginBoxInput" ref={userName}></input>
          </div>
          <div className="loginInputDiv">
            <span className="loginBoxName">
              ENGLISH USER NAME<span className="alertMent">{EngNameAlert}</span>
            </span>
            <input className="loginBoxInput" ref={EnglishName}></input>
          </div>
          <div className="loginInputDiv">
            <span className="loginBoxName">
              NICKNAME<span className="alertMent"></span>
            </span>
            <input className="loginBoxInput" ref={nationality}></input>
          </div>
          <div className="loginInputDiv">
            <span className="loginBoxName">
              USER EMAIL<span className="alertMent">{emailAlert}</span>
            </span>
            <input className="loginBoxInput" ref={userEmail}></input>
          </div>
          <span className="loginBoxName">IMAGE FILE</span>
          <input
            type="file"
            name="file"
            accept="img/*"
            onChange={onLoadFile}
            // multiple
          ></input>

          <button className="loginBtn" onClick={clickJoin}>
            JOIN
          </button>
        </form>
      </div>
    </>
  );
}

export default Join;
