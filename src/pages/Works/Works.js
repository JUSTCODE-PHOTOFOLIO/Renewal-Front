import React, { Fragment } from 'react';
import CategoryCarousel from '../../components/CategoryCarousel/CategoryCarousel';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Artwork from '../../components/Artwork/Artwork';

const Work = () => {
  const URI = process.env.REACT_APP_BASE_URL;
  return (
    <Fragment>
      <Header URI={URI} />
      <CategoryCarousel URI={URI} />
      <Artwork URI={URI} />
      <Footer />
    </Fragment>
  );
};

export default Work;
