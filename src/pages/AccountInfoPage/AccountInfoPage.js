import React, { Fragment } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import AccountInfo from '../../components/AccountInfo/AccountInfo';

const AccountInfoPage = () => {
  const URI = process.env.REACT_APP_BASE_URL;
  const PORT = process.env.REACT_APP_BACK_DEFAULT_PORT;
  return (
    <Fragment>
      <Header URI={URI} PORT={PORT} />
      <AccountInfo URI={URI} PORT={PORT} />
      <Footer />
    </Fragment>
  );
};

export default AccountInfoPage;
