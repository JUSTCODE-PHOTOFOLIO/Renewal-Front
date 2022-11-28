import React, { Fragment } from 'react';
import CategoryCarousel from '../../components/CategoryCarousel/CategoryCarousel';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Artwork from '../../components/Artwork/Artwork';

const Work = () => {
  return (
    <Fragment>
      <Header />
      <CategoryCarousel />
      <Artwork />
      <Footer />
    </Fragment>
  );
};

export default Work;
