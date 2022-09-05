// npm i firebase
// src => create firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import secrets from "./secrets";
import { getStorage } from 'firebase/storage'

let app = initializeApp(secrets);
// from these three lines you are able to include firebase in your react app

export let auth = getAuth(app);
export let db = getFirestore(app);
export let storage = getStorage(app);