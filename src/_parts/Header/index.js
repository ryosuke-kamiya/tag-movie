import React from 'react';
// import styles from '../../styles/index.scss';
import logo from '../../images/logo/logo.png';
// import firebase from 'firebase/app'
// import 'firebase/app'
// import 'firebase/firestore'
// import 'firebase/auth'


const Header =()=> {

//   function loginCheck(){
//     firebase.auth().onAuthStateChanged(function(user) {
//         if (user) {
//             document.getElementById("login-status").value="login"
//         }else{
//             document.getElementById("login-status").value="not logged"
//         }
//     });
// }

// useEffect(() => {
// // 1st check
//   loginCheck();
// }, []);

// // wite
// const handleLogin = () => {
//     const provider = new firebase.auth.GoogleAuthProvider();
//     firebase.auth().signInWithPopup(provider)
//     .then(()=> {
//         loginCheck();
//     })
//     .catch(()=> {
//         loginCheck();
//     });
// };



  return(
    <header>
      <h1>
        <a href="/"><img className='headerLogo' src={logo} alt="movie tag"/></a>
      </h1>
      <p>観たい映画を探しましょーー！！</p>
      {/* <div onClick={() => handleLogin}>ログイン</div>
      <input type="text" id='login-status'/> */}
      {/* <a href="#">新規登録</a> */}
      {/* <a href="#">お問い合せ</a> */}
    </header>
  )
}

export { Header };