import React, { Fragment } from 'react';
import Header from '../../components/Header/Header';
import Channel from '../../components/Channel/Channel';

const ChannelPage = () => {
  const URI = process.env.REACT_APP_BASE_URL;
  return (
    <Fragment>
      <Header URI={URI} />
      <Channel URI={URI} />
    </Fragment>
  );
};

export default ChannelPage;
