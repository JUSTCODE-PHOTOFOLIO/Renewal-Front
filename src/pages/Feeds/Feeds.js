import React, { Fragment } from 'react';
import Header from '../../components/Header/Header';
import CardList from '../../components/Artwork/CardList';
import Footer from '../../components/Footer/Footer';
const Feed = () => {
  return (
    <Fragment>
      <Header />
      <CardList />
      <Footer />
    </Fragment>
  );
};

export default Feed;
