import React from 'react';
// import styles from '../../styles/index.scss';
import * as firebase from 'firebase';

// const [tagList, setTagList] = useState([]);使うときは親の方にこれを追加してくだせぇ
const CheckTag = props => {
  const {tagList, setTagList, disabled} = props
  const db = firebase.firestore();
  db.collection('tagList').onSnapshot((querySnapshot) => {
    const _tagList = querySnapshot.docs.map(doc => {
      return{
        ...doc.data()
      }
    });
    setTagList(_tagList)
  })

  if(disabled){
    return(
      <div className='tagsBox'>
      {tagList.map((tag, index) => {
        return(
          <div key={index} className='tagBox'>
            <input
              type="checkbox"
              name='tag'
              id={'tag' + index}
              value={tag.tag}
              disabled='disabled'
            />
            <label htmlFor={'tag' + index}>{tag.tag}</label>
          </div>
        )
      })}
      </div>
    )
  }else{
    return(
      <div className='tagsBox'>
      {tagList.map((tag, index) => {
        return(
          <div key={index} className='tagBox'>
            <input
              type="checkbox"
              name='tag'
              id={'tag' + index}
              value={tag.tag}
            />
            <label htmlFor={'tag' + index}>{tag.tag}</label>
          </div>
        )
      })}
      </div>
    )
  }
}

export { CheckTag };
