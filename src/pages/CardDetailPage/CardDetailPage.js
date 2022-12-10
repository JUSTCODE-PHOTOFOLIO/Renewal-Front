import React, { Fragment, useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Tag from '../../components/CardDetailContent/Tag/Tag';
import Reply from '../../components/CardDetailContent/Reply/Reply';
import CardDetailCarousel from '../../components/CardDetailCarousel/CardDetailCarousel';
import CardList from '../../components/Artwork/CardList';
import './CardDetailPage.scss';

const CardDetailPage = () => {
  const URI = process.env.REACT_APP_BASE_URL;
  const [cardDetailContents, setcardDetailContents] = useState([]);
  const [tags, setTags] = useState([]); //태그
  const [feedImg, setFeedImg] = useState([]);
  const [userId, setUserId] = useState([]); //user_id
  const [info, setInfo] = useState({});
  const [works, setWorks] = useState([]);
  const [writerInfo, setWriterInfo] = useState([]);
  let [likeCnt, setLikeCnt] = useState(0); //좋아요 카운트
  let [likeBtn, setLikeBtn] = useState(false); //좋아요 버튼 상태
  const { id } = useParams();
  const token = localStorage.getItem('token');
  const idCheck = localStorage.getItem('id');

  //카드 상세페이지 정보 fetch
  useEffect(() => {
    fetch('http://' + URI + ':8000/works/feed/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    })
      .then(res => res.json())
      .then(res => {
        setcardDetailContents(res.feedWithTags[0]);
        setUserId(res.writerInfo[0].id);
        setTags(res.feedWithTags[0].tagInfo);
        setReplyArray(res.feedCommentInfo);
        setFeedImg(res.feedImgArr[0].fileInfo[0]);
        setInfo(res.moreFeedinfo[0]);
        setWorks(res.moreFeedinfo[0].more_feed);
        setWriterInfo(res.writerInfo[0]);
        setLikeCnt(res.sympathySortCount[0].sympathy_cnt);
      });
    //좋아요 버튼 상태
    fetch('http://' + URI + ':8000/sympathy/' + id, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    })
      .then(res => res.json())
      .then(res => {
        setLikeBtn(res.checkSympathyByUser);
      });
  }, [id]);

  const reply = useRef(); //현재 댓글의 value
  const [replyArray, setReplyArray] = useState([]); //댓글배열

  //새로운 댓글 저장 fetch
  const saveReply = () => {
    fetch('http://' + URI + ':8000/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify({ id: id, comment: reply.current.value }),
    })
      .then(res => res.json())
      .then(res => setReplyArray(res.data));
    reply.current.value = '';
  };

  const navigate = useNavigate();

  //로그인하지 않았을 때 댓글창 누르면, 메인으로 이동
  const openLoginModal = e => {
    alert('로그인한 다음 이용해 주세요.');
    !localStorage.getItem('token') &&
      document.querySelector('#replaceLogin').click();
  };

  const [menuBtn, setMenuBtn] = useState(false); //메뉴버튼 클릭 상태

  //메뉴버튼 클릭시 버튼의 상태 변경
  const menuClick = () => {
    setMenuBtn(!menuBtn);
  };

  //게시물 삭제
  const deleteContent = () => {
    alert(
      `작품을 정말 삭제하시겠습니까?                                                 작품을 삭제하면 댓글 정보까지 영구히 삭제됩니다.`
    );
    fetch('http://' + URI + ':8000/works/feed/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify({ posting_id: id }),
    });
    alert('작품이 삭제되었습니다.');
    navigate(`/channel/${userId}`);
  };

  function floatLoginModal() {
    alert('로그인한 다음 이용해 주세요.');
    !localStorage.getItem('token') &&
      document.querySelector('#replaceLogin').click();
  }

  //좋아요 버튼을 누르면
  const clickLike = () => {
    // 좋아요 카운트 증가
    if (token && likeBtn === false) {
      fetch('http://' + URI + ':8000/sympathy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token'),
        },
        body: JSON.stringify({
          posting_id: id,
          sympathy_id: 1,
        }),
      })
        .then(res => res.json())
        .then(res => {
          setLikeCnt(res.getSympathiesCount[0].sympathy_cnt);
          setLikeBtn(true);
        });
    } else if (token && likeBtn === true) {
      // 좋아요 카운트 감소
      fetch('http://' + URI + ':8000/sympathy', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token'),
        },
        body: JSON.stringify({
          posting_id: id,
        }),
      })
        .then(res => res.json())
        .then(res => {
          setLikeCnt(res.getSympathiesCount[0].sympathy_cnt);
          setLikeBtn(false);
        });
    }
  };

  const likeCheck = () => {
    if (token) {
      //로그인을 했을 시
      return (
        <button className="detail-icon">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1062/1062573.png"
            alt=""
            onClick={() => {
              clickLike();
            }}
          />
        </button>
      );
    } else {
      //로그인을 안했을 시
      return (
        <button className="detail-icon">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1062/1062573.png"
            alt=""
            onClick={floatLoginModal}
          />
        </button>
      );
    }
  };

  return (
    <Fragment>
      <Header />
      <div className="detail-out-wrapper">
        <div className="detail-header-wrapper">
          <div className="detail-title-wrapper">
            <h3 className="detail-title">{cardDetailContents.title}</h3>
          </div>
          <div className="detailInnerWrapper">
            <div>
              <span className="detail-writer-by">by</span>
              <button
                className="detail-writer-nickname"
                onClick={() => navigate(`/channel/${userId}`)}
              >
                {cardDetailContents.kor_name}
              </button>
              <span className="detail-date">
                {cardDetailContents.created_at}
              </span>
              <span className="detail-inquiry-count">
                조회수{cardDetailContents.view_count}
              </span>
            </div>
            {idCheck == cardDetailContents.user_id && (
              <span className="menuIcon" onClick={menuClick} />
            )}
            {menuBtn && (
              <div className="menuSelectWrapper">
                <div className="selectModify">
                  수정하기 <span className="selectPen" />
                </div>
                <div className="selectDelete" onClick={deleteContent}>
                  삭제하기
                  <div className="selectBin" onClick={deleteContent} />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="detail-content-wrapper">
          <div className="detail-content-pictures">
            <img src={feedImg.img_url} alt="" />
          </div>
          <div className="detail-content-content">
            {cardDetailContents.content}
          </div>
          {/* 태그 컴포넌트 */}
          <div className="detail-tag-wrapper">
            {tags &&
              tags.map((tag, index) => {
                return <Tag key={index} tag_name={tag.tag_name} />;
              })}
          </div>
          <div className="detail-copy-right">
            Copyright © {cardDetailContents.kor_name} All Rights Reserved.
          </div>
        </div>
        {/* 좋아요 */}
        <div className="detail-reaction-wrapper">
          <div className="detail-reaction-inner-wrapper">
            <div className="detail-reaction-icon-wrapper">{likeCheck()}</div>
            <div className="detail-reaction-icon-second-wrapper">
              <div className="detail-icon-title">좋아요</div>
              <div className="detail-icon-count">{likeCnt}</div>
            </div>
          </div>
        </div>
        <hr />
        <div className="detail-reply-out-wrapper">
          <div className="detail-reply-wrapper">
            <span className="detail-reply-icon">
              <img
                src="https://cdn-icons-png.flaticon.com/512/6460/6460733.png"
                alt=""
              />
            </span>
          </div>
        </div>
        <details>
          <summary />
          <div className="detail-reply-input-wrapper">
            <div className="detail-reply-input-inner-wrapper">
              <div className="detail-reply-title">
                {localStorage.getItem('kor_name')}
              </div>
              <div className="detail-reply-text-area-wrapper">
                {token ? (
                  <textarea
                    type="text"
                    placeholder="주제와 무관한 댓글, 악플은 삭제될 수 있습니다."
                    ref={reply}
                  />
                ) : (
                  <textarea
                    type="text"
                    placeholder="댓글을 작성하려면 로그인 해주세요."
                    onClick={openLoginModal}
                  />
                )}
              </div>
              <div className="detail-reply-text-limit">최대 1000자</div>
            </div>
            <div className="detail-reply-apload-btn">
              <button onClick={saveReply}>등록</button>
            </div>
          </div>
          <div className="detail-reply-list">
            {/* 댓글 컴포넌트 */}
            {replyArray.map(reply => {
              return (
                <Reply
                  key={reply.id}
                  id={reply.id}
                  user_id={reply.user_id}
                  kor_name={reply.kor_name}
                  comment={reply.comment}
                  created_at={reply.created_at}
                  URI={URI}
                  posting_id={cardDetailContents.id}
                />
              );
            })}
          </div>
        </details>
      </div>
      <CardDetailCarousel
        URI={URI}
        info={info}
        works={works}
        writerInfo={writerInfo}
      />
      <CardList URI={URI} />
      <Footer />
    </Fragment>
  );
};

export default CardDetailPage;
