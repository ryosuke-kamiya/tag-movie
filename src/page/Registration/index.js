import React, { Fragment } from 'react';
// import styles from '../../styles/index.scss';
import * as firebase from 'firebase';
import { useState } from 'react';
import { useRouter } from '../../hooks/useRouter'

import { CheckTag, Header, Footer, BlueButton } from '../../_parts';

function Registration() {

  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const { history } = useRouter();
  const amazonLinkValidation = /^(https:\/\/www.amazon.co.jp)/
  const db = firebase.firestore();

  const handleClickAddButton = async () => {

    if (!title) {
      alert('タイトルが空です。');
      return;
    }

    if (!link) {
      alert('リンクが空です。');
      return;
    }

    if(!amazonLinkValidation.test(link)){
      alert('Amazonのリンクを入力してください。');
      return;
    }

    const snapshot = await db
    .collection('movies')
    .where( 'title', '==', title)
    .get();

    const sameTitle = [];

    snapshot.forEach(doc => {
      sameTitle.push({
        movieId: doc.id,
      });
    })

    if(sameTitle.length >= 1){
      alert('同名の映画が登録されています。');
      return;
    }

    const tags = [];
    const tag = document.getElementsByName('tag');

    for (let i = 0; i < tag.length; i++) {
      if (tag[i].checked) { //(tag[i].checked === true)と同じ
        tags.push(tag[i].value);
      }
    }

    await db.collection('movies').add({
      title: title,
      link: link,
      tag: tags,
    })

    setTitle('')
    setLink('')

    const checkTag = document.getElementsByName('tag');

    for (let i = 0; i < checkTag.length; i++){
      if(checkTag[i].checked){
        checkTag[i].checked = false
      }
    }
  }

  const handleBack = () => {
    // setPrompt(false)
    history.goBack()
  }

  return (
    <Fragment>
      <Header />
      <div className='Registration'>
        <h2>映画の新規登録</h2>
        <div className='registrationForm'>
          <div className='titleBox'>
            <label htmlFor="title">title : </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(event) => { setTitle(event.target.value) }}
            />
          </div>
          <div className='linkBox'>
            <label htmlFor="link">Amazon link : </label>
            <input
              type="url"
              id="link"
              value={link}
              onChange={(event)=>{setLink(event.target.value)}}
            />
          </div>
          <div>
            <div>タグ一覧</div>
            <CheckTag />
          </div>
        </div>
        <div className='buttons'>
          <BlueButton
              text='追加'
              onClick={handleClickAddButton}
            />
          <BlueButton
            text='戻る'
            onClick={handleBack}
          />
        </div>
      </div>
      <Footer />
    </Fragment>
  );
}

export { Registration };
