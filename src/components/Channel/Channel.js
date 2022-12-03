import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ChanelCardList from '../Artwork/ChanelCardList/ChanelCardList';
import Follow from '../Follow/Follow';
import './Channel.scss';

const Channel = ({ URI }) => {
  const [userInfo, setUserInfo] = useState([]); //유저정보
  const [postArray, setPostArray] = useState([]); //카드정보 데이터
  const [followingInfo, setFollowingInfo] = useState([]); //팔로잉정보 데이터
  const [followerInfo, setFollowerInfo] = useState([]); //팔로워정보 데이터
  const id = localStorage.getItem('id');
  let param = useParams();
  let params = param.user_id;

  //데이터 fetch
  useEffect(() => {
    fetch('http://' + URI + ':8000/channel/' + params, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(result => {
        setUserInfo(result.writerInfo[0]);
        setPostArray(result.usersPosts);
        setFollowingInfo(result.userFollowingInfo[0]);
        setFollowerInfo(result.userFollowerInfo[0]);
      });
  }, []);

  return (
    <>
      <div className="channel-out-wrapper">
        <div className="channel-content-wrapper">
          <div className="channel-content-left-wrapper">
            <div className="channel-content-left-left">
              <div className="channel-user-ko_name">{userInfo.kor_name}</div>
              {userInfo.eng_name && (
                <div className="channel-user-eng_name">
                  ({userInfo.eng_name})
                </div>
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
                {id == userInfo.id ? (
                  <button className="channel-account-info-me-btn">
                    <Link to="/accountInfo" style={{ color: '#00d084' }}>
                      계정정보 수정
                    </Link>
                  </button>
                ) : (
                  <Follow URI={URI} writerInfo={userInfo} />
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
                  <ChanelCardList URI={URI} />
                </div>
              ) : // 작품 데이터가 없다면, 현재 로그인 한 사람과 같은지 다른 사람인지 체크
              id == userInfo.id ? (
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
