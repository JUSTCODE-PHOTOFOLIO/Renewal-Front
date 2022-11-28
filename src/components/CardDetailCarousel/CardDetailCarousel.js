import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './CardDetailCarousel.scss';
import Login from '../Login/Login';
import Join from '../Join/Join';

const CardDetailCarousel = () => {
  const [info, setInfo] = useState({});
  const [works, setWorks] = useState([]);
  const [isFollow, setIsFollow] = useState(0);
  const [writerInfo, setWriterInfo] = useState([]);

  //login창 로직 추가 코드
  const [openLoginpage, setOpenLoginPage] = useState(false);
  const [openJoinPage, setJoinPage] = useState(false);
  function closeLoginpage() {
    setOpenLoginPage(false);
  }
  function clickLoginBtn(event) {
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
    //팔로우 기능 제외한 데이터 가져오기
    fetch('http://43.201.0.95:8000/works/feed/' + params.id, {
      headers: {
        'Content-Type': 'application/json',
        token: localStorage.getItem('token'),
      },
    })
      .then(res => res.json())
      .then(json => {
        setInfo(json.moreFeedinfo[0]);
        setWorks(json.moreFeedinfo[0].more_feed);
        setWriterInfo(json.writerInfo[0]);
      });

    //팔로우 버튼 데이터 가져오기
    fetch('http://43.201.0.95:8000/works/feed/' + params.id + '/followcheck', {
      headers: {
        'Content-Type': 'application/json',
        token: localStorage.getItem('token'),
      },
    })
      .then(res => res.json())
      .then(json => {
        setIsFollow(json.checkFollow[0].success);
      });
  }, [params.id]);

  //클릭 여부 확인
  const [isClick, setIsClick] = useState(isFollow);
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
          following_id: writerInfo.id,
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
          following_id: writerInfo.id,
        }),
      })
        .then(res => res.json())
        .then(json => {});
    }
  };
  console.log('isFollow : ', isFollow);
  console.log('isLogin : ', isLogin);
  console.log('isClick : ', isClick);

  //캐러셀 내부 ul 위치 파악
  //1이면 맨 처음(index같은 느낌)
  const [carouselIndex, setCarouselIndex] = useState(0);

  //carouselUl의 값에 따라 translateX값 추가
  const [listLocation, setListLocation] = useState(0);

  //onclick으로 걸 함수 : carouselUl 값 조절
  //클릭 시 1추가, px -추가
  //최대 페이지 : 작품 갯수로 판단
  //works.length = 4
  const controlCarouselUlNext = () => {
    //작품 갯수 / 5의 나머지가 1보다 크다면
    if (works.length % 5 >= 1) {
      let maxPage = Math.floor(works.length / 5);
      if (carouselIndex === maxPage) {
        return;
      }
      setCarouselIndex(Math.floor(works.length / 5));
      setListLocation(listLocation - 910);
      return;
    } else if (works.length % 5 !== 0) {
      let maxPage = works.length / 5; //4
      if (carouselIndex === maxPage) {
        return;
      } else {
        setCarouselIndex(carouselIndex + 1);
        setListLocation(listLocation - 910);
      }
      return;
    }

    // if (works.length % 5 !== 0) {
    //   let maxPage = works.length / 5; //4
    //   if (carouselIndex === maxPage) {
    //     return;
    //   } else {
    //     setCarouselIndex(carouselIndex + 1);
    //     setListLocation(listLocation - 910);
    //   }
    //   return;
    // } else if (works.length % 5 > 1) {
    //   let maxPage = Math.floor(works.length / 5);
    //   if (carouselIndex === maxPage) {
    //     return;
    //   }
    //   setCarouselIndex(Math.floor(works.length / 5));
    //   setListLocation(listLocation - 910);
    //   return;
    // }
  };

  //클릭 시 1감소 (0보다 작아지지 않게 처리)
  //px +추가

  const controlCarouselUlPrev = () => {
    if (carouselIndex === 0) {
      setListLocation(0);
      return;
    } else {
      setCarouselIndex(carouselIndex - 1);
      setListLocation(listLocation + 910);
      return;
    }
  };

  let trans = 'translateX(' + listLocation + 'px)';
  let transCarousel = { transform: trans };

  const navigate = useNavigate();
  return (
    <>
      <div className="wideBorder" />
      <div className="cardDetailInfoCarousel">
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
        <div className="writerInfo">
          <div className="writerInfoLeft">
            <div className="writerInfoImg">
              <img src={writerInfo.profile_image} alt="작가프로필이미지" />
            </div>
            <div className="writerInfoText">
              <h3>{writerInfo.kor_name}</h3>
              <h3>{writerInfo.eng_name}</h3>
              <div className="writerInfoTextDiv">
                <span className="writersFollow">
                  팔로워<span>{writerInfo.follower_cnt}</span>
                </span>
                <span className="writersFollow">
                  팔로잉
                  <span>{writerInfo.following_cnt}</span>
                </span>
              </div>
            </div>
          </div>
          <div className="followBtns" onClick={handleToggle}>
            {/* 
            로그인 한 상태이면서 팔로우한 상태에서만 팔로잉 버튼 
            1 : 팔로잉 되어있는 상태 (하얀 버튼)
            0 : 팔로잉 되어있지 않은 상태 (초록 버튼)
            */}
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
        </div>
        {/* Carousel */}
        {works === null ? (
          <div />
        ) : (
          <div className="otherWorksCarousel">
            <h3>이 크리에이터의 다른 작품</h3>
            <span>{info.user_feed_cnt}</span>
            <div className="otherWorkBtnContainer">
              <div
                className="otherWorksBtn otherWorksPrev"
                onClick={controlCarouselUlPrev}
              />
              <div className="otherWorksCarouselContainer">
                <ul>
                  <div className="liList" style={transCarousel}>
                    {works.map(work => {
                      return (
                        <li
                          className="otherWorksItem"
                          key={work.id}
                          onClick={() => {
                            navigate(`/works/${work.id}`);
                            window.location.reload();
                          }}
                        >
                          <div className="otherWorksImg">
                            <img src={work.img_url} alt={work.title} />
                          </div>
                          <div className="otherWorksTitle">{work.title}</div>
                        </li>
                      );
                    })}
                  </div>
                </ul>
              </div>
              <div
                className="otherWorksBtn otherWorksNext"
                onClick={controlCarouselUlNext}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CardDetailCarousel;
