import React, { Fragment } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import AccountInfo from '../../components/AccountInfo/AccountInfo';

const AccountInfoPage = () => {
  return (
    <Fragment>
      <Header />
      <AccountInfo />
      <Footer />
    </Fragment>
  );
};

export default AccountInfoPage;
