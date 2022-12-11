import React, { Fragment } from 'react';
import CategoryCarousel from '../../components/CategoryCarousel/CategoryCarousel';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Artwork from '../../components/Artwork/Artwork';

const Work = () => {
  const URI = process.env.REACT_APP_BASE_URL;
  const PORT = process.env.REACT_APP_BACK_DEFAULT_PORT;
  return (
    <Fragment>
      <Header URI={URI} PORT={PORT} />
      <CategoryCarousel URI={URI} PORT={PORT} />
      <Artwork URI={URI} PORT={PORT} />
      <Footer />
    </Fragment>
  );
};

export default Work;
