import React, { useState, useRef, useEffect } from 'react';
import './login.scss';

function Login({ closeLoginpage, setJoinPage, setOpenLoginPage, URI }) {
  const [resObj, setResObj] = useState({});

  const id = useRef();
  const password = useRef();

  function clickLoginBtn(event) {
    event.preventDefault();
    setResObj({
      login_id: id.current.value,
      password: password.current.value,
    });
  }

  function changeJoinPage(event) {
    event.preventDefault();
    setJoinPage(true);
    setOpenLoginPage(false);
  }

  useEffect(() => {
    if (resObj.login_id) {
      fetch('http://' + URI + ':8000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // 헤더 없으면 에러남
        },
        body: JSON.stringify(resObj),
      })
        .then(res => res.json())
        .then(res => {
          if (res.message === '회원가입 내역이 없으시네요.')
            return alert(res.message);
          if (res.message === '비밀번호가 다릅니다.') return alert(res.message);

          if (res.token !== undefined) {
            localStorage.setItem('token', res.token);
            localStorage.setItem('profile_image', res.profile);
            localStorage.setItem('id', res.id);
            localStorage.setItem('kor_name', res.name);
          }
          if (res.token) window.location.href = 'http://' + URI + ':3000/works';
        });
    }
  }, [resObj]);

  return (
    <>
      <div className="clickArea" onClick={closeLoginpage}></div>
      <div className="loginBox">
        <span className="titleLogo">PHOTOFOLIO</span>
        <form className="loginForm">
          <span className="loginSpan">USER ID</span>
          <input className="loginInput" ref={id}></input>

          <span className="loginSpan">PASSWORD</span>
          <input className="loginInput" type="password" ref={password}></input>

          <div className="buttonDiv">
            <button className="loginBtn" onClick={clickLoginBtn}>
              LOGIN
            </button>

            <button className="loginBtn" onClick={changeJoinPage}>
              SIGN UP
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
