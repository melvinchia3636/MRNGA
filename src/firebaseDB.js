// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyA2sQZWS-KSMix17V5HV0VmvLPjI6QRGus',
  authDomain: 'mrnga-e4fd5.firebaseapp.com',
  databaseURL: 'https://mrnga-e4fd5-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'mrnga-e4fd5',
  storageBucket: 'mrnga-e4fd5.appspot.com',
  messagingSenderId: '30162995463',
  appId: '1:30162995463:web:4cd9538534e5fcfade1da2',
  measurementId: 'G-HJQQLMJ89Q',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default getDatabase(app);
