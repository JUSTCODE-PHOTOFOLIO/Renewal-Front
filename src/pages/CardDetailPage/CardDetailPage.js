import React, { Fragment } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CardDetailContent from '../../components/CardDetailContent/CardDetailContent';
import CardDetailCarousel from '../../components/CardDetailCarousel/CardDetailCarousel';
import CardList from '../../components/Artwork/CardList';

const CardDetailPage = () => {
  const URI = process.env.REACT_APP_BASE_URL;
  return (
    <Fragment>
      <Header />
      <CardDetailContent URI={URI} />
      <CardDetailCarousel URI={URI} />
      <CardList URI={URI} />
      <Footer />
    </Fragment>
  );
};

export default CardDetailPage;
