import React, { useState, useEffect } from 'react';
import css from './Follow.module.scss';
import Login from '../Login/Login';
import Join from '../Join/Join';
import { useParams } from 'react-router-dom';

const Follow = ({ type, writerInfo, URI }) => {
  const [isFollow, setIsFollow] = useState(false);

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
    if (token) {
      //팔로우 버튼 데이터 가져오기
      fetch('http://' + URI + ':8000/follow/' + params.id, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })
        .then(res => res.json())
        .then(json => {
          setIsFollow(json.follow_check);
        });
    }
  }, [params.id]);

  //팔로우,언팔로우 함수
  const sendResult = e => {
    if (e.target.className.includes('FollowingBtn')) {
      //DELETE 작가id, 토큰
      fetch('http://' + URI + ':8000/follow', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({
          following_id: writerInfo.id,
        }),
      })
        .then(res => res.json())
        .then(json => {
          setIsFollow(json.follow_check);
        });
    } else if (e.target.className.includes('FollowBtn')) {
      //POST 작가id, 토큰
      fetch('http://' + URI + ':8000/follow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({
          following_id: writerInfo.id,
        }),
      })
        .then(res => res.json())
        .then(json => {
          setIsFollow(json.follow_check);
        });
    }
  };

  const checkFollow = () => {
    if (isLogin && isFollow) {
      return (
        <div className={css.shortFollowingBtn} onClick={sendResult}>
          팔로잉
        </div>
      );
    } else if (isLogin && isFollow === false) {
      return (
        <div className={css.shortFollowBtn} onClick={sendResult}>
          팔로우
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
    <div className={css.followBtns}>
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

      {/* //TODO 현재 로그인 되어있는 사람 id값이랑 해당 작품의 작가의 id가 같으면 팔로우버튼 안보이게 해버리자 */}
      {checkFollow()}
    </div>
  );
};

export default Follow;
