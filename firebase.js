// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyBr4HVNvHC1J4FCncRamc51w-eXbo5j1UE',
	authDomain: 'flashcards-ai-a7c16.firebaseapp.com',
	projectId: 'flashcards-ai-a7c16',
	storageBucket: 'flashcards-ai-a7c16.appspot.com',
	messagingSenderId: '602964358632',
	appId: '1:602964358632:web:d39de27795db3f654aa05d',
	measurementId: 'G-5Z7J0YTBKY',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
