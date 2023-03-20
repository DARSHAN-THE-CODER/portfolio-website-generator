// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVLH8VNGaEy483XQWqMX1oWtQcYCWhTM8",
  authDomain: "saas-portfolio-website.firebaseapp.com",
  projectId: "saas-portfolio-website",
  storageBucket: "saas-portfolio-website.appspot.com",
  messagingSenderId: "523155178735",
  appId: "1:523155178735:web:cb8fa519be0f444a2b471a",
  measurementId: "G-R9LQ1JWXBB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export { app}