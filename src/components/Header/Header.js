import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import css from './Header.module.scss';
import Login from '../Login/Login';
import Join from '../Join/Join';

function Header({ pathname }) {
  const id = localStorage.getItem('id');
  const location = useLocation();
  let nowPage = location.pathname;

  //로그인 여부 체크
  const [isLogin, setIsLogin] = useState(false);

  //프로필 이미지 hover 여부 체크
  const [isHovering, setIsHovering] = useState(false);

  // const [haveProfileImg, setHaveProfileImg] = useState(false);

  //login창 로직 추가 코드
  const [openLoginpage, setOpenLoginPage] = useState(false);
  const [openJoinPage, setJoinPage] = useState(false);
  function closeLoginpage() {
    setOpenLoginPage(false);
  }
  function clickLoginBtn(event) {
    setOpenLoginPage(true);
  }

  //localStorage에 token 유무 체크
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (token) {
      setIsLogin(true);
      return;
    } else if (!token || token === undefined) {
      setIsLogin(false);
      return;
    }
  }, [token]);

  //localStorage에 프로필 이미지 유무 체크
  const profileImg = localStorage.getItem('profile_image');
  const defaultProfileImg =
    'https://cdn-icons-png.flaticon.com/512/847/847969.png';

  //프로필 이미지 hover 함수
  const handleMouseOver = () => {
    setIsHovering(true);
  };
  const handleMouseOut = () => {
    setIsHovering(false);
  };

  //메뉴 클릭 시 페이지 이동을 위한 useNavigate
  const navigate = useNavigate();

  //검색페이지 이동
  const [content, setContent] = useState();
  const nowContent = useRef();
  const goToSearhPage = e => {
    if (e.key === 'Enter') {
      let url = '/searchlist?query=' + content;
      navigate(url);
    } else {
      setContent(nowContent.current.value);
    }
  };

  return (
    <header>
      {/* login창 로직 추가 코드 */}
      {openLoginpage && (
        <div
          style={{ boxShadow: 'rgba(0, 0, 0, 0.5) 0 0 0 9999px', zIndex: '3' }}
        >
          <Login
            closeLoginpage={closeLoginpage}
            setJoinPage={setJoinPage}
            setOpenLoginPage={setOpenLoginPage}
          />
        </div>
      )}
      {openJoinPage && (
        <div
          style={{ boxShadow: 'rgba(0, 0, 0, 0.5) 0 0 0 9999px', zIndex: '3' }}
        >
          <Join setJoinPage={setJoinPage} />
        </div>
      )}
      {/* login창 로직 추가 코드 종료*/}

      <div className={css.headerContainer}>
        <div className={css.headerMenu}>
          <span
            className={css.titleLogo}
            onClick={() => {
              isLogin === true ? navigate('/feeds') : navigate('/works');
            }}
          >
            PHOTOFOLIO
          </span>
          <ul>
            {isLogin === true && (
              <li
                onClick={() => {
                  navigate('/feeds');
                }}
                className={nowPage === '/feeds' ? css.on : ''}
              >
                피드
              </li>
            )}
            <li
              onClick={() => {
                navigate('/works');
              }}
              className={nowPage === '/works' ? css.on : ''}
            >
              작품
            </li>
            <li>배경화면</li>
            <li>스토리</li>
            <li>콜라보레이션</li>
          </ul>
        </div>
        <div className={css.headerRight}>
          {pathname ? (
            <div />
          ) : (
            <input
              type="input"
              className={css.searchInput}
              ref={nowContent}
              onKeyUp={goToSearhPage}
            />
          )}

          {isLogin === false ? (
            <button className={css.headerBtn} onClick={clickLoginBtn}>
              로그인
            </button>
          ) : (
            <>
              <button
                className={css.uploadBtn + ' ' + css.headerBtn}
                onClick={() => {
                  navigate('/upload');
                }}
              >
                업로드
              </button>
              <div
                className={css.mouseHover}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
              >
                <div
                  className={css.headerProfileImg}
                  onClick={() => {
                    navigate(`/channel/${id}`);
                    window.location.reload();
                  }}
                  style={
                    profileImg
                      ? {
                          backgroundImage: `url(${profileImg})`,
                        }
                      : { backgroundImage: `url(${defaultProfileImg})` }
                  }
                />
                <div className={isHovering ? css.headerProfileMenu : css.hide}>
                  <ul>
                    <li
                      onClick={() => {
                        navigate('/accountInfo');
                      }}
                    >
                      포토폴리오 MY
                    </li>
                    <li
                      onClick={() => {
                        localStorage.clear();
                        window.location.href = 'http://43.201.0.95:3000/works';
                      }}
                    >
                      로그아웃
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
