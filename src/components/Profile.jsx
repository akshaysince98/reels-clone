import React from 'react'
import './Profile.css'
import { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../Firebase';

function Profile() {

  // use case => to give me uid
  let cUser = useContext(AuthContext);
  const [user, setUser] = useState();
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    (async function () {
      // get user
      const docRef = doc(db, "user", cUser.uid);
      const useObj = await getDoc(docRef);
      console.log("Document data:", useObj.data());
      // set user
      //  set page loading
      setPageLoading(false)
      setUser(useObj.data());
    })();

  }, [])

  return (
    <>
      {
        cUser == null ? <div>Need to login</div> :
          pageLoading == true ? <div>Getting data...</div> :
            <>
              <div className='header'>
                <a href="./feed">Feed Page</a>
              </div>
              <div className="main">
                <div className="pimg_container">
                  <img src={user.profileImgUrl} className="pimg" />
                </div>
                <div className="details">
                  <div className="content bold-text">{user.name} </div>
                  <div className="content">No. of Posts: <span className='bold-text'>{user.reelsIds.length}</span> </div>
                  <div className="content">Email <span className='bold-text'>{user.email}</span> </div>
                </div>
              </div>
            </>
      }
    </>
  )
}

export default Profile