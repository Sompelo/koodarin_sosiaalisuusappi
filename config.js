import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp, onSnapshot, query, orderBy, where, getDocs, getDoc, doc } from 'firebase/firestore'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'


const firebaseConfig = {
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
