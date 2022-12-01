import React, { useState, useEffect } from 'react';
import css from './Follow.module.scss';
import Login from '../Login/Login';
import Join from '../Join/Join';
import { useParams } from 'react-router-dom';

const Follow = ({ type, writerInfo }) => {
  const [isFollow, setIsFollow] = useState(0);

  //login창 로직 추가 코드
  const [openLoginpage, setOpenLoginPage] = useState(false);
  const [openJoinPage, setJoinPage] = useState(false);
  function closeLoginpage() {
    setOpenLoginPage(false);
  }

  function clickLoginBtn() {
    alert('로그인한 다음 이용해 주세요.');
    setOpenLoginPage(true);
  }

  //로그인 여부 확인
  const [isLogin, setIsLogin] = useState(false);

  //localStorage에 token 유무 체크
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (token) {
      setIsLogin(true);
      return;
    } else if (!token) {
      setIsLogin(false);
      return;
    }
  }, [token]);

  //페이지 첫 렌더링 시 데이터 불러오기
  const params = useParams();
  useEffect(() => {
    //팔로우 버튼 데이터 가져오기
    fetch('http://localhost:8000/works/feed/' + params.id + '/followcheck', {
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    })
      .then(res => res.json())
      .then(json => {
        setIsFollow(json.follow_check);
        console.log('json.isFollow : ', isFollow);
      });
  }, [params.id]);

  //클릭 여부 확인
  const [isClick, setIsClick] = useState(isFollow);
  const handleToggle = () => {
    setIsClick(!isClick);
  };

  //팔로우,언팔로우 함수
  const sendResult = e => {
    if (e.target.className.includes('followBtn')) {
      //POST 작가id, 토큰
      fetch('http://43.201.0.95:8000/follow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: token,
        },
        body: JSON.stringify({
          following_id: writerInfo.id,
        }),
      });
    } else if (e.target.className.includes('followingBtn')) {
      //DELETE 작가id, 토큰
      fetch('http://43.201.0.95:8000/follow', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          authorization: token,
        },
        body: JSON.stringify({
          following_id: writerInfo.id,
        }),
      });
    }
  };
  console.log(isClick);
  // console.log(isFollow);
  const checkFollow = () => {
    if (isLogin && isFollow) {
      return (
        <div
          className={
            isClick ? `${css.shortFollowingBtn}` : `${css.shortFollowBtn}`
          }
          onClick={sendResult}
        >
          {isClick ? '팔로잉' : '팔로우'}
        </div>
      );
    } else if (isLogin && isFollow === false) {
      console.log('false입니다..');
      return (
        <div
          className={
            isClick ? `${css.shortFollowBtn}` : `${css.shortFollowingBtn}`
          }
          onClick={sendResult}
        >
          {isClick ? '팔로우' : '팔로잉'}
        </div>
      );
    } else {
      return (
        <div className={css.shortFollowBtn} onClick={clickLoginBtn}>
          팔로우
        </div>
      );
    }
  };
  return (
    <div className={css.followBtns} onClick={handleToggle}>
      {/* login창 로직 추가 코드 */}
      {openLoginpage && (
        <Login
          closeLoginpage={closeLoginpage}
          setJoinPage={setJoinPage}
          setOpenLoginPage={setOpenLoginPage}
        />
      )}
      {openJoinPage && <Join setJoinPage={setJoinPage} />}
      {/* login창 로직 추가 코드 종료*/}
      {checkFollow()}
    </div>
  );
};

export default Follow;
