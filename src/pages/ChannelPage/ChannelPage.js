import React, { Fragment } from 'react';
import Header from '../../components/Header/Header';
import Channel from '../../components/Channel/Channel';

const ChannelPage = () => {
  const URI = process.env.REACT_APP_BASE_URL;
  const PORT = process.env.REACT_APP_BACK_DEFAULT_PORT;
  return (
    <Fragment>
      <Header URI={URI} PORT={PORT} />
      <Channel URI={URI} PORT={PORT} />
    </Fragment>
  );
};

export default ChannelPage;
