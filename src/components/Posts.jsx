import { collection, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { db } from '../Firebase'
import Videos from './Videos'

function Posts() {
  const [posts, setPosts] = useState([])
  const q = query(collection(db, "reels"), orderBy("createdAt", "desc"))

  useEffect(() => {
    (async () => {

      let parr = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((p) => {
        // console.log(p.data())  
        console.log(p.data().pUrl)
        parr.push(p.data());
      });
      setPosts(parr);
    })();
  }, [])

  return (
    <>
      {
        posts.map((p, idx) => {
          // console.log(p.pUrl)
          return (<React.Fragment key={idx}>
            <Videos src={p.pUrl} />

          </React.Fragment>)
        })
      }
    </>
  )
}

export default Posts
