import React, { Fragment } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CardDetailContent from '../../components/CardDetailContent/CardDetailContent';
import CardDetailCarousel from '../../components/CardDetailCarousel/CardDetailCarousel';
import CardList from '../../components/Artwork/CardList';

const CardDetailPage = () => {
  return (
    <Fragment>
      <Header />
      <CardDetailContent />
      <CardDetailCarousel />
      <CardList />
      <Footer />
    </Fragment>
  );
};

export default CardDetailPage;
