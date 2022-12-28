import React, { Fragment } from 'react';
import Header from '../../components/Header/Header';
import Channel from '../../components/Channel/Channel';

const ChannelPage = () => {
  const BACK_URI = process.env.REACT_APP_BASE_BACK_URL;
  const PORT = process.env.REACT_APP_BACK_DEFAULT_PORT;
  return (
    <Fragment>
      <Header BACK_URI={BACK_URI} PORT={PORT} />
      <Channel BACK_URI={BACK_URI} PORT={PORT} />
    </Fragment>
  );
};

export default ChannelPage;
