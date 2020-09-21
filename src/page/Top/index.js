import React, { Fragment } from 'react';
import '../../styles/index.scss';
import cx from 'classnames';
import * as firebase from 'firebase';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { checkTag } from '../../_parts/tagList/index';
import { Header } from '../../_parts/Header/index';
import { Footer } from '../../_parts/Footer/index';

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
  const [title, setTitle] = useState('');
  const [search, setSearch] = useState(false);
  const pageNum = 2;

  const titleSearchButton = async ()=> {
    if(title === '') return;
    const db = firebase.firestore();

    // collection取得
    const snapshot = await db
    .collection('movies')
    // .orderBy('title')これがあるとなぜかエラーになる
    .where( 'title', '==', title)
    .limit(pageNum)
    .get();

    const _movies = [];

    snapshot.forEach(doc => {
      _movies.push({
        movieId: doc.id,
        ...doc.data()
      });
    })

    setMovies(_movies);
    setSearch(true)
  };


  const tagSearchButton = async ()=> {
    const db = firebase.firestore();
    const tags = [];
    const tag = document.getElementsByName('tag');

    let check = 0;

    for (let i = 0; i < tag.length; i++){
      if(tag[i].checked){
        tags.push(tag[i].value);
        check++
      }
    }

    if(check === 0) return;

    // 方法１配列使って、綺麗にゆるり検索
    db
    .collection('movies')
    .where( 'tag', 'array-contains-any', tags)
    .orderBy('title')
    // .limit(pageNum)
    .onSnapshot((querySnapshot) => {
      const _movies = querySnapshot.docs.map(doc => {
        return{
          movieID: doc.id,
          ...doc.data()
        }
      });
      setMovies(_movies)
      setSearch(true)
    })
  };

  const tagAbsolutelySearchButton = async () => {
    const db = firebase.firestore();
    const tags = [];
    const tag = document.getElementsByName('tag');

    let check = 0;

    for (let i = 0; i < tag.length; i++){
      if(tag[i].checked){
        tags.push(tag[i].value);
        check++
      }
    }

    if(check === 0) return;

    const _movies = [];

    //方法２ tagToSearchと言う、検索に表示させるタメだけのタグと同じ連想配列を作った。
    let fun = false;
    let you = false;
    let hou = false;

      for(let i = 0; i < tags.length; i++){
        if(tags[i] === '面白い') fun = true;
        if(tags[i] === '洋画') you = true;
        if(tags[i] === '邦画') hou = true;
      }

      const snapshot = await db
      .collection('movies')
      .where( `tagToSearch.面白い`, '==', fun)//タグの数だけ追記
      .where( `tagToSearch.洋画` , '==', you)//タグの数だけ追記
      .where( `tagToSearch.邦画` , '==', hou)//タグの数だけ追記
      .orderBy('title')
      // .limit(pageNum)
      .get();//チェックをつけていないものは、whereしたくない。これができないため断念。現状では、完全一致で表示。

      snapshot.forEach(doc => {
        _movies.push({
          movieId: doc.id,
          ...doc.data()
        });
      })

    setMovies(_movies);
    setSearch(true);
  }


  const resetSearchButton = () => {
    const db = firebase.firestore();
    db.collection('movies').orderBy('title').limit(pageNum).onSnapshot((querySnapshot) => {
      const _movies = querySnapshot.docs.map(doc => {
        return{
          movieID: doc.id,
          ...doc.data()
        }
      });
      setMovies(_movies)
      setTitle('')
      setSearch(false)
    })
  }

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
            <div><a href={movie.link} target="_blank" rel="noopener noreferrer" >リンク</a></div>
            {movie.tag &&
            <div className='tags'>
                <div>tag : </div>
                <ul>{movie.tag.map((tag, index2) => (
                    <li key={index2}>{tag}</li>
                ))}</ul>
            </div>
            }
        </li>
    )
  })

  const Pager = () => {
    //ここ何とかしたいけど、function使わずにいけんの？？？
    if(search) return (<ul><li></li></ul>);//検索時のページャーはいったん諦めた。
    return(
      <Fragment>
        <ul>
          <li onClick={()=> handleMovePage(1)}>1</li>
          <li onClick={()=> handleMovePage(2)}>2</li>
          <li onClick={()=> handleMovePage(3)}>3</li>
          <li onClick={()=> handleMovePage(4)}>4</li>
        </ul>
        <p>力不足で、不要なページャーも出てます。。。</p>
      </Fragment>
    )
  }

  const handleMovePage = async (page) => {
    const db = firebase.firestore();
      if(page === 1){
        db.collection('movies').orderBy('title').limit(pageNum).onSnapshot((querySnapshot) => {
          const _movies = querySnapshot.docs.map(doc => {
            return{
              movieID: doc.id,
              ...doc.data()
            }
          });
          setMovies(_movies)
        })
        return
      }

      const limit = (page - 1) * pageNum

      const first = db.collection('movies').orderBy('title').limit(limit);
  
      const snapshot = await first.get();
  
      const last = snapshot.docs[snapshot.docs.length - 1];
    
      const newSnapshot = await db
      .collection('movies')
      .orderBy('title')
      .startAfter(last.data().title)
      .limit(pageNum)
      .get();
  
      const _movies = [];
      newSnapshot.forEach(doc => {
        _movies.push({
          movieId: doc.id,
          ...doc.data()
        });
      })

      setMovies(_movies);
  }

  useEffect(() => {

    const db = firebase.firestore();
    const unsubscribe = db.collection('movies').orderBy('title').limit(pageNum).onSnapshot((querySnapshot) => {
      const _movies = querySnapshot.docs.map(doc => {
        return{
          movieID: doc.id,
          ...doc.data()
        }
      });
      setMovies(_movies)
    })
    return() => {
      unsubscribe();
    }
  },[])

  return (
    <div className={cx('Top')}>
      <Header/>
      <h1>Top</h1>
      <div>
        <div>
          <label htmlFor="title">タイトル : </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(event)=>{setTitle(event.target.value)}}
          />
          <button onClick={()=>titleSearchButton()}>タイトル検索</button>
        </div>
        <div>
         {checkTag}
          <button onClick={()=>tagSearchButton()}>タグゆるり検索</button>
          <p>選択したタグが一つでもヒットしていれば表示</p>
          <button onClick={()=>tagAbsolutelySearchButton()}>タグ絶対検索</button>
          <p>選択したタグが完全に一致していれば表示</p>
        </div>
        <button onClick={()=>resetSearchButton()}>リセット</button>
      </div>
      <Link to='/registration' >新規登録</Link>
      <ul>
        {userListItems}
      </ul>
      <Pager />
      <Footer/>
    </div>
  );
}

export {Top};
