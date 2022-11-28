import React from 'react';

import css from './Footer.module.scss';

function Footer() {
  return (
    <footer className={css.footerContainer}>
      <div className={css.footerAlign}>
        <div className={css.footerText}>
          <span>이용약관</span>
          <span>개인정보 처리방침</span>
          <span>ⓒ Photofolio.</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
