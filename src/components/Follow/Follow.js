import React, { useState, useEffect } from 'react';
import css from './Follow.module.scss';
import { useParams } from 'react-router-dom';

const Follow = ({ type, writerInfo, URI }) => {
  const [isFollow, setIsFollow] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  function clickLoginBtn() {
    alert('로그인한 다음 이용해 주세요.');
    !localStorage.getItem('token') &&
      document.querySelector('#replaceLogin').click();
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
      fetch('http://' + URI + ':8000/follow/check/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({
          id: writerInfo.id,
        }),
      })
        .then(res => res.json())
        .then(json => {
          setIsFollow(json.follow_check);
        });
    }
  }, [writerInfo.id, URI, token]);

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
          if (json.follow_check) {
            setIsFollow(json.follow_check);
            setErrorMessage('');
          } else {
            setErrorMessage(json.message);
          }
        });
    }
  };

  let loginId = localStorage.getItem('id');
  const checkShortFollow = () => {
    if (isLogin && Number(loginId) === Number(writerInfo.id)) {
      return <div></div>;
    } else if (isLogin && isFollow) {
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
    } else if (isLogin && errorMessage) {
      alert('잠시 후 다시 시도해주세요.');
    } else {
      return (
        <div className={css.shortFollowBtn} onClick={clickLoginBtn}>
          팔로우
        </div>
      );
    }
  };

  const checkLongFollow = () => {
    if (isLogin && Number(loginId) === Number(writerInfo.id)) {
      return <div></div>;
    } else if (isLogin && isFollow) {
      return (
        <div className={css.longFollowingBtn} onClick={sendResult}>
          팔로잉
        </div>
      );
    } else if (isLogin && isFollow === false) {
      return (
        <div className={css.longFollowBtn} onClick={sendResult}>
          팔로우
        </div>
      );
    } else if (isLogin && errorMessage) {
      alert('잠시 후 다시 시도해주세요.');
    } else {
      return (
        <div className={css.longFollowBtn} onClick={clickLoginBtn}>
          팔로우
        </div>
      );
    }
  };
  return (
    <div className={css.followBtns}>
      {type === 'short' ? checkShortFollow() : checkLongFollow()}
    </div>
  );
};

export default Follow;
