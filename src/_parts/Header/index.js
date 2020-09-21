import React from 'react';
// import styles from '../../styles/index.scss';
import logo from '../../images/logo/logo.png';

const Header =()=> {

  return(
    <header>
      <h1>
        <a href="/"><img className='headerLogo' src={logo} alt="movie tag"/></a>
      </h1>
      <p>観たい映画を探しましょーー！！</p>
      {/* <a href="#">ログイン</a>
      <a href="#">新規登録</a>
      <a href="#">お問い合せ</a> */}
    </header>
  )
}

export { Header };