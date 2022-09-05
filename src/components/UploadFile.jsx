import React from 'react'
import { useState } from 'react'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../Firebase';
// import { AuthContext } from '../context/AuthContext';
// import { useContext } from 'react';
import { v4 } from 'uuid';
import { doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';


function UploadFile(props) {
  const user = props.user;
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = async (file) => {
    if (file == null) {
      setError("Please select a file first");
      setTimeout(() => {
        setError('');
      }, 2000);
    }
    if (file.size / (1024 * 1024) > 100) {
      setError("File too big");
      setTimeout(() => {
        setError('');
      }, 2000);
    }
    let imgURL = await uploadImage(file)
    console.log("image uploaded")
    console.log(imgURL)

    let reelID = user.userId + "+" + user.reelsIds.length
    settingReelDB(reelID, imgURL);
    console.log("db set")

    updateUserDB(reelID);
  }
  // console.log(user.reelsIds.length)
  const updateUserDB = async (reelID) => {

    const ref = doc(db, "user", user.userId);
    await updateDoc(ref, {
      reelsIds: [...user.reelsIds, reelID]
    })
    console.log("doc updated")
    setLoading(false)
    window.location.reload(false);
  }

  const settingReelDB = async (reelID, imgURL) => {
    await setDoc(doc(db, "reels", reelID), {
      likes: [],
      comments: [],
      pId: reelID,
      pUrl: imgURL,
      uName: user.name,
      userImage: user.profileImgUrl,
      uID: user.userId,
      createdAt: serverTimestamp()
    });
  }

  const uploadImage = async (file) => {
    // uploading reel to the storage
    setLoading(true)
    let imgRef = ref(storage, '/reelVideo/' + user.name + v4());
    await uploadBytes(imgRef, file);
    let imgURL = await getDownloadURL(imgRef);
    return imgURL;
  }

  return (
    <>
      {error ? <div>{error}</div> :
        loading ? <div className="upload_container"><span className='upload_text'>uploading...</span></div> :
          <>
            <input type="file" accept='video/*' id='upload-input' style={{ display: "none" }}
              onChange={(e) => handleChange(e.target.files[0])} />
            <label htmlFor='upload-input'>
              <span className="upload_container">
                <span className='material-icons' >movie</span>
                <span className='upload_text'>Upload Video</span>
              </span>
            </label>
          </>
      }
    </>
  )
}

export default UploadFile
