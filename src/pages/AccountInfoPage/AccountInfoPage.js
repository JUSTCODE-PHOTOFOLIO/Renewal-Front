import React, { Fragment } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import AccountInfo from '../../components/AccountInfo/AccountInfo';

const AccountInfoPage = () => {
  const URI = process.env.REACT_APP_BASE_URL;
  return (
    <Fragment>
      <Header URI={URI} />
      <AccountInfo URI={URI} />
      <Footer />
    </Fragment>
  );
};

export default AccountInfoPage;
