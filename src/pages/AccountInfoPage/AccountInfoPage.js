import React, { Fragment } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import AccountInfo from '../../components/AccountInfo/AccountInfo';

const AccountInfoPage = () => {
  const BACK_URI = process.env.REACT_APP_BASE_BACK_URL;
  const PORT = process.env.REACT_APP_BACK_DEFAULT_PORT;
  return (
    <Fragment>
      <Header BACK_URI={BACK_URI} PORT={PORT} />
      <AccountInfo BACK_URI={BACK_URI} PORT={PORT} />
      <Footer />
    </Fragment>
  );
};

export default AccountInfoPage;
