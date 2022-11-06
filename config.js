import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp, onSnapshot, query, orderBy, where, getDocs, getDoc, doc } from 'firebase/firestore'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyA5SUkxCdGVb6EoWg8YBdMdlM7fx1Hq5UI",
  authDomain: "koodarin-sosiaalisuusappi.firebaseapp.com",
  projectId: "koodarin-sosiaalisuusappi",
  storageBucket: "koodarin-sosiaalisuusappi.appspot.com",
  messagingSenderId: "1005447914179",
  appId: "1:1005447914179:web:246f4275a28758b2c4b876"
};


const app = initializeApp(firebaseConfig);

const firestore = getFirestore();

const ACTIVITIES = 'activities';
const USERS = 'users'

export {
    firestore,
    collection, 
    addDoc,
    ACTIVITIES,
    serverTimestamp,
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    query,
    where,
    doc,
    getDocs,
    getDoc,
    onSnapshot,
    orderBy,
    USERS,
}