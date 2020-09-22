import React, { Fragment } from 'react';
// import styles from '../../styles/index.scss';
import * as firebase from 'firebase';
import { useState } from 'react';
import { useRouter } from '../../hooks/useRouter'

import { CheckTag } from '../../_parts/tagList/index';
import { Header } from '../../_parts/Header/index';
import { Footer } from '../../_parts/Footer/index';

function TagRegistration() {
  const [addTag, setAddTag] = useState('');

  const { history } = useRouter();

  const handleClickAddButton = async () => {
    const db = firebase.firestore()
    await db.collection('tagList').add({
      tag: addTag
    })
    setAddTag('');
  }

  const handleBack = () => {
    // setPrompt(false)
    history.goBack()
  }

  return (
    <Fragment>
      <Header />
      <div className='TagRegistration'>
        <h2>タグの新規登録</h2>
        <div className='registrationForm'>
          <div className='addTagBox'>
              <label htmlFor="addTag">追加するタグ : </label>
              <input
                type="text"
                id="addTag"
                value={addTag}
                onChange={(event) => { setAddTag(event.target.value) }}
              />
            </div>
          </div>
        <div className='buttons'>
          <button onClick={handleClickAddButton}>追加</button>
          <button onClick={handleBack}>戻る</button>
        </div>
        <div>
          <div>タグ一覧</div>
          <CheckTag
            disabled={true}
          />
        </div>
      </div>
      <Footer />
    </Fragment>
  );
}

export { TagRegistration };
