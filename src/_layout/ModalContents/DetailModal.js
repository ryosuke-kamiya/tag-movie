import React, { Fragment, useState } from 'react';
import * as firebase from 'firebase';

import { BlueButton } from '../../_parts';
import { useModal } from '../../hooks/useModal';

const DetailModal = (props) => {
    const { movie } = props
    const [listOpen, setListOpen] = useState(false)
    const [tagList, setTagList] = useState([]);
    const db = firebase.firestore();
    const { setModal } = useModal()

    const tagAddToggle = () => {
      setListOpen(!listOpen)

      db.collection('tagList').onSnapshot((querySnapshot) => {
        const _tagList = querySnapshot.docs.map(doc => {
          return{
            ...doc.data()
          }
        });
        setTagList(_tagList)
      })
    }

    const handleClickAddButton = async () => {

      const addTags = [];
      const addTag = document.getElementsByName('addTag');
  
      for (let i = 0; i < addTag.length; i++) {
        if (addTag[i].checked) { //(tag[i].checked === true)と同じ
          addTags.push(addTag[i].value);
        }
      }
      const tags = addTags.concat(movie.tag)

      let ID = movie.movieId ? movie.movieId : movie.movieID

      await db.collection('movies').doc(ID).set({tag: tags}, { merge: true });

      for (let i = 0; i < addTag.length; i++){
        if(addTag[i].checked){
          addTag[i].checked = false
        }
      }
      setModal(false)
      document.location.reload()//ココはあとでなんとかしたい。urlを変更するやつとかで。
    };


    return(
        <div className='detailModal'>
            <div>{movie.title}</div>
            <a href={movie.link} className='movieLinkButton' target="_blank" rel="noopener noreferrer" >Amazon</a>
            {movie.tag &&
              <ul className='tags'>{movie.tag.map((tag, index) => (
                <li key={index} className='tag'>{tag}</li>
              ))}
                <li className='tagAddButton' onClick={tagAddToggle}>{listOpen ? 'ー' : '＋' }</li>
              </ul>
            }
            {listOpen &&
            <Fragment>
              <ul className='addTagsBox'>{
                tagList.map((addTag, index) => {
                  for(let i = 0; i < movie.tag.length; i++){
                    if(movie.tag[i] === addTag.tag) return null;
                  }
                  return(
                    <li key={index} className='addTagBox'>
                      <input
                        type="checkbox"
                        name='addTag'
                        id={'addTag' + index}
                        value={addTag.tag}
                      />
                      <label htmlFor={'addTag' + index}>{addTag.tag}</label>
                    </li>
                  )
                })
              }</ul>
              <BlueButton
                text='追加'
                onClick={handleClickAddButton}
              />
            </Fragment>
            }
        </div>
    )
}

export {DetailModal}