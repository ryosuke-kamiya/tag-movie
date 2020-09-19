import React from 'react';
import './styles.scss';
import * as firebase from 'firebase';
import { useState } from 'react';

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
 
  const [users, setUsers] = useState([]);
  const [userName, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [documentID, setDocumentID] = useState('');

  const handleClickAddButton = async () => {

    if( !userName || !age){
      alert('"userName" or "age" が空です');
      return;
    }

    const parsedAge = parseInt(age, 10);

    if(isNaN(parsedAge)){
      alert('ageは半角数字でセットしてください')
      return;
    }


    const db = firebase.firestore()
    // await db
    // .collection('users')
    // .doc('1')
    // .set({
    //   // name: "dammy",
    //   age: 99
    // },{merge: true});//第二引数のmergeで全体上書きを防ぎ、追加にする。

    // const ref = await db.collection('users').add({
    //   name: "田中",
    //   age: 100
    // })
    // const snapShot = await ref.get();
    // const data = snapShot.data();
    // console.log(ref.id, data);

    await db.collection('users').add({
      name: userName,
      age: age
    })
  }

  const userListItems = users.map(user => {
    return(
      <li key={user.userID}>
        <ul>
          <li>ID : {user.userID}</li>
          <li>name : {user.name}</li>
          <li>age : {user.age}</li>
        </ul>
      </li>
    )
  })

  return (
    <div className="App">
      <h1>registration</h1>
      <div>
        <label htmlFor="username">username : </label>
        <input 
          type="text"
          id="username"
          value={userName}
          onChange={(event)=>{setUsername(event.target.value)}}
        />
        <label htmlFor="age">age : </label>
        <input 
          type="text"
          id="age"
          value={age}
          onChange={(event)=>{setAge(event.target.value)}}
        />
        <label htmlFor="documentID">documentID : </label>
        <input 
          type="text"
          id="documentID"
          value={documentID}
          onChange={(event)=>{setDocumentID(event.target.value)}}
        />
      </div>
      <button onClick={handleClickAddButton}>追加</button>
      <ul>
        {userListItems}
      </ul>
    </div>
  );
}

export {Registration};
