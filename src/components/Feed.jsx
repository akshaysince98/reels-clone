import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import './Feed.css'
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../Firebase';
import { signOut } from 'firebase/auth';
import UploadFile from './UploadFile';
import Posts from './Posts';

function Feed() {
  let cUser = useContext(AuthContext);
  const [user, setUser] = useState();
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    (async function () {
      // get user
      const docRef = doc(db, "user", cUser.uid);
      const useObj = await getDoc(docRef);
      // console.log("Document data:", useObj.data());
      // set user
      //  set page loading
      setPageLoading(false)
      setUser(useObj.data());
    })();

  }, [])

  let signout = async () => {
    await signOut(auth);
    setUser(null);
  }


  return (
    <>
      <div className="header">
        <div className="insta_img" />
        <div className='profileLogout'>
          <a href="./profile">
            {
              pageLoading == true ? <div>black</div> :
                < img src={user.profileImgUrl} alt="" className="profile_img" />
            }
          </a>
          <button className='logout-btn' onClick={signout} >LogOut</button>
        </div>
      </div>
      <div className="main_container">

        <UploadFile user={user} />

        <Posts />
      </div>
    </>
  )
}

export default Feed