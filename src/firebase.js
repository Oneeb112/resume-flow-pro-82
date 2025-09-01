// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyHXm9AEndsGAYQzl7hvKs_7S5fVoPKNs",
  authDomain: "ats-resume-builder-874f9.firebaseapp.com",
  projectId: "ats-resume-builder-874f9",
  storageBucket: "ats-resume-builder-874f9.firebasestorage.app",
  messagingSenderId: "311042211208",
  appId: "1:311042211208:web:cc8931b1997f13a3094e3d",
  measurementId: "G-2DS01VXRKP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

// Configure providers
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

githubProvider.setCustomParameters({
  allow_signup: 'true',
});