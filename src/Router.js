import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Works from './pages/Works/Works';
import Feeds from './pages/Feeds/Feeds';
import Join from './components/Join/Join';
import Login from './components/Login/Login';
import Upload from './pages/Upload/Upload';
import AccountInfoPage from './pages/AccountInfoPage/AccountInfoPage';
import ChannelPage from './pages/ChannelPage/ChannelPage';
import CardDetailPage from './pages/CardDetailPage/CardDetailPage';
import SearchPage from './pages/SearchPage/SearchPage';
import Category from './pages/Category/Category';

const Router = () => {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [isLogin]);
  //처음 접속 시 토큰 여부에 따라 시작 페이지 설정
  if (
    (window.location.href === 'http://43.201.0.95:3000/') &
    (isLogin === false)
  ) {
    window.location.href = 'http://43.201.0.95:3000/works';
  } else if (
    (window.location.href === 'http://43.201.0.95:3000/') &
    (isLogin === true)
  ) {
    window.location.href = 'http://43.201.0.95:3000/feeds';
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/works" element={<Works />} />
        <Route path="/feeds" element={<Feeds />} />
        <Route path="/user/signup" element={<Join />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/accountInfo" element={<AccountInfoPage />} />
        <Route path="/channel/:user_id" element={<ChannelPage />} />
        <Route path="/works/:id" element={<CardDetailPage />} />
        <Route path="/searchList" element={<SearchPage />} />
        <Route path="/category/:id" element={<Category />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
