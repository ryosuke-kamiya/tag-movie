import React from 'react';
// import styles from '../../styles/index.scss';
import logo from '../../images/logo/logo.png';

const Header =()=> {

  return(
    <header>
      <a href="/"><img className='headerLogo' src={logo} alt="movie tag"/></a>
      {/* <a href="#">ログイン</a>
      <a href="#">新規登録</a>
      <a href="#">お問い合せ</a> */}
    </header>
  )
}

export { Header };