// // Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore'
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// const firebaseConfig = {
//     apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//     authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
// }

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app)

// export {app, db}

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDfMRJyOkYstI6RKWSuqWJBYM32cE1S20",
  authDomain: "flashcard-ai-7db25.firebaseapp.com",
  projectId: "flashcard-ai-7db25",
  storageBucket: "flashcard-ai-7db25.appspot.com",
  messagingSenderId: "305533248366",
  appId: "1:305533248366:web:d4297bc7633e87fc73977f",
  measurementId: "G-N3K46980GH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, db };
