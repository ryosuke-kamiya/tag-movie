import React from 'react';
import '../../styles/index.scss';
// import './_style.scss';
import cx from 'classnames';
import * as firebase from 'firebase';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

var firebaseConfig = {
  apiKey: "AIzaSyDrd_B1MlnDKCfRUFWqh0pJVlyBtsxbmKM",
  authDomain: "tag-movie.firebaseapp.com",
  databaseURL: "https://tag-movie.firebaseio.com",
  projectId: "tag-movie",
  storageBucket: "tag-movie.appspot.com",
  messagingSenderId: "970472171001",
  appId: "1:970472171001:web:718d629dce05e23ceac928",
  measurementId: "G-8RP1E25KXL"
};

firebase.initializeApp(firebaseConfig);

function Top() {
 
  const [movies, setMovies] = useState([]);
//   const [title, setTitle] = useState();

//   const handleClickFetchButton = async ()=> {//これが検索フォームに使える！！！
//     const db = firebase.firestore();
//     // document取得
//     // const doc = await db.collection('movies').doc('FmppkTMVH6yPqWvUf9wf').get();
//     // console.log('Document Data:' ,doc.data() );

//     // collection取得
//     const snapshot = await db
//     .collection('movies')
//     // .where('age', '<=' ,30)絞り込み
//     // .limit(1)件数制限
//     .get();

//     const _movies = [];

//     snapshot.forEach(doc => {
//       _movies.push({
//         userID: doc.id,
//         ...doc.data()
//       });
//     })

//     setMovies(_movies);
//   };

//   const handleClickUpdateButton = async () => {

//     if(!documentID){
//       alert('documentIDをセットしてください');
//       return;
//     }

//     const newData = {};
//     if(userName){
//       newData['name'] = userName;
//     }
//     if(age){
//       newData['age'] = parseInt(age,10);
//     }
//     try{
//       const db = firebase.firestore();
//       await db.collection('movies').doc(documentID).update(newData);
//       setUsername('')
//       setAge('')
//       setDocumentID('')
//     }catch(error){
//       console.log(error);
//     }



//     // await db.collection('movies').doc('uQhbXB9RYSLTHhxG1zEs').update({
//     //   name: '田中でした',
//     //   age: 33
//     // })
//   }

//   const handleClickDeleteButton = async () => {
//     // const db = firebase.firestore();
//     // db.collection('movies').doc('D6AcCpdUnuxNQNbrrhP0').delete().then(function () {
//     //   console.log("Document successfully deleted")
//     // }).catch(function (error) {
//     //   console.error("error removing document :", error);
//     // })

//     if(!documentID){
//       alert('documentIDをセットしてください');
//       return;
//     }

//     try{
//       const db = firebase.firestore();
//       await db.collection('movies').doc(documentID).delete();
//       setUsername('')
//       setAge('')
//       setDocumentID('')
//     }catch(error){
//       console.log(error);
//     }
//   }

  const userListItems = movies.map((movie, index) => {

    return(
        <li key={index}>
            <div>title : {movie.title}</div>
            {movie.tag &&
            <div>
                <div>tag : </div>
                <ul>{movie.tag.map((tag, index2) => (
                    <li key={index2}>{tag}</li>
                ))}</ul>
            </div>
            }
        </li>
    )
  })

  useEffect(() => {
    const db = firebase.firestore();
    const unsubscribe = db.collection('movies').onSnapshot((querySnapshot) => {
      const _movies = querySnapshot.docs.map(doc => {
        return{
          userID: doc.id,
          ...doc.data()
        }
      });
      setMovies(_movies)
    })
    return() => {
      unsubscribe();
    }
  },[])//これでリアルタイム自動更新

  return (
    <div className={cx('Top')}>
      <h1>Top</h1>
      <div>ここに検索フォーム作る</div>
      <Link to='/registration' >新規登録</Link>
      <ul>
        {userListItems}
      </ul>
    </div>
  );
}

export {Top};
