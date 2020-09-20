import React, { Fragment } from 'react';
// import styles from '../../styles/index.scss';


const tagList = [ {value : '面白い', id : 'fun'}, 
{value : '洋画', id : 'you'}, 
{value : '邦画', id : 'hou'}]


const checkTag = tagList.map((tag, index) => {

  return(
    <Fragment key={index}>
      <label htmlFor={tag.id}>{tag.value}:</label>
      <input
        type="checkbox"
        name='tag'
        id={tag.id}
        value={tag.value}
      />
    </Fragment>
  )
})

export {checkTag};