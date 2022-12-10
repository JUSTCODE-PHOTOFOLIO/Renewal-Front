import React, { Fragment } from 'react';
import Header from '../../components/Header/Header';
import CardList from '../../components/Artwork/CardList';
import Footer from '../../components/Footer/Footer';
const Feed = () => {
  const URI = process.env.REACT_APP_BASE_URL;
  return (
    <Fragment>
      <Header URI={URI} />
      <CardList URI={URI} />
      <Footer />
    </Fragment>
  );
};

export default Feed;
