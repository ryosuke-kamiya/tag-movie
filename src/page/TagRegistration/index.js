import React, { Fragment } from 'react';
// import styles from '../../styles/index.scss';
import * as firebase from 'firebase';
import { useState } from 'react';
import { useRouter } from '../../hooks/useRouter'

import { CheckTag, Header, Footer, BlueButton } from '../../_parts';

function TagRegistration() {
  const [addTag, setAddTag] = useState('');

  const { history } = useRouter();

  const db = firebase.firestore();

  const handleClickAddButton = async () => {

    if (!addTag) {
      alert('タグが空です。');
      return;
    }

    const snapshot = await db
    .collection('tagList')
    .where( 'tag', '==', addTag)
    .get();

    const sameTag = [];

    snapshot.forEach(doc => {
      sameTag.push({
        tagId: doc.id,
      });
    })

    if(sameTag.length >= 1){
      alert('同名のタグが登録されています。');
      return;
    }

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
          <BlueButton
              text='追加'
              onClick={handleClickAddButton}
            />
        <div>
          <div>タグ一覧</div>
          <CheckTag
            disabled={true}
          />
        </div>
        <BlueButton
          text='戻る'
          onClick={handleBack}
        />
      </div>
      <Footer />
    </Fragment>
  );
}

export { TagRegistration };
