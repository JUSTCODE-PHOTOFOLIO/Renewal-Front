import React, { Fragment, useEffect } from 'react';
import CategoryCarousel from '../../components/CategoryCarousel/CategoryCarousel';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Artwork from '../../components/Artwork/Artwork';

const Work = () => {
  const BACK_URI = process.env.REACT_APP_BASE_BACK_URL;

  const PORT = process.env.REACT_APP_BACK_DEFAULT_PORT;
  return (
    <Fragment>
      <Header BACK_URI={BACK_URI} PORT={PORT} />
      <CategoryCarousel BACK_URI={BACK_URI} PORT={PORT} />
      <Artwork BACK_URI={BACK_URI} PORT={PORT} />
      <Footer />
    </Fragment>
  );
};

export default Work;
