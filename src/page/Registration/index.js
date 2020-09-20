import React from 'react';
// import styles from '../../styles/index.scss';
import * as firebase from 'firebase';
import { useState } from 'react';
import { useRouter } from '../../hooks/useRouter'

import { checkTag } from '../../_parts/tagList/index';
import { Header } from '../../_parts/Header/index';
import { Footer } from '../../_parts/Footer/index';

// var firebaseConfig = {
//   apiKey: "AIzaSyDrd_B1MlnDKCfRUFWqh0pJVlyBtsxbmKM",
//   authDomain: "tag-movie.firebaseapp.com",
//   databaseURL: "https://tag-movie.firebaseio.com",
//   projectId: "tag-movie",
//   storageBucket: "tag-movie.appspot.com",
//   messagingSenderId: "970472171001",
//   appId: "1:970472171001:web:718d629dce05e23ceac928",
//   measurementId: "G-8RP1E25KXL"
// };

// firebase.initializeApp(firebaseConfig);

function Registration() {
 
  const [title, setTitle] = useState('');
  const { history } = useRouter();

  const handleClickAddButton = async () => {

    if( !title ){
      alert('タイトルが空です');
      return;
    }

    const tags = [];
    const tag = document.getElementsByName('tag');

    for (let i = 0; i < tag.length; i++){
      if(tag[i].checked){ //(tag[i].checked === true)と同じ
        tags.push(tag[i].value);
      }
    }

    const db = firebase.firestore()
    // await db
    // .collection('movies')
    // .doc('1')
    // .set({
    //   // name: "dammy",
    //   age: 99
    // },{merge: true});//第二引数のmergeで全体上書きを防ぎ、追加にする。

    // const ref = await db.collection('movies').add({
    //   name: "田中",
    //   age: 100
    // })
    // const snapShot = await ref.get();
    // const data = snapShot.data();
    // console.log(ref.id, data);

    await db.collection('movies').add({
      title: title,
      tag: tags
    })

    setTitle('')
  }

  const handleBack = () => {
    // setPrompt(false)
    history.goBack()
  }

  return (
    <div className='Registration'>
      <Header/>
      <h1>registration</h1>
      <div>
        <label htmlFor="title">title : </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(event)=>{setTitle(event.target.value)}}
        />
        <div>
        <div>タグ一覧</div>
        {checkTag}
        </div>
      </div>
      <button onClick={handleClickAddButton}>追加</button>
      <button onClick={handleBack}>戻る</button>
      <Footer/>
    </div>
  );
}

export {Registration};
