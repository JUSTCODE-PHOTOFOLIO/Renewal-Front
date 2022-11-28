import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CardList from '../Artwork/CardList';
import ChanelCardList from '../Artwork/ChanelCardList/ChanelCardList';
import Join from '../Join/Join';
import Login from '../Login/Login';
import './Channel.scss';

const Channel = () => {
  const [isFollow, setIsFollow] = useState(0); //팔로잉 상태관리

  //login창 로직 추가 코드
  const [openLoginpage, setOpenLoginPage] = useState(false);
  const [openJoinPage, setJoinPage] = useState(false);
  //로그인 여부 확인
  const [isLogin, setIsLogin] = useState(false);

  const [userInfo, setUserInfo] = useState([]); //유저정보
  const [postArray, setPostArray] = useState([]); //카드정보 데이터
  const [followingInfo, setFollowingInfo] = useState([]); //팔로잉정보 데이터
  const [followerInfo, setFollowerInfo] = useState([]); //팔로워정보 데이터

  //클릭 여부 확인
  const [isClick, setIsClick] = useState(isFollow);
  // const { user_id } = useParams();
  // const params = useParams();

  let param = useParams();
  let params = param.user_id;

  //데이터 fetch
  useEffect(() => {
    fetch('http://43.201.0.95:8000/channel/' + params, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(result => {
        setUserInfo(result.userInfo[0]);
        setPostArray(result.usersPosts);
        setFollowingInfo(result.userFollowingInfo[0]);
        setFollowerInfo(result.userFollowerInfo[0]);
      });
    //팔로우 버튼
    fetch('http://43.201.0.95:8000/works/feed/' + params + '/followcheck', {
      headers: {
        'Content-Type': 'application/json',
        token: localStorage.getItem('token'),
      },
    })
      .then(res => res.json())
      .then(json => {
        setIsFollow(json.checkFollow[0].success);
        console.log('isFollow : ', isFollow);
      });
  }, []);

  console.log(followingInfo);
  console.log(followerInfo);

  //로그인 모달창 닫기
  function closeLoginpage() {
    setOpenLoginPage(false);
  }
  //로그인 하지 않았을 시
  function clickLoginBtn(event) {
    alert('로그인한 다음 이용해 주세요.');
    setOpenLoginPage(true);
  }

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

  const handleToggle = () => {
    setIsClick(!isClick);
  };

  //팔로우,언팔로우 함수
  const sendResult = e => {
    if (e.target.className === 'followBtn') {
      //POST 작가id, 토큰
      fetch('http://43.201.0.95:8000/follow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem('token'),
        },
        body: JSON.stringify({
          following_id: userInfo.user_id,
        }),
      })
        .then(res => res.json())
        .then(json => {});
    } else if (e.target.className === 'followingBtn') {
      //DELETE 작가id, 토큰
      fetch('http://43.201.0.95:8000/follow', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem('token'),
        },
        body: JSON.stringify({
          following_id: userInfo.user_id,
        }),
      })
        .then(res => res.json())
        .then(json => {});
    }
  };

  return (
    <>
      {openLoginpage && (
        <Login
          closeLoginpage={closeLoginpage}
          setJoinPage={setJoinPage}
          setOpenLoginPage={setOpenLoginPage}
        />
      )}
      {openJoinPage && <Join setJoinPage={setJoinPage} />}
      <div className="channel-out-wrapper">
        <div className="channel-content-wrapper">
          <div className="channel-content-left-wrapper">
            <div className="channel-content-left-left">
              <div className="channel-user-ko_name">{userInfo.kor_name}</div>
              {userInfo.eng_name ? (
                <div className="channel-user-eng_name">
                  ({userInfo.eng_name})
                </div>
              ) : (
                ''
              )}
              <div className="channel-nickname">{userInfo.nickname}</div>
              <span className="channel-followers">팔로워</span>
              <span className="channel-followers-count">
                {followerInfo.follower_cnt}
              </span>
              <span className="channel-following">팔로잉</span>
              <span className="channel-following-count">
                {followingInfo.following_cnt}
              </span>
              <div className="channel-account-info-btn-wrapper">
                {localStorage.getItem('id') == userInfo.user_id ? (
                  <button className="channel-account-info-me-btn">
                    <Link to="/accountInfo" style={{ color: '#00d084' }}>
                      계정정보 수정
                    </Link>
                  </button>
                ) : (
                  <div className="followBtns" onClick={handleToggle}>
                    {isLogin ? (
                      isFollow == 1 ? (
                        <div
                          className={isClick ? 'followBtn' : 'followingBtn'}
                          onClick={sendResult}
                        >
                          {isClick ? '팔로우' : '팔로잉'}
                        </div>
                      ) : (
                        <div
                          className={isClick ? 'followingBtn' : 'followBtn'}
                          onClick={sendResult}
                        >
                          {isClick ? '팔로잉' : '팔로우'}
                        </div>
                      )
                    ) : (
                      <div className="followBtn" onClick={clickLoginBtn}>
                        팔로우
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="channel-content-left-right">
              <div className="channel-profile">
                {userInfo.profile_image ? (
                  <img
                    name="profile_image"
                    src={userInfo.profile_image}
                    alt=""
                  />
                ) : (
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                    alt=""
                  />
                )}
              </div>
            </div>
          </div>
          <div className="channel-content-right-wrapper">
            <div className="channel-content-inner-right-wrapper">
              <div className="channel-content-right-menu">
                작품
                <hr />
              </div>
              {/* 작품 데이터가 있다면 */}
              {postArray.length !== 0 ? (
                // 작품 리스트를 보여줌
                <div className="feed-channel-feed-div">
                  <ChanelCardList />
                </div>
              ) : // 작품 데이터가 없다면, 현재 로그인 한 사람과 같은지 다른 사람인지 체크
              localStorage.getItem('id') == userInfo.user_id ? (
                <div className="feed-channel-feed-div channel-feed-text">
                  등록된 작품이 없습니다. <br />
                  <button className="channel-feed-upload-btn">
                    <Link to="/upload">업로드 </Link>
                  </button>
                </div>
              ) : (
                <div className="channel-feed-text">등록된 작품이 없습니다.</div>
              )}
            </div>
            {/* 맞춤형 footer */}
            <footer className="footerContainer">
              <div className="footerAlign">
                <div className="footerText">
                  <span>이용약관</span>
                  <span>개인정보 처리방침</span>
                  <span>ⓒ Photofolio.</span>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Channel;
