import React, { Fragment, useState, useEffect } from 'react';
import '../../styles/index.scss';
import cx from 'classnames';
import * as firebase from 'firebase';

import { CheckTag } from '../../_parts/tagList/index';
import { Header } from '../../_parts/Header/index';
import { Footer } from '../../_parts/Footer/index';
import { BlueButton } from '../../_parts/BlueButton/index';

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
  const [searchMovies, setSearchMovies] = useState([]);
  const [title, setTitle] = useState('');
  const [search, setSearch] = useState(false);
  const [allData, setAllData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(1)
  const pageNum = 10;
  const db = firebase.firestore();

  const titleSearchButton = async ()=> {
    if(title === '') return;

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

    //ページャーで使うデータ。orderByとlimit問題が解決しないとだめ。と思ってたけど、タイトルで検索して何件もヒットすることはないんでいらないです。
    // db.collection('movies').where( 'title', '==', title).onSnapshot((querySnapshot) => {
    //   const _SearchAllData = querySnapshot.docs.map((doc, index) => {
    //     return(index)
    //   });
    //   setSearchAllData(_SearchAllData)
    // })

    setMovies(_movies);
    setSearch(true);
    setCurrentIndex(1);
  };


  const tagSearchButton = async ()=> {
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
      alert('タグ検索は10以上のタグを同時に検索できません。')
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

    const first = ok_movies.slice(0, 10)
    setMovies(first)
    setSearchMovies(ok_movies)
    setSearch(true)
    setCurrentIndex(1);
  };

  const resetSearchButton = () => {
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
    setCurrentIndex(1);
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
//       await db.collection('movies').doc(documentID).delete();
//       setUsername('')
//       setAge('')
//       setDocumentID('')
//     }catch(error){
//       console.log(error);
//     }
//   }

  const Pager = () => {

    if(!search){
      let arrayAllPage = [];

      const loopNum = Math.ceil(allData.length/pageNum);

      for(let i = 0; i < loopNum; i++){
        arrayAllPage.push(i)
      }

      let centerPage = []
      if(currentIndex === 1){//１ページ目
        centerPage = arrayAllPage.slice(currentIndex, currentIndex+3);
      }else if(currentIndex-2 < 1){//２ページ目
        centerPage = arrayAllPage.slice(currentIndex-1, currentIndex+2);
      }else if(loopNum === currentIndex){//最終ページ
        centerPage = arrayAllPage.slice(currentIndex-4, currentIndex-1);
      }else if(loopNum <= currentIndex+1){
        centerPage = arrayAllPage.slice(currentIndex-3, currentIndex);
      }else{
        centerPage = arrayAllPage.slice(currentIndex-2, currentIndex+1);//通常時
      }
  
      return(
        <Fragment>
        {loopNum > 1 &&
          <ul className='pagerList'>
            <li className={cx('pager', {
                  'pagerDisabled': currentIndex <= 1
                })}
              onClick={() => {
                if(currentIndex <= 1) return;
                handleMovePage(currentIndex - 1)
              }}
              >＜
            </li>
            <li className={cx('pager', {'currentPage': currentIndex === 1})}
                onClick={()=> handleMovePage(1)}
             >
            1
            </li>
          {loopNum > 6 && currentIndex > 3 &&
            <li className='pagerAbridge'>...</li>
          }
          {
            centerPage.map((page, index) => {
              return(
                <li className={cx('pager', {'currentPage': currentIndex === page + 1})} key={index} onClick={()=> handleMovePage(page + 1)}>{page + 1}</li>
              )
            })
          }
          {loopNum > 6 && currentIndex < loopNum - 2 &&
            <li className='pagerAbridge'>...</li>
          }
          <li className={cx('pager', {'currentPage': currentIndex === loopNum})}
                onClick={()=> handleMovePage(loopNum)}
             >
            {loopNum}
          </li>
          <li className={cx('pager', {
                'pagerDisabled': currentIndex >= arrayAllPage.pop() + 1
              })}
              onClick={() => {
                if(currentIndex > arrayAllPage.pop() + 1) return;//うまくいってるけどなんでや。これだと一歩手前で止まらんのか、謎。
                handleMovePage(currentIndex + 1)
              }}
              >＞</li>
          </ul>
        }
        </Fragment>
      )
    }else{
      let arraySearchPage = [];

      let loopNum = Math.ceil(searchMovies.length/pageNum);

      for(let i = 0; i < loopNum; i++){
        arraySearchPage.push(i)
      }

      let centerPage = []
      if(loopNum <= 5){//maxが５ページ以下
        centerPage = arraySearchPage.slice(1, loopNum-1);
      }else if(currentIndex === 1){//１ページ目
        centerPage = arraySearchPage.slice(currentIndex, currentIndex+3);
      }else if(currentIndex-2 < 1){//２ページ目
        centerPage = arraySearchPage.slice(currentIndex-1, currentIndex+2);
      }else if(loopNum === currentIndex){//最終ページ
        centerPage = arraySearchPage.slice(currentIndex-4, currentIndex-1);
      }else if(loopNum <= currentIndex+1){
        centerPage = arraySearchPage.slice(currentIndex-3, currentIndex);
      }else{
        centerPage = arraySearchPage.slice(currentIndex-2, currentIndex+1);//通常時
      }

      return(
        <Fragment>
           {loopNum > 1 &&
          <ul className='pagerList'>
            <li className={cx('pager', {
                  'pagerDisabled': currentIndex <= 1
                })}
              onClick={() => {
                if(currentIndex <= 1) return;
                handleMovePage(currentIndex - 1)
              }}
              >＜
            </li>
            <li className={cx('pager', {'currentPage': currentIndex === 1})}
                onClick={()=> handleMovePage(1)}
             >
            1
            </li>
          {loopNum > 6 && currentIndex > 3 &&
            <li className='pagerAbridge'>...</li>
          }
          {
            centerPage.map((page, index) => {
              return(
                <li className={cx('pager', {'currentPage': currentIndex === page + 1})} key={index} onClick={()=> handleMovePage(page + 1)}>{page + 1}</li>
              )
            })
          }
          {loopNum > 6 && currentIndex < loopNum - 2 &&
            <li className='pagerAbridge'>...</li>
          }
          <li className={cx('pager', {'currentPage': currentIndex === loopNum})}
                onClick={()=> handleMovePage(loopNum)}
             >
            {loopNum}
          </li>
          <li className={cx('pager', {
                'pagerDisabled': currentIndex >= arraySearchPage.pop() + 1
              })}
              onClick={() => {
                if(currentIndex > arraySearchPage.pop() + 1) return;//うまくいってるけどなんでや。これだと一歩手前で止まらんのか、謎。
                handleMovePage(currentIndex + 1)
              }}
              >＞</li>
          </ul>
        }
        </Fragment>
      )
    }
  }

  const handleMovePage = async (page) => {
    if(!search){
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
        setCurrentIndex(page)
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
    }else{
      if(page === 1){
        const _searchMovies = searchMovies.slice(0, pageNum-1);
        setMovies(_searchMovies);
        setCurrentIndex(page)
        return
      }

      const start = (page - 1) * pageNum;
      const end = start + (pageNum - 1)
      const _searchMovies = searchMovies.slice(start, end);

      setMovies(_searchMovies);
    }
    setCurrentIndex(page)
  }

  const movieListItems = movies.map((movie, index) => {

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

  useEffect(() => {
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
  },[])//dbまとめたから？？？

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
              <CheckTag />
            <button className='tagButton' onClick={()=>tagSearchButton()}>タグ検索</button>
            <button className='resetButton' onClick={()=>resetSearchButton()}>検索結果リセット</button>
          </div>
          <div className='addButtonWrapper'>
            <BlueButton
              text='新規登録'
              link='/registration'
            />
            <BlueButton
              text='新規タグ追加'
              link='/tagRegistration'
            />
          </div>
          <ul className="movieCards">
            {movieListItems}
          </ul>
          <Pager />
          <div className='page-top'><a href="#">▲</a></div>
        </div>
      <Footer/>
    </Fragment>
  );
}

export {Top};
