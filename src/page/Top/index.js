import React, { Fragment, useState, useEffect } from 'react';
import '../../styles/index.scss';
import cx from 'classnames';
import * as firebase from 'firebase';
import { Link } from 'react-router-dom';

import { CheckTag } from '../../_parts/tagList/index';
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
  const [allData, setAllData] = useState([]);
  const [tagList, setTagList] = useState([]);
  // const [searchAllData, setSearchAllData] = useState([]);
  const pageNum = 10;

  const titleSearchButton = async ()=> {
    if(title === '') return;
    const db = firebase.firestore();

    // collection取得
    const snapshot = await db
    .collection('movies')
    // .orderBy('title')これがあるとなぜかエラーになる
    .where( 'title', '==', title)
    // .limit(pageNum)
    .get();

    const _movies = [];

    snapshot.forEach(doc => {
      _movies.push({
        movieId: doc.id,
        ...doc.data()
      });
    })

    //ページャーで使うデータ。orderByとlimit問題が解決しないとだめ。
    // db.collection('movies').where( 'title', '==', title).onSnapshot((querySnapshot) => {
    //   const _SearchAllData = querySnapshot.docs.map((doc, index) => {
    //     return(index)
    //   });
    //   setSearchAllData(_SearchAllData)
    // })

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
    if(check > 9){
      alert('タグゆるり検索は10以上のタグを同時に検索できません。')
      return;
    }

    const snapshot = await db
    .collection('movies')
    .where( 'tag', 'array-contains-any', tags)
    .orderBy('title')
    // .limit(pageNum)
    .get();


    const _movies = [];

    snapshot.forEach(doc => {
      _movies.push({
        movieId: doc.id,
        ...doc.data()
      });
    })//ここまでがstep1。これだと検索条件がガバガバなので、さらに厳しくしていきます。

    const okList = [];//合格した配列の番号たちを取得して配列に格納できた！！天才かもしれない。


    for(let i = 0; i < _movies.length; i++){
      let okCount = 0;
      for(let n=0; n < _movies[i].tag.length; n++){
        if(tags.includes(_movies[i].tag[n])){
          okCount++;
        }
      }
      if(tags.length === okCount){
        // console.log("こいつ合格です。" + i);
        okList.push(i)
      }
    }

    const ok_movies = [];

      for(let i = 0; i < okList.length; i++){
        let okNum = okList[i]
        ok_movies.push(
          _movies[okNum]
        )
      }
    setMovies(ok_movies)
    setSearch(true)
  };

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

    const tag = document.getElementsByName('tag');

    for (let i = 0; i < tag.length; i++){
      if(tag[i].checked){
        tag[i].checked = false
      }
    }
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
        <li key={index} className='movieCard'>
            <div>{movie.title}</div>
            <a href={movie.link} className='movieLinkButton' target="_blank" rel="noopener noreferrer" >Amazon</a>
            {movie.tag &&
              <ul className='tags'>{movie.tag.map((tag, index2) => (
                  <li key={index2} className='tag'>{tag}</li>
              ))}</ul>
            }
        </li>
    )
  })

  const Pager = () => {

    if(!search){
      let arrayAllPage = [];

      const loopNum = Math.ceil(allData.length/pageNum);

      for(let i = 0; i < loopNum; i++){
        arrayAllPage.push(i)
      }
  
      return(
        <Fragment>
          <ul className='pagerList'>
          {
            arrayAllPage.map((page, index) => {
              return(
                <li className='pager' key={index} onClick={()=> handleMovePage(page + 1)}>{page + 1}</li>
              )
            })
          }
          </ul>
        </Fragment>
      )
    }else{
      return(
        <Fragment>
          <ul className='pagerList'>
          {/* {
            searchAllData.map((page, index) => {
              return(
                <li className='pager' key={index} onClick={()=> handleMovePage(page + 1)}>{page + 1}</li>
              )
            })
          } */}
          </ul>
        </Fragment>
      )
    }
  }

  const handleMovePage = async (page) => {
    console.log('handlemove')
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
    
    db.collection('movies').onSnapshot((querySnapshot) => {
      const _allData = querySnapshot.docs.map(doc => {
        return{
          movieID: doc.id,
          ...doc.data()
        }
      });
      setAllData(_allData)
    })
    return() => {
      unsubscribe();
    }
  },[])

  return (
    <Fragment>
      <Header/>
        <div className={cx('Top')}>
          <div className='searchForm'>
            <p>タグを選択して検索してください。</p>
            <p>あなたの気分に合わせた今観たい映画を探します。</p>
            <div className='titleBox'>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(event)=>{setTitle(event.target.value)}}
              />
              <button onClick={()=>titleSearchButton()}>タイトル検索</button>
            </div>
              <CheckTag
                setTagList={setTagList}
                tagList={tagList}
              />
            <button className='tagButton' onClick={()=>tagSearchButton()}>タグ検索</button>
            <button className='resetButton' onClick={()=>resetSearchButton()}>検索結果リセット</button>
          </div>
          <div className='addMovieButtonWrapper'>
            <Link to='/registration' className='addMovieButton' >新規登録</Link>
            <Link to='/tagRegistration' className='addTagButton' >新規タグ追加</Link>
          </div>
          <ul className="movieCards">
            {userListItems}
          </ul>
          <Pager />
          <div className='page-top'><a href="#">▲</a></div>
        </div>
      <Footer/>
    </Fragment>
  );
}

export {Top};
