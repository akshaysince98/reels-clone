import React from 'react'
import { useState } from 'react'
import { auth, db } from '../Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from "firebase/firestore";
import { storage } from '../Firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { v4 } from 'uuid';


function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState('');
  const [imageUpload, setImageUpload] = useState(null);


  const processingSignup = async () => {
    try {
      setLoader(true);
      // auth only identifies a user, and stores only the email and password of a user
      let userCred = await createUserWithEmailAndPassword(auth, email, password)
      console.log(userCred);
      let imgURL = await uploadImage(userCred);
      if (!imgURL) {
        return;
      }

      // firestore is used to store all the other data regarding a user
      await setDoc(doc(db, "user", userCred.user.uid), {
        email,
        name,
        profileImgUrl: imgURL,
        reelsIds: [],
        userId: userCred.user.uid
      });
      console.log("doc set");

      setUser(userCred.user);
    } catch (err) {
      setError(err.message);
      // after some time => remove error message
      setTimeout(() => {
        setError("");
      }, 1000);
    }
    setLoader(false);

  }

  const uploadImage = async (userCred) => {
    if (!name || !email) {
      alert("naam aur email likh pehle")
      return
    }
    if (imageUpload == null || !imageUpload.name.includes(".jpg")) {
      alert("Select a jpg image for profile picture");
      return
    }
    // uploading profile image to the storage
    let imgRef = ref(storage, 'user/profileImage/' + name + userCred.user.uid);
    await uploadBytes(imgRef, imageUpload);
    let imgURL = await getDownloadURL(imgRef);
    console.log(imgURL)
    console.log("image uploaded")
    return imgURL;
  }

  return (
    <>
      {
        error ? <h1>{error}</h1> :
          loader ? <h1>...Loading</h1> :
            user ? <h1>Signed up as {user.uid}</h1> :
              <form>
                <br />
                <input onChange={(e) => { setEmail(e.target.value) }} type="email" placeholder='Enter Email' value={email} />
                <br />
                <input onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder='Password' value={password} />
                <br />
                <input onChange={(e) => { setName(e.target.value) }} type="text" placeholder='Full Name' value={name} />
                <br />
                <input onChange={(e) => { setImageUpload(e.target.files[0]) }} type="file" />
                {/* <button onClick={uploadImage}>Upload image</button> */}
                <br />
                <button onClick={processingSignup}  >Sign Up</button>
                <br />
                <br />
                Have an account? <a href='/login'>Log in</a>
              </form>
      }
    </>
  )
}

export default Signup