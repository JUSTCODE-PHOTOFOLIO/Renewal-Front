import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import './CardDetailCarousel.scss';

import Follow from '../Follow/Follow';

const CardDetailCarousel = ({ BACK_URI, info, works, writerInfo, PORT }) => {
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
          <Follow
            writerInfo={writerInfo}
            BACK_URI={BACK_URI}
            type={'short'}
            PORT={PORT}
          />
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
