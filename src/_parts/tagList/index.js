import React, { Fragment } from 'react';
// import styles from '../../styles/index.scss';


const tagList = [ 
{value : '洋画', id : 'you'}, 
{value : '邦画', id : 'hou'},
{value : '泣ける', id : 'cry'},
{value : 'ホラー', id : 'hor'},
{value : 'シリアス', id : 'ser'},
{value : '笑える', id : 'rau'},
{value : '家族', id : 'fam'},
{value : '青春', id : 'sei'},
{value : '恋愛', id : 'lov'},
{value : 'サスペンス', id : 'sas'},
{value : 'アニメ', id : 'ani'},
{value : 'SF', id : 'sf'},
{value : '実写化', id : 'real'},
{value : 'ミュージカル', id : 'mu'},
{value : 'ファンタジー', id : 'fan'},
{value : 'スポーツ', id : 'sp'},
{value : 'アクション', id : 'act'},
]


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