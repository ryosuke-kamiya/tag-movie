import React from 'react';
import './styles.scss';
import * as firebase from 'firebase';
import { useState, useEffect } from 'react';

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
 
  const [users, setUsers] = useState([]);
  const [userName, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [documentID, setDocumentID] = useState('');

  const handleClickFetchButton = async ()=> {
    const db = firebase.firestore();
    // document取得
    // const doc = await db.collection('users').doc('FmppkTMVH6yPqWvUf9wf').get();
    // console.log('Document Data:' ,doc.data() );

    // collection取得
    const snapshot = await db
    .collection('users')
    // .where('age', '<=' ,30)絞り込み
    // .limit(1)件数制限
    .get();

    const _users = [];

    snapshot.forEach(doc => {
      _users.push({
        userID: doc.id,
        ...doc.data()
      });
    })

    setUsers(_users);
  };

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

  const handleClickUpdateButton = async () => {

    if(!documentID){
      alert('documentIDをセットしてください');
      return;
    }

    const newData = {};
    if(userName){
      newData['name'] = userName;
    }
    if(age){
      newData['age'] = parseInt(age,10);
    }
    try{
      const db = firebase.firestore();
      await db.collection('users').doc(documentID).update(newData);
      setUsername('')
      setAge('')
      setDocumentID('')
    }catch(error){
      console.log(error);
    }



    // await db.collection('users').doc('uQhbXB9RYSLTHhxG1zEs').update({
    //   name: '田中でした',
    //   age: 33
    // })
  }

  const handleClickDeleteButton = async () => {
    // const db = firebase.firestore();
    // db.collection('users').doc('D6AcCpdUnuxNQNbrrhP0').delete().then(function () {
    //   console.log("Document successfully deleted")
    // }).catch(function (error) {
    //   console.error("error removing document :", error);
    // })

    if(!documentID){
      alert('documentIDをセットしてください');
      return;
    }

    try{
      const db = firebase.firestore();
      await db.collection('users').doc(documentID).delete();
      setUsername('')
      setAge('')
      setDocumentID('')
    }catch(error){
      console.log(error);
    }
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

  useEffect(() => {
    const db = firebase.firestore();
    const unsubscribe = db.collection('users').onSnapshot((querySnapshot) => {
      const _users = querySnapshot.docs.map(doc => {
        return{
          userID: doc.id,
          ...doc.data()
        }
      });
      setUsers(_users)
    })
    return() => {
      unsubscribe();
    }
  },[])//これでリアルタイム自動更新

  return (
    <div className="App">
      <h1>bbbbbb</h1>
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
      <button onClick={handleClickFetchButton}>取得</button>
      <button onClick={handleClickAddButton}>追加</button>
      <button onClick={handleClickUpdateButton}>更新</button>
      <button onClick={handleClickDeleteButton}>削除</button>
      <ul>
        {userListItems}
      </ul>
    </div>
  );
}

export {Top};
